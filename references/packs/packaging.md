# Pack: packaging

**Scope boundary (concept tier).** CALLIOPE does concept packaging: surface design and 3D mockups only. It never invents dielines, print specs, or material callouts. Production work begins only when the client supplies a vendor dieline plus specs. Every concept deliverable carries the label "concept: requires vendor dieline for production." A deliverable missing that label fails QA before anything else is scored.

## Bar interpretation

1. **Point of view, not a template.** The pack takes one shelf position derived from the brief. Test: put the concept next to the category's top three sellers; if it reads as a fourth member of their family, fail. The front panel is the first proof.
2. **Typography that does work.** Brand, variant, and benefit read in a decided order at shelf distance. Test: view the front panel at simulated 2m; the reading order must match the declared hierarchy, not fight it.
3. **Restrained color system.** 3-5 colors with named jobs across the whole SKU range (base, brand, variant-code, signal). Test: point at any color on any variant and name its job; a per-flavor free-for-all fails.
4. **Hierarchy that breathes.** One winner per panel. Front panel carries brand plus one claim; everything else moves to side or back. Test: squint at the front panel; if two elements tie, fail.
5. **Imagery with intent.** Product photography, illustration, or pattern does a job the concept names. Test: caption each visual with its job; "makes it look premium" fails. Appetite imagery must trace to an art direction brief.
6. **Motion that whispers.** Packaging's motion is the reveal: rotation order in the 3D turntable, unboxing sequence for e-commerce. Test: the mockup sequence tells the concept in the declared order; a random orbit GIF fails.
7. **Designed for its surface.** Curved surfaces, wraps, and folds are designed as 3D objects, not flat art bent afterward. Test: type distortion on the curved mockup stays legible; a label that only works flat fails.
8. **The invisible expensive stuff.** Regulatory space reserved honestly, barcode zone at plausible scale, mockups that do not lie about print (see floors), files layered so a production designer can pick them up when the dieline arrives.

## Benchmark

- **Oatly** (voice-as-packaging): the copy IS the design; every panel is media. Steal: treating the back and sides as owned attention, not leftover space.
- **Aesop** (restraint system): one typographic system, near-zero color, label as information architecture. Steal: a variant range of 40+ SKUs that reads as one shelf block through system discipline, not repetition.
- **Liquid Death** (idea-first): the concept does the work the category spends on claims. Steal: commit to one idea hard enough that the structure and name carry it; do not decorate a weak idea.
- **Glossier** (unboxing sequence): the e-commerce box is a choreographed sequence, outer to insert to product. Steal: designing the order of reveal, not just the surfaces.

## Measurable floors

| Floor | Measure | Pass |
|-------|---------|------|
| Shelf-distance legibility | brand mark readable on the front panel at simulated 2m (render panel at ~3% of a 1080p frame) | brand identifiable; variant readable at 1m equivalent |
| Variant differentiation | full SKU range rendered side by side in grayscale | every variant distinguishable without color |
| Regulatory space | nutrition/ingredient panel zone plus barcode zone blocked out at plausible scale | zones present and empty or clearly placeholdered; never fake-filled with lorem nutrition data |
| Mockup honesty | render audit against print reality | no glow, no impossible foil coverage, no emboss deeper than stock allows, no lighting that manufactures contrast the flat art lacks |
| Dieline gate | any production claim (die-cut, spec, material callout as fact) | blocked unless a vendor dieline plus specs are on file; otherwise language stays "direction," not "spec" |
| Concept label | "concept: requires vendor dieline for production" on every deliverable | present on every page/board |

## QA stations

Non-web pack: replaces the default web station list in `references/quality/audit_redo_loop.md`.

