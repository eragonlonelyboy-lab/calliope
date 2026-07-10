# Pack: website

The reference pack: it existed before CALLIOPE (the house website playbook + $10K bar + the Blacksmith benchmark) and sets the depth standard for the other eight. When the full house playbook is installed (`~/.claude/skills/website-playbook.md`), it is this pack's extended corpus; this pack stands alone when it is not. This pack judges craft; the strategy layer above it (one job, first scroll, copy before design, the five-question audit) lives in `website-seven-laws.md` and loads earlier, at Phase 1 to 2.

## Bar interpretation

1. **Point of view, not a template.** The site takes one visual position derived from the brief. Test: swap in a competitor's logo and copy; if the site still works, fail. Hero section is the first proof: a hero that could headline any SaaS fails.
2. **Typography that does work.** No Inter/Roboto-because-default. Display + text pairing with a reasoned scale (name the ratio); type carries hierarchy before color does. Test: strip all color; the page must still read in the right order.
3. **Restrained color system.** 3-5 colors with named jobs (surface/ink/accent/signal). Test: point at any colored element and name its job from the system; an unnameable color fails.
4. **Hierarchy that breathes.** One primary action or message per viewport; whitespace is layout, not leftover. Test: squint test per section: exactly one thing wins.
5. **Imagery with intent.** Art-directed or absent. Every image traces to an Art Director brief tied to the treatment. Test: caption each image with the job it does; "decorates the section" fails.
6. **Motion that whispers.** Choreographed, purposeful, per the motion appetite from Phase 2. AOS-fade-up-on-every-section fails. Frequency-earned: elements a user sees often move least (Conversion profile) or motion IS the concept (Experiential profile), never accidental middle.
7. **Designed for its surface.** Mobile is a design, not a reflow: navigation, density, and touch targets decided at mobile size. Test: mobile view reviewed as its own comp, not as "does desktop survive shrinking."
8. **The invisible expensive stuff.** Sub-2s perceived load (profile-adjusted), WCAG AA, full keyboard nav, semantic HTML, real meta/OG, honest file structure.

## Benchmark

**Project Blacksmith** (house benchmark, Experiential profile): prismatic-tunnel WebGL site: what to steal: WebGL as concept-carrier not garnish, progressive-load discipline, non-WebGL fallback, motion with one authored idea instead of twenty defaults. External standards: Stripe (docs type hierarchy: one family, weight+size only), Linear (restraint as brand: one accent, ruthless hierarchy), Apple product pages (scroll choreography that serves narrative, not spectacle).

## Measurable floors

| Floor | Experiential/WOW (default) | Conversion (explicit only) |
|-------|---------------------------|---------------------------|
| Load | 60fps + progressive-load budget; lazy WebGL init | Lighthouse ≥90 (hard gate); hero fits viewport |
| Frame rate | 60fps during interaction (DevTools measured) | 60fps on any animation present |
| Assets | WebGL budget: KTX2/Basis textures, Draco/meshopt geometry, capped DPR | ≤2MB per page |
| Contrast | WCAG AA all text pairs | WCAG AA |
| A11y | keyboard nav complete; prefers-reduced-motion honored (real fallback, not blank) | same |
| Hygiene | zero console errors; rAF suspended on hidden tab; non-WebGL fallback renders | zero console errors |

## QA stations

The default web station list in `references/quality/audit_redo_loop.md` applies in full: DOM computed values, `npx impeccable detect`, contrast, spacing/type-scale conformance, responsive floor, DevTools perf ritual, console/network. Experiential adds: fallback render with WebGL disabled; tab-hidden rAF check; DPR-cap verification on a high-density display profile.

## Technique atlas

Web techniques live in the shared atlas: `references/quality/technique_atlas.md` (GSAP core/timeline/ScrollTrigger, Three.js/WebGL, parallax, scroll choreography, see-thru scrub, mouse tracking, 3D scroll, DevTools perf ritual). The treatment's technique palette names atlas entries; the builder loads the implementing skills per Gate wiring below.

## Treatment flavor

Stylescape = hero concept + one interior section + type/color system board + motion storyboard (what moves, when, why: written, with reference clips where they exist). Temperatures: mild = the concept in layout and type only, motion minimal; medium = concept + signature motion moment; hot = GPU-driven, the site IS the concept (Blacksmith energy). Technique palette lists atlas entries by name with the job each does.

## Research notes

Phase 4 adds: competitor site performance snapshot (their Lighthouse/weight: being fast where competitors are slow is positioning); motion-language audit (what moves on competitor sites: whitespace often lives in restraint); device-mix reality check for the client's actual audience.

## Gate wiring

- **Build:** `taste-skill` (anti-slop layout/type/spacing; dials from motion appetite) → `gsap-*` official skills for animation implementation → `threejs-webgl`/`react-three-fiber` when the palette calls 3D → `motion-dev-animations` for React-Motion work.
- **Audit:** `impeccable` (`npx impeccable detect` + audit command) → design-motion-principles audit mode for every animation (frequency gate) → `ui-ux-pro-max` rubric-mode ONLY when a design system is locked (never `--design-system`).
- **Polish:** `impeccable` one-word commands (quieter/bolder/polish) driven by CD verdict language.
- Missing skill → the station's check still runs manually per this pack's floors; note the degradation in the QA report.

## Pre-flight (builder self-check)

1. Renders from a clean serve (not cached). 2. Hero states the point of view. 3. Type scale declared and applied (no orphan sizes). 4. Every color maps to a system job. 5. One winner per viewport (squint test). 6. Every image has its brief. 7. Motion inventory written (what/when/why per element). 8. prefers-reduced-motion path exists and renders. 9. Mobile comp reviewed at real width. 10. Keyboard walk completes. 11. Meta/OG/favicon real. 12. Zero console errors. 13. Fallback path (if WebGL) renders content. 14. File structure a maintainer can navigate. 15. Fonts licensed + subset.
