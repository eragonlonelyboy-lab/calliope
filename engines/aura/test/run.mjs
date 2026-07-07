// AURA judgment unit tests. Pure logic, no browser: synthetic observations in,
// curated system + drift out. Proves the editorial layer (the moat) behaves.
import { judgeRaw } from '../src/index.mjs';
import { clusterColors } from '../src/color.mjs';
import { detectTypeScale, detectSpacingGrid } from '../src/scale.mjs';

let pass = 0, fail = 0;
const ok = (name, cond, detail) => {
  if (cond) { pass++; console.log('  PASS  ' + name); }
  else { fail++; console.log('  FAIL  ' + name + (detail ? ' :: ' + detail : '')); }
};

console.log('AURA judgment tests\n===================');

// 1. Near-duplicate greys collapse to one canonical + drift.
const greys = [
  { value: '#ffffff', weight: 50, roleHints: { background: 50 } },
  { value: '#fefefe', weight: 5, roleHints: { background: 5 } },   // drift of white
  { value: '#fdfdfd', weight: 3, roleHints: { background: 3 } },   // drift of white
  { value: '#111111', weight: 40, roleHints: { text: 40 } },
  { value: '#121212', weight: 4, roleHints: { text: 4 } },         // drift of near-black
  { value: '#2563eb', weight: 20, roleHints: { background: 10, text: 5 } }, // accent blue
];
const clusters = clusterColors(greys);
ok('near-duplicate whites collapse into one cluster', clusters.some((c) => c.members.length >= 2 && c.hex === '#ffffff'), JSON.stringify(clusters.map((c) => [c.hex, c.members.length])));
ok('distinct hues stay separate (white, black, blue all present)', clusters.length >= 3, `${clusters.length} clusters`);

// 2. Full judge over the same colors names roles + reports drift.
const system = judgeRaw({ url: 'test://synthetic', title: 'synthetic', elementCount: 100, colors: greys,
  fontSizes: [ {value:16,weight:40},{value:20,weight:10},{value:25,weight:6},{value:31,weight:4},{value:13,weight:8},{value:15,weight:3} ],
  fontFamilies: [{ value: 'Inter', weight: 30 }], fontWeights: [{ value: '400', weight: 30 }, { value: '600', weight: 10 }],
  spacings: [ {value:8,weight:30},{value:16,weight:25},{value:24,weight:15},{value:32,weight:10},{value:15,weight:4},{value:17,weight:3} ],
  radii: [ {value:8,weight:20},{value:0,weight:10} ], shadows: [{ value: '0 1px 2px rgba(0,0,0,0.1)', weight: 5 }] }).system;

ok('a background role is assigned', system.color.tokens.some((t) => t.role === 'background'), tokenRoles(system));
ok('a text role is assigned', system.color.tokens.some((t) => t.role === 'text'), tokenRoles(system));
ok('an accent role is assigned to the blue', system.color.tokens.some((t) => t.role === 'accent' && t.value === '#2563eb'), tokenRoles(system));
ok('colour drift was captured (the near-duplicates)', system.color.drift.length >= 2, `${system.color.drift.length} drift`);
ok('every colour token carries a rationale', system.color.tokens.every((t) => typeof t.why === 'string' && t.why.length > 10));
ok('every colour token carries a confidence 0..1', system.color.tokens.every((t) => t.confidence >= 0 && t.confidence <= 1));

// 3. Type scale detection lands a real ratio (16 base, ~1.25 major third here).
const ts = detectTypeScale([ {value:16,weight:40},{value:20,weight:10},{value:25,weight:6},{value:31,weight:4},{value:12.8,weight:8} ]);
ok('type scale detects a modular ratio', !!ts.ratio && ts.fit > 0.4, JSON.stringify(ts.ratio) + ' fit ' + ts.fit);
ok('type scale base is the most-used size (16)', ts.base === 16, 'base ' + ts.base);

// 4. Spacing grid detection lands the 8px unit.
const sg = detectSpacingGrid([ {value:8,weight:30},{value:16,weight:25},{value:24,weight:15},{value:32,weight:10},{value:4,weight:8} ]);
ok('spacing grid detects an 8 (or 4) px unit', sg.unit === 8 || sg.unit === 4, 'unit ' + sg.unit);

// 5. Type + spacing drift reported (15/17px are off the scale/grid).
ok('type drift reported for off-scale sizes', system.type.drift.length >= 1, `${system.type.drift.length}`);
ok('spacing drift reported for off-grid values', system.spacing.drift.length >= 1, `${system.spacing.drift.length}`);

// 6. Curated is smaller than raw: fewer tokens than distinct inputs.
ok('curation prunes (fewer colour tokens than raw colours)', system.color.tokens.length < greys.length, `${system.color.tokens.length} < ${greys.length}`);

console.log('\n===================');
console.log(`PASS ${pass} / FAIL ${fail} / TOTAL ${pass + fail}`);
if (fail > 0) process.exit(1);
console.log('AURA judgment clean.');

function tokenRoles(s) { return s.color.tokens.map((t) => `${t.value}:${t.role}`).join(', '); }
