// AURA color judgment: cluster perceptually-near colors, pick one canonical per
// cluster, demote the rest to drift, and infer a semantic role for each survivor.
// This is the editorial layer designlang and its rivals do not ship: they label
// every value; AURA prunes to the ~handful that are the real system and says why.

import { converter, parse, differenceCiede2000, formatHex, formatRgb } from 'culori';

const toLab = converter('lab');
const toRgb = converter('rgb');
const ciede = differenceCiede2000();

// Perceptual just-noticeable-difference is ~1.0; ~2.3 is the classic "same to a
// casual eye" threshold. Below this, two colors are drift of one another.
const DEFAULT_DELTA_E = 2.3;

/** Normalize any CSS color string to a culori color, or null if untokenizable. */
export function parseColor(value) {
  if (!value) return null;
  const v = String(value).trim().toLowerCase();
  if (v === 'transparent' || v === 'none' || v === 'currentcolor' || v === 'inherit') return null;
  const c = parse(v);
  if (!c) return null;
  // Fully transparent contributes nothing to a palette.
  if (typeof c.alpha === 'number' && c.alpha === 0) return null;
  return c;
}

/** Relative luminance (WCAG) for a culori color, 0 (black) to 1 (white). */
export function luminance(color) {
  const { r, g, b } = toRgb(color);
  const lin = (u) => (u <= 0.03928 ? u / 12.92 : Math.pow((u + 0.055) / 1.055, 2.4));
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

/** WCAG contrast ratio between two culori colors (1..21). */
export function contrast(a, b) {
  const la = luminance(a), lb = luminance(b);
  const [hi, lo] = la >= lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

/**
 * Cluster observations by perceptual distance.
 * @param {Array<{value:string, weight:number, roleHints?:object}>} observations
 * @returns {Array<{canonical:object, hex:string, weight:number, members:Array}>}
 */
export function clusterColors(observations, { deltaE = DEFAULT_DELTA_E } = {}) {
  // 1. Parse + fold exact duplicates, summing weight and merging role hints.
  const exact = new Map();
  for (const o of observations) {
    const c = parseColor(o.value);
    if (!c) continue;
    const key = formatHex(c) + '|' + (typeof c.alpha === 'number' ? c.alpha.toFixed(2) : '1');
    const prev = exact.get(key);
    if (prev) {
      prev.weight += o.weight || 1;
      mergeHints(prev.roleHints, o.roleHints);
    } else {
      exact.set(key, { color: c, lab: toLab(c), weight: o.weight || 1, roleHints: { ...(o.roleHints || {}) } });
    }
  }

  // 2. Greedy agglomerate: heaviest first becomes a cluster seed; near colors join it.
  const points = [...exact.values()].sort((a, b) => b.weight - a.weight);
  const clusters = [];
  for (const p of points) {
    let joined = null;
    for (const cl of clusters) {
      if (ciede(p.lab, cl.canonical.lab) < deltaE) { joined = cl; break; }
    }
    if (joined) {
      joined.members.push(p);
      joined.weight += p.weight;
      mergeHints(joined.roleHints, p.roleHints);
    } else {
      clusters.push({ canonical: p, members: [p], weight: p.weight, roleHints: { ...p.roleHints } });
    }
  }

  // 3. Emit, sorted by cumulative weight (the real system rises to the top).
  return clusters
    .sort((a, b) => b.weight - a.weight)
    .map((cl) => ({
      canonical: cl.canonical.color,
      hex: formatHex(cl.canonical.color),
      weight: cl.weight,
      roleHints: cl.roleHints,
      members: cl.members.map((m) => ({ hex: formatHex(m.color), weight: m.weight })),
    }));
}

function mergeHints(into, from) {
  if (!from) return;
  for (const k of Object.keys(from)) into[k] = (into[k] || 0) + from[k];
}

/**
 * Infer a semantic role for each clustered color from luminance + how it was used
 * (role hints are counts of prop context: background/text/border/accent seen during
 * extraction). Returns the same clusters, each tagged with role + confidence + why.
 */
export function assignRoles(clusters) {
  if (!clusters.length) return [];
  // Surfaces are near-neutral by definition; a high-chroma "background" is a brand
  // button or accent panel, not a page surface, so it stays an accent candidate.
  const isNeutral = (c) => chroma(c.canonical) < 12;
  const bgLike = clusters.filter((c) => (c.roleHints.background || 0) >= (c.roleHints.text || 0) && isNeutral(c));
  const surfaces = [...bgLike].sort((a, b) => luminance(b.canonical) - luminance(a.canonical));

  const used = new Set();
  const out = [];
  const take = (cl, role, why, confidence) => {
    if (!cl || used.has(cl)) return;
    used.add(cl);
    out.push({ ...cl, role, why, confidence });
  };

  // Background = the lightest, most-used background-context color (or darkest on a dark UI).
  const lightestSurface = surfaces[0];
  const darkestSurface = surfaces[surfaces.length - 1];
  const isDarkUi = lightestSurface && luminance(lightestSurface.canonical) < 0.4;
  const background = isDarkUi ? darkestSurface : lightestSurface;
  if (background) take(background, 'background', roleReason('background', background, isDarkUi), roleConfidence(background, 'background'));

  // Surface = next background-context tone, offset from the page background. Require
  // real usage so a color seen once or twice does not get promoted to a system role.
  const surface = surfaces.find((s) => !used.has(s) && s.weight >= 5);
  if (surface) take(surface, 'surface', roleReason('surface', surface), roleConfidence(surface, 'surface'));

  // Text = the color seen most in text context with strong contrast to the background.
  const textCandidates = clusters
    .filter((c) => !used.has(c))
    .map((c) => ({ c, textUse: c.roleHints.text || 0, ct: background ? contrast(c.canonical, background.canonical) : 21 }))
    .filter((x) => x.ct >= 4.5)
    .sort((a, b) => b.textUse - a.textUse || b.ct - a.ct);
  if (textCandidates[0]) take(textCandidates[0].c, 'text', roleReason('text', textCandidates[0].c, false, textCandidates[0].ct), roleConfidence(textCandidates[0].c, 'text'));

  // Accent = the most-used clearly-saturated color. The chroma>25 floor keeps muted
  // slate/blue-greys (common in secondary text) out of the accent slot so the real
  // brand color wins even when it is used sparingly on CTAs.
  const accentCandidates = clusters
    .filter((c) => !used.has(c) && chroma(c.canonical) > 25)
    .sort((a, b) => b.weight - a.weight);
  if (accentCandidates[0]) take(accentCandidates[0], 'accent', roleReason('accent', accentCandidates[0]), roleConfidence(accentCandidates[0], 'accent'));

  // Border = a low-chroma tone close to the background but distinguishable.
  const borderCandidates = clusters
    .filter((c) => !used.has(c) && chroma(c.canonical) < 12 && (c.roleHints.border || 0) > 0)
    .sort((a, b) => (b.roleHints.border || 0) - (a.roleHints.border || 0));
  if (borderCandidates[0]) take(borderCandidates[0], 'border', roleReason('border', borderCandidates[0]), roleConfidence(borderCandidates[0], 'border'));

  // Everything else that carried real weight stays as a named-but-unroled system color.
  for (const c of clusters) {
    if (!used.has(c)) out.push({ ...c, role: 'extended', why: 'System color with no dominant semantic role; kept as an extended palette entry.', confidence: 0.4 });
  }
  return out;
}

export function chroma(color) {
  const { a = 0, b = 0 } = toLab(color);
  return Math.sqrt(a * a + b * b);
}

function roleConfidence(cluster, role) {
  const hintTotal = Object.values(cluster.roleHints).reduce((s, n) => s + n, 0) || 1;
  const dominant = { background: 'background', surface: 'background', text: 'text', border: 'border', accent: 'accent' }[role];
  const share = (cluster.roleHints[dominant] || 0) / hintTotal;
  // More usage in the expected context + more total weight = higher confidence.
  return Math.min(0.95, 0.4 + share * 0.4 + Math.min(cluster.weight / 200, 0.15));
}

function roleReason(role, cluster, isDarkUi, ct) {
  const w = Math.round(cluster.weight);
  switch (role) {
    case 'background': return `Most-used background-context tone${isDarkUi ? ' on a dark UI (darkest surface)' : ' and the lightest surface'} (weight ${w}).`;
    case 'surface': return `Second background-context tone, offset from the page background for cards and panels (weight ${w}).`;
    case 'text': return `Highest text-context usage with a ${ct ? ct.toFixed(1) : 'AA'}:1 contrast against the background (weight ${w}).`;
    case 'accent': return `Most-used chromatic (non-grey) color; reads as the brand action color (weight ${w}).`;
    case 'border': return `Low-chroma tone used in border context, distinct from the background (weight ${w}).`;
    default: return `Kept as a system color (weight ${w}).`;
  }
}

export { DEFAULT_DELTA_E };
