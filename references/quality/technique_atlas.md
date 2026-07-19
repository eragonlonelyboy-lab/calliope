# Technique atlas (web motion + 3D)

This atlas names the techniques a treatment may put in its palette. Each entry says when the technique earns its place, what its slop mode looks like when it reads as template output, and which installed skill implements it. Ground rule: a technique with no design reason is a perf cost with no return.

## GSAP core tweening + easing discipline
**What:** Single tweens via gsap.to/from/fromTo with transform aliases (x, y, scale, rotation), autoAlpha, stagger, and a deliberate ease vocabulary (power curves, back, expo, CustomEase for signature curves).
**Earns its place when:** Any element needs entrance, exit, or state change with a specific personality. Easing IS the personality: one or two custom curves used consistently reads as a designed system.
**Slop mode:** Everything fades up 20px with the default power1.out at 0.5s. Mixed random eases across sections. gsap.from stacking causing flash bugs because immediateRender was ignored.
**Implementing skill:** gsap-core (plus gsap-utils for clamp/mapRange helpers).
**Perf notes:** Animate transforms and opacity only, never width/height/top/left. Use autoAlpha over opacity so hidden elements stop catching clicks. Budget: a tween is nearly free; the property choice is what costs.

## GSAP timelines (sequencing and choreography)
**What:** gsap.timeline() with the position parameter ("<", "+=0.2", labels), timeline defaults, and nested child timelines for multi-step choreography.
**Earns its place when:** Three or more elements must land in a rhythmic relationship: hero copy, then image, then CTA, with overlaps that feel composed rather than queued.
**Slop mode:** A strict one-after-another chain built with delay values instead of a timeline, or a timeline where every tween starts at ">" with equal gaps. Reads as a slideshow, not choreography.
**Implementing skill:** gsap-timeline.
**Perf notes:** Timelines cost the same as their tweens. The trap is control, not speed: keep ScrollTrigger on the timeline itself, never on child tweens, and pass shared duration/ease via defaults.

## ScrollTrigger scroll choreography (pinning + scrub)
**What:** Scroll-linked animation: toggleActions for discrete play/reverse, scrub (true or numeric lag) for scroll-tied progress, pin for holding a section while a timeline plays through it.
**Earns its place when:** The page has a narrative beat that deserves held attention (a pinned product reveal, a scrubbed sequence) and the content genuinely rewards slowing the scroll down.
**Slop mode:** Every section pinned, every element scrubbed, markers left in production, scrub and toggleActions on the same trigger. Pin-everything sites feel like being trapped in an elevator.
**Implementing skill:** gsap-scrolltrigger.
**Perf notes:** Pin only what is needed, pinning promotes layers. Numeric scrub (scrub: 1) smooths low-end devices. Create triggers in page order or set refreshPriority. Call ScrollTrigger.refresh() only on real layout change, debounced. Kill triggers on SPA navigation.

## Parallax
**What:** Layers moving at different scroll speeds (yPercent offsets on scrub, or useScroll + useTransform in Motion) to fake depth.
**Earns its place when:** There is real layered imagery with a foreground/background relationship, and the speed differential is subtle enough that the user feels depth without naming the trick. Two to three layers, small deltas.
**Slop mode:** The single most templated scroll effect on the web. Slop version: one hero image drifting at 0.5x behind text, on every section, with no compositional layering. If removing it changes nothing about the design, it was slop.
**Implementing skill:** gsap-scrolltrigger (scrub + yPercent); motion-dev-animations (parallax-layers example).
**Perf notes:** Transform-only movement, ease: "none" on scrubbed layer tweens. Large images on parallax layers are paint bombs: size and compress them, avoid parallaxing full-viewport photography on mobile.

## See-thru scrub (scroll-scrubbed reveal and mask effects)
**What:** Scroll-scrubbed reveals where content appears through a moving window: clip-path or overflow-clip masks tied to scrub, SplitText mask wrappers, DrawSVG stroke reveals driven by scroll.
**Earns its place when:** The reveal itself carries meaning: an image emerging as if developed, a headline surfacing line by line under a pinned beat. Best used once or twice per page as a signature moment.
**Slop mode:** Masked reveals on every image with identical timing, or a wipe that fights reading order. When the mask direction has no relationship to the layout's visual flow, it reads as a plugin demo.
**Implementing skill:** gsap-scrolltrigger (scrub) + gsap-plugins (SplitText mask option, DrawSVG); manual for clip-path values.
**Perf notes:** clip-path animates on the compositor in modern browsers but test it; mask-image often does not. Keep masked elements layer-promoted, avoid scrubbing filter or box-shadow alongside the mask.

