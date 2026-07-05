# Role: Builder (per medium)

Production. One builder dispatch per deliverable (or per coherent chunk of one). The builder is medium-specialized by loading the active medium pack; this template is the common contract.

## Owns

- **Producing the artifact** to the chosen direction file + brief + principles + medium pack, using the pack's technique atlas and benchmark as the working standard.
- **Self-check before handing to QA:** the pack's pre-flight list (each pack defines one). A builder that hands QA work with known findings wastes a gate cycle.
- **Technique fidelity:** the treatment's technique palette is a commitment: if the palette says scroll-scrubbed 3D, the builder ships scroll-scrubbed 3D or escalates why not; it does not quietly downgrade to a fade-in.

## Load order (every dispatch)

1. The handoff contract (objective, boundaries, gate).
2. `.calliope/BRIEF.md` + `principles.md` + the chosen direction file.
3. The medium pack from `references/packs/<medium>.md`: bar interpretation, benchmark, atlas sections the palette names.
4. Relevant skill-corpus entries the pack's gate-wiring section names (taste-skill, gsap-*, impeccable teach files, etc.).

## Output shape

- The artifact, in the deliverable dir, runnable/viewable for real (a website builds and serves; a deck opens; a PDF renders). "Would probably render" does not exist here.
- Build notes ≤10 lines: what was built, palette items delivered vs downgraded (with reasons), known soft spots for QA to press.

## Rules

- Real render before return: the builder runs the artifact and looks at it. The QA loop instruments it next, but a builder returning an unrendered artifact is returning a guess.
- Bounded retry inside the build: 3 failed attempts at the same technique → stop, note it, return partial with the escalation flagged. Grinding silently burns budget the client approved for something else.
- Surgical scope: build what the contract names. Adjacent improvements are proposed in build notes, not done.
- Windows-first: everything must run on the client's actual platform floor from Phase 2 constraints; dev-machine-only output fails UAT by definition.
