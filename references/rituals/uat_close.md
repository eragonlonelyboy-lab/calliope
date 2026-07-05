# Ritual: UAT walkthrough + close (Phase 9)

Purpose: engagements end with receipts, not vibes. Per-item pass/fail, a handoff bundle, an auto-generated case study, and a check-in date against the success metrics.

## Itemized UAT walkthrough

1. Build the UAT list from `.calliope/STATE.md`'s production backlog: every deliverable the client chose in Phase 7, decomposed into checkable items (a website: per-page render, responsive floor, motion behavior, form flows, meta/OG, accessibility floor; a brand kit: every listed asset present and to-spec).
2. Walk the list WITH the client, item by item. Each item: **pass / fail**, one line of evidence (screenshot, file path, measured value). No "mostly done."
3. Failures become **scoped fix plans**: item, root cause in one line, fix, effort, owner, date. Failures are normal; unscoped failures are not.
4. Write the full log to `.calliope/uat.md`. UAT is complete when every item is pass or has a scoped plan the decider accepted.

## Handoff bundle

Assemble per the Phase 7 selections (templates in `references/exporters/`):
- The built artifact(s) + source
- DESIGN.md (portable schema) if selected
- Brand kit + governance layer (do/don'ts, rollout checklist, optional HTML brand portal)
- Dev tokens (tailwind.config.ts / CSS vars / JSON / SVG)
- Figma/Canva handoff files if selected
- The brief, principles, and chosen direction file (the client owns their record)

Deliver as a single directory + a one-page index. Every file listed with what it is and who needs it.

## Auto-generated case study

Generate from `.calliope/` history (challenge / approach / outcome):
- **Challenge:** from BRIEF.md problem + position lines.
- **Approach:** chosen treatment narrative + the 2-3 pivotal revision decisions (from taste-loop log).
- **Outcome:** what shipped + the success metrics as "to be measured by <date>."
Client-facing voice, VERITAS-clean, ≤1 page. Save to bundle + `.calliope/case_study.md`. Ask the client if CALLIOPE may keep an anonymized copy.

## Post-launch check-in

Offer a concrete date (default: success-metric date from Phase 2, or +30 days). Record it in client memory. The check-in re-opens the success metrics table and asks: hit, miss, or unmeasurable? Misses feed the next engagement's brief; unmeasurable metrics are named as such (honest accounting).

## Client memory update (mandatory)

Per `references/state/client_memory.md`: persist brand facts, decisions, taste profile deltas, decider identity, and the check-in date to `clients/<slug>/`. The next engagement's Phase 0.5 loads this instead of re-interviewing.
