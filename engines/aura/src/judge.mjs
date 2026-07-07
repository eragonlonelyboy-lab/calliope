// AURA judgment orchestrator: turn raw observations into a curated design system
// plus a drift report. This is the editorial pass: prune near-duplicates to one
// canonical each, name by role, snap type/spacing to the detected scale, and keep
// an explicit record of what was demoted and why.

import { clusterColors, assignRoles } from './color.mjs';
import { detectTypeScale, detectSpacingGrid, snapToScale } from './scale.mjs';

// Centered ladder: index the base step at 'base' and step outward. Long enough that
// real-world size counts never collide into a duplicate token name.
const TYPE_LADDER = ['4xs', '3xs', '2xs', 'xs', 'sm', 'base', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl', '10xl'];
const TYPE_BASE_IDX = TYPE_LADDER.indexOf('base');

export function judge(raw) {
  const color = judgeColor(raw.colors || []);
  const type = judgeType(raw);
  const spacing = judgeSpacing(raw.spacings || []);
  const radius = judgeRadius(raw.radii || []);
  const shadow = judgeShadow(raw.shadows || []);

  const kept =
    color.tokens.length + type.sizes.length + spacing.tokens.length + radius.tokens.length + shadow.tokens.length;
  const dropped =
    color.drift.length + type.drift.length + spacing.drift.length + radius.drift.length;

  return {
    meta: { url: raw.url, title: raw.title, elementCount: raw.elementCount, generatedBy: 'AURA 0.1.0' },
    color,
    type,
    spacing,
    radius,
    shadow,
    fonts: (raw.fontFamilies || []).slice(0, 4),
    summary: {
      canonicalTokens: kept,
      driftFindings: dropped,
      verdict: dropped === 0
        ? 'Tight system: observed values already sit on a scale.'
        : `Curated ${kept} canonical tokens; flagged ${dropped} drift values that should collapse onto them.`,
    },
  };
}

function judgeColor(observations, { maxExtended = 6 } = {}) {
  const clusters = clusterColors(observations);
  const roled = assignRoles(clusters);
  const tokens = [];
  const drift = [];
  const roleCount = {};
  // A curated system is opinionated and small. Always keep the roled colors
  // (background/surface/text/accent/border); of the rest, keep only the few most-used
  // as an extended palette and honestly exclude the long tail of illustration /
  // gradient / one-off colors. Keeping all of them is a raw dump, not curation.
  const extendedRanked = roled.filter((c) => c.role === 'extended').sort((a, b) => b.weight - a.weight);
  const keptExtended = new Set(extendedRanked.slice(0, maxExtended));
  for (const c of roled) {
    if (c.role === 'extended' && !keptExtended.has(c)) {
      drift.push({ value: c.hex, snappedTo: null, into: 'excluded', weight: round(c.weight), note: 'Secondary, illustration, or one-off color; not part of the core system.' });
      continue;
    }
    const named = c.role === 'extended' || c.role === 'accent' ? nextName(roleCount, c.role) : c.role;
    tokens.push({ token: `color/${named}`, value: c.hex, role: c.role, confidence: round(c.confidence), weight: round(c.weight), why: c.why, absorbed: c.members.filter((m) => m.hex !== c.hex) });
    for (const m of c.members) if (m.hex !== c.hex) drift.push({ value: m.hex, snappedTo: c.hex, into: `color/${named}`, weight: round(m.weight) });
  }
  return { tokens, drift };
}

function judgeType(raw) {
  const scale = detectTypeScale(raw.fontSizes || []);
  const snapped = snapToScale(raw.fontSizes || [], scale.steps);
  const cats = snapped.canonical;
  // Name relative to the step nearest 16px (rem 1.0 reads as "base"), not the raw
  // most-used size (which skews small: nav/legal/label text is high-frequency).
  const baseIdx = nearestIndex(cats.map((s) => s.px), 16);
  const sizes = cats.map((s, i) => ({
    token: `font-size/${TYPE_LADDER[TYPE_BASE_IDX + (i - baseIdx)] || `step-${i}`}`,
    px: s.px,
    rem: round(s.px / 16),
    weight: round(s.weight),
  }));
  const anchoredBase = cats[baseIdx]?.px ?? scale.base;
  return {
    scale: scale.ratio ? { ratio: scale.ratio.name, r: scale.ratio.r, base: anchoredBase, fit: scale.fit } : { ratio: 'irregular', base: anchoredBase, fit: scale.fit },
    sizes,
    weights: (raw.fontWeights || []).slice(0, 6).map((w) => ({ weight: w.value, uses: round(w.weight) })),
    drift: snapped.drift.map((d) => ({ value: `${d.px}px`, snappedTo: `${d.snappedTo}px`, deltaPct: d.deltaPct, weight: round(d.weight) })),
  };
}

function judgeSpacing(observations) {
  const grid = detectSpacingGrid(observations);
  const snapped = snapToScale(observations, grid.steps);
  // A 2px "grid" that only fits 79% is not a grid; it is the absence of one, which
  // is itself the useful finding. Only call it regular if a real unit (>=4) explains
  // most spacing.
  const regular = grid.unit >= 4 && grid.fit >= 0.8;
  return {
    grid: { unit: grid.unit, fit: grid.fit, regular },
    tokens: snapped.canonical.filter((s) => s.px > 0).map((s) => ({ token: `space/${s.px}`, px: s.px, weight: round(s.weight) })),
    drift: snapped.drift.map((d) => ({ value: `${d.px}px`, snappedTo: `${d.snappedTo}px`, deltaPct: d.deltaPct, weight: round(d.weight) })),
  };
}

function judgeRadius(observations) {
  const grid = detectSpacingGrid(observations);
  const snapped = snapToScale(observations, grid.steps.length ? grid.steps : undefined || dedupePx(observations));
  return {
    tokens: snapped.canonical.filter((s) => s.px >= 0).slice(0, 8).map((s) => ({ token: radiusName(s.px), px: s.px, weight: round(s.weight) })),
    drift: (snapped.drift || []).map((d) => ({ value: `${d.px}px`, snappedTo: `${d.snappedTo}px`, weight: round(d.weight) })),
  };
}

function judgeShadow(observations) {
  return {
    tokens: (observations || []).slice(0, 6).map((s, i) => ({ token: `shadow/${i + 1}`, value: s.value, weight: round(s.weight) })),
    drift: [],
  };
}

// --- helpers ---
function round(v) { return typeof v === 'number' ? Math.round(v * 100) / 100 : v; }
function nextName(counter, base) { counter[base] = (counter[base] || 0) + 1; return counter[base] === 1 && base === 'accent' ? 'accent' : `${base}-${counter[base]}`; }
function nearestIndex(arr, target) { let bi = 0, bd = Infinity; arr.forEach((v, i) => { const d = Math.abs(v - target); if (d < bd) { bd = d; bi = i; } }); return bi; }
function dedupePx(obs) { return [...new Set((obs || []).map((o) => Math.round(o.value)))].sort((a, b) => a - b); }
function radiusName(px) { if (px === 0) return 'radius/none'; if (px >= 999) return 'radius/full'; if (px <= 4) return 'radius/sm'; if (px <= 8) return 'radius/md'; if (px <= 16) return 'radius/lg'; return 'radius/xl'; }
