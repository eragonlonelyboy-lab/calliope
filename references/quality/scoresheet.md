# Scoresheet: numeric, threshold-gated emits

Work is scored before it ships; below threshold it physically cannot ship (the CD gate refuses). Scores are honest numbers, not negotiation instruments: a 7.9 against an 8.0 threshold fails.

## The sheet (template)

```markdown
# Scoresheet: <deliverable> · <date> · round <n>

## Measured rows (QA fills; instruments named)
| Row | Measure | Value | Floor | Pass |
|-----|---------|-------|-------|------|
| Contrast | worst text/bg pair (WCAG) | | pack floor | |
| Spacing conformance | % computed spacings on scale | | ≥95% | |
| Type conformance | rendered sizes on declared scale | | 100% | |
| Perf | pack's perf budget line(s) | | pack budget | |
| Surface floor | device-floor render verdict | | designed, not squeezed | |
| Hygiene | console/network/a11y-floor/meta | | zero errors + floor met | |

## Judgment rows (CD fills; 1-10 each)
| Dimension | Score | Note (element-anchored) |
|-----------|-------|-------------------------|
| Point of view | | |
| Typography at work | | |
| Color system | | |
| Hierarchy | | |
| Imagery intent | | |
| Motion discipline | | |
| <pack-specific row(s)> | | |

## Client principles (CD; cite BY NAME)
| Principle | Held / Violated | Where |
|-----------|-----------------|-------|

## Verdict
Judgment mean: <x>/10 · Threshold: 8.0 · Measured rows: <all-pass | failures listed>
Principles: <all held | violations listed>
**RESULT: SHIP | BLOCKED (findings attached)**

## Documented exception (only if client overrules)
<what, who accepted, date: recorded as the client's call, not a pass>
```

## Rules

- **Threshold:** judgment mean ≥8.0 AND all measured rows pass AND zero principle violations. All three; no averaging across categories.
- Measured rows come from the audit-redo loop's final (zero-findings) pass; a scoresheet on an artifact that has not exited the loop is invalid.
- Principle rows are mandatory: a sheet without named-principle citations is incomplete (this is what makes verdicts client-specific instead of generic).
- Every completed sheet appends one line to `.calliope/scores.log`: `date | deliverable | round | judgment-mean | measured pass/fail | result`. This log feeds the Taste-Eval Benchmark spinout; keep the format stable.
- Documented exceptions are rare and loud: the sheet stays BLOCKED-with-exception in the log; the case study never claims the row passed.
- Coach mode: the sheet becomes teaching material: every sub-8 row gets a "how to raise it" line. Directed-external: measured rows marked "unverified (screenshot audit)" where instruments could not reach.
