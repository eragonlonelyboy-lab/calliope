# Adapter: PowerPoint

## Tier & detection

Native ceiling: Tier 1 equivalent, without any MCP. There is no PowerPoint MCP in this stack and none is needed for new decks: the locally installed `pptx` skill (python-pptx based) generates real .pptx files programmatically. CALLIOPE builds the file, the user opens it in desktop PowerPoint and reviews. That is direct drive in everything but name, and it is the default for any new deck.

- Tier 1 equivalent: the `pptx` skill is available in the session (anthropic-skills plugin). Detection: the skill appears in the available-skills list. If it does, generate; do not walk the user through building slides by hand.
- Tier 2: watch and guide via screen or browser access. Used when the job is editing an existing client deck in place, where regenerating would destroy hand-built content, animations, or comment history. The user's hands, CALLIOPE's eyes.
- Tier 3: instruction plus screenshot round-trips. The floor when the pptx skill is unavailable and no screen access exists. Batch corrections; round-trip economy applies.

Decision rule: new deck or full redesign of a deck CALLIOPE owns the spec for = generate. Surgical edits to a client-owned deck = Tier 2. Neither available = Tier 3. State the operating tier in every gate report.

## Capabilities & limits

Programmatic generation does well: slide masters and layouts defined once and applied consistently, exact positioning in EMUs (no eyeballing), native charts from data, tables, brand-token consistency across every slide (one palette definition, zero drift), speaker notes, and deterministic regeneration from a spec. The whole deck is reproducible; a corrected spec yields a corrected deck.

It does poorly: SmartArt (effectively unsupported; rebuild as positioned shapes instead), complex animation and slide transitions (basic entrance effects at best; anything choreographed is a hand step), embedded video (linking and codec behavior varies by machine; treat as a Tier 2 finishing step), and morph-style native tricks.

PowerPoint has its own gravity: default Office themes, title-plus-bullets layouts, walls of bullet points, clip-art-era chart styling. The slides medium pack's bar overrides all of it. One takeaway per slide as the title, content blocks that argue the takeaway, brand tokens instead of theme defaults, and no bullet wall survives a gate. Generation makes this enforceable because the layout vocabulary is fixed in the spec, not improvised per slide.

## Walkthrough script

Tier 1 equivalent (the generate-open-review loop):

1. Write the deck spec (see prompt dialect below) from the brief and the brand system. Gate the spec before generating anything.
2. Generate the .pptx via the pptx skill (see pptx skill docs for invocation detail) into the engagement's working directory.
3. User opens the file in desktop PowerPoint and reviews. If screen access is granted, CALLIOPE audits live; otherwise the user returns screenshots of flagged slides.
4. Corrections go into the spec, never into the file. Regeneration must be idempotent: an updated spec regenerates the corrected deck from scratch. Hand-patching the .pptx and then regenerating loses the patch; this is the cardinal sin of the loop.
5. Repeat generate-review until the gate passes.
6. If the client will hand-edit after delivery, the final handoff switches to hand-off-and-stop mode: the last generated file becomes theirs, the spec is archived as the record, and no further regeneration happens. Any later change request starts a new engagement round at Tier 2.

Tier 2 (editing an existing client deck):

- Never regenerate over a client-owned file. Guide edits one at a time with concrete anchors ("Home ribbon, Layout dropdown, pick Title and Content"). Verify each step by looking before issuing the next. Use Slide Master view for systemic fixes so the correction propagates instead of being repeated per slide.

Tier 3 (blind coach):

- Send per-slide instruction blocks: layout name, exact text, positions in centimeters, fill and font values from the brand tokens. User builds, screenshots, returns; CALLIOPE audits and sends one batched correction block. Mark all findings as visually-verified-only.

## Prompt dialect

Here the dialect is a spec dialect: the deck spec is the prompt, and generation consumes it. Two layers:

Theme layer, defined once from the brand system: palette (hex per token role), heading and body typefaces with fallbacks, master layouts by name (title, section divider, one-column argument, two-column compare, full-bleed image, data slide), logo placement, footer rules, aspect ratio (16:9 unless the client's masters say otherwise).

Per-slide entries, one block each:

- layout: master layout name from the theme layer
- title: the takeaway as a full assertion, not a topic label ("Churn concentrates in month two", not "Churn analysis")
- blocks: ordered content blocks with type (text, chart, table, image), content or data, and position ref if off-layout
- assets: refs into the engagement asset directory, never embedded blobs in the spec
- notes: speaker notes verbatim

What confuses generation: vague positioning ("put it near the top"), styling instructions inline in content ("make this pop"), and bullet lists pasted as prose. Numbers, token names, and layout names; nothing else survives contact.

## Export & handoff path

- Native deliverable: the .pptx itself, out of the generation step, into the engagement deliverable directory.
- Read-deck variant: PDF export (File, Export, Create PDF) for decks that will be emailed or read without presenting. Fonts and layout freeze; nothing shifts on other machines.
- Template handoff: deliver the master and layouts as a .potx (or a clean .pptx labeled TEMPLATE) so the client's future slides inherit the system instead of reverting to Office defaults. Walk them through File, New from template once at Tier 2.
- Fonts: on Windows, embed via File, Options, Save, "Embed fonts in the file" (embed all characters if the client edits). Note the trap below; PDF sidesteps it entirely for read-only use.
- Chain of custody: the direction file records spec version, generated file hash or timestamp, and the moment hand-off-and-stop mode was entered.

## Known failure modes

- Font substitution: a machine without the brand fonts silently swaps them, reflowing every text box. Recovery: embed fonts on save (Windows), verify by opening on a second machine or account, and ship PDF for anything read-only. Never gate-pass typography on the authoring machine alone.
- Image compression: PowerPoint's default save compresses images to 220 ppi or lower, degrading hero assets. Recovery: File, Options, Advanced, "Do not compress images in file", or set default resolution to high fidelity before the first save; re-insert any asset already degraded.
- Aspect-ratio mismatch: pasting into or inheriting from a legacy 4:3 master stretches or letterboxes 16:9 content. Recovery: check Design, Slide Size first; if the client's master is 4:3, decide once at spec time, never mid-deck.
- Version-compat quirks: older PowerPoint or LibreOffice renders modern chart styles, some fonts, and grouped shapes differently. Recovery: ask what the audience opens the file in; when unknown, keep to conservative constructs and verify via PDF comparison.
- Autosave and OneDrive sync conflicts: during review rounds a file open in PowerPoint with AutoSave on can conflict with a freshly regenerated file of the same name, producing forked "conflicted copy" versions. Recovery: user closes the file before each regeneration, or regeneration writes versioned filenames (deck_v3.pptx) and only the final handoff gets the clean name.
