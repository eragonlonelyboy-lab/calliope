# Pack: campaign

Advertising and campaign work: key visual, adaptation matrix, GSAP HTML5 banners, social template systems. The unit of quality here is the idea, not any single asset: a campaign that needs the client's logo to be identifiable has already failed.

## Bar interpretation

1. **Point of view, not a template.** The campaign idea is one sentence and every asset proves it. Test: state the idea aloud, then pick any asset at random; if the asset does not visibly argue that sentence, fail. A second test: cover the logo on the key visual; if the brand is not guessable from the idea alone, the idea is generic.
2. **Typography that does work.** The campaign line has a locked typographic treatment: face, weight, case, and lockup relationship to the visual device, decided once and enforced everywhere. Test: the line set in a neutral face loses something nameable. Headline type must survive the smallest banner (300x250) without a size exception that breaks the system.
3. **Restrained color system.** One campaign palette derived from but not identical to the brand kit: surface, ink, accent, signal, with the accent doing the campaign's signature job. Test: name the job of every color on the KV; a format that introduces a new color to "fix" a layout fails.
4. **Hierarchy that breathes.** Per placement, one read wins: OOH reads in 3 seconds at distance, a banner reads in the first frame, a story reads with thumb hovering over skip. Test: the 3-second read of each format returns the campaign idea, not the CTA, not the legal line.
5. **Imagery with intent.** One dominant visual device carries the campaign; every image is a variation of that device, not a new photo direction per format. Stock-collage across formats fails. Test: shuffle all campaign images with a competitor's; sorting them back must be trivial.
6. **Motion that whispers.** Banner and social motion is one authored beat per loop: build, hold, resolve. Test: describe the beat in one sentence per unit; "elements fade in sequentially" is not a beat, it is a default. Static frames within the loop are decisions, not gaps.
7. **Designed for its surface.** Every cell of the adaptation matrix is a redesign, not a scale. Test: overlay the 300x250 on a scaled-down KV; if they match, the banner was shrunk, not designed. Vertical story formats recompose the device, not letterbox it.
8. **The invisible expensive stuff.** Banners under network file caps with clean click-tag wiring, social assets inside platform safe areas, templates that survive client editing, retina-ready exports, honest layer/file naming a production house can pick up cold.

## Benchmark

- **Apple "Shot on iPhone"** (adaptation discipline): what to steal: one device (user photo + credit line + logo) redesigned per surface for a decade; OOH, print, and social each get their own crop and composition logic, never a shared master scaled. The standard: the system is so tight that a single photo plus two lines of type is unmistakably the campaign.
- **Spotify Wrapped** (system that flexes without collapsing): what to steal: a template grammar (color pairs, stat typography, shape language) that produces millions of unique assets that all read as one campaign. The standard: variance is designed into the system's rules, not left to the operator's taste.
- **KFC "FCK"** (idea-first): what to steal: the idea is the asset; one visual device (the rearranged bucket) carries apology, wit, and brand in a single read. The standard: if the idea is strong enough, the media plan is decoration.
- **Nike campaign lockups** (line discipline): what to steal: campaign line and swoosh in a fixed spatial relationship across every placement; the lockup is versioned once and never improvised per format.

## Measurable floors

