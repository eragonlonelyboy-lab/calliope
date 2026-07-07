#!/usr/bin/env node
// AURA CLI: aura <url> [--out DIR] [--json] [--report-only]
import { mkdir, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { analyze } from '../src/index.mjs';

async function main() {
  const args = process.argv.slice(2);
  if (!args.length || args.includes('-h') || args.includes('--help')) return usage();

  const url = args.find((a) => !a.startsWith('-'));
  if (!url) { console.error('AURA: a URL is required.'); process.exit(1); }
  const outDir = flagValue(args, '--out') || '.aura';
  const jsonOnly = args.includes('--json');
  const reportOnly = args.includes('--report-only');

  const normalized = /^https?:\/\//.test(url) ? url : `https://${url}`;
  process.stderr.write(`AURA: reading ${normalized} ...\n`);

  const t0 = Date.now();
  const { system, emit } = await analyze(normalized).catch((e) => {
    console.error(`AURA: extraction failed: ${e.message}`);
    process.exit(2);
  });
  const ms = Date.now() - t0;

  if (jsonOnly) { process.stdout.write(JSON.stringify(system, null, 2) + '\n'); return; }
  if (reportOnly) { process.stdout.write(emit.report + '\n'); return; }

  const dir = resolve(process.cwd(), outDir);
  await mkdir(dir, { recursive: true });
  await Promise.all([
    writeFile(join(dir, 'system.json'), JSON.stringify(system, null, 2)),
    writeFile(join(dir, 'tokens.dtcg.json'), emit.dtcg),
    writeFile(join(dir, 'tokens.css'), emit.css),
    writeFile(join(dir, 'tailwind.config.mjs'), emit.tailwind),
    writeFile(join(dir, 'figma.variables.json'), emit.figma),
    writeFile(join(dir, 'design-system.md'), emit.report),
  ]);

  process.stderr.write(
    `AURA: done in ${(ms / 1000).toFixed(1)}s. ` +
    `${system.summary.canonicalTokens} canonical tokens, ${system.summary.driftFindings} drift findings.\n` +
    `Written to ${dir}\n  design-system.md  (the curated critique)\n  tokens.dtcg.json  tokens.css  tailwind.config.mjs  figma.variables.json  system.json\n`
  );
}

function flagValue(args, flag) {
  const i = args.indexOf(flag);
  return i >= 0 && args[i + 1] ? args[i + 1] : null;
}

function usage() {
  process.stdout.write(`AURA - read a live site's design system off the rendered DOM, curated with judgment.

Usage:
  aura <url> [--out DIR] [--json] [--report-only]

  <url>            the site to read (https:// added if missing)
  --out DIR        output directory (default: .aura)
  --json           print the judged system as JSON to stdout, write nothing
  --report-only    print the Markdown critique to stdout, write nothing

Outputs (default): design-system.md (curated tokens + drift with rationale),
tokens.dtcg.json, tokens.css, tailwind.config.mjs, figma.variables.json, system.json
`);
}

main();
