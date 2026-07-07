// AURA scale judgment for type and spacing. A design system's type and spacing
// are supposed to be a scale (a modular ratio, or a 4/8px grid). Real sites drift:
// 15px here, 16px there, 17px somewhere else. AURA detects the intended scale,
// snaps observed values onto it, and reports the off-scale values as drift.

const COMMON_RATIOS = [
  { name: 'minor second', r: 1.067 },
  { name: 'major second', r: 1.125 },
  { name: 'minor third', r: 1.2 },
  { name: 'major third', r: 1.25 },
  { name: 'perfect fourth', r: 1.333 },
  { name: 'augmented fourth', r: 1.414 },
  { name: 'perfect fifth', r: 1.5 },
  { name: 'golden', r: 1.618 },
];

/** Collapse [{value, weight}] to a weighted unique-value map. */
function fold(observations) {
  const m = new Map();
  for (const o of observations) {
    const px = round(o.value);
    if (!(px > 0)) continue;
    m.set(px, (m.get(px) || 0) + (o.weight || 1));
  }
  return [...m.entries()].map(([px, weight]) => ({ px, weight })).sort((a, b) => a.px - b.px);
}

function round(v) {
  const n = typeof v === 'number' ? v : parseFloat(v);
  return Number.isFinite(n) ? Math.round(n * 100) / 100 : NaN;
}

/**
 * Detect a modular type scale. Anchors on the most-used size as the base, then
 * scores each candidate ratio by how many observed sizes land near a ratio step.
 * @returns {{base:number, ratio:{name,r}, steps:number[], fit:number}}
 */
export function detectTypeScale(observations) {
  const values = fold(observations);
  if (values.length < 2) return { base: values[0]?.px || 16, ratio: null, steps: values.map((v) => v.px), fit: 0 };

  const base = values.slice().sort((a, b) => b.weight - a.weight)[0].px;
  const min = values[0].px, max = values[values.length - 1].px;

  // Prefer the COARSEST ratio that still explains the data. A dense ratio (minor
  // second) trivially "fits" everything because its steps are ~7% apart, so it would
  // absorb the very drift we exist to flag. Walk ratios large-to-small and take the
  // first that clears the hit-rate bar; fall back to best-fit if none does.
  const ranked = [...COMMON_RATIOS].sort((a, b) => b.r - a.r);
  let chosen = null, fallback = null;
  for (const cand of ranked) {
    const steps = buildSteps(base, cand.r, min, max);
    const { hits, error } = scoreFit(values, steps);
    const hitRate = hits / values.length;
    const fit = hitRate - error * 0.1;
    if (!fallback || fit > fallback.fit) fallback = { ratio: cand, steps, fit };
    if (hitRate >= 0.75 && !chosen) chosen = { ratio: cand, steps, fit };
  }
  const best = chosen || fallback;
  return { base, ratio: best.ratio, steps: best.steps, fit: round(best.fit) };
}

function buildSteps(base, r, min, max) {
  const steps = new Set([base]);
  let up = base;
  while (up < max * 1.05) { up = up * r; if (up <= max * 1.05) steps.add(round(up)); else break; if (steps.size > 24) break; }
  let down = base;
  while (down > min * 0.95) { down = down / r; if (down >= min * 0.95) steps.add(round(down)); else break; if (steps.size > 24) break; }
  return [...steps].sort((a, b) => a - b);
}

function scoreFit(values, steps) {
  let hits = 0, error = 0;
  for (const v of values) {
    const nearest = closest(steps, v.px);
    const relErr = Math.abs(nearest - v.px) / v.px;
    if (relErr <= 0.04) hits += 1; else error += relErr;
  }
  return { hits, error };
}

/**
 * Detect a spacing grid (the base unit whose multiples explain the most values).
 * @returns {{unit:number, steps:number[], fit:number}}
 */
export function detectSpacingGrid(observations) {
  const values = fold(observations).filter((v) => v.px > 0 && v.px <= 256);
  if (!values.length) return { unit: 8, steps: [], fit: 0 };

  // Prefer the LARGEST unit that still explains most values. Every even value sits on
  // a 2px "grid", so smallest-unit-wins is degenerate; the real system unit is the
  // biggest one that most spacings are multiples of. Walk large-to-small, take the
  // first clearing the 0.8 bar; else the best fit.
  let chosen = null, fallback = null;
  for (const unit of [8, 6, 5, 4, 2]) {
    let onGrid = 0, weight = 0;
    for (const v of values) {
      const rem = v.px % unit;
      const near = Math.min(rem, unit - rem);
      if (near <= 0.5) { onGrid += 1; weight += v.weight; }
    }
    const fit = onGrid / values.length;
    if (!fallback || fit > fallback.fit) fallback = { unit, fit: round(fit), weight };
    if (fit >= 0.8 && !chosen) chosen = { unit, fit: round(fit), weight };
  }
  const best = chosen || fallback;
  const steps = values
    .map((v) => Math.round(v.px / best.unit) * best.unit)
    .filter((s, i, a) => s > 0 && a.indexOf(s) === i)
    .sort((a, b) => a - b);
  return { unit: best.unit, steps, fit: best.fit };
}

/**
 * Snap observed values onto the detected steps; return canonical steps (used) and
 * drift (values that were off-scale and got snapped).
 */
export function snapToScale(observations, steps) {
  const values = fold(observations);
  const canonical = new Map();
  const drift = [];
  for (const v of values) {
    const target = closest(steps, v.px);
    const relErr = target ? Math.abs(target - v.px) / v.px : 1;
    if (target && relErr <= 0.04) {
      canonical.set(target, (canonical.get(target) || 0) + v.weight);
    } else if (target) {
      drift.push({ px: v.px, weight: v.weight, snappedTo: target, deltaPct: round(relErr * 100) });
      canonical.set(target, (canonical.get(target) || 0) + v.weight);
    } else {
      canonical.set(v.px, (canonical.get(v.px) || 0) + v.weight);
    }
  }
  return {
    canonical: [...canonical.entries()].map(([px, weight]) => ({ px, weight })).sort((a, b) => a.px - b.px),
    drift: drift.sort((a, b) => b.weight - a.weight),
  };
}

function closest(steps, v) {
  if (!steps || !steps.length) return null;
  return steps.reduce((best, s) => (Math.abs(s - v) < Math.abs(best - v) ? s : best), steps[0]);
}

export { COMMON_RATIOS };