## Mouse tracking (cursor-reactive elements)
**What:** Elements that follow, tilt, or magnetize toward the cursor: custom cursors, magnetic buttons, hover-tilt cards, spotlight follows.
**Earns its place when:** The site has an exploratory, tactile brief and the tracked element gives feedback about interactivity (a magnetic CTA, a cursor that changes over draggable regions). Desktop-only by definition; needs a touch fallback plan.
**Slop mode:** A laggy dot-and-ring custom cursor on a content site, or magnetic effects on every link. If the cursor effect obscures the native cursor's precision, it subtracts usability to add novelty.
**Implementing skill:** gsap-performance (gsap.quickTo pattern); motion-dev-animations (magnetic-button example, useSpring).
**Perf notes:** Never create a new tween per mousemove. gsap.quickTo or a spring value is mandatory: one reused tween, transform-only. Throttle nothing else onto the mousemove handler. Budget: tracked element updates must stay off layout entirely.

## 3D scroll (scroll-driven camera and scene movement)
**What:** Scroll position driving a Three.js camera path or scene transform: GSAP tweening camera.position with a scrubbed ScrollTrigger, camera.lookAt in onUpdate, or R3F ScrollControls.
**Earns its place when:** The 3D object is the product or the story, and scroll walks the user around it in deliberate beats. The camera move should feel authored, like a dolly shot, not a free orbit.
**Slop mode:** A model spinning at constant speed tied 1:1 to scroll with no framing changes, no lighting beats, no rest points. Reads as "we loaded a GLB."
**Implementing skill:** threejs-webgl (GSAP camera integration pattern) + gsap-scrolltrigger; react-three-fiber (ScrollControls) for React.
**Perf notes:** ease: "none" on scrubbed camera tweens. Update camera in the render loop, not via layout-touching DOM. On-demand rendering when the scene is idle. DRACO-compress models, keep hero scenes under a few MB of geometry and texture.

