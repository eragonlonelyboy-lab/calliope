# Pack: illustration and 3D

Optional service line. Generation is BYO-API (kie.ai, Recraft, or a client key); the "none" path is first-class: art-directed briefs plus curated stock direction, delivered to the same bar. This pack governs illustration systems (spot, hero, icon tiers), 3D still art direction, and generated-image art direction. When 3D becomes interactive it leaves this pack and hands off to the website or app pack.

## Bar interpretation

1. **Point of view, not a template.** The illustration system encodes one visual idea from the brief (a metaphor, a material, a world). Test: describe the system in one sentence without naming the client; if the sentence fits any startup's asset folder, fail.
2. **Typography that does work.** Where type enters imagery (icon labels, diagram callouts, text baked into hero art) it obeys the client's type system: same family logic, no generated pseudo-lettering. Test: any text inside an image must be legible, correctly spelled, and set in a licensed face, or the image carries no text at all.
3. **Restrained color system.** The set draws from the brand palette plus at most two extension tones with named jobs (depth, atmosphere). Test: sample the five dominant colors of any asset; each maps to a palette entry or a named extension. An asset that introduces its own palette fails.
4. **Hierarchy that breathes.** Each image has one subject and a designed eye path; negative space is composed, not leftover canvas. Test: squint at the asset at 25% size; if the subject does not win in under a second, fail.
5. **Imagery with intent.** This IS the medium, so it is total: every asset in the set does a named job (explain, orient, reward, signal state) written in its brief before generation or sourcing. A generated image that merely looks premium fails without a job line. Test: read the job line, then the asset; a stranger must see the connection.
6. **Motion that whispers.** Stills are composed with implied motion discipline: directional light, gesture lines, and camera angle agree across the set. Test: no asset contradicts the set's established camera height or light direction without a job reason.
7. **Designed for its surface.** Spot art is drawn for its render size, not scaled hero art; icons are drawn on their grid, not shrunk illustrations; hero art is composed for its crop on every target surface. Test: view each asset at its real placement size on the real surface; detail that vanishes or clogs fails.
8. **The invisible expensive stuff.** Correct resolution and format per surface, license recorded per asset, source files organized (layered where authored, prompt-and-seed logged where generated), naming a maintainer can live with.

## Benchmark

**Stripe's illustration era** (system DNA): one geometric-isometric language spanning docs spots, marketing heroes, and diagrams; steal the single-DNA discipline where any two assets are visibly siblings, not the isometric style itself.

**Airbnb's classic illustration system** (tier architecture): explicit spot, scene, and hero tiers with shared character rules and per-tier detail budgets; steal the tiering, where detail is budgeted per render size instead of drawn uniformly.

**Linear and Pitch's 3D-lite gradient era** (material language): a small vocabulary of materials (glass, soft metal, matte gradient) reused with strict lighting consistency; steal the capped material list, three or four materials doing the whole brand, not per-asset invention.

**Notion** (character restraint): monochrome line figures whose personality lives in gesture, not rendering; steal the restraint logic where the style budget is spent on one dimension and everything else stays quiet.

## Measurable floors

| Floor | Measure | Pass |
|-------|---------|------|
| Set consistency | grayscale conversion + squint pass across the full asset set, side by side | all assets read as one visual world: matching value range, line weight, light direction; any outlier named and rejected |
| Resolution and format | per target surface: web hero ≥2x display size, icons exported at exact grid multiples, print at ≥300dpi CMYK-checked | 100% of assets fit their surface spec; no upscaled or stretched asset ships |
| License status | one ledger row per asset: generated (tool, model, prompt ref, seed), stock (source, license class, seat), commissioned (contract ref) | every shipped asset has a row; a missing row blocks ship |
| Icon-grid conformance | overlay each icon on the declared grid (e.g. 24px, 2px stroke, defined keyshapes) | 100% on-grid: stroke weights identical, optical sizing corrected (circles and diagonals compensated), terminals consistent |
| AI-tell rejection | tell checklist run per generated asset (see atlas) | zero shipped assets with hand, text, or texture tells; rejects logged with the tell named |
| Palette conformance | dominant-color sample per asset against palette + named extensions | ≥95% of sampled area maps; unmapped color is a finding |

## QA stations

Replaces the web station list. Stations: set board review (all assets on one board, grayscale duplicate beside color); real-placement render (each asset dropped into its actual surface at actual size); icon grid overlay; AI-tell pass under 200% zoom (hands, text, texture); license ledger audit against the asset folder; file hygiene walk (naming, layers, prompt log). Each station emits findings to the audit-redo loop; the scoresheet's measured rows come from the final zero-findings pass.

## Technique atlas

