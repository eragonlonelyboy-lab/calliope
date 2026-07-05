# HONEST-NUMBERS

Every Demiurge repo carries this file: what our numbers prove, what they cannot, and the one honest test that settles it.

## What the benchmark actually is

`node benchmarks/run.js` is a structure lint: 100+ deterministic checks that the agency is complete: all 9 medium packs carry all 9 required sections, all 7 adapters carry all 6, all 7 role templates and 6 rituals exist, hooks parse as valid Node, SKILL.md stays under its 500-line progressive-disclosure budget, and zero em/en dashes exist anywhere in the product's prose.

## What it proves

That the process cannot silently be missing a piece. A pack without QA stations, an adapter without failure modes, a deleted ritual: the lint fails and the product does not ship. It also regression-guards edits: change a pack heading and `npm test` goes red.

## What it cannot prove

- **That the design output is good.** No lint measures taste. The quality machinery (scoresheets, audit-redo loop, the CD gate) runs at engagement time on YOUR work, and its honest numbers live in your `.calliope/scores.log`, not in this repo.
- **That the interviews produce better briefs than a prompt box.** We believe they do; belief is not a benchmark.
- **Anything about speed or cost.** An engagement's length depends on your answers, revision rounds, and chosen deliverables. We publish no "10x faster" number because we did not measure one.

## When CALLIOPE loses

- You need one image, fast, and you already know what you want: use a generator directly. An agency process on a 5-minute task is overhead.
- Your organization will not name a decider: the brief-back contract and gates assume someone can say yes. Without one, CALLIOPE stalls honestly where other tools would happily generate forever.
- Deep production packaging/print work: CALLIOPE is concept-tier there by design; it stops where vendor dielines and press specs begin.
- Photography and marketing ops: out of lane, stated in the spec, no adapter pretends otherwise.

## Mechanical limits

- The scoresheet's judgment rows are model judgment: instrumented rows (contrast, spacing, perf) are measurements; "point of view: 8/10" is a defended opinion, and the sheet never mixes the two up.
- Directed-external mode audits screenshots: it says "visual-audit only" in every report because instruments cannot reach another tool's canvas.
- The taste loop needs signal: one engagement produces leans, not laws. The profile file marks its own evidence level.

## The one honest test

Run Phase 0 through 3 on a real project of yours (30-40 minutes: interviews to signed brief). Then read the brief and the 3-5 principles CALLIOPE derived. If they name things about your project that you never explicitly said, the discovery layer earns its minutes and everything downstream inherits that. If they read like a template, delete the folder and tell us why.
