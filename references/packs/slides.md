# Pack: slides

Pitch decks, sales decks, keynote-style talks, internal strategy decks. The defining split in this medium: a talk deck (projected, presenter carries the words) and a reading deck (sent, the deck carries the words) are two different products. Every gate in this pack asks which one is being built before it scores anything.

## Bar interpretation

1. **Point of view, not a template.** The deck argues one thesis a listener can repeat in a sentence after slide 3. Test: delete the logo and read only the slide titles top to bottom; if they do not form this client's argument (or form anyone's argument), fail.
2. **Typography that does work.** One family, two weights, three sizes max per master. Title size states importance, not decoration. Test: sample five random slides; every rendered size maps to a declared master style. Any ad-hoc size fails.
3. **Restrained color system.** Surface, ink, one accent, one data-signal color. Accent means "look here now" and appears once per slide at most. Test: count accent uses per slide; more than one, or an accent used for decoration on a slide with no emphasis job, fails.
4. **Hierarchy that breathes.** One idea per slide; the takeaway title states the point, not the topic ("Churn concentrates in month 2", never "Churn analysis"). Test: cover everything below the title; if the title alone does not deliver the slide's message, fail. Second test: any slide making two claims fails; split it.
5. **Imagery with intent.** Every image, icon, and chart does a named job in the argument. Test: caption each visual with the claim it supports; "fills the right half" fails. Clip-art, generic stock handshakes, and icon-per-bullet decoration fail on sight.
6. **Motion that whispers.** Builds are progressive disclosure of an argument, not entrance effects. Test: every build step must correspond to a spoken beat the presenter names. Any bounce, spin, or per-bullet fly-in fails. A reading deck has zero builds by definition.
7. **Designed for its surface.** Talk deck: legible from the back row (floors below); presenter notes carry the prose. Reading deck: full sentences on-slide, footnotes, sources, self-sufficient without a voice. Test: name which product this is; a deck that is neither (paragraph-dense slides someone also presents) fails as both.
8. **The invisible expensive stuff.** Master-driven layout (no orphan text boxes), fonts embedded or system-safe, exports clean (PDF text selectable, no rasterized type), file opens without missing-font warnings, sources cited on every data slide, page numbers on reading decks.

## Benchmark

- **Duarte resonate-era decks** (arc): the audience-as-hero structure, alternating "what is / what could be" tension beats, one visual turn per act. Steal the arc discipline: a deck is a story spine with slides as beats, not a document cut into pages.
- **Sequoia/Stripe memo-to-deck discipline** (substance order): the argument is written as prose first, then compressed; every slide traces to a memo paragraph. Steal the sequence: narrative locked before any layout work begins, so design never papers over a missing argument.
- **Apple keynote slides** (reduction): one number, one phrase, or one image per slide; the presenter is the sentence, the slide is the punctuation. Steal the subtraction test: remove elements until the slide breaks, then restore one.
- **Bain/BCG takeaway titles** (title rigor): every title is a complete declarative claim, and reading titles alone reproduces the full argument (the "horizontal logic" check). Steal the title audit as a standalone QA pass.

## Measurable floors

| Floor | Talk deck | Reading deck |
|-------|-----------|--------------|
| Body type size | ≥24pt minimum, titles ≥36pt | ≥14pt minimum, titles ≥20pt |
| Word count | ≤25 words per slide (excluding chart labels) | no cap, but one idea per slide holds |
| Contrast | WCAG AA (4.5:1) AND passes a projector-wash sim (reduce contrast 30%, all text still reads) | WCAG AA on screen |
| Billboard test | every slide's message lands in a 3-second exposure | titles land in 3 seconds |
| One-message audit | 100% of slides state exactly one claim in the title | same |
| Grid conformance | ≥95% of elements snap to the declared master grid; 100% of recurring elements (page number, logo, section marker) at identical coordinates deck-wide | same |
| Chart honesty | zero truncated axes without a marked break; zero dual axes without explicit labels; zero 3D charts | same |
| Data-ink | every chart survives a declutter pass: no gridline, border, or legend the takeaway does not need | same |
| Builds | ≤1 build sequence per slide; total build steps ≤ spoken beats | zero builds |
| File hygiene | fonts embedded, no missing-font warning on a clean machine, PDF export text-selectable | same, plus page numbers and sources |

## QA stations

Replaces the default web stations.

1. **Title-only read:** extract all titles in order; verify they reproduce the argument (horizontal logic).
2. **Billboard station:** flash each slide 3 seconds; reviewer writes down the message; mismatch with intended claim is a finding.
3. **Back-row render:** view at 25% zoom (simulates distance); anything illegible is a finding.
4. **Projector-wash pass:** apply a low-contrast display profile; re-check all text pairs.
5. **Grid overlay:** master grid on, sample every slide, flag off-grid elements and recurring-element drift.
6. **Chart audit:** per data slide: axis honesty, declutter, takeaway-title match to what the chart actually shows.
7. **Build walk:** advance every build; each step must map to a script beat.
8. **Export check:** PDF and native file open clean on a machine without the design fonts.

