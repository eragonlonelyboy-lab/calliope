# Ritual: Brief-back (Phase 3), the contract

Purpose: compress both interviews into one page, read it back, and get explicit sign-off. From sign-off forward, the brief is the contract: scope changes are brief changes and are named as such.

## The one-page brief (`.calliope/BRIEF.md`)

Exactly these sections, one page total:

```markdown
# Brief: <client> · <engagement>

**Problem.** <the business problem, in the client's own words where possible>
**Audience.** <the one person, from the soul interview>
**Feeling.** <the single walking-away feeling>
**Against.** <the enemy: what this refuses to be>
**Position.** <the 2×2 move: from where, to where>
**Scope.** <service lines + deliverables in; explicit outs>
**Constraints.** <the hard ones only: brand survivals, platform, accessibility, budget/API config>
**Success.** <the 2-3 measurable criteria, verbatim from Phase 2>
**Decider.** <the named person whose yes advances gates>
```

## Client-specific design principles (`.calliope/principles.md`)

Derive 3-5 principles from the interviews. These are the engagement's constitution: every later gate verdict cites them **by name**.

Rules for a good principle:
- Named memorably in 2-4 words, stated in one sentence, with one "so we will / so we won't" pair.
- Derived from THIS client's answers, not from good-design generalities. "Hierarchy that breathes" is the core bar's job; principles capture what makes this client themselves.
- Testable at a gate: a reviewer must be able to say "violates <name>" about a concrete element.

Example shape (do not copy content):

```markdown
## 1. Quiet authority
They are the adult in a loud market (sliders: Authority 8, Quiet 8; enemy = hype vendors).
So we will: let numbers and whitespace carry weight. So we won't: animate anything that doesn't earn it.
```

## The read-back

1. Present BRIEF.md in full. Then the principles, each with its one-line origin ("this comes from your answer about X").
2. Ask for corrections. Apply, re-read the changed lines.
3. Ask for **explicit sign-off from the named decider**: "Is this the brief? Say yes and we build to it; anything we change later, we change here first."
4. On yes: record sign-off (who + date) at the bottom of BRIEF.md. Mark Phase 3 done.

## After sign-off

- Every revision request in Phase 6+ is checked against BRIEF.md: **in-brief** (proceed) or **brief-change** (flag it, update BRIEF.md with a dated changelog line, confirm with the decider, then proceed).
- If the decider changes mid-engagement, that is a brief change.
