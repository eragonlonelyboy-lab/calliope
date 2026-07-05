# Pack: video

Optional service line: brand motion pieces, product explainers, social video, animated logos and stings. Primary render path is HyperFrames-style: motion authored as HTML+GSAP timelines, rendered to MP4. This keeps motion in the same craft stack as web work: the same easing vocabulary, the same timeline discipline, the same skills. BYO generation APIs (runway-class) are offered but optional; asciinema/agg and ScreenToGif are the house pattern for product demos.

## Bar interpretation

1. **Point of view, not a template.** The piece has one authored motion idea derived from the brief, stated in one sentence on the storyboard. Test: describe the piece without naming the client; if the description is "logo fades in, features slide up, CTA", fail.
2. **Typography that does work.** On-screen type is set, not defaulted: kinetic type carries the message when there is no VO; scale and weight decisions survive a paused frame. Test: pause on any title card; it must hold up as a designed still.
3. **Restrained color system.** The video uses the client's system (surface/ink/accent/signal), graded consistently across every shot. Test: pull 5 random frames; palettes must match each other and the brand system.
4. **Hierarchy that breathes.** One focal element per beat; the eye is led, never asked to scan. Hold time is a design decision: no beat shorter than a viewer needs to read it. Test: frame-step through a transition; at no point do two elements compete for entry attention.
5. **Imagery with intent.** Every shot, screen capture, and generated frame does a job the storyboard names. Test: caption each board panel with its job; "b-roll energy" fails. Generated footage (BYO API) passes only when art-directed by prompt brief, same rule as stills.
6. **Motion that whispers.** This is the whole medium here. One authored idea per piece; easing consistency across every element (one easing family, declared); no default-preset energy (no stock After Effects bounce, no template whoosh-everything). Test: list every ease used in the timeline; more than two families without a stated reason fails.
7. **Designed for its surface.** 16:9, 9:16, and 1:1 are three different designs, not one crop. Per-platform duration, caption, and safe-zone norms applied. Test: the 9:16 cut reviewed as its own comp: type reset for the frame, focal action inside the safe zone, not letterboxed desktop.
8. **The invisible expensive stuff.** Clean render (no dropped frames, no compression banding on gradients), loudness normalized, captions accurate and styled, honest file naming and delivery structure, licensed music and fonts documented.

## Benchmark

**Saul Bass title sequences** (idea-first motion): what to steal: one graphic idea carries the whole piece; motion exists to deliver that idea, never to decorate. The standard, not the paper-cutout style. **Apple event opening films** (pacing): beat structure locked to intent: long confident holds, cuts that land on emphasis, silence used as a beat. Steal the discipline of holds, not the budget. **Ordinary Folk studio work** (easing personality): easing as a brand voice: their curves are recognizable without a logo on screen. Steal the idea that an easing family is an identity decision made once. **Stripe product motion** (restraint): UI motion that explains state, nothing moves that does not inform. Steal for explainers: motion answers "what changed", never "look at me".

## Measurable floors

| Floor | Value |
|-------|-------|
| Frame rate | author and render at 60fps for motion pieces; 30fps minimum acceptable for talking-head/demo content; zero dropped frames in the render log |
| Resolution | 1920x1080 minimum 16:9; 1080x1920 for 9:16; 1080x1080 for 1:1; 4K only when the client's channels use it |
| Duration caps | sting/logo: ≤3s; social cut: ≤30s (platform-adjusted, 15s target for feed); explainer: ≤90s default, 120s hard cap without client sign-off; hero loop: 6-15s |
| Loudness | -14 LUFS integrated (streaming norm), true peak ≤ -1 dBTP, when sound exists |
| Captions | 100% of spoken words captioned; caption contrast passes WCAG AA against its backing; inside platform safe zone |
| Hook | for social: the concept is legible by second 2 with sound off (frame 1 is not a logo on white) |
| Explainer pacing | VO at 130-160 words per minute; every VO sentence has a matching visual beat (no orphan narration) |
| File size | H.264 high profile, 8-12 Mbps at 1080p30, 12-20 Mbps at 1080p60; a 30s social cut over 60MB fails sanity |
| Loop seam | for loops: frame N to frame 1 transition indistinguishable at full speed and at frame-step |

## QA stations

Web stations do not apply; this pack replaces them:
1. **Frame-step review**: step through every transition at frame level; check entry/exit overlap, easing consistency, paused-frame typography.
2. **Muted pass**: watch the full piece with sound off; concept must survive (most social playback is muted).
3. **Sound pass**: loudness meter (ffmpeg loudnorm or equivalent) against -14 LUFS / -1 dBTP; check sync of sound beats to visual beats.
4. **Caption check**: transcript vs captions word-for-word; styling, contrast, safe-zone position per aspect.
5. **Per-aspect render check**: each delivered aspect reviewed as its own piece on a device that shape (phone for 9:16, not a resized desktop window).
6. **Loop seam check**: loops played 3+ cycles watching only the seam.
7. **Render hygiene**: no dropped frames, no banding on gradients, bitrate/size within floor, correct color range (no washed or crushed export).
8. **Hook check**: first 2 seconds reviewed in isolation against the sound-off legibility floor.

## Technique atlas