1. 2m shelf render: front panel scaled down; brand legibility check.
2. Planogram render: concept placed in a crowded shelf mock with 6+ real competitors; recognition check.
3. Grayscale SKU lineup for variant differentiation.
4. Flat-vs-3D comparison: flat art next to the mockup; any contrast, saturation, or detail the mockup adds beyond plausible lighting is flagged.
5. Regulatory-zone audit: zones present, honest, not decoratively filled.
6. Label audit: concept-tier disclaimer on every deliverable.
7. Type-on-curve check at 100% zoom on every curved or folded surface.

## Technique atlas

| Technique | When to use | Slop version | Implementer |
|-----------|-------------|--------------|-------------|
| Front-panel hierarchy | always; brand/variant/benefit order decided per brief | everything at 100% loudness; brand, claim, and badge all shouting | taste-skill (hierarchy discipline) |
| Shelf test | every front-panel round | reviewing only at full-screen zoom where everything reads | QA station 1-2 |
| Structural form as brand | when the brief allows a proprietary shape and the shape carries the idea | novelty shape with the same generic label wrapped on | brandkit (form studies); flagged concept-only, no dieline invented |
| Material/finish direction | concept tier: describe intent (uncoated kraft, soft-touch, single foil hit) | spec language without a dieline; foil on 60% of the panel | written direction in the treatment, never a spec sheet |
| Variant-system architecture | any range of 2+ SKUs | one master design recolored per flavor with no system logic | taste-skill + grayscale lineup station |
| Unboxing sequence | e-commerce boxes and DTC kits | printing the logo on every inner surface and calling it an experience | brandkit (sequence boards), Glossier standard |
| Regulatory-space reservation | every consumable or regulated category | fake nutrition panels rendered as texture; barcode as decoration | floors table; zones honest or empty |
| 3D mockup craft | every presentation round | hero-lit renders that oversell: glow, impossible reflections, contrast the flat art lacks | brandkit + imagegen-frontend-web art direction; flat-vs-3D station |

## Treatment flavor

Stylescape = front-panel concept at full and 2m scale + one variant pair + material/finish direction board (described, not spec'd) + shelf-context render. Temperatures: mild = the concept in type and color on a standard form; medium = concept plus one signature move (structural gesture, finish direction, or voice-driven copy panel); hot = the form or the voice IS the idea (Liquid Death energy), full range architecture shown. Technique palette names atlas entries with the job each does. Every temperature ships with the concept-tier label.

## Research notes

Phase 4 adds: planogram audit of the client's actual retail channel (photograph or research the real shelf, not an idealized one); category color audit (what every competitor uses, so the palette can own a gap); regulatory scan for the category (what zones are mandatory: informs honest reservation, not legal advice); structural precedent search when a custom form is on the table (what exists, what vendors commonly run).

## Gate wiring

- **Build:** `taste-skill` (hierarchy, type, and system discipline on flat art) → `imagegen-frontend-web` for art direction of surface imagery and pattern → `brandkit` for 3D mockups, shelf renders, and unboxing sequence boards.
- **Audit:** QA stations above; `brandkit` renders re-checked against the flat art (mockup honesty); grayscale and 2m checks run on exported frames.
- **Polish:** CD verdict language drives revision of flat art first, re-render second; never polish the render to fix a flat-art problem.
- Missing skill → mockups degrade to flat art plus a written render brief for an external tool; the shelf and grayscale checks still run on whatever renders exist; note the degradation in the QA report.

## Pre-flight (builder self-check)

1. Concept-tier label on every deliverable.
2. No dieline, print spec, or material callout stated as fact.
3. Front panel survives the 2m render.
4. Squint test: one winner per panel.
5. Grayscale SKU lineup distinguishable.
6. Color jobs named across the whole range.
7. Type legible on the curved mockup at 100%.
8. Regulatory and barcode zones reserved, honest, unfilled.
9. Every visual captioned with its job.
10. Mockup adds nothing the flat art lacks (side-by-side checked).
11. Planogram render includes real competitors, not generic boxes.
12. Variant system logic written in one sentence.
13. Unboxing order declared if e-commerce.
14. Files layered and named for a future production designer.
15. Fonts licensed for packaging use.
