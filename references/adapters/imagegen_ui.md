# Adapter: image generation UIs

## Tier & detection

Native tier ceiling: **Tier 3, blind coach.** These are tools the user operates by hand: Midjourney (web or Discord) as the archetype, plus Ideogram, Adobe Firefly, DALL-E inside ChatGPT, and the Recraft web UI. CALLIOPE writes the prompt in the tool's dialect, the user runs it and screenshots the result, CALLIOPE audits and issues a named correction.

Scope boundary: BYO generation APIs attached at Phase 0 (kie.ai, Recraft API, a client key) are **not** this adapter. Those are Tier 1 direct calls made by the Art Director role itself. This adapter exists precisely for the case where no API is attached and the user's own tool subscription is the engine.

Tier upgrade check, once per session: if browser access (Chrome extension or computer-use read) is granted and the user works in the web UI, operate at Tier 2, watching the grid live and pointing at specific frames ("upscale the third one"). Ask, then verify by looking. Never assume.

## Capabilities & limits

- Strong: mood, texture, light, cinematic composition, illustration styles, hero imagery. This class is the fastest route from an art-directed brief to a candidate visual.
- Weak: typography inside the image, exact brand-color fidelity, precise layout geometry, multi-element spatial instructions ("logo top left, 24px margin" will be ignored).
- Text in image: route to the Ideogram or Recraft class, which render words far more reliably than Midjourney, or composite text in post. Never ship Midjourney-rendered copy in a deliverable.
- Vector need: Recraft is the only tool in this class that outputs true editable SVG paths. Everything else is raster only, whatever the export menu implies.
- Where the tools lie: they always return something confident-looking. A beautiful wrong image is still wrong. Audit against the brief, not against "does it look good."
- Model state mid-2026: Midjourney V8.1 is the default (native 2048px output, improved --sref stability); --oref and --ow remain V7-only, so character or object consistency work may need `--v 7`. Verify current model and plan tier in session.

## Walkthrough script

Tier 3 loop, per asset:
1. Art Director issues the generation brief: subject, composition, light, palette anchors, mood, style-locks.
2. This adapter translates the brief into the tool's dialect (below) and hands the user one paste-ready prompt.
3. User runs it, screenshots the full 4-grid (Midjourney) or result set, and pastes it back.
4. CALLIOPE audits the grid against the brief and returns exactly one of: pick frame N and upscale; re-roll with a named correction; or vary frame N.
5. Repeat within the round-trip budget: target 3 or fewer round trips per element group. Batch every correction into one revised prompt; never send a single-nit prompt.

Tier 2 variant: same loop, but CALLIOPE reads the grid directly from the browser and skips the screenshot step. Guidance becomes live ("hover the second image, click Upscale Subtle").

Batch discipline: always generate the full grid before judging. Audit all four frames against the brief. Pick or re-roll with a **named** correction ("warm the palette toward the terracotta anchor, remove the second figure"), never re-roll blind hoping for better luck. Blind re-rolls burn round trips and teach nothing.

## Prompt dialect

Skeleton, descended from the house downstream-prompt format: `[subject and action], [composition and framing], [light], [palette anchors], [mood adjectives], [style-locks] [parameters]`. Comma-separated phrases, concrete nouns, no full sentences of instruction, no negations in prose (use `--no`).

Midjourney parameter craft:
- `--ar W:H` always, matched to the target surface from the medium pack. Never accept the square default.
- `--sref <url or code>` to lock a visual style across a set; add `--sw` to tune its grip. This is the primary consistency instrument.
- `--no <thing, thing>` for exclusions; prose negation ("without people") often generates the excluded thing.
- `--seed N` reused for controlled variations of a picked frame; combine with minimal prompt edits.
- `--v 7` explicitly when --oref character consistency is required, since V8.x lacks it (verify in session).
- `--style raw` when the house look must survive without Midjourney's own aesthetic seasoning.

Consistency strategy across a set: one style ref plus a locked phrasing skeleton. Freeze the composition, light, palette, and style-lock clauses word for word; change only the subject clause between assets. Drift enters through casual rephrasing.

Per-tool notes: Ideogram takes plainer sentence-like prompts and handles quoted text strings well ("a poster with the words \"Ember Roast\""). Recraft prompts should name the output mode (vector illustration, icon, raster) up front. Firefly and DALL-E in ChatGPT accept natural language and ignore Midjourney-style parameters entirely; state aspect ratio and exclusions in words for those. Do not paste `--ar` syntax into non-Midjourney tools; it leaks into the image as literal text.

## Export & handoff path

- Resolution floors come from the medium pack for the target surface. Upscale before export: Midjourney V8.1 natively outputs 2048px, older models and other tools need the in-app upscaler or a post pass. Never hand a 1024px raw frame to a print or hero-image slot.
- Download the original file from the tool's own export, not from a chat or Discord preview. Discord previews are recompressed; use Open in Browser then save, or the web app's download button.
- Licensing: paid Midjourney tiers grant commercial usage rights; free or trial tiers of any tool in this class generally do not. Confirm the user's current plan and each tool's current terms in session before an asset enters client work. Record the tool, plan tier, and generation date in the ledger row.
- Naming into the asset ledger at `.calliope/assets/`: `<project>_<element>_<tool>_<vNN>.<ext>`, plus the exact final prompt stored alongside so any asset can be regenerated or varied later.
- AI-tell rejection pass, mandatory before any asset enters a deliverable: hands and anatomy, garbled or pseudo-text artifacts, texture uniformity (plastic skin, repeating foliage), impossible reflections, melted background objects. One failed check rejects the asset; fix in post or re-roll.

## Known failure modes

- **Style drift across a set.** Later assets stop matching the first. Recovery: re-anchor with the same --sref and the frozen phrasing skeleton; regenerate the drifted assets, never retrofit the early ones to match the drift.
- **Prompt leakage.** Literal parameter words or brief vocabulary appear rendered inside the image (a floating "cinematic" or a stray "--ar"). Recovery: move parameters to the end, strip quoted words unless text is intended, re-roll.
- **Aspect-ratio crop kills the composition.** The subject sits fine at 1:1 but the 16:9 version amputates it. Recovery: state the framing in the prompt ("wide shot, subject left third, negative space right"), not just the --ar flag; the ratio changes the canvas, the words must place the subject.
- **Compression on download.** Asset saved from a Discord or chat preview arrives soft and banded. Recovery: re-download the original via the web app or Open in Browser; if the original is gone, regenerate from the ledger's stored prompt and seed.
- **Text that almost works.** One re-roll fixes one word and breaks another. Recovery: stop re-rolling after two attempts; route the text to Ideogram or Recraft, or composite real type in post.

Gate reports for assets produced through this adapter state the tier they ran at; at Tier 3 the visual-audit-only caveat from audit_redo_loop.md applies to every row.
