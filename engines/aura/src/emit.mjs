// AURA emitters. The judged system (curated tokens + drift) becomes: a W3C DTCG
// token file, CSS custom properties, a Tailwind theme extension, Figma variables,
// and a human-facing Markdown critique (the star output: curated system + drift with
// rationale). Deliberately NOT emitting 10 platform themes or a brand-book PDF: that
// is breadth without a moat. AURA emits what a design engagement actually consumes.

export function emitDTCG(system) {
  const doc = { $schema: 'https://tr.designtokens.org/format/', color: {}, fontSize: {}, space: {}, radius: {}, shadow: {} };
  for (const t of system.color.tokens) setToken(doc.color, t.token.replace(/^color\//, ''), { $type: 'color', $value: t.value, $description: t.why });
  for (const s of system.type.sizes) setToken(doc.fontSize, s.token.replace(/^font-size\//, ''), { $type: 'dimension', $value: `${s.rem}rem` });
  for (const s of system.spacing.tokens) setToken(doc.space, String(s.px), { $type: 'dimension', $value: `${s.px}px` });
  for (const r of system.radius.tokens) setToken(doc.radius, r.token.replace(/^radius\//, ''), { $type: 'dimension', $value: `${r.px}px` });
  for (const s of system.shadow.tokens) setToken(doc.shadow, s.token.replace(/^shadow\//, ''), { $type: 'shadow', $value: s.value });
  return JSON.stringify(doc, null, 2);
}

export function emitCSS(system) {
  const lines = [':root {'];
  lines.push('  /* color */');
  for (const t of system.color.tokens) lines.push(`  --${t.token.replace(/\//g, '-')}: ${t.value};`);
  lines.push('  /* type */');
  for (const s of system.type.sizes) lines.push(`  --${s.token.replace(/\//g, '-')}: ${s.rem}rem;`);
  lines.push('  /* space */');
  for (const s of system.spacing.tokens) lines.push(`  --${s.token.replace(/\//g, '-')}: ${s.px}px;`);
  lines.push('  /* radius */');
  for (const r of system.radius.tokens) lines.push(`  --${r.token.replace(/\//g, '-')}: ${r.px}px;`);
  lines.push('}');
  return lines.join('\n');
}

export function emitTailwind(system) {
  const colors = {};
  for (const t of system.color.tokens) colors[t.token.replace(/^color\//, '').replace(/\//g, '-')] = t.value;
  const fontSize = {};
  for (const s of system.type.sizes) fontSize[s.token.replace(/^font-size\//, '')] = `${s.rem}rem`;
  const spacing = {};
  for (const s of system.spacing.tokens) spacing[String(s.px)] = `${s.px}px`;
  const borderRadius = {};
  for (const r of system.radius.tokens) borderRadius[r.token.replace(/^radius\//, '')] = `${r.px}px`;
  const theme = { extend: { colors, fontSize, spacing, borderRadius } };
  return `/** @type {import('tailwindcss').Config} */\nexport default {\n  theme: ${JSON.stringify(theme, null, 2)},\n};\n`;
}

export function emitFigmaVariables(system) {
  const vars = [];
  for (const t of system.color.tokens) vars.push({ name: t.token, type: 'COLOR', value: t.value, description: t.why });
  for (const s of system.type.sizes) vars.push({ name: s.token, type: 'FLOAT', value: s.px });
  for (const s of system.spacing.tokens) vars.push({ name: s.token, type: 'FLOAT', value: s.px });
  return JSON.stringify({ collection: 'AURA extraction', modes: ['default'], variables: vars }, null, 2);
}

/** The star output: a curated system + drift critique a human (or CALLIOPE) can act on. */
export function emitReport(system) {
  const L = [];
  L.push(`# Design system: ${system.meta.title || system.meta.url}`);
  L.push('');
  L.push(`> Extracted by AURA from ${system.meta.url} across ${system.meta.elementCount} rendered elements.`);
  L.push(`> ${system.summary.verdict}`);
  L.push('');

  L.push('## Colour (canonical)');
  L.push('');
  L.push('| Token | Value | Role | Confidence | Why |');
  L.push('| --- | --- | --- | --- | --- |');
  for (const t of system.color.tokens) L.push(`| \`${t.token}\` | \`${t.value}\` | ${t.role} | ${pct(t.confidence)} | ${t.why} |`);
  L.push('');

  L.push('## Type scale');
  L.push('');
  L.push(`Detected scale: **${system.type.scale.ratio}**${system.type.scale.r ? ` (ratio ${system.type.scale.r})` : ''}, base ${system.type.scale.base}px, fit ${pct(system.type.scale.fit)}.`);
  L.push('');
  L.push('| Token | Size | rem |');
  L.push('| --- | --- | --- |');
  for (const s of system.type.sizes) L.push(`| \`${s.token}\` | ${s.px}px | ${s.rem} |`);
  L.push('');

  L.push('## Spacing');
  L.push('');
  if (system.spacing.grid.regular) {
    L.push(`Detected grid: **${system.spacing.grid.unit}px** unit, fit ${pct(system.spacing.grid.fit)}.`);
  } else {
    L.push(`**No consistent grid.** Best explained by a ${system.spacing.grid.unit}px unit at only ${pct(system.spacing.grid.fit)} fit, so spacing is effectively ad hoc. Adopting an 8px (or 4px) grid is a concrete system opportunity.`);
  }
  L.push('');
  L.push(system.spacing.tokens.map((s) => `\`${s.px}\``).join(' '));
  L.push('');

  const totalDrift = system.color.drift.length + system.type.drift.length + system.spacing.drift.length + system.radius.drift.length;
  L.push(`## Drift report (${totalDrift})`);
  L.push('');
  L.push('These values are near-duplicates of a canonical token. In a clean system they should collapse onto it. This is the pruning no raw extractor does for you.');
  L.push('');
  if (system.color.drift.length) {
    L.push('### Colour drift');
    L.push('| Off-system value | Resolution | Weight |');
    L.push('| --- | --- | --- |');
    const ordered = [...system.color.drift].sort((a, b) => (a.into === 'excluded' ? 1 : 0) - (b.into === 'excluded' ? 1 : 0) || b.weight - a.weight);
    for (const d of ordered.slice(0, 30)) {
      const tgt = (d.into === 'excluded' || !d.snappedTo) ? '_excluded (minor colour)_' : `collapses into \`${d.into}\` (${d.snappedTo})`;
      L.push(`| \`${d.value}\` | ${tgt} | ${d.weight} |`);
    }
    L.push('');
  }
  if (system.type.drift.length) {
    L.push('### Type drift');
    L.push('| Off-scale size | Snaps to | Off by |');
    L.push('| --- | --- | --- |');
    for (const d of system.type.drift.slice(0, 20)) L.push(`| ${d.value} | ${d.snappedTo} | ${d.deltaPct}% |`);
    L.push('');
  }
  if (system.spacing.drift.length) {
    L.push('### Spacing drift');
    L.push('| Off-grid value | Snaps to | Off by |');
    L.push('| --- | --- | --- |');
    for (const d of system.spacing.drift.slice(0, 20)) L.push(`| ${d.value} | ${d.snappedTo} | ${d.deltaPct}% |`);
    L.push('');
  }
  return L.join('\n');
}

function setToken(obj, path, value) {
  const parts = path.split('/');
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) { cur[parts[i]] = cur[parts[i]] || {}; cur = cur[parts[i]]; }
  cur[parts[parts.length - 1]] = value;
}
function pct(v) { return typeof v === 'number' ? `${Math.round(v * 100)}%` : String(v); }
