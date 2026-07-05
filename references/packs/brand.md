# Pack: brand identity

The root medium: every other pack consumes its output (site, deck, social, print all inherit the kit). Deliverable set: logo system, identity deck, brand kit (assets + tokens), governance layer (do/don'ts, rollout checklist, optional HTML brand portal). A brand that only works in the deck is a failed brand; the unit of proof is the application, not the board.

## Bar interpretation

1. **Point of view, not a template.** The identity encodes one idea from THIS client's brief, nameable in a sentence. Test: put the symbol next to the three nearest competitors' marks; if a stranger cannot pick the client's by concept, fail. "Geometric sans wordmark + gradient blob" is a template, not a position.
2. **Typography that does work.** The brand typeface is a decision with a stated reason (voice, history, technical fit), not availability. Test: the deck states why this face and names the fallback stack; wordmark letterforms show at least one deliberate modification or a stated reason for none.
3. **Restrained color system.** Colors ship as roles (primary, ink, surface, accent, signal) with usage rules and documented accessibility pairs. Test: point at any color in the kit and name its role and its approved text pairings; a swatch page without pairing rules fails.
4. **Hierarchy that breathes.** The identity deck itself proves the system: one idea per spread, clear-space rules treated as designed space. Test: the clear-space rule is defined in logo-derived units (x-height, symbol width), not eyeballed padding.
5. **Imagery with intent.** Every mockup, texture, and art-directed photo in the kit demonstrates a stated brand behavior. Test: caption each application image with the rule it proves; "looks nice on a tote bag" fails, "shows one-color reversal on dark fabric" passes.
6. **Motion that whispers.** Brand motion principles are written even if minimal: how the logo enters, how the accent behaves, what never animates. Test: the kit contains a motion page with at least entry behavior + one prohibition; a static-only brand states that as a decision.
7. **Designed for its surface.** The system is proven at extremes: favicon and app icon at 16px, signage at distance, social avatar in a circle crop, print in one color. Test: each named surface has its own artwork or an explicit rule, not a scaled master file.
8. **The invisible expensive stuff.** Master logo as clean SVG (named layers, outlined text, correct viewBox), export set complete, color values in HEX + RGB + CMYK (+ Pantone when print is in scope), fonts licensed for the client's actual use, file tree a future designer can navigate cold.

## Benchmark

**NASA Graphics Standards Manual (1975, Danne & Blackburn):** what to steal: system rigor: every application (aircraft, signage, letterhead) derives from stated rules, not per-case improvisation; the manual anticipates misuse and legislates against it. **Paula Scher's Citi (1998):** what to steal: reduction: one arc turns the "t" into an umbrella, merger story in a single stroke; the concept survives at any size because it is geometry, not decoration. **IBM design language:** what to steal: governance depth: 8-bar mark rules, grid math, and usage law maintained across decades and thousands of hands; the brand survives because the rules are executable by people who never met the designer. **Collins (Twitch 2019):** what to steal: a kit built for other people to play in: the system defines the sandbox (glitch behavior, color logic) so extensions stay on-brand without approval loops.

## Measurable floors

| Floor | Measure |
|-------|---------|
| Reduction | symbol recognizable at 16px favicon render (actual raster, not zoomed vector); minimum-size rule stated in px and mm |
| One-color | logo passes in 100% black and 100% white with zero gradient/opacity dependence |
| Clear space | rule defined as a logo-derived unit; every deck spread and mockup conforms |
| Color roles | 3 to 5 roles, each with usage rule; zero orphan swatches in the kit |
| Accessibility pairs | every approved text/background pair meets WCAG AA; pairs table present in guidelines |
| Type system | scale with named ratio; weight count declared; fallback stack specified |
| Lockups | horizontal + stacked + symbol-only + one-color variants all delivered; misuse page shows ≥6 don'ts |
| Applications | ≥6 mockups across ≥3 surface classes (screen, print, environment/object) |
| Files | master SVG (outlined, named, correct viewBox); PNG export set; ICO/app-icon set; tokens file (HEX/RGB/CMYK) |
| Governance | do/don't page, rollout checklist, asset naming convention; portal (if in scope) passes web-pack hygiene floor |

## QA stations

Replaces web stations.

1. **Reduction battery:** render at 16px, 32px, favicon-in-tab, circle-crop avatar; verdict per size.
2. **One-color and inversion test:** black-only, white-only, on photography.
3. **Geometry audit:** grid overlay on symbol and wordmark; optical corrections present where math alone reads wrong (overshoot on rounds, ink-trap logic checked, not assumed).
4. **Collision scan:** reverse image search + category landscape check; a near-identical mark in the client's category is a blocker, not a note.
5. **Color instrument:** contrast checker on every documented pair; CMYK values proofed against HEX intent.
6. **Application walk:** each mockup checked against clear-space, minimum-size, and misuse rules.
7. **File hygiene:** open every deliverable file; SVG source inspected for stray points, unnamed layers, unoutlined text.
8. **Portal station (if HTML portal shipped):** web pack hygiene floor applies (console, contrast, keyboard, meta).

## Technique atlas

| Technique | When to use | Slop version | Implementing skill/tool |
|-----------|-------------|--------------|------------------------|
| Grid + geometric construction | symbol and wordmark drawing; proves intentionality | construction lines drawn AFTER the logo to fake rigor; golden-ratio circles as decoration | manual craft; `brandkit` for construction-board renders |
| Optical correction | whenever math reads wrong: overshoots, joins, spacing at small sizes | none applied (pure geometry that looks off) or corrections nobody can justify | manual craft; reduction battery verifies |
| Wordmark vs symbol decision | choose per name length, category, usage surfaces; hybrid lockups when both earn keep | defaulting to abstract symbol because "brands have symbols"; monogram nobody asked for | treatment argues the choice in writing |
| Color-system architecture | always: roles + rules + accessibility pairs | mood-board palette with no roles; 12 accents; gradient as identity crutch | `ui-ux-pro-max` palette rubric; contrast instrument |
| Type-system definition | always: brand face, scale, weights, fallbacks, licensing | Inter/Roboto default; display font used for body; unlicensed font in deliverables | `ui-ux-pro-max` pairing data; license check in pre-flight |
| Brand motion principles | any client with digital surfaces | logo spin/bounce demo reel; motion page copied between clients | written principles page; web pack motion gates when portal exists |
| Mockup/application testing | every engagement: proof the system survives reality | same 3 free-PSD mockups every brand gets; mockups that hide the logo small | `brandkit` premium mockup generation |
| Negative-space and reduction tests | every symbol: favicon test, one-color test, 16px test | testing only at deck size; "it works small" claimed without a raster render | reduction battery station |
| Identity deck design | presenting the system: deck is itself an application of the brand | template deck in the agency's own style; 40 slides of filler | `taste-skill` for layout; `impeccable` audit if HTML |

## Treatment flavor

Stylescape = 2 to 3 symbol/wordmark concept directions (sketch fidelity, construction visible) + color-and-type board per direction + one hero application mockup per direction + a one-sentence concept statement each. Temperatures: mild = refined wordmark, quiet palette, system rigor is the statement; medium = distinctive symbol + one signature brand behavior (a color move, a typographic tic); hot = full visual world: custom letterforms, art-directed imagery language, motion identity, the brand as an experience system. Technique palette names atlas rows and the surfaces each must survive.

## Research notes

Phase 4 adds:

- **Category mark landscape audit:** cluster competitor logos by shape, color, and type; the whitespace map drives the concept.
- **Trademark proximity scan:** flag, do not adjudicate: legal clearance is the client's counsel's job, and that sentence goes in the deck.
- **Cultural color and naming check:** for the client's actual markets, not assumed ones.
- **Rollout surface inventory:** every place the mark will live, gathered before the symbol is drawn: a brand designed for surfaces it will never touch wastes the budget.

## Gate wiring

- **Build:** `brandkit` (concept boards, guidelines spreads, premium mockups, identity-deck imagery) → `taste-skill` (deck and portal layout, anti-slop type/spacing) → `ui-ux-pro-max` (palette and font-pairing data when defining the color/type system).
- **Audit:** reduction battery + geometry audit run manually per this pack (no skill instruments logo geometry); `impeccable` (`npx impeccable detect` + audit) on the HTML brand portal only; contrast instrument on all documented pairs.
- **Polish:** `impeccable` one-word commands on portal/deck HTML; `brandkit` re-render for mockups that failed the application walk.
- Missing skill → station runs manually per floors above; note the degradation in the QA report. `brandkit` missing → art-directed briefs + curated stock direction for mockups (no random device PSDs).

## Pre-flight (builder self-check)

1. Concept statement is one sentence and the symbol proves it.
2. Construction grid exists and preceded the final drawing.
3. Optical corrections checked at 16px raster, not just vector zoom.
4. One-color black and white versions pass on light, dark, and photo backgrounds.
5. All lockups delivered (horizontal, stacked, symbol-only).
6. Clear-space rule in logo-derived units, applied in every mockup.
7. Minimum size stated in px and mm.
8. Every color has a role, a rule, and AA-passing text pairs.
9. Type scale ratio named; fonts licensed for client use; fallbacks listed.
10. Motion page written (or static declared as a decision).
11. ≥6 mockups across screen, print, and object/environment.
12. Misuse page shows ≥6 real don'ts, not filler.
13. Collision scan run; findings logged.
14. Master SVG clean: outlined text, named layers, no stray points.
15. Export set + tokens file complete; file tree navigable cold.
16. Rollout checklist matches the surface inventory from research.