HTML decks (`frontend-slides`) additionally run console-zero and keyboard-navigation checks from the web loop.

## Technique atlas

| Technique | When to use | Slop version (fails) | Implemented by |
|-----------|-------------|----------------------|----------------|
| Story spine (problem-tension-resolution) | talk decks, pitches: emotional arc carries a room | tension manufactured by scary stock photos, resolution that is just the pricing slide | treatment doc; Duarte arc as reference |
| McKinsey pyramid (answer first, support below) | reading decks, exec/strategy audiences that skim | pyramid label on a deck whose titles are still topics | memo-first workflow; title audit |
| Takeaway titles | always, both products | titles that state topics ("Market overview") or puns | title-only read station |
| One idea per slide | always | compliance by fragmentation: one idea smeared across 6 near-identical slides | one-message audit |
| Billboard test | talk decks; hero slides of reading decks | passing it by having nothing on the slide that matters | billboard station |
| Data-slide declutter | every chart | decluttered into dishonesty: removing the axis context that qualified the claim | chart audit; chart honesty floor |
| Progressive disclosure builds | complex diagrams and multi-step arguments in talk decks | builds as entrance animation; per-bullet reveals of a list nobody needed staged | build walk station |
| Presenter-view split | talk decks: prose lives in notes, slide stays sparse | notes pane empty while the slide carries the script in 14pt | product-declaration check at kickoff |
| Slide-master architecture | any deck over 10 slides; anything a client will edit | 40 slides of hand-placed text boxes that shatter on first edit | grid overlay; pptx master build |
| Full-bleed vs framed imagery | full-bleed for emotional beats, framed for evidence | full-bleed stock over darkened overlay with centered white text on every section break | imagery-intent captioning |

## Treatment flavor

Stylescape = one title slide, one takeaway-titled content slide, one data slide, one section divider, plus the master spec (grid, type styles, color jobs) and the arc map (the deck's beats as a one-line-per-slide skeleton with titles drafted). Temperatures: mild = clean master, arc and titles carry everything, imagery minimal; medium = mild plus one signature visual device recurring at act breaks (a diagram language, a photographic style); hot = keynote energy: full-bleed image system, one-phrase slides, choreographed builds, presenter notes as a written script. Technique palette names atlas rows and declares the product: talk deck or reading deck, decided here, never later.

## Research notes

Phase 4 adds: audience-room recon (screen size, projector vs LED, room depth: sets the type floor for this job, which may exceed 24pt); incumbent-deck teardown (what the client sends today: its title discipline and density set the before/after story); house-template constraint check (mandated corporate masters and what can legally change); data provenance pass (every number the deck will claim, sourced before design starts).

## Gate wiring

- **Build:** declare talk vs reading deck in STATE.md first → `frontend-slides` for HTML decks, `pptx` for PowerPoint deliverables → `taste-skill` for layout/type/spacing decisions on the master → chart slides built against the chart-honesty floor.
- **Audit:** `impeccable` audit on HTML decks (detect + audit commands); for pptx, the QA stations above run manually (no automated detect exists: note the degradation); title-only read and billboard station run on every deck regardless of format.
- **Polish:** `impeccable` one-word commands on HTML decks; on pptx, CD verdict language translates to master-level edits, never per-slide patching.
- **Export:** `pdf` skill for the deliverable PDF; export check station runs on the output, not the source.
- Missing skill → build the master by hand to this pack's floors and run all stations manually; log the degradation in the QA report.

## Pre-flight (builder self-check)

1. Product declared: talk deck or reading deck, recorded in STATE.md.
2. Arc map exists; every slide traces to a beat.
3. Titles-only read reproduces the argument.
4. Every title is a claim, not a topic.
5. One idea per slide; no slide makes two claims.
6. Type floor holds (24pt body talk / 14pt reading); zero orphan sizes off the master.
7. Accent color used at most once per slide, always as emphasis.
8. Every visual captioned with its job in the argument.
9. Charts pass honesty and declutter floors; every data slide cites its source.
10. Builds mapped to script beats; reading deck has zero builds.
11. Recurring elements at identical coordinates deck-wide.
12. Projector-wash contrast pass done (talk decks).
13. Presenter notes written where the product is a talk deck.
14. Fonts embedded; clean-machine open verified.
15. PDF export text-selectable, page-numbered (reading decks).
16. File is master-driven: a client edit does not shatter the layout.
