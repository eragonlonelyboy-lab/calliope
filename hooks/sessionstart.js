#!/usr/bin/env node
// CALLIOPE SessionStart hook: if the working directory holds an active engagement
// (.calliope/STATE.md), inject a resume instruction. No engagement -> silent no-op.
// Ships dormant; the guided setup (CLAUDE.md) registers it in settings.json on request.
'use strict';

const fs = require('fs');
const path = require('path');

function main() {
  const statePath = path.join(process.cwd(), '.calliope', 'STATE.md');
  let exists = false;
  try { exists = fs.statSync(statePath).isFile(); } catch (_e) { /* no engagement */ }
  if (!exists) process.exit(0);

  // Pull the resume block (if present) so the instruction carries the anchor.
  let resume = '';
  try {
    const raw = fs.readFileSync(statePath, 'utf8').replace(/^﻿/, '');
    const m = raw.match(/## Resume block[\r\n]+([\s\S]*?)(?=[\r\n]+## |$)/);
    if (m) resume = m[1].trim().slice(0, 600);
  } catch (_e) { /* readable-state not guaranteed; instruction alone still works */ }

  const out = {
    hookSpecificOutput: {
      hookEventName: 'SessionStart',
      additionalContext:
        'CALLIOPE engagement detected in this directory. Load the calliope skill, ' +
        'read .calliope/STATE.md, and resume per its resume block. Do not re-ask what disk already knows.' +
        (resume ? '\n\nResume block snapshot:\n' + resume : '')
    }
  };
  process.stdout.write(JSON.stringify(out));
  process.exit(0);
}

main();
