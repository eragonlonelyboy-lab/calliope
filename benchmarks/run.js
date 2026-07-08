#!/usr/bin/env node
// CALLIOPE structure lint. Deterministic; no network, no LLM.
// What it proves and cannot prove: docs/HONEST-NUMBERS.md.
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
let pass = 0, fail = 0;
const failures = [];

function ok(name, cond, detail) {
  if (cond) { pass++; console.log('  PASS  ' + name); }
  else { fail++; failures.push(name + (detail ? ' :: ' + detail : '')); console.log('  FAIL  ' + name + (detail ? ' :: ' + detail : '')); }
}
function read(rel) {
  try { return fs.readFileSync(path.join(ROOT, rel), 'utf8').replace(/^﻿/, ''); } catch (_e) { return null; }
}
function exists(rel) { return fs.existsSync(path.join(ROOT, rel)); }
function lines(s) { return s.split(/\r?\n/).length; }
function hasHeading(s, h) { return new RegExp('^## ' + h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*$', 'm').test(s); }

console.log('CALLIOPE structure lint');
console.log('=======================');

// 1. Shell
console.log('\n[shell]');
const license = read('LICENSE');
ok('LICENSE exists and is MIT', !!license && /MIT License/.test(license));
const skill = read('SKILL.md');
ok('SKILL.md exists', !!skill);
if (skill) {
  ok('SKILL.md under 500 lines', lines(skill) < 500, lines(skill) + ' lines');
  ok('SKILL.md frontmatter name: calliope', /^name:\s*calliope\s*$/m.test(skill));
}
ok('CLAUDE.md companion exists', exists('CLAUDE.md'));
ok('README.md exists', exists('README.md'));
ok('docs/HONEST-NUMBERS.md exists', exists('docs/HONEST-NUMBERS.md'));

// 2. Rituals
console.log('\n[rituals]');
['soul_interview', 'design_interview', 'brief_back', 'reveal', 'revision_ritual', 'uat_close']
  .forEach(r => ok('ritual: ' + r, exists('references/rituals/' + r + '.md')));

// 3. Roles
console.log('\n[roles]');
const roles = ['_handoff_contract', 'account_manager', 'strategist', 'creative_director', 'art_director', 'copywriter', 'builder', 'qa'];
roles.forEach(r => ok('role: ' + r, exists('references/roles/' + r + '.md')));
roles.filter(r => r !== '_handoff_contract').forEach(r => {
  const s = read('references/roles/' + r + '.md');
  ok('role ' + r + ' has Owns section', !!s && /^## Owns/m.test(s));
});

// 4. Quality core
console.log('\n[quality]');
['core_bar', 'audit_redo_loop', 'scoresheet', 'veritas_lite', 'research_pass', 'technique_atlas', 'skill_corpus']
  .forEach(q => ok('quality: ' + q, exists('references/quality/' + q + '.md')));
const atlas = read('references/quality/technique_atlas.md');
if (atlas) {
  ['ScrollTrigger', 'parallax', 'see-thru scrub', 'mouse tracking', '3D scroll', 'DevTools perf ritual']
    .forEach(e => ok('atlas entry: ' + e, new RegExp(e.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i').test(atlas)));
}

// 5. Medium packs: 9 packs x 9 required headings
console.log('\n[packs]');
const PACK_HEADINGS = ['Bar interpretation', 'Benchmark', 'Measurable floors', 'QA stations',
  'Technique atlas', 'Treatment flavor', 'Research notes', 'Gate wiring', 'Pre-flight (builder self-check)'];
const packs = ['brand', 'website', 'app', 'slides', 'pdf', 'campaign', 'packaging', 'video', 'illustration_3d'];
packs.forEach(p => {
  const s = read('references/packs/' + p + '.md');
  ok('pack exists: ' + p, !!s);
  if (s) {
    const missing = PACK_HEADINGS.filter(h => !hasHeading(s, h));
    ok('pack headings: ' + p, missing.length === 0, missing.length ? 'missing: ' + missing.join(', ') : '');
  }
});

// 6. Adapters: 7 adapters x 6 required headings
console.log('\n[adapters]');
const ADAPTER_HEADINGS = ['Tier & detection', 'Capabilities & limits', 'Walkthrough script',
  'Prompt dialect', 'Export & handoff path', 'Known failure modes'];
const adapters = ['claude_design', 'figma', 'canva', 'stitch', 'v0_lovable', 'imagegen_ui', 'powerpoint', 'aura', 'kinema'];
ok('adapter doctrine: _integration_tiers', exists('references/adapters/_integration_tiers.md'));
adapters.forEach(a => {
  const s = read('references/adapters/' + a + '.md');
  ok('adapter exists: ' + a, !!s);
  if (s) {
    const missing = ADAPTER_HEADINGS.filter(h => !hasHeading(s, h));
    ok('adapter headings: ' + a, missing.length === 0, missing.length ? 'missing: ' + missing.join(', ') : '');
  }
});

// 7. State + exporters
console.log('\n[state + exporters]');
['engagement_state', 'client_memory', 'taste_loop'].forEach(f => ok('state: ' + f, exists('references/state/' + f + '.md')));
['ingest_onramp', 'deliverables_menu', 'design_md_schema', 'dev_tokens', 'brand_governance', 'case_study']
  .forEach(f => ok('exporter: ' + f, exists('references/exporters/' + f + '.md')));

// 8. Hooks (dormant, Node, must parse)
console.log('\n[hooks]');
['sessionstart.js', 'precompact.js'].forEach(h => {
  const p = path.join(ROOT, 'hooks', h);
  ok('hook exists: ' + h, fs.existsSync(p));
  if (fs.existsSync(p)) {
    // strip BOM + shebang: new Function accepts neither, node itself accepts both
    const src = fs.readFileSync(p, 'utf8').replace(/^﻿/, '').replace(/^#!.*\r?\n/, '');
    try { new Function(src); ok('hook parses: ' + h, true); }
    catch (e) { ok('hook parses: ' + h, false, e.message); }
  }
});

// 9. Em/en dash sweep across all markdown (house fail gate)
console.log('\n[prose gates]');
function mdFiles(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === 'node_modules' || e.name === '.git') continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...mdFiles(p));
    else if (e.name.endsWith('.md')) out.push(p);
  }
  return out;
}
const dashHits = [];
for (const f of mdFiles(ROOT)) {
  const s = fs.readFileSync(f, 'utf8');
  // Spelled as escapes, never as the literal characters: a dash lint written with
  // real dashes flags its own source, and a bulk dash sweep silently guts it (CHI-R001).
  if (/[\u2014\u2013]/.test(s)) dashHits.push(path.relative(ROOT, f));
}
ok('zero em/en dashes in all .md', dashHits.length === 0, dashHits.join(', '));

// Summary
console.log('\n=======================');
console.log('PASS ' + pass + ' / FAIL ' + fail + ' / TOTAL ' + (pass + fail));
if (fail > 0) { console.log('\nFailures:'); failures.forEach(f => console.log('  - ' + f)); process.exit(1); }
console.log('Structure lint clean.');
