# The taste loop

Checkpoint approvals and rejections compound into a per-client taste profile that biases future generation. This is CALLIOPE's second moat (after the quality-law corpus): by engagement three, treatments should lean toward what this client says yes to before they say it.

## Capture (during the engagement)

Append to `.calliope/taste.log`, one event per line, at these moments:

| Moment | Event captured |
|--------|---------------|
| Reveal (Phase 5) | treatment chosen/rejected/merged + stated reason + temperature picked |
| Revision rounds (Phase 6) | per batch item: element, ask, applied/deferred, stated reason |
| Gate exceptions | client accepting a documented scoresheet exception (strong signal) |
| Any correction | client correcting CALLIOPE's judgment call |

Format: `YYYY-MM-DD | <phase> | <element/subject> | <approve|reject|redirect> | <verbatim reason if given>`

Reasons are captured verbatim: "too corporate" from THIS client means something specific; do not normalize it away.

## Compile (at Phase 9 close)

Distill taste.log into `clients/<slug>/taste_profile.md`:

```markdown
# Taste profile: <client>

## Leans toward        (patterns with ≥2 supporting events; cite the events)
## Rejects             (same evidence rule)
## Temperature         (mild/medium/hot preference + trend across engagements)
## Vocabulary map      (their words → what they turned out to mean: "pop" = contrast not color)
## Open contradictions (conflicting signals, preserved as contradictions, not resolved by fiat)
```

Evidence rule: one event is an anecdote; two is a lean; a lean contradicted later becomes an open contradiction, kept visible until the client resolves it. Never silently average.

## Bias (next engagement)

- Creative Director loads taste_profile.md before treatments: leans shape the 2-3 concepts offered; rejects are avoided or, when a treatment deliberately challenges one, the challenge is named at the reveal ("you've rejected serif displays twice; this one earns it because...").
- Art Director style-locks + Copywriter voice card seed from the profile.
- **The profile biases; it never lowers the bar.** A client who keeps approving below-bar work still gets gate verdicts; the profile just predicts the argument.
- OUROBOROS wiring: process-level corrections (how CALLIOPE should behave) route to OUROBOROS when installed; taste events (what this client likes) stay in the taste loop. Two different memories: do not cross-file.