| Technique | When to use | Slop version (reject) | Implementing skill/tool |
|-----------|-------------|----------------------|------------------------|
| Illustration-system architecture | any engagement with more than three assets: define spot/hero/icon tiers sharing one DNA (palette, line weight, light, detail budget per tier) before drawing asset one | assets generated one by one with no tier doc; heroes and spots at identical detail density | `brandkit` for the system board; `taste-skill` for restraint calls |
| Style-lock definition | before any generation: write the lock as concrete rules: palette anchors (hex), line weight (px at render size), lighting character (direction, hardness), texture rules (allowed grain, banned gloss) | "in the style of X" or vibe adjectives standing in for rules; each generation reinterpreting the style | Art Director's style-lock doc; `brandkit` |
| Prompt-as-brief craft | every generated asset: prompt states subject, composition, light, mood, each traced to a treatment line; prompt and seed logged | naked prompts ("premium 3D render of X, trending"), no treatment trace, no log | `imagegen-frontend-web` / `imagegen-frontend-mobile` prompt discipline; BYO generation API |
| Icon-grid discipline | any icon tier: declare grid, stroke, keyshapes, corner logic; correct optically (circles overshoot, diagonals thin) | icons scaled from illustrations; mixed stroke weights; geometric-only sizing that ignores optics | grid overlay in the QA station; `taste-skill` |
| 3D still craft | hero or product art at concept tier: direct camera (height, focal length feel), lighting (key direction, fill ratio), materials (capped list per benchmark) | default three-quarter float on gradient void; chrome-and-glass everything; uncapped material zoo | `brandkit` for direction boards; hands off to `threejs-webgl` / `react-three-fiber` via website/app pack when interactive |
| Set-consistency audit | after any batch: one-visual-world test: grayscale board, squint, outlier hunt | shipping the batch because each asset passes alone | QA station 1; scoresheet set-consistency row |
| AI-tell rejection | every generated asset before it enters the set: hands (finger count, joint logic), text-in-image (spelling, letterform integrity), texture uniformity (repeating grain, plastic skin, melted edges), background coherence | shipping at thumbnail review; "nobody will zoom in" | 200% zoom station; reject and regenerate, never retouch a tell into hiding |
| Licensing hygiene per source | at intake of every asset: generated work checked against the generation tool's commercial terms; stock license class matched to actual use (web vs print vs merch); commissioned work's usage rights filed | "it's generated so it's fine"; stock pulled at comp resolution and shipped | license ledger; floor row above |
| Curated stock direction (no-API path) | when no generation key exists: the brief is written identically, then answered with a curated shortlist (3 to 5 candidates per job, crop and treatment notes per candidate) | random Unsplash search dumped into the deck; stock chosen by prettiness instead of the job line | Art Director briefs; treatment |

## Treatment flavor

Stylescape = one system board (the three tiers side by side showing shared DNA), one style-lock sheet (palette anchors, line weight, lighting, texture rules as written rules), and two proof assets (one spot, one hero) demonstrating the lock. Temperatures: mild = flat vector or line system, palette-only depth, no rendering; medium = dimensional light and capped materials, one signature texture; hot = full 3D still world with authored camera and material language (Linear-era energy). Technique palette names atlas entries and states whether each tier is generated, commissioned, or stock-directed, and under which API path.

## Research notes

Phase 4 adds:
- Competitor imagery audit: what visual world competitors occupy and where the whitespace is; if everyone floats gradient blobs, a drawn line system is positioning.
- Generation-tool capability check per client key: what the available model actually holds consistent across a set; run one style-lock probe batch before promising a tier.
- Stock-market scan for the no-API path: whether the treatment's world exists in licensable stock at usable quality, before the treatment commits to it.
- Surface inventory: every place assets will render, with sizes, before tier budgets are set.

## Gate wiring

- **Build:** `brandkit` (system boards, style-lock sheets, direction decks) → `imagegen-frontend-web` / `imagegen-frontend-mobile` (prompt-as-brief discipline when generating for web or app surfaces) → BYO API (kie.ai / Recraft / client key) executes; no key → the same briefs route to curated stock direction or commissioning, same bar.
- **Audit:** `taste-skill` restraint audit on the set board → this pack's QA stations (no web instrument applies; stations are visual and ledger-based).
- **Polish:** regenerate or re-source against the named finding; never patch a tell in post. CD verdict language maps to style-lock edits, not per-asset fiddling.
- **Handoff:** the moment an asset needs interaction or realtime rendering, `threejs-webgl` / `react-three-fiber` under the website or app pack takes over; this pack still owns the material and lighting direction it inherits.
- Missing skill → the station's check runs manually per this pack's floors; note the degradation in the QA report.

## Pre-flight (builder self-check)

1. Every asset has a written job line.
2. Style-lock sheet exists and predates generation.
3. Tier doc names spot/hero/icon detail budgets.
4. Set board assembled, grayscale duplicate beside it.
5. One-visual-world test passed; outliers rejected, not excused.
6. Every generated asset passed the 200% tell pass (hands, text, texture).
7. Prompts and seeds logged per generated asset.
8. License ledger has a row for every shipped asset.
9. Icons overlay clean on the declared grid; optical corrections applied.
10. Dominant colors sampled and mapped to palette or named extensions.
11. Every asset viewed at real placement size on its real surface.
12. Resolution and format match the surface spec (2x web, 300dpi print, exact icon multiples).
13. Text inside images is real type or absent.
14. 3D stills obey the capped material list and one light logic.
15. File structure and naming a maintainer can navigate; source files layered where authored.
16. No-API deliverables: every stock candidate carries crop and treatment notes tied to its brief.
