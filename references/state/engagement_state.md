# The `.calliope/` engagement directory

State lives on disk, written as events happen. Any session, on any machine, reconstructs the engagement from this directory alone. If a fact matters and is not in `.calliope/`, it does not exist.

## Layout

```
.calliope/                       # created at Phase 0, in the project root
├── STATE.md                     # the ledger (below): always current, always first read
├── BRIEF.md                     # Phase 3 contract, sign-off + dated changelog at bottom
├── principles.md                # 3-5 named client principles
├── interviews/
│   ├── soul.md                  # Phase 1 output
│   └── design.md                # Phase 2 output
├── ingest/                      # Phase 0.5 extractions (when run)
├── research/                    # Phase 4: competitive_audit.md, trends.md
├── directions/                  # every treatment/variant, one file each, forkable
│   └── <slug>.md                # status: chosen | merged-into <slug> | rejected (revivable)
├── assets/briefs/               # Art Director asset briefs + ledger
├── deliverables/<name>/         # production output per deliverable
├── taste.log                    # append-only taste-loop events (see taste_loop.md)
├── scores.log                   # append-only scoresheet results (Taste-Eval feed)
├── lessons.md                   # corrections when OUROBOROS is not installed
├── voice_card.md                # Copywriter voice derivation
├── uat.md                       # Phase 9 walkthrough log
└── case_study.md                # Phase 9 auto-generated
```

## STATE.md format

```markdown
# Engagement: <client> · <name>

**Mode:** Director | Coach | Directed-external (<tool>)
**Type:** <engagement type> · **Problem:** <one line>
**Decider:** <name>
**APIs:** <attached generation APIs or "none: brief+stock path">
**Phase:** <current phase number + name>

## Success metrics
<the 2-3 measurable criteria from Phase 2>

## Production backlog          (from Phase 7)
- [ ] <deliverable> · <gate status>

## Dispatch log
| date | role | objective | returned |
|------|------|-----------|----------|

## Revision rounds
<count per element/deliverable; round-4 diagnosis notes if any>

## Resume block                (rewritten at every session end / PreCompact)
Last event: <what just happened>
Next action: <the single next concrete step>
Open questions: <what awaits whom>

## Event log                   (append-only, one line per meaningful event)
YYYY-MM-DD | <event>
```

## Writing rules

- Append events at the moment they happen; the resume block is rewritten, everything else appends.
- Direction files are never deleted (rejected = revivable). `.calliope/` is never cleaned mid-engagement.
- The directory is the client's property at close: it ships in the handoff bundle minus internal logs if the client prefers.
- Multi-engagement clients get one `.calliope/` per engagement; the durable cross-engagement layer is `clients/<slug>/` (see client_memory.md).

## Resume procedure (any session start)

1. Read STATE.md top block + resume block. 2. Read the files the resume block names. 3. Confirm with the user in one line ("Resuming <client> at Phase 6, next: apply batch 3. Correct?"). 4. Proceed. Never re-ask what disk knows; confirm instead.
