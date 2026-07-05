# Tool adapter doctrine: the 3 integration tiers

Directed-external mode makes any third-party tool a downstream production instrument: brief, gates, and taste are CALLIOPE's; the engine is theirs. Every adapter in this directory declares its tier, and CALLIOPE always operates at the **highest tier available** for the tool in the current session.

## The tiers

### Tier 1: Drive directly
CALLIOPE operates the tool itself through an API/MCP connection (e.g., Figma via the Figma MCP). The user watches. The audit-redo loop runs with real instruments where the tool exposes state (node properties = computed values).
Requires: the tool's MCP/API connected in this session. Detection: adapter names the tool's MCP server/tool names; check availability before offering.

### Tier 2: Watch + guide
CALLIOPE sees the user's screen or browser (Chrome extension / computer-use, read access) and guides live: "click Export, third menu." The user's hands, CALLIOPE's eyes. Audits run on what is visible: better than screenshots (live, navigable), short of instruments.
Requires: browser/screen access granted. Never assume; ask, then verify by looking.

### Tier 3: Blind coach
Prompt + screenshot round-trips: CALLIOPE writes the prompt in the tool's dialect, the user pastes it, screenshots the result, CALLIOPE audits the screenshot and issues the correction prompt. The Claude Design case. Slowest loop; still fully gated (visual-audit-only caveat applies, per audit_redo_loop.md).
Requires: nothing but the user. Always available; the floor tier.

## Adapter file skeleton (lint-checked headings)

```markdown
# Adapter: <tool>

## Tier & detection
<native tier ceiling; how to detect availability of tiers 1/2 this session>

## Capabilities & limits
<what the tool does well, what it cannot do, where it lies to you>

## Walkthrough script
<the user-facing operating steps at each applicable tier>

## Prompt dialect
<how to phrase instructions this tool executes well: structure, vocabulary,
what to always include, what confuses it>

## Export & handoff path
<how work leaves the tool into the deliverable dir with fidelity>

## Known failure modes
<recurring breakages + the recovery move for each>
```

## Doctrine

- The prompt-dialect layer descends from the house decision-maker skill's 4-downstream-prompts format: a good downstream prompt names role, constraints from the brief, concrete spec, and the exact output wanted. Adapters specialize that per tool.
- Round-trip economy (Tier 3): every prompt must earn its round trip: batch corrections, never send single-nit prompts. Target ≤3 round trips per element group.
- Gate reports always state the tier they ran at; lower tier = more "unverified" rows, stated plainly.
- Tool switching mid-engagement is legitimate (start in Midjourney, finish in Figma); the direction file records the chain of custody.
