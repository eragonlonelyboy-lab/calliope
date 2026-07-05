#!/usr/bin/env node
// CALLIOPE PreCompact hook: before context compaction, stamp a checkpoint into
// .calliope/STATE.md so the post-compact session has a dated resume anchor.
// No engagement in cwd -> silent no-op. Never blocks compaction (always exit 0).
// Ships dormant; the guided setup (CLAUDE.md) registers it in settings.json on request.
'use strict';

const fs = require('fs');
const path = require('path');

function main() {
  const statePath = path.join(process.cwd(), '.calliope', 'STATE.md');
  let exists = false;
  try { exists = fs.statSync(statePath).isFile(); } catch (_e) { /* no engagement */ }
  if (!exists) process.exit(0);

  try {
    const stamp = new Date().toISOString().slice(0, 16).replace('T', ' ');
    fs.appendFileSync(
      statePath,
      '\n' + stamp + ' | compaction checkpoint: context compacted; next session must re-read STATE.md + resume block before acting\n',
      'utf8'
    );
  } catch (_e) { /* a failed stamp must never block compaction */ }
  process.exit(0);
}

main();