| Technique | When to use | Slop version | Implemented by |
|-----------|-------------|--------------|----------------|
| Motion-brand language | Every engagement: define weight (heavy/light), easing family, tempo before any timeline is built | Motion decided per-shot; the brand moves differently in every scene | `taste-skill` (direction) + `gsap-core` easing docs |
| Storyboard-first discipline | Always: boards with beat timings and the one-sentence motion idea before any frame is authored | Animating straight into the timeline and "finding it" | house process; board is a gate artifact |
| Easing as voice | Choosing the curve family: springs read playful/physical, power curves read engineered/confident, linear reads mechanical/deliberate | Default ease-in-out on everything; or five families in one piece | `gsap-core`, CustomEase via `gsap-plugins` |
| Kinetic typography | Type-led pieces and captions-as-design; type enters/exits on the VO or beat grid | Words flying in from random directions per template preset | `gsap-timeline` + SplitText via `gsap-plugins` |
| Sting/logo animation | Brand mark reveal: under 3s, one idea (a property of the mark animates, not the whole mark juggling) | Logo spins/bounces/glows through six effects in 3 seconds | `gsap-timeline`, boarded as 3-5 keyframes first |
| Explainer pacing | Product explainers: write VO first, mark beats, one visual change per sentence | Wall of narration over one static screen; or cuts every second regardless of meaning | boards + `gsap-timeline` beat markers |
| Sound-design direction | Concept tier only: sound described per beat (texture, hit points) with licensed-source direction; never produced in-house | "Add epic music" as the entire audio plan; unlicensed tracks | written direction + licensed library links in delivery notes |
| Caption/silent-autoplay design | All social output: design assumes muted playback; captions are a typographic layer, not an afterthought burn-in | Auto-generated captions in default yellow, cropped by the UI | kinetic-type treatment via `gsap-timeline`; safe-zone template per platform |
| Loop craft | Hero/ambient video: motion designed as a cycle (positions and velocities match at seam), not a clip with a crossfade patch | Obvious seam hidden with a fade to black | `gsap-timeline` with `repeat: -1` authored cyclically, rendered one exact cycle |
| Terminal/product demo capture | Dev-tool demos: asciinema/agg for terminal, ScreenToGif for UI; trim dead time, script the session first | Raw unedited screen recording with cursor wandering | asciinema + agg (house pattern), ScreenToGif |
| Generated footage (BYO) | Client supplies runway-class API keys and the concept needs live-action-like texture no other path gives | Generated clips as filler b-roll; uncanny artifacts shipped unreviewed | BYO API + art-director prompt brief; frame-step QA mandatory |

## Treatment flavor

Stylescape = the one-sentence motion idea + storyboard (boards with beat timings, always before frames) + a motion-language card (weight, easing family with named curves, tempo in beats) + type-in-motion sample + sound direction paragraph. Temperatures: mild = type and brand elements move, no camera, one easing family, cuts on beat; medium = one signature motion moment (the sting, the hero transition) plus supporting quiet motion; hot = the piece is one continuous choreographed idea (HyperFrames energy: HTML+GSAP scene rendered as a film). Technique palette names atlas rows with the job each does.

## Research notes

Phase 4 adds: platform norm check for the client's actual channels (current duration/caption/safe-zone specs per platform, they drift yearly); competitor motion audit (pull 3 competitor videos, log their easing energy and pacing: quiet confidence is often the open lane); music licensing landscape for the client's budget tier (named libraries, not "we'll find a track"); playback context check (where will this actually run: muted feed, booth screen with sound, website hero loop) since context sets the floors that apply.

## Gate wiring

- **Build:** `taste-skill` (motion-language card, anti-preset direction) → `gsap-core` + `gsap-timeline` (the motion engine: timelines, position parameters, beat sequencing) → `gsap-plugins` (SplitText for kinetic type, CustomEase for the declared easing family) → `motion-dev-animations` when the piece is authored inside a React surface. Render: headless capture of the HTML+GSAP scene to frames → ffmpeg to MP4 at the floor's bitrate; asciinema/agg or ScreenToGif for demo capture.
- **Audit:** frame-step and muted passes are manual stations (no lint exists for taste in motion); ffmpeg loudnorm for the loudness row; design-motion-principles audit mode on the timeline (one-idea check, frequency gate) when installed.
- **Polish:** CD verdict language maps to timeline edits: "heavier" = longer holds and weightier easing, "quieter" = fewer simultaneous movers, "tighter" = trim dead frames between beats.
- Missing skill → the check runs manually per this pack's floors; note the degradation in the QA report. Missing BYO API → generated-footage rows are simply out of scope, never faked.

## Pre-flight (builder self-check)

1. The one-sentence motion idea is written and the piece still matches it.
2. Storyboard exists and predates the timeline (boards before frames, always).
3. Easing family declared; timeline audited against it, exceptions justified in a comment.
4. Every element's enter/exit is a decision (no unremoved defaults).
5. Paused-frame test passed on all title cards.
6. Muted watch-through: the concept survives.
7. Captions complete, styled, inside the safe zone.
8. Loudness measured at -14 LUFS, true peak ≤ -1 dBTP (or the piece is declared silent).
9. Each aspect reviewed on a device of its shape.
10. Duration inside the format cap.
11. First 2 seconds legible sound-off (social).
12. Loop seam invisible at frame-step (loops).
13. Render log clean: no dropped frames, no banding on gradients.
14. Bitrate and file size inside floor.
15. Music and fonts licensed, documented in delivery notes.
16. Delivery structure honest: named cuts per aspect, source project included.
