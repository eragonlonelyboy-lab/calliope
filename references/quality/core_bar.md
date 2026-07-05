# The core bar (medium-agnostic quality law)

Eight dimensions. Every medium pack interprets them for its surface; no pack may waive one. This is the generalized $10K bar: the difference between work that reads as template output and work a client would pay an agency for.

## The eight dimensions

### Taste
1. **Point of view, not a template.** The work takes a position derived from THIS client's brief. Test: imagine it shipped by the nearest competitor unchanged. If nothing breaks, it has no point of view and fails.
2. **Typography that does work.** Type choices carry the concept: scale contrast, pairing logic, and rhythm are decisions, not defaults. Fonts chosen by availability (Inter/Roboto because they were there) fail. Licensed/variable/display choices must earn their place.
3. **Restrained color system.** 3-5 colors doing defined jobs (surface, ink, accent, signal). A palette is a system with rules, not a mood. Random accent proliferation fails.
4. **Hierarchy that breathes.** The eye path is designed: one primary thing per view, secondary things visibly secondary, and space treated as a material. Cramming fails; uniform density fails.

### Substance
5. **Imagery with intent.** Every image/illustration/icon does a job the concept names. Stock-collage energy fails; "art-directed or absent" is the rule. (The no-API path passes via art-directed briefs + curated stock direction; random Unsplash does not.)

### Felt quality
6. **Motion that whispers.** Animation is choreography with purpose: enters, emphasis, and transitions that serve the narrative. Default AOS-fade-up-on-everything fails. Static is a legitimate choice; slop motion is not.
7. **Designed for its surface.** Mobile is designed, not shrunk; print is designed, not exported; a deck is designed per-slide, not templated x40. Each target surface gets real decisions.
8. **The invisible expensive stuff.** The floor under everything: performance appropriate to the medium (web: fast load, 60fps where animated), accessibility floor (contrast, keyboard, semantics), correct meta/print/export hygiene, honest file structure a maintainer can live in.

## How the bar is applied

- **Packs interpret, never dilute.** Each medium pack (`references/packs/`) restates the eight dimensions in that medium's terms, names its benchmark (the "this is what 10/10 looks like" reference), and sets the measurable floors QA instruments.
- **The scoresheet operationalizes it.** `scoresheet.md` turns the dimensions into numeric rows: threshold-gated, principles cited by name.
- **Trends inform, the bar governs.** No trend justifies a bar violation; a trend that fits gets cited inside the treatment, not applied as decoration.
- **Client principles sit on top.** The bar is the house floor; `.calliope/principles.md` is the client's constitution. A gate verdict speaks both languages: "passes the bar, violates Quiet Authority" is a fail.

## Profiles

Two performance profiles exist for web work (inherited from the house playbook):
- **Experiential/WOW (default):** GPU-driven, 60fps + progressive-load budget, WebGL perf budget; waives conversion-tuned rules (hero-fits-viewport, flat asset caps) in favor of felt quality.
- **Conversion (explicit only):** utility/marketing pages: Lighthouse ≥90 hard gate, hero-fits-viewport, strict asset caps.
The design interview's motion appetite + the brief's problem decide the profile; record the choice in STATE.md.
