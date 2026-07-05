# Ritual: Structured revision (Phase 6)

Purpose: iteration without drift. Feedback arrives messy; this ritual makes every round cheap, anchored, and on-brief.

## Element-anchored feedback

Never accept "make it pop" against a whole page. Before each feedback round:

1. Screenshot the current state.
2. Produce a numbered overlay: each reviewable element gets a number (hero = 1, headline = 2, primary CTA = 3, ...). In terminal contexts, a numbered list with a cropped screenshot per element group is acceptable.
3. All feedback references numbers: "3 quieter, 7 warmer, kill 9." Ambiguity dies here.

## Batching

- Collect feedback into consolidated batches; never apply single drive-by comments as they arrive. One batch = one revision round = one re-gate.
- Per batch, ask two questions before any work starts:
  - **From the decider?** Non-decider feedback is recorded as input and shown to the decider; it does not trigger a round on its own.
  - **In-brief or brief-change?** Check each item against BRIEF.md. Brief-changes are flagged, priced (effort/scope impact), and confirmed before entering the batch. See `brief_back.md`.

## Parallel variants

When the client is torn or the direction is contested:
- Produce variants side-by-side (2-3, each a real render, not descriptions).
- The client can pick one or merge across ("layout of A, color temperature of B"). Record the merge recipe in the direction file.
- Every variant is persisted as a forkable file in `.calliope/directions/`; rejected variants get `status: rejected (revivable)`, never deleted.

## Round discipline

- Each round closes with a read-back: "batch was items 1-6; here is each, done or deferred, and why." Deferrals get a reason and a home (next round, backlog, or brief-change queue).
- Re-gate after every round: the QA audit-redo loop runs before the client sees the revision (zero-findings rule; see `references/quality/audit_redo_loop.md`).
- Rounds are counted in STATE.md. At round 4 on the same element without convergence, stop and diagnose out loud: wrong treatment, wrong feedback channel, or a brief gap. Name it to the decider; do not grind.

## Taste-loop capture (mandatory, every round)

Per `references/state/taste_loop.md`, record for each batch item: element, ask, applied-or-deferred, the client's stated reason where given. Approve/reject patterns compound into the client taste profile that biases the next engagement's treatments.
