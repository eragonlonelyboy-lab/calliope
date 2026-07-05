# Medium pack template

Every pack in this directory follows this exact section skeleton (the benchmark lint checks for these headings). A pack interprets the core bar for one medium; it never waives a dimension.

```markdown
# Pack: <medium>

## Bar interpretation
<the eight core-bar dimensions restated in this medium's terms, numbered 1-8,
each with a concrete pass/fail test for THIS medium>

## Benchmark
<the "what 10/10 looks like" reference(s) for this medium: named works/standards,
why each earns benchmark status, and what to steal from it (the standard, not the style)>

## Measurable floors
<the QA-instrumentable numbers for this medium: contrast, perf budgets, resolution,
bleed, loudness, whatever applies. These become scoresheet measured rows>

## QA stations
<the audit-redo loop's instrument list for this medium (web stations are default in
audit_redo_loop.md; non-web packs replace them here)>

## Technique atlas
<the medium's craft techniques: name, when to use, when it is slop, pointer to the
skill/tool that implements it. Web packs may point into quality/technique_atlas.md>

## Treatment flavor
<what a treatment looks like for this medium: what the stylescape contains, what
the 3 temperatures mean here, what the technique palette lists>

## Research notes
<medium-specific stations added to quality/research_pass.md in Phase 4>

## Gate wiring
<which installed skills fire at which moments for this medium: build-time,
audit-time, polish-time. Name skills that exist in the corpus map
(references/quality/skill_corpus.md); degrade gracefully when one is missing>

## Pre-flight (builder self-check)
<the builder's checklist before handing to QA: 10-20 items, medium-specific>
```

Rules for pack authors:
- Concrete over abstract: every bar line needs a test a reviewer can apply to a real artifact.
- Benchmarks are named, real, and current: "like Stripe" is lazy; "Stripe's docs type hierarchy: one family, weight+size only, zero decorative type" is a standard.
- Floors are numbers. If a floor cannot be a number for this medium, say what the reviewer measures instead.
- Slop columns are mandatory in the atlas: every technique lists its failure mode (the version of it that reads as template output).
- Packs are versionable expansion units: keep each self-contained; cross-pack references point to quality/ files only.
