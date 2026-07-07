// AURA public API.
import { extractSite } from './extract.mjs';
import { judge } from './judge.mjs';
import { emitDTCG, emitCSS, emitTailwind, emitFigmaVariables, emitReport } from './emit.mjs';

export { judge } from './judge.mjs';
export { emitDTCG, emitCSS, emitTailwind, emitFigmaVariables, emitReport } from './emit.mjs';
export { extractSite } from './extract.mjs';

/**
 * Full pipeline: extract a live URL, judge it, and return the curated system plus
 * every emitter output. The judgment (curated tokens + drift) is the product; the
 * emitters are convenience serializations of it.
 */
export async function analyze(url, opts = {}) {
  const raw = await extractSite(url, opts);
  const system = judge(raw);
  return {
    system,
    emit: {
      dtcg: emitDTCG(system),
      css: emitCSS(system),
      tailwind: emitTailwind(system),
      figma: emitFigmaVariables(system),
      report: emitReport(system),
    },
  };
}

/** Judge already-extracted raw observations (skips the browser). */
export function judgeRaw(raw) {
  const system = judge(raw);
  return { system, emit: { dtcg: emitDTCG(system), css: emitCSS(system), tailwind: emitTailwind(system), figma: emitFigmaVariables(system), report: emitReport(system) } };
}
