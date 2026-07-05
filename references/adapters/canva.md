# Adapter: Canva

## Tier & detection

Native ceiling: **Tier 1 when the Canva AI Connector is attached, Tier 2 otherwise, Tier 3 always.**

Canva ships an official remote MCP server (the "AI Connector") at `https://mcp.canva.com/mcp`, plus Connect APIs for programmatic design, autofill, and export. If a `mcp__canva__*` toolset (or an MCP server pointing at that URL) is present in the session, Tier 1 is live: CALLIOPE can search designs, autofill brand templates, generate with Canva AI, and export directly. Confirm the connected account's plan tier (free vs Pro/Teams) before promising Pro-only exports. Scope of write operations through the connector (fine-grained element edits vs whole-design generation) should be probed at session start: verify in session.

Detection order:
1. Tier 1: Canva MCP tools visible in session, or user confirms the AI Connector is linked to their Canva account.
2. Tier 2: Chrome extension or screen access granted and canva.com is open. Ask, then verify by looking.
3. Tier 3: floor. Prompt sheets + screenshots, always available.

Note the separate Canva Dev MCP server exists for building Canva apps; it is documentation tooling, not design driving. Do not mistake it for Tier 1.

## Capabilities & limits

Canva's role in CALLIOPE engagements is almost always the **client-maintainable deliverable**: social template systems, internal decks, one-pagers the client edits after handoff. When the design interview answers "who maintains this?" with "the client, non-designers," route here.

Strong: template systems with locked structure, brand kit enforcement (colors, fonts, logos centralized; Magic Design output respects it), fast social-format resizing, team sharing and folder handoff, Magic Studio generated fills and copy variants.

Weak or absent:
- No true CMYK export. PDF Print is 300 DPI but RGB; a CMYK color profile option exists on paid plans but professional print jobs still route through Acrobat/Affinity conversion. Never promise press-ready CMYK from Canva alone.
- Typography control is coarse: no real optical kerning, limited tracking granularity, no proper baseline grid. Anything type-led beyond a certain refinement bar belongs in Figma.
- Transparent PNG and SVG export are paid-tier features (Pro/Teams/Education/Nonprofits). Free accounts cannot deliver logo-grade assets.
- Pixel dimension caps on raster export exist (large canvases downscale silently): verify in session against the client's canvas size.
- Where it lies to you: the editor preview renders brand fonts even when a collaborator's account lacks the license; the substitution only shows on their screen or in export. Audit exports, not the canvas.

## Walkthrough script

Tier 1 (AI Connector attached):
1. Pull the client's brand kit and template folder; confirm brand colors and fonts match the direction file.
2. Autofill or generate against the locked template; export a proof (PNG or PDF) into the deliverable dir.
3. Run the audit-redo loop on the exported file, not a screenshot of the canvas.

Tier 2 (watch + guide):
1. User opens the design; CALLIOPE confirms brand kit is applied (check the Brand tab, not just visual match).
2. Direct edits by exact location: "left panel, Brand tab, click the H1 style" rather than "fix the heading."
3. Before export, walk the user through the download dialog settings explicitly (file type, transparent background toggle, PDF Print vs PDF Standard, pages).

Tier 3 (blind coach):
1. Send a spec sheet (format below) for the user to execute manually or paste into Magic Design/Magic Write.
2. User screenshots the result AND exports a file; audit the export.
3. Batch all corrections into one prompt per round trip; target three or fewer per element group.

## Prompt dialect

Canva (and its Magic Studio generation) executes structure well but drifts on typography and spacing. The dialect is **spec sheets, not adjectives**.

- Always exact values: hex codes (`#1A1A2E`), exact font names as they appear in the brand kit ("Archivo Expanded Bold," not "a bold condensed sans"), exact px sizes and canvas dimensions. "Make it feel premium" produces template soup; "88px heading, 1.1 line height, #F4F1EA background" produces the layout.
- Name the brand kit element, not the value alone, when one exists: "Brand color 2" survives client edits; a pasted hex does not stay linked.
- Template-lock strategy: lock everything that carries the brand (logo placement, color blocks, heading font and size, grid/margins) and leave editable only the content slots (body copy, photo frames, date fields). A template where the client can move the logo is a template where the logo will be moved. Set locks per element before handoff; verify lock behavior on the client's plan tier in session.
- Magic Studio fills: phrase as subject + style + constraint, one sentence, no mood words: "flat isometric illustration of a delivery van, two colors only, #1A1A2E and #F4F1EA, no gradients, no text." Always append "no text" to image generation; Canva's generated type is never on-brand.
- What confuses it: relative instructions ("slightly bigger," "more breathing room"), multi-step instructions in one Magic prompt, and references to elements by content rather than position.

## Export & handoff path

- Social/screen assets: PNG at exact px per platform spec; transparent PNG where needed (paid tier only). JPG only when file size forces it.
- Decks: PDF Standard for circulation; keep the editable Canva link as the real deliverable since the point is client maintenance.
- Print: PDF Print (300 DPI, crop marks and bleed toggled on in the download dialog), flagged RGB in the handoff notes; CMYK conversion happens downstream if a press requires it.
- The handoff IS the template system: transfer via Canva Teams shared folder or brand template publishing, with the brand kit populated in the client's own account, not CALLIOPE's. Record the folder link and template IDs in the direction file (chain of custody).
- Everything exported lands in the deliverable dir with the naming convention from the engagement brief; Tier 1 can export directly, Tiers 2/3 route through the user's downloads.

## Known failure modes

- **Silent font substitution.** A collaborator or the client's account lacks the brand font (uploaded fonts are per-team, licensed fonts per plan); Canva swaps it without warning on their screen and in their exports. Recovery: verify the font is in the CLIENT's brand kit before handoff, and audit an export made from the client's account, not yours.
- **Export color shift.** RGB-only pipeline means saturated brand colors dull in print; screen-to-PDF Print can also shift subtly. Recovery: proof print jobs from the actual PDF Print export early, and pre-agree acceptable delta with the client for print work.
- **Free-tier watermarks and paywalls.** Pro elements, some Magic Studio outputs, and premium template components watermark or block export on free accounts. Recovery: confirm the client's plan during the design interview; build only from elements their tier can export clean.
- **Autosave overwrites during collaborative edits.** Two people in one design means last-write-wins on the same element; there is no branch/merge. Recovery: never co-edit live during an audit pass; duplicate the design as a working copy, and use version history (paid tiers) to roll back. Version history depth per plan: verify in session.
- **Resize breaks locked layouts.** Magic Resize/Switch reflows elements and can unlock or misplace locked items across format variants. Recovery: treat each resized variant as a new audit target; never ship a resize unreviewed.