| Floor | Value | How measured |
|-------|-------|--------------|
| Banner initial load | ≤150KB polite load (IAB working default); ≤200KB total unless the network spec says otherwise | sum of served bytes, network panel |
| Banner animation | ≤15s total, ≤3 loops, then rest on a designed end frame (common network rule; check the buy's spec) | timed playback |
| Banner frame rate | 60fps on GSAP timelines; transform/opacity only, no layout-property animation | DevTools performance pass |
| Click-tag | clickTag variable per network spec, whole-unit hit area, zero hardcoded URLs | code inspection + click test |
| Social safe areas | all text/logo inside each platform's published safe zone per format (story/reel UI chrome, feed crop) | safe-area overlay per template |
| KV recognizability | campaign identifiable at 200px-wide thumbnail | thumbnail test, blind viewer names the campaign |
| Contrast | WCAG AA for all functional text (CTA, claim, legal); display type on imagery must pass at final size | contrast instrument on flattened exports |
| Template integrity | client-editable fields swapped with worst-case content (longest headline, darkest photo); layout holds | stress-fill pass per template |
| Export hygiene | 2x raster exports, named per adaptation-matrix cell, zero console errors in HTML5 units | export audit + console check |

## QA stations

Replaces the default web station list. Stations: file-weight audit per banner (network panel, cache disabled); loop count and duration timing pass; click-tag and exit-URL wiring check; safe-area overlay pass per social format; thumbnail test on the KV and each master social asset; contrast instrument on flattened exports; template stress-fill (worst-case copy and imagery); adaptation-matrix completeness check (every promised cell exists and is a redesign, checked by overlay comparison); GSAP performance pass (60fps, transform/opacity only); console/error check on every HTML5 unit.

## Technique atlas

| Technique | When to use | Slop version | Implementing skill |
|-----------|-------------|--------------|--------------------|
| Key-visual construction | always: one campaign idea, one dominant visual device, built at master size first | a mood collage of several devices; a KV that is really a layout, not an idea | `imagegen-frontend-web` for art-directed comp generation, `brandkit` for identity fidelity |
| Adaptation matrix | after KV lock: enumerate formats (OOH, feed sizes, story/reel vertical, banner set), decide per cell what survives (device, line, palette) and what is redesigned (crop, composition, type scale) | scaling the master into every cell; "responsive" thinking applied to fixed formats | `taste-skill` for per-format recomposition |
| HTML5 banner craft | every animated display unit: GSAP timeline with one beat (build, hold, resolve), end frame designed as a standalone static | endless easing chains, elements flying in from four directions, loop that never rests | `gsap-core` + `gsap-timeline` |
| Banner weight discipline | from first build, not as a final crunch: subset fonts or outline the line, compress imagery per unit, no libraries beyond GSAP | shipping 800KB then "optimizing"; loading a framework for a 300x250 | `gsap-core` (CDN-exempt loads per network rules) |
| Click-tag hygiene | every unit: network-spec clickTag, full-unit hit area, cursor state | hardcoded URLs; tiny CTA-only hit area | manual per network spec |
| Social template systems | when the client will self-serve: locked zones (logo, lockup, palette) vs editable zones (photo, headline), rules written into the file | a pretty one-off labeled "template"; everything unlocked | `brandkit` for locked-zone definition |
| Campaign line + lockup | once, at KV stage: line's typographic treatment and its fixed spatial relation to logo and device | line re-set ad hoc per format; lockup proportions drifting across assets | `taste-skill` |
| Sequential storytelling | multi-placement buys: order the formats a person actually meets (OOH tease, social reveal, banner reminder) and assign each a role in the argument | every placement says everything; frequency without sequence | treatment-level decision, no tool |

## Treatment flavor

Stylescape = the KV concept (device + line + lockup), one OOH comp, one story-format comp, the campaign palette board, and a one-page adaptation matrix with survive/redesign notes per cell, plus a written banner beat (build, hold, resolve, end frame). Temperatures: mild = device and line in still formats only, banners static or single-move; medium = full matrix + one signature animated beat across banners and story; hot = the device is generative or participatory (Wrapped energy), the system produces assets rather than the designer producing each one. Technique palette names atlas rows with the job each does for THIS campaign.

## Research notes

Phase 4 adds: competitor campaign scan (last 3 campaigns per named competitor: their device, line, palette; the new idea must be unclaimable by any of them); media-plan reality check (which formats are actually bought; do not design cells nobody is buying); platform spec pull (current safe areas, file caps, loop rules for the exact networks in the buy: these change and stale numbers fail QA); category cliche inventory (the visual devices every brand in this category uses, listed so the treatment can avoid or subvert them).

## Gate wiring

- **Build:** `brandkit` (identity fidelity, locked-zone definition) → `imagegen-frontend-web` (art-directed KV and format comps, one image per matrix cell, never a compressed multi-format board) → `taste-skill` (per-format recomposition, type and spacing discipline) → `gsap-core` + `gsap-timeline` (banner beats).
- **Audit:** `impeccable` audit mode on HTML5 units and social templates (hierarchy, spacing, type conformance) → GSAP performance pass per `gsap-core` guidance → manual stations for weight, loop, click-tag, safe area (no skill instruments these; this pack's floors are the spec).
- **Polish:** `impeccable` one-word commands on HTML5 units, driven by CD verdict language; still-format polish is manual against the KV.
- Missing skill → the station runs manually against this pack's floors and the degradation is noted in the QA report.

## Pre-flight (builder self-check)

1. Campaign idea written as one sentence at the top of the treatment. 2. KV passes the logo-cover test. 3. Line lockup locked: face, case, spatial relation documented once. 4. Adaptation matrix complete: every bought format has a designed cell. 5. Overlay check run: no cell is a scaled master. 6. Every banner beat described in one sentence. 7. Each banner ≤150KB polite load, verified in the network panel. 8. Loops ≤3, ≤15s, end frame reads as a standalone static. 9. clickTag wired per network spec, whole unit clickable. 10. 60fps on all banner timelines, transform/opacity only. 11. Safe-area overlays pass on every social format. 12. Templates stress-filled with worst-case content and held. 13. Locked vs editable zones documented in each template file. 14. KV recognizable at 200px thumbnail. 15. Contrast pass on all functional text at final export size. 16. Exports named per matrix cell, 2x rasters, zero console errors. 17. Palette on every asset maps to the campaign system, no strays.
