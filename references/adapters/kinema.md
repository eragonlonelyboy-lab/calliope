# Adapter: KINEMA

KINEMA is CALLIOPE's video-render capability. It wraps HyperFrames as the render engine and owns the layer that actually matters: turning a creative brief into a specified, on-taste composition, and gating the result against the slop bar. The engine turns HTML into deterministic frames; KINEMA decides what is worth rendering. The moat is the direction, not the renderer, so KINEMA does not reimplement the engine.

## Tier & detection

Native ceiling: Tier 1, drive directly. KINEMA runs the HyperFrames CLI itself; the user is not the bridge.

- Tier 1 (default): `npx hyperframes ...` runs with Node 22+ and FFmpeg present (both are prerequisites of any CALLIOPE video engagement). The HyperFrames skill family (`hyperframes`, `hyperframes-core`, `hyperframes-cli`, `hyperframes-animation`, `hyperframes-media`) is installed and discoverable; load `hyperframes` first for routing, then the specific domain skill.
- There is no Tier 2 or Tier 3. KINEMA is not a tool the user operates by hand; it is CALLIOPE authoring a composition and calling the engine.

Detection: confirm Node 22+ and FFmpeg on PATH, and that `npx hyperframes doctor --json` reports `ok`. If FFmpeg is missing, that is the one blocker to surface before starting.

## Capabilities & limits

Owned by KINEMA (the value CALLIOPE adds):

- Brief-to-composition translation: the art-directed motion grammar, brand-token to frame-token mapping, and scene blueprints that HyperFrames itself names as its missing layer (`frame.md`).
- The taste and QA gate: a composition is not rendered until it clears the slop-motion bar (no AOS-fade-up defaults, motion that carries meaning), scored against the client's design principles per `references/quality/audit_redo_loop.md`.
- Chain of custody: which brief drove which composition, and the gate status at render time.

Wrapped from HyperFrames (do not reimplement):

- The deterministic render core: HTML plus `data-*` timing seeked frame by frame in headless Chrome, encoded with FFmpeg, same input to same output.
- The seven runtime adapters (GSAP default, plus Lottie, Three.js, Anime.js, CSS keyframes, WAAPI, TypeGPU), the `lint` / `validate` / `inspect` / `snapshot` gates, `*.motion.json` motion verification, and the optional AWS Lambda distributed render.

Limits and lies:

- HyperFrames renders what exists; it does not invent footage. Photographic or filmed imagery must be supplied (the asset-generation layer, stock, or brand assets); KINEMA authors motion and composition, not raw photography.
- The static gates (`lint`, `validate`, `inspect`) evaluate each composition in isolation and miss cross-file sub-composition mount failures; the `snapshot` visual smoke test is the only gate that catches those (see `hyperframes-cli`).
- Render is deterministic per host, but `beginFrame` is Linux and Windows only; document the render host.

## Walkthrough script

1. Load the `hyperframes` skill for routing, then the specific workflow skill for the piece (`motion-graphics`, `product-launch-video`, `slideshow`, and so on).
2. Author the composition from the brief: scene blueprint first, then HTML plus timing, binding brand tokens (from AURA or the locked DESIGN.md) to frame tokens. This is the KINEMA layer, not a raw HyperFrames handoff.
3. Static gates: `npx hyperframes lint` and `npx hyperframes validate`. Add `inspect` for layout-sensitive work.
4. Visual smoke test for any project with sub-compositions: `npx hyperframes snapshot --frames 9`, eyeball each frame against the scene plan.
5. Preview in Studio: `npx hyperframes preview`. Tell the user the piece is editable there; do not auto-render.
6. Run the CALLIOPE taste and QA gate against the client's design principles. Render only after it passes.
7. Render: `npx hyperframes render --quality high --output out.mp4`. Verify the file exists and has plausible size and duration before reporting success.

## Prompt dialect

Not a natural-language prompt tool: KINEMA issues CLI commands and authors composition HTML. Conventions:

- Scene blueprint before markup. Name the beats, their durations, and the motion intent per beat before writing a line of HTML.
- Bind, never hardcode. Frame tokens map to the locked design system (AURA output or DESIGN.md); a hardcoded hex or size where a token exists is a defect.
- One paused, seek-safe timeline. Author for deterministic seek; never rely on wall-clock animation that will not resolve under frame seeking.
- Motion earns its place. Every animation answers "what does this motion mean"; decorative fade-ups do not ship.

## Export & handoff path

- Deliverable: the rendered MP4 (or transparent overlay), written into the engagement deliverable dir with the gate status recorded.
- The composition project (HTML, tokens, `*.motion.json`) is the editable source of truth; keep it with the deliverable so a revision does not start from zero.
- Record the render host and engine version for reproducibility.

## Known failure modes

- Rendering before the taste gate passes. Recovery: the gate is the exit condition, not preview; never `render` on a composition that has not cleared it.
- Sub-composition mount failure invisible to the static gates. Recovery: always run the `snapshot` visual smoke test when `index.html` mounts sub-compositions.
- Missing FFmpeg or Node under 22. Recovery: detect at Tier-1 preflight and surface as the one hard blocker before authoring.
- Treating HyperFrames as a footage generator. Recovery: supply photographic assets separately; KINEMA composes and animates, it does not film.
- Non-deterministic animation that will not seek. Recovery: author on a single paused timeline; move any wall-clock or async motion onto seek-safe adapters.

## Engine provenance

KINEMA wraps HyperFrames (`github.com/heygen-com/hyperframes`), licensed Apache-2.0. Apache-2.0 requires preserving the copyright and NOTICE and carries a patent grant; honor both when packaging. KINEMA is the direction and taste layer, authored by CALLIOPE; HyperFrames is the render engine, credited, not reimplemented and not relabelled.
