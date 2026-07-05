# Adapter: Stitch

## Tier & detection

Native tier ceiling: **Tier 2**. Stitch (stitch.withgoogle.com) has no public API or MCP server, so Tier 1 is unavailable. Default posture is **Tier 3 blind coach**: CALLIOPE writes the prompt, the user pastes it into Stitch, screenshots the result, and CALLIOPE audits and issues corrections.

Detection at session start:
- Browser access (Chrome extension or computer-use, read tier) granted and the user has Stitch open: operate at Tier 2. Verify by looking at the tab before claiming it.
- No browser access: Tier 3, no further checks needed.

Gate reports must state which tier ran. At Tier 3 everything is visual-audit-only per audit_redo_loop.md.

## Capabilities & limits

What it does well:
- Generates mobile and web UI screens from text prompts fast; good for first-pass layout structure and screen inventory.
- Accepts image input: rough wireframes, whiteboard sketches, annotated screenshots of reference UI. Useful for feeding it the locked direction visually instead of describing it.
- Multi-screen flows: can generate several interconnected screens from one flow description (reported up to 5; verify in session).
- Two model modes: a standard mode (faster, higher monthly quota) and an experimental/pro mode (higher quality, lower quota). Exact quota numbers vary across reports (350/month standard, 50 to 200/month experimental cited); verify in session.
- Conversational refinement: chat edits to an existing screen cost less quota than fresh generations. Prefer edits over regenerations.

What it cannot do or lies about:
- **Strong gravity toward generic Material-ish output.** Left unforced, it produces default type scales, default blue palettes, symmetric centered layouts, stock spacing. This is the adapter's main enemy; the dialect section exists to fight it.
- No real design tokens or component system awareness; it will not honor a design system it cannot see.
- Reported: Figma paste is unavailable in experimental mode, standard mode only (verify in session; this changes the mode choice when Figma handoff is planned).
- Free product under Google Labs; quotas, modes, and export options shift without notice. Re-verify limits each engagement.

## Walkthrough script

Tier 3 (default):
1. CALLIOPE compresses the locked treatment into the Stitch prompt (see dialect). One screen or one coherent flow per prompt.
2. User pastes into Stitch, picks the mode CALLIOPE names (standard if Figma paste is planned), generates.
3. User screenshots the full result at real size and returns it.
4. CALLIOPE audits against the direction file and returns one batched correction prompt for the chat refinement box, not a regeneration. Target ≤3 round trips per screen group.
5. On pass, run the export path below.

Tier 2 additions: CALLIOPE watches the Stitch tab live, calls out which mode is selected, reads the generated screen directly instead of waiting for screenshots, and guides export clicks ("Copy to Figma is in the top right of the screen panel; verify location in session").

## Prompt dialect

Core rule: **anti-default forcing**. Stitch fills every unspecified slot with a Material default. The prompt's job is to leave no slots.

CALLIOPE derives Stitch prompts from a DESIGN.md-style spec in the house `stitch-skill` format (the locally installed semantic design-system skill that generates agent-friendly DESIGN.md files enforcing premium anti-generic standards: strict typography, calibrated color, asymmetric layouts). Compress the engagement treatment into that spec first, then cut prompts from it, so Stitch output lands close to the locked direction instead of Material default.

Every prompt includes:
- Platform and screen name up front ("Mobile app screen: order history").
- Exact type names and weights ("headings in a high-contrast serif like Fraunces, 600; body in Inter 400"). Stitch may substitute fonts; naming them still pulls the output toward the intent.
- Spacing values in px ("24px screen gutters, 16px card padding, 32px between sections").
- Palette as hex ("background #0E0F12, accent #E8FF5A, text #F4F4F2"), never color adjectives alone.
- Layout asymmetry stated explicitly ("left-aligned oversized heading, content column offset right; do not center the layout").
- A **do-not-use list**, always: "do not use: purple/blue gradient, Material default blue, centered hero, rounded-everything cards, drop shadows on every element, emoji icons."

Correction prompts (round 2+): reference what is on screen, batch all fixes, keep the do-not-use list attached. Pattern: "Keep the layout. Change: (1) heading font weight to 600, (2) card corner radius to 8px, (3) replace the blue #1A73E8 accents with #E8FF5A. Do not reintroduce: centered layout, gradient background."

What confuses it: long brand narrative, multiple screens of feedback in one message, vague quality words ("premium", "clean") with no concrete spec behind them.

## Export & handoff path

Two exits; both re-gated, neither trusted as-is.

1. **Figma paste (preferred).** Copy to Figma from Stitch (standard mode; verify availability in session), paste into the engagement Figma file. Reported to arrive with auto layout and editable layers (verify fidelity: fonts, exact hex, spacing commonly drift in the paste). From here the **Figma adapter takes over at its higher tier** and the audit-redo loop reruns with real instruments. Record the tool switch in the direction file chain of custody.
2. **Code export (scaffold only).** Stitch exports frontend code (HTML/CSS reported, plus framework formats; verify current list in session). Treat it strictly as scaffold: it enters the deliverable dir under a `scaffold/` path, is re-gated by the website or app pack QA, and is **never shipped as-is**.

Screenshots of passed screens are archived to the deliverable dir either way, tagged with the Stitch mode and prompt version that produced them.

## Known failure modes

- **Material default regression.** A correction prompt silently reverts font or palette choices from earlier rounds. Recovery: reattach the full type/palette/do-not-use block to every prompt, not just the first.
- **Font substitution.** Named fonts rendered as a lookalike or Roboto. Recovery: accept structure from Stitch, lock real fonts after Figma paste; note the substitution in the gate report.
- **Figma paste degradation.** Layers arrive flattened, spacing off, colors shifted. Recovery: audit the paste against the passed screenshot immediately; fix in Figma (higher tier, cheap) rather than re-prompting Stitch.
- **Mode mismatch.** Work done in experimental mode, then Figma paste is needed but unavailable there (reported behavior; verify). Recovery: decide the export path before generating; if Figma handoff is planned, stay in standard mode.
- **Quota exhaustion mid-engagement.** Monthly generation caps hit during iteration. Recovery: switch to chat refinements over regenerations early; if fully blocked, carry the passed screenshots and DESIGN.md spec to a fallback tool per the tool-switching doctrine.
- **Multi-screen drift.** Screens in one generated flow disagree on palette or type. Recovery: correct one screen to passing first, then prompt "apply exactly this screen's fonts, colors, and spacing to the remaining screens".
