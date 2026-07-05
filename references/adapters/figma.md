# Adapter: Figma

## Tier & detection

Native ceiling: Tier 1, drive directly. Figma is the one adapter in this pack with a real Tier 1 path via the official Figma MCP server.

- Tier 1: tools named `mcp__figma__*` are available in the session (use_figma, get_design_context, get_screenshot, get_metadata, generate_figma_design, create_new_file, get_variable_defs, download_assets, and friends). If those names resolve, drive directly.
- Tier 2: no Figma MCP, but Figma is open in a connected browser (Chrome extension or screen access). Watch and guide. Never assume access; ask, then verify by actually looking at the canvas.
- Tier 3: neither. Fall back to the paste-spec plus screenshot loop. Always available; the floor.

Always check for Tier 1 first and state the operating tier in every gate report. Tiers can mix within one session: Tier 1 for building, a Tier 2 interlude for a plugin run or library publish, then back to Tier 1.

Hard prerequisite at Tier 1: load the `figma:figma-use` skill before the first `use_figma` call. Skipping it causes hard-to-debug failures; there is no recovery cheaper than doing it up front.

## Capabilities & limits

Strong: reading real node state (computed properties, not screenshots), variable and token systems, component instances, auto-layout construction, asset export, incremental section-by-section builds. The audit-redo loop runs on instruments here, so gates carry real evidence.

Tool split worth knowing:

- get_design_context and get_variable_defs are the discovery instruments; get_metadata is the cheap structural read; get_screenshot is the visual check, useful but never authoritative on its own.
- generate_figma_design suits greenfield first drafts from a spec; use_figma (with the skill loaded) is for precise edits and everything the generator gets wrong.
- create_new_file when the engagement needs a clean file; otherwise build in the client's existing file so their libraries resolve.

Limits and lies:

- The MCP cannot publish libraries, run third-party plugins, or manage team permissions. Those stay human actions (Tier 2 guidance) even inside a Tier 1 session.
- A single Figma connection means one writer at a time. Write operations must run serially; never let parallel agents write to the same file at once. Read-only audits can parallelize safely.
- Vision audits of Figma files run roughly fifty percent false positives. Never edit off a vision finding alone; confirm against node data (get_metadata, get_design_context) before touching anything.
- Variable mode switches look complete when they are not. A mode flip alone leaves mis-bound surfaces and dark-on-dark text; always follow with a bound-aware effective-color pass.

## Walkthrough script

Tier 1 (CALLIOPE drives, user watches):

1. Load `figma:figma-use`. Non-negotiable first step.
2. Design-system discovery before any creation: get_design_context and get_variable_defs on the target file or library. Map tokens, components, and styles that exist so nothing gets rebuilt hardcoded.
3. Build incrementally, section by section. Create a section, audit it with node data plus get_screenshot, fix, then move to the next. Never build the whole page blind and audit at the end.
4. If the brief includes theming, flip the variable mode and immediately run the effective-color pass; do not trust the flip alone.
5. Gate each section against the brief before proceeding. Serialize all writes.
6. Close with the export pass (see export and handoff below) and a gate report stating Tier 1 and the instruments used.

Tier 2 (user's hands, CALLIOPE's eyes):

- Used for what the MCP cannot do: publishing a library, running a plugin, team settings. Give one click at a time with concrete anchors ("Assets panel, book icon top right, Publish"). Verify each step by looking before issuing the next.
- Also the full operating mode when no MCP is connected: guide the user through the same discovery-then-sections order, auditing what is visible on screen.

Tier 3 (blind coach):

- Write the spec as a paste-ready block: frame sizes, exact token names or hex values, spacing numbers, layer names. The user builds, screenshots, and returns; CALLIOPE audits the screenshot and sends one batched correction prompt. Round-trip economy applies: batch fixes, target three or fewer round trips per element group, and mark all findings as visually-verified-only in the gate report.

## Prompt dialect

At Tier 1 this is an operation dialect, not a prompt dialect: conventions for how CALLIOPE itself issues operations.

- Tokens over values. Bind fills, text styles, spacing to existing variables and styles found during discovery. A hardcoded hex where a variable exists is a defect.
- Semantic layer names, always: `hero/headline`, `card/pricing/cta`, never `Frame 427`.
- Component instances over detached copies. If a component exists in the library, instance it; detach only with a recorded reason.
- Auto-layout construction order (see failure modes for why): appendChild first, build the content, read frame.height, then resize(width, height). Set primaryAxisSizingMode to AUTO and build inner frames before outer sizing.
- At Tiers 2 and 3, prompts to the user follow the house downstream format: role context, constraints from the brief, concrete spec with numbers and token names, and the exact artifact expected back.

## Export & handoff path

- Assets: download_assets for icons, images, and exportable frames straight into the deliverable directory. Set export settings on nodes first so the output matches dev needs (SVG for icons, 1x/2x PNG for raster).
- Design record: extract variables via get_variable_defs and write DESIGN.md in the deliverable dir: token tables (color, type, spacing, radius), component inventory, and the file plus node ids they came from. This is the chain-of-custody artifact when the engagement moves tools.
- Dev handoff: leave the file in handoff shape: named layers, tokens bound, components instanced, one page per flow, a cover frame stating version and gate status. At Tier 2/3, the user exports; CALLIOPE supplies the exact export settings and verifies the received files against the spec.

## Known failure modes

- resize() before children on an auto-layout frame locks height to 0. Recovery: appendChild first, build content, read frame.height, then resize(w, height).
- Frame set to FIXED with height 0 clips all children invisible; everything "exists" in the layer tree but renders as nothing. Recovery: set primaryAxisSizingMode to AUTO and size inner frames before outer ones.
- Overlays and scrims built as frame-fill opacity render flat grey. Recovery: use a separate rectangle child with its own opacity, never opacity on the frame fill.
- A wide annotation band added as an AUTO layout child pushes the real content off-screen. Recovery: set layoutPositioning to ABSOLUTE on the annotation node.
- Theme switch via variable mode flip leaves mis-bound surfaces and dark-on-dark text while looking done. Recovery: run a bound-aware effective-color pass over every surface and text node after the flip.
- Parallel writes over the single Figma connection corrupt or interleave operations. Recovery: serialize all writes; only reads run in parallel.
- Vision-audit findings are wrong about half the time on Figma files. Recovery: treat vision findings as leads, confirm each against node data before editing.
- `use_figma` called without loading `figma:figma-use` first fails in opaque ways mid-build. Recovery: stop, load the skill, replay the operation; do not debug the symptom.
