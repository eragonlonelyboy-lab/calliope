# Exporter: auto-generated case study

Generated at Phase 9 from `.calliope/` history. Client-facing, VERITAS-clean, one page. The engagement wrote its own receipts; the case study just reads them.

## Template

```markdown
# <Client>: <the outcome in one plain phrase>

## Challenge
<from BRIEF.md: the business problem + the position gap (2x2 from-to), 3-5 lines,
client's own vivid phrasing where the soul interview captured it>

## Approach
<the chosen treatment's story in 3-6 lines: the concept, why it fit the brief,
what it refused to do. Then the 2-3 pivotal decisions from the engagement
(taste.log + revision rounds): each one line, decision + reason>

## Outcome
<what shipped (deliverables list, plain names) + the quality evidence available
(gates passed, scoresheet result stated honestly) + the success metrics as
"to be measured by <date>" or, post-check-in, the actual hit/miss>

<one closing line in the client's voice register, no hype>
```

## Generation rules

- Sources only: BRIEF.md, principles.md, the chosen direction file, taste.log, scores.log, uat.md. No invented color; if the history lacks a good "pivotal decision," say less, never fabricate.
- Honest outcome language: pre-check-in case studies say "to be measured," never imply results. Post-check-in, misses are stated or the metric is omitted with the client's consent, never spun.
- Documented scoresheet exceptions are not mentioned as passes (they are either omitted or owned, client's call).
- Ask the client: may CALLIOPE keep an anonymized copy? (Portfolio consent, recorded in client memory.)
- Save: handoff bundle + `.calliope/case_study.md`.
