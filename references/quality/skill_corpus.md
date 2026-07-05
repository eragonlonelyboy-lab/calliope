# Skill corpus map (gate wiring)

The installed design stack, cataloged: what each skill does inside a CALLIOPE engagement, which gate/moment fires it, and the degradation when it is missing. Packs name skills from THIS list in their Gate wiring sections; a skill not listed here is not wired.

Detection: a skill is "installed" when its folder exists under `~/.claude/skills/` (or it appears in the session's available-skills list). Check before wiring; degrade gracefully, never fail an engagement on a missing skill.

## Build-time (builders load these)

| Skill | Job in CALLIOPE | Fires at | Missing → |
|-------|-----------------|----------|-----------|
| taste-skill | anti-slop layout/type/spacing; 3 dials set from motion appetite + density answers | website/app/slides build start | pack's bar + pre-flight carry the load manually |
| gsap-core / gsap-timeline / gsap-scrolltrigger / gsap-plugins / gsap-utils / gsap-react / gsap-performance / gsap-frameworks | THE animation implementation authority (official GreenSock) | any palette item naming a GSAP atlas technique | no GSAP work is improvised; motion downgrades to CSS-only with a noted degradation |
| threejs-webgl / react-three-fiber | WebGL/3D scenes (hero + ambient, 3D scroll) | palette names a 3D technique | 3D treatment temperature capped; offer Directed-external route |
| motion-dev-animations | React component animation (Motion.dev authority) | React app/site micro-interactions | gsap-react covers, or CSS transitions |
| frontend-slides | HTML slide decks | slides pack, HTML deck path | pptx path instead |
| pptx | programmatic .pptx generation | slides pack PowerPoint path + powerpoint adapter Tier 1 | HTML deck + PDF export path |
| pdf | PDF generation/manipulation | pdf pack builds + exports | HTML-to-PDF pipeline, degradation logged |
| brandkit | premium brand-board/identity image generation | brand pack stylescapes + packaging mockups | art-directed briefs only (no generated boards) |
| imagegen-frontend-web / imagegen-frontend-mobile | art-directed design-reference imagery (web sections / mobile screens) | treatment stylescapes, Art Director reference boards | reference boards described in words + named references |
| image-to-code-skill | design-image → implementation fidelity path | when a treatment ships as images first, then code | builder works from stylescape + DESIGN.md directly |

## Audit-time (QA + CD load these)

| Skill | Job | Fires at | Missing → |
|-------|-----|----------|-----------|
| impeccable | `npx impeccable detect` (27 anti-patterns, no API key) + audit command | every web/app QA round | stations run manually per pack floors; log degradation |
| design-motion-principles | frequency gate + motion audit (Create + Audit modes) | every animation before CD gate | atlas slop-columns applied manually |
| ui-ux-pro-max | rubric/anti-pattern search, rubric-mode ONLY | app/web audits WHEN a design system is locked; NEVER `--design-system` on a locked system | pack floors only |
| redesign-skill | existing-site audit vocabulary (generic-AI-pattern detection) | redesign engagements, Phase 0.5/4 | strategist audit covers |

## Polish-time (CD verdict language → commands)

| Skill | Job | Fires at | Missing → |
|-------|-----|----------|-----------|
| impeccable | one-word polish commands (quieter, bolder, polish, delight...) mapped from CD verdict language | post-gate refinement rounds | builder applies verdict manually |
| veritas | full prose engine (see SKILL.md non-negotiable #6) | all client-facing prose | embedded lite core (`veritas_lite.md`) |

## Upstream / reference (not wired into gates; consulted)

| Skill | Role |
|-------|------|
| website-playbook | the house website pipeline; website pack's extended corpus |
| decision-maker | ancestor of the adapter prompt-dialect layer (4-downstream-prompts format); Full-path brief ritual overlaps Phases 1-3: CALLIOPE's interviews supersede it inside an engagement |
| Textura pipeline | hero-reference + asset steps of the house website pipeline; used when the website pack's Full path is invoked |
| stitch-skill | DESIGN.md-style spec format consumed by the Stitch adapter |
| gpt-tasteskill | alternate taste ruleset; reference only (taste-skill is the wired authority; do not run both as gates) |

## Corpus rules

- One authority per domain: official gsap-* skills are the sole GSAP authority; motion-dev-animations the sole Motion authority; taste-skill the wired taste gate (gpt-tasteskill reference-only). Conflicts resolve to the authority, and the pack says so.
- Every degradation is logged in the QA report ("station X ran manually: impeccable not installed").
- New skills enter engagements by being added HERE first (with job, gate, degradation), then named in a pack's Gate wiring. No ad-hoc wiring mid-engagement.