## Pre-rendered cinematic scrub (scroll-world)
**What:** Scroll scrubbing pre-rendered AI video instead of a live scene: Higgsfield scene stills (gpt_image_2) + camera-flight clips (Seedance/Kling) chained with frame-identical seams, played as one continuous no-cut flight by a portable blob-seek scrub engine. The camera genuinely moves; scroll only drives time (the Apple product-page technique). No WebGL at runtime.
**Earns its place when:** The treatment calls for photoreal or richly art-directed camera travel at a fidelity live WebGL cannot hit (the "PS2-look" failure mode), or the concept is a journey through spaces: walkthroughs, process stories, diorama worlds. Visual quality comes from the image/video model, not from runtime rendering.
**Slop mode:** Seam pops (connector endpoints taken from stills instead of the neighbouring clips' actual rendered frames), camera velocity reversing across a seam (rewind stutter), or the skill's isometric-diorama default applied unexamined to a brief whose tone asked for something else.
**Implementing skill:** scroll-world (`~/.claude/skills/scroll-world/`). Prereqs: Higgsfield CLI authenticated with credits + ffmpeg. Real spend: ~N image + (2N-1) video gens per build, 3-8 min each, plus NSFW-filter re-rolls on interiors.
**Perf notes:** Encode native res, crf ~20, small GOP (-g 8), blob URLs for seekability (byte-range-less hosts freeze seeks at frame 0). Mobile is beta (720p -g 4 siblings); the mechanic is desktop-native. In a CALLIOPE engagement the brief feeds the skill's Step 1 intake (skip its own interview), and the decider approves the scene stills (its Step 2) before any video credit is spent: static-frame-first.

## Three.js/WebGL scenes (hero + ambient)
**What:** Real-time 3D: hero scenes (a product model, a signature object) and ambient scenes (particles, gradient meshes, shader backgrounds) rendered via WebGL/WebGPU.
**Earns its place when:** The 3D content expresses something flat imagery cannot: material, dimension, configurability. Ambient scenes earn it only when they sit behind content at low visual volume and degrade gracefully.
**Slop mode:** The floating particle field or wobbling blob behind a hero headline, identical across a thousand agency sites. Also: full-bloom postprocessing on a scene whose content did not ask for it.
**Implementing skill:** threejs-webgl; react-three-fiber for React apps.
**Perf notes:** InstancedMesh for repeated objects, shared geometry, LOD for distance, power-of-two textures with correct color space. Dispose geometries, materials, and render targets on teardown or memory grows forever. Cap devicePixelRatio at 2. Ambient scenes should target a fraction of frame budget, not all of it.

## React-Motion (motion.dev) component animation
**What:** Declarative component animation in React/Next.js/Svelte: initial/animate/exit props, whileHover, whileTap, whileInView, layout prop for auto-FLIP, spring physics defaults.
**Earns its place when:** Animation state belongs to component lifecycle: mount/unmount transitions, list reorders, gesture feedback inside a React tree. It keeps motion co-located with the component that owns it.
**Slop mode:** whileInView fade-up on every card with identical 0.6s timing, spring wobble on elements that should feel precise, AnimatePresence forgotten so exits just pop.
**Implementing skill:** motion-dev-animations.
**Perf notes:** Transform and opacity only, explicit dimensions to keep CLS at zero, viewport={{ once: true }} unless re-trigger is intentional. Always wire prefers-reduced-motion fallbacks. Skill's own gate: 60fps or higher verified in DevTools, bundle under 50KB.

## Flip layout transitions
**What:** FLIP-based state transitions: Flip.getState(), mutate the DOM (reorder, reparent, class change), Flip.from() animates the difference. Motion's layout/layoutId props do the same declaratively.
**Earns its place when:** Elements move between two real layout states: filterable grids, expanding cards, shared-element transitions between views. The user keeps object permanence.
**Slop mode:** FLIP used for entrances that a plain tween handles, or grid filters where everything crossfades anyway so the position math is invisible.
**Implementing skill:** gsap-plugins (Flip); motion-dev-animations (layout prop).
**Perf notes:** FLIP is transform-only by design, that is the point. Use absolute: true when surrounding layout collapses mid-flight; simple: true when scale accuracy does not matter. Batch state capture before any DOM writes.

## SplitText typography reveals
**What:** Splitting headlines into lines, words, or chars for staggered reveals, with mask wrappers for clip reveals and autoSplit for font-load and resize safety.
**Earns its place when:** Typography is the design's lead voice and the headline deserves an entrance beat. Line-level masks read editorial; char-level reads expressive, use it where the brief supports drama.
**Slop mode:** Char-by-char stagger on every heading, body copy included. Also splitting before fonts load so line breaks land wrong. Per-character animation of paragraphs is the canonical AI-portfolio tell.
**Implementing skill:** gsap-plugins (SplitText).
**Perf notes:** Split only the granularity you animate (type: "lines" if animating lines). Use autoSplit with animations returned from onSplit. Set aria handling deliberately. Hundreds of char spans cost layout and memory; keep char splits to one or two elements.

## Draggable and inertia
**What:** Pointer-driven dragging with momentum: carousels, sliders, throwable cards, rotation knobs, via Draggable + InertiaPlugin, or Motion's drag prop with constraints.
**Earns its place when:** Content is genuinely explorable by hand: a project gallery, a comparison slider, a playful object. The inertia settle communicates weight and makes the interface feel physical.
**Slop mode:** A draggable carousel that also autoplays, fights native touch scroll, or hides critical content behind an unlabeled drag affordance.
**Implementing skill:** gsap-plugins (Draggable, InertiaPlugin, Observer for gesture direction); motion-dev-animations (drag prop).
**Perf notes:** type: "x" transforms only, bounds set so users cannot lose content, edgeResistance for feel. InertiaPlugin reuses its tracking; do not roll manual velocity math on top of it.

## Scroll smoothing
**What:** Smoothed, momentum-style page scroll via ScrollSmoother (wrapper + content DOM structure) or a third-party smooth scroller proxied through ScrollTrigger.scrollerProxy().
**Earns its place when:** The site is a scroll-driven narrative where scrub choreography benefits from interpolated scroll position, and the audience is desktop-first. It unifies the feel of heavy scrub work.
**Slop mode:** Smoothing bolted onto a content or commerce site, breaking scroll expectations, anchor jumps, and accessibility, purely because agency sites do it.
**Implementing skill:** gsap-plugins (ScrollSmoother); gsap-scrolltrigger (scrollerProxy for third-party scrollers).
**Perf notes:** ScrollSmoother needs the exact wrapper/content structure with fixed elements outside it. Third-party scrollers must call ScrollTrigger.update on every scroll or all trigger math drifts. Pins may need pinType tuned ("fixed" vs "transform") to stop jitter.

## Chrome DevTools perf ritual
**What:** The final gate before any motion-heavy page ships. Not a technique in the palette, a procedure that every palette must pass.
**Earns its place when:** Always. Every treatment, no exceptions. Run on a mid-range device profile (4x CPU throttle) as well as the dev machine.
**Slop mode:** Shipping on "it looks smooth on my machine." The slop is skipping the ritual, not the ritual itself.
**Implementing skill:** manual (procedure below); thresholds echoed in motion-dev-animations quality standards and gsap-performance.
**Perf notes:** The procedure:
1. Open DevTools Performance panel, start a recording, then perform the page's full interaction script: initial load, scroll top to bottom at reading pace, trigger every hover and drag effect, scroll back up.
2. Read frame timing in the recording: the frames track must hold a consistent 60fps through every animated region. Any red long-task marker over 50ms during animation is a fail; find the task, fix or defer it.
3. Layout-thrash check: in the recording's main thread, look for purple Layout blocks inside animation frames (forced reflow warnings). Any layout work triggered by an animation frame means a non-transform property snuck in; replace it.
4. Memory after 60s idle: open the Memory panel, take a heap snapshot, leave the page idle for 60 seconds with animations in their resting state, snapshot again. Growth between snapshots means leaked tweens, undisposed Three.js resources, or unkilled ScrollTriggers; unbounded growth is a hard fail.
5. Paint-flash pass: enable Paint flashing in the Rendering panel, replay the interaction script. Animated elements should flash only where compositing is expected; large green flashes on scroll mean paint storms from unpromoted layers or filter/shadow animation.
Pass thresholds: consistent 60fps throughout, no long tasks over 50ms during animation, zero forced reflows inside animation frames, no unbounded memory growth after idle, paints confined to intentionally repainting regions.
