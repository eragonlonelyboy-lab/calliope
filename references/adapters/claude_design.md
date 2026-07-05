# Adapter: Claude Design

## Tier & detection

Native tier ceiling: **Tier 3, blind coach.** This is the canonical Tier 3 case the doctrine file names. Claude Design (Anthropic Labs, research preview since April 17, 2026) exposes no public API or MCP server, so Tier 1 is off the table. Tier 2 is possible only if the user grants browser access this session: Claude Design runs on the web, so a Chrome extension or computer-use grant upgrades the loop to watch + guide. Ask, then verify by looking; never assume.

Detection checklist at session start:
- Browser access granted and Claude Design tab reachable → operate at Tier 2.
- Otherwise → Tier 3 prompt + screenshot round-trips. Always available.
- Verify in session: whether an MCP/API surface has shipped since this adapter was written. The tool is a research preview and moves fast; a one-line check with the user costs nothing.

## Capabilities & limits

What it does well (verified against launch coverage and Anthropic's announcement):
- Generates a first version from a text description, then refines through conversation, inline comments on specific elements, direct text edits, and auto-generated adjustment sliders for spacing, color, and layout.
- Accepts uploads (images, DOCX, PPTX, XLSX), a codebase pointer, and a web capture tool that grabs elements from a live site so prototypes match the real product.
- Can apply a team design system across projects for consistency.
- Covers wireframes and mockups, decks, marketing collateral (landing pages, social assets), and code-powered prototypes with voice, video, shaders, and 3D.
- Powered by Claude Opus 4.7; available to Pro, Max, Team, and Enterprise plans.

Limits that shape CALLIOPE's direction:
- Single-seat and conversational: no multiplayer editing, no live cursors. One operator, one thread.
- Web only, weekly usage allowances. Budget round trips; the allowance is a real constraint, not a formality.
- It optimizes for plausible-looking output, not for the brief. Left undirected it converges on competent generic. CALLIOPE's treatment is what keeps it off that path.
- Where it lies to you: a screenshot of a code-powered prototype does not prove the interaction works. Visual-audit-only caveat applies to anything animated, responsive, or stateful. Verify in session: actual rendered breakpoint behavior, motion timing, and hover states by asking the user to interact and re-screenshot.

## Walkthrough script

Tier 3 (default):
1. CALLIOPE compresses the approved treatment into an opening prompt (see prompt dialect). User pastes it into a fresh Claude Design chat.
2. If brand assets exist, user uploads them (images, docs) or points the web capture tool at the reference site before sending the prompt.
3. User screenshots the first version at full width and returns it. Full view, not compact view (compact view has known save errors).
4. CALLIOPE audits against the gates, writes one batched correction prompt per element group, user pastes it.
5. User prefers the tool's own sliders and inline comments for single-axis nits (spacing, one color) instead of burning a prompt round trip on them. CALLIOPE names the slider move in plain words: "use the spacing slider on the hero, widen until the headline breathes."
6. Repeat within the round-trip budget, then move to export.

Tier 2 (browser access granted): same sequence, but CALLIOPE reads the live canvas instead of screenshots, catches drift mid-generation, and dictates slider and comment moves against what it can see.

## Prompt dialect

Claude Design is prompt-native and conversational, which makes the dialect close to natural language, but a CALLIOPE treatment still needs deliberate compression. The opening prompt carries four blocks, in order:

1. **Role and artifact.** One sentence: what is being made and for whom. "A landing page for X, aimed at Y, that has to feel Z."
2. **Concept narrative.** The treatment's core idea in 2 to 3 sentences of plain description, not adjectives. Name the one thing the design argues, because the tool will otherwise pick its own safe center.
3. **Technique palette as instructions.** Translate each technique into a concrete visible outcome: "oversized serif headline, at least 4x the body size", "single accent color used exactly twice per viewport", "flat blocks, no drop shadows, no gradients". Bans matter as much as asks; the tool defaults to gradients, soft shadows, and rounded everything unless told not to.
4. **Output wanted.** Exactly what to generate first: "desktop landing page, hero plus three sections, no footer yet." Small first asks converge faster than whole-site asks.

Correction prompts are element-anchored and batched:
- Anchor every note to a named element: "the hero headline: increase size contrast against the subhead, keep the palette." Never "make it better" or "more premium."
- Batch all corrections for an element group into one prompt. Rule from doctrine: ≤3 round trips per element group. If a group is not converging by round 3, change the instruction, not the volume.
- State what to keep as explicitly as what to change. The tool regenerates enthusiastically; unprotected elements drift.
- Push single-axis tweaks to sliders and inline comments, not prompts. Round trips are for structural moves.

What confuses it: stacked abstract adjectives, contradictory references, whole-page rewrites when one section is wrong, and prompts that mix content edits with layout edits in one unlabeled paragraph. Separate the blocks.

## Export & handoff path

Verified export surfaces: organization-scoped share URL (view or edit), save as a folder, and export to Canva, PDF, PPTX, or standalone HTML. For builds, the tool packages a handoff bundle designed to hand to Claude Code in a single instruction.

CALLIOPE's handoff order of preference:
1. **Handoff bundle → Claude Code** when the engagement continues into implementation. Highest fidelity path.
2. **Standalone HTML** into the deliverable directory for web work. Audit the exported HTML against the final approved screenshot; export and canvas can disagree.
3. **PDF or PPTX** for deck and collateral engagements.
4. Screenshots alone are never the deliverable; they are audit artifacts.

Verify in session: exact contents and format of the handoff bundle, and whether HTML export preserves fonts and interactions. Preview docs are thin here; check the first export end to end before promising fidelity to the client. Record the chain of custody in the direction file, per doctrine.

## Known failure modes

- **Dropped inline comments.** Documented preview bug. Recovery: paste the comment text into the chat thread instead; treat chat as the reliable channel.
- **Save errors in compact view.** Documented. Recovery: instruct the user to work in full view from the start; the walkthrough script already assumes it.
- **Lag on large codebase links.** Documented. Recovery: link a subdirectory, not the monorepo.
- **Chat upstream errors mid-session.** Documented. Recovery: open a new chat tab; re-seed it with the opening prompt plus a one-paragraph state summary so context survives the restart. CALLIOPE keeps that summary current after every audited round trip for exactly this reason.
- **Convergence stall.** Same correction phrased twice with no movement. Recovery: stop prompting the change, prompt a regeneration of just that element group with a rewritten spec, or switch tools for that element and record the switch.
- **Allowance exhaustion mid-engagement.** Weekly limits are real and may change post-beta. Recovery: front-load structural rounds early in the week, keep a running round-trip count in the gate report, and warn the user two rounds before the budget line.
- **Screenshot flattery.** The render looks finished; the export or the responsive view does not match. Recovery: gate reports state Tier 3 and mark motion, responsiveness, and interaction rows as unverified until the user exercises them live.
