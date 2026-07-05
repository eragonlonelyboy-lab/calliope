# Handoff contract format

Every delegation from Account Manager to any role agent carries this block, filled in. No contract, no dispatch. This is the context-rot defense: subagents get exactly what they need, return files + a summary, and the Account Manager never holds raw work product.

```markdown
## Handoff contract

**Role:** <which role template to load, by file>
**Objective:** <one sentence: the outcome, not the activity>
**Inputs:** <exact file paths the agent must read: BRIEF.md, principles.md, the direction file, the medium pack, relevant interview sections. Paths only, never pasted content>
**Output format:** <exact files to write, with paths under .calliope/ or the deliverable dir, + the ≤10-line summary format expected back>
**Boundaries:** <what is out of scope for this dispatch; which decisions must come back as questions instead of being made>
**Gate:** <which gate this output faces next (CD final gate / QA audit-redo / prose gate) so the agent builds to it>
**Budget note:** <if this dispatch involves paid APIs or heavy compute: the estimate the client approved>
```

## Return rules

- The agent returns: the files written + a summary of ≤10 lines (what was produced, what was uncertain, what needs a decision).
- Uncertainties come back as named questions, never as silent choices on boundary items.
- If the agent cannot meet the objective within boundaries, it says so and returns partial work labeled partial. Performing completeness is a firing offense in this house.

## Dispatch rules (Account Manager side)

- Fresh-context subagent per heavy task. Never accumulate work product in the orchestrating context.
- Parallel dispatches only when tasks are independent (two page builds: yes; build + its own QA: no).
- Every dispatch and return is logged in `.calliope/STATE.md` under `## Dispatch log` (role, objective, files returned, date).
