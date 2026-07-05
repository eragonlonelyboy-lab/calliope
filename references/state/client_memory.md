# Per-client memory (`clients/<slug>/`)

The durable layer across engagements. `.calliope/` is one engagement; `clients/<slug>/` is the relationship. Lives next to the user's projects (default: sibling of the engagement project dirs; the guided setup confirms the location once and records it).

## Layout

```
clients/<slug>/
├── profile.md          # brand facts, style-locks, decider(s), org quirks
├── decisions.md        # dated, one line each: what was decided and why
├── taste_profile.md    # compiled from taste.log events (see taste_loop.md)
└── engagements.md      # index: engagement name, dates, outcome, check-in results
```

## profile.md contents

- Brand constants: palette values, type stack, logo rules, the visual style-locks the Art Director enforces.
- Voice: the voice card summary (register, never-says list).
- People: decider(s) by name, who gives input vs who signs off, communication register.
- Constraints that recur: platform floor, accessibility mandates, locales, legal strings.
- Check-in ledger: post-launch dates + hit/miss results against success metrics.

## Rules

- **Phase 0.5 loads this instead of re-interviewing.** Returning clients get confirmations ("still Sarah signing off? palette still locked?"), not repeated questions. Re-interview only what changed.
- Update at Phase 9 close, mandatory (uat_close.md names it). Mid-engagement updates when a durable fact changes (new decider = brief change AND profile update).
- Taste profile is compiled, not raw: taste_loop.md defines the compile step.
- Client memory is confidential per client. Never leak one client's profile into another's engagement; treatments for client B never cite client A.
- Keep each file lean (≤200 lines); archive old engagement detail into `engagements/<name>.md` subfiles when profile.md bloats.
