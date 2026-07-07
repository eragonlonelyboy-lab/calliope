# Adapter: AURA

AURA is CALLIOPE's own design-system extraction engine (source in `engines/aura/`). It reads a live site's design system off the rendered DOM and returns a curated, opinionated token set plus a drift report with rationale. It is the Tier-1 instrument for the Phase 0.5 ingest onramp's live-URL station: it replaces eyeballing with a real read, and it replaces a raw token dump with the editorial judgment (canonical-vs-drift, semantic roles, scale detection) that is the whole point of extraction.

Unlike the external extractors CALLIOPE could have wrapped, AURA is built in-house end to end (clean-room `getComputedStyle` walk plus a judgment layer), so there is no engine credit owed and the extraction can be co-designed with the judgment it feeds.

## Tier & detection

Native ceiling: Tier 1, drive directly. CALLIOPE runs AURA itself; the user is not the bridge.

- Tier 1 (default): `node engines/aura/bin/aura.mjs <url>`. First run in a fresh checkout needs `npm install` in `engines/aura` and `npx playwright install chromium` (Chromium is the render surface). Node 20+ required.
- There is no Tier 2 or Tier 3. AURA reads the DOM; it needs neither the user's hands nor their eyes.

Detection: check that `engines/aura/node_modules` and the Playwright Chromium browser are present. If not, run the two install steps once; they are idempotent.

## Capabilities & limits

Strong: reads what the browser actually computes off the rendered DOM, then makes the editorial call. Colours cluster by perceptual distance (CIEDE2000) and collapse to one canonical each; survivors get a semantic role (background, surface, text, accent, border) with a rationale, a confidence, and a WCAG contrast check. Type and spacing are fit to a modular scale or grid, with off-scale values reported as drift. Output is a tight curated palette plus a separate drift report, and emitters for DTCG tokens, CSS variables, Tailwind, and Figma variables.

Limits and lies:

- Semantic role precision is the frontier. The accent pick from frequency and saturation alone can land on a gradient tone rather than the true button colour on colour-rich marketing sites. Treat roles as a strong first pass the Strategist confirms, not gospel.
- Single-pass: default state, desktop viewport, one lazy-load scroll. Hover, focus, dark-mode, and breakpoint variants are not yet cycled.
- Motion capture is limited to declared CSS; JS-driven animation is under-reported.
- Best-effort on unusual SPAs, shadow DOM, and auth-gated content; state coverage gaps plainly.

## Walkthrough script

Tier 1 (CALLIOPE drives, inside the ingest onramp live-URL station):

1. Run `node engines/aura/bin/aura.mjs <url> --out .calliope/ingest/aura/` to write the curated system and emitters into the engagement dir. Use `--report-only` to read the critique inline first.
2. Read `design-system.md`: the curated palette with roles and rationale, the detected type scale, the spacing verdict (grid or ad hoc), and the drift report.
3. Confirm the system-vs-noise call: AURA proposes canonical-vs-drift; the Strategist ratifies or overrides it against the brief. The accent role in particular is a proposal to confirm, not a fact.
4. Write the confirmed design-system findings into `.calliope/ingest/site_extraction.md` in the onramp's four-station shape. AURA fills the design-system station; the voice and asset stations still need the Strategist.
5. Run the confirmation ritual with the client (keep/kill/question). Nothing extracted is sacred until the brief decides.

## Prompt dialect

Not a prompt tool: CALLIOPE issues CLI flags. Conventions:

- Always write output into `.calliope/ingest/aura/`, never the repo root, so the raw artifact set stays quarantined from the deliverable dir.
- Treat the DTCG token JSON and the drift report as the canonical inputs; the Tailwind and Figma emits are convenience serializations.
- Read the drift report, not just the tokens: the drift is the discovery gold (it shows where the current system failed to stay consistent).
- Record the source URL and run date in `site_extraction.md`; extractions age as the target site changes.

## Export & handoff path

- The curated DTCG tokens and CSS variables seed the deliverable's DESIGN.md (see `exporters/design_md_schema.md`) once the brief confirms what survives. Chain of custody: note "seeded from an AURA extraction of <url> on <date>" in DESIGN.md.
- The Figma variables JSON hands off into the Figma adapter's token layer when the build moves to Figma.
- The drift report feeds the design critique: it is the concrete list of "what to fix" the client can act on.
- Never let a raw AURA emit become the deliverable. It is discovery input; the brief and the build decide the real system.

## Known failure modes

- Treating the accent (or any role) as confirmed. Recovery: roles are proposals; the Strategist ratifies against the brief, especially the accent on colour-rich sites.
- Stale extraction cited as current. Recovery: stamp URL and date; re-run if the engagement spans weeks or the client ships a redesign mid-flight.
- Missing Chromium or node_modules in a fresh checkout. Recovery: run `npm install` in `engines/aura` and `npx playwright install chromium` once; both are idempotent.
- Auth-gated or JS-rendered sections silently missing. Recovery: state coverage gaps in `site_extraction.md`; supplement blocked areas with a Tier-2 screen-share walk if the client can log in.
- Reading tokens but ignoring the drift report. Recovery: the drift is the critique; surface it, because it is the value a raw extractor never gives.

## Engine provenance

AURA is a clean-room CALLIOPE engine (`engines/aura/`, MIT, Copyright Lee Jun Ying). The extraction technique (`getComputedStyle` over the rendered DOM) is a universal browser API owed to no one; the colour science uses culori (MIT). No third-party extractor's source was copied.
