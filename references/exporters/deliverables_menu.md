# Deliverables menu (Phase 7)

Walk this menu with the client after a direction is approved. Every item gets a plain-language effort estimate before selection (cost-transparency rule). Selections become the production backlog in STATE.md; each maps to an exporter or build path below.

| Deliverable | What the client gets | Exporter / path |
|-------------|---------------------|-----------------|
| **The build** | The artifact itself, produced by the medium pack's builder + gated | medium pack, Phase 8 |
| **DESIGN.md** | Portable design-system spec any AI tool or developer can consume | `design_md_schema.md` |
| **Brand kit + governance** | Asset kit + do/don'ts + rollout checklist (+ optional HTML brand portal) | `brand_governance.md` |
| **Asset / icon pack** | Art-directed asset set with license ledger | Art Director, `.calliope/assets/` |
| **Copy pass** | Voice card + rewritten copy across named surfaces | Copywriter role |
| **Dev tokens** | tailwind.config.ts, CSS custom properties, tokens.json, SVG set | `dev_tokens.md` |
| **Figma / Canva handoff** | The system rebuilt in the client's tool for their team's future work | adapters: figma.md / canva.md |
| **Video** | Motion piece per the video pack | packs/video.md |
| **Case study** | Challenge/approach/outcome, client-facing | `case_study.md` |

## Menu rules

- The build is not mandatory: brief + system + handoff (no build) is a legitimate engagement (the client's team builds).
- Every selected item is UAT-checkable: when the client picks it, state its acceptance shape in one line ("dev tokens = the three files import cleanly into a fresh project").
- Unselected items are recorded as declined-with-date (clients circle back; the menu re-opens at close).
- Bundling: DESIGN.md + dev tokens travel together at near-zero marginal effort; say so.
- Maintainability routing: if Phase 2 said the client's team maintains the work in Canva/Figma/PowerPoint, the handoff deliverable is not optional garnish; flag it as the survival layer for the system.
