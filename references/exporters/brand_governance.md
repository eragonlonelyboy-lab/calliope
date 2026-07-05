# Exporter: brand kit + governance layer

The kit keeps the brand usable after CALLIOPE leaves. Governance is what makes it survive contact with the client's org: rules, rollout, and an optional portal.

## Brand kit contents

- Logo variants (full/mark/mono/reversed) in SVG + PNG at named sizes, with clear-space and minimum-size rules stated per variant.
- Color system (values in hex/RGB/CMYK-annotation at concept tier) with job definitions and contrast-safe pairings.
- Type stack: files-or-license-pointers, scale, usage rules per level.
- Imagery style-locks + 3-5 exemplar assets from the engagement.
- Templates the client selected (social, deck master, doc header) in their maintainable tool (routes through the Canva/PowerPoint/Figma adapters).

## Governance layer (the do/don'ts + rollout)

1. **Do/don'ts**: per system element, the 3-5 violations actually likely in THIS org (from the ingest gap list: what they broke last time predicts what they break next). Visual pairs (correct vs violation) beat prose.
2. **Rollout checklist**: ordered, owned, dated: where the old brand lives (site, decks, social, signatures, invoices, packaging), who replaces each, in what order, and the "mixed-brand period" rule (what may coexist and for how long).
3. **Decision rights**: who may approve new applications, who may NOT change the system, where change requests go. One table. (Without this the system dies by a thousand well-meant tweaks.)

## Optional HTML brand portal

A single self-contained HTML page (offline-capable, no external requests): the system browsable + copy-paste token values + downloadable assets. Build it with the website pack's floors (it is a website deliverable: contrast, keyboard, honest structure); gate it like one. Portal ships only when selected: it is the premium presentation of the governance layer, not a replacement for the files.

## Acceptance shape (UAT lines)

Kit: every listed asset opens and matches the gated system values. Governance: the rollout checklist names an owner per row. Portal (if selected): renders offline, zero console errors, values copy-paste correct against tokens.json.
