# The slop fingerprint sweep (audit instrument)

Every AI design output carries a fingerprint. This sweep names the tells so the QA role can hunt them deterministically; each hit is a FINDING in the audit-redo loop, not a taste question. Run it on every website, landing page, and deck artifact before any client checkpoint. Distilled from a designer's field checklist supplied 2026-07-10 and folded into the instrument station list.

## The fingerprint (tells the generator cannot see; each hit is a finding)

1. **Eyebrow text above the headline.** A short uppercase line sat above the H1, on every page. Remove unless the brand system explicitly earns it.
2. **Italic serif headline with one colored word.** "Build something *beautiful*." The default flourish. Kill it unless the brief calls for serif; check every heading.
3. **Numbered section labels.** "Section 1", "Section 2": reads like a slide deck, not a site. Strip the labels; the design carries the structure.
4. **Stock imagery that does not match the copy.** Dog photos on a medical site. A non-designer client spots this before anything else. Audit every image against the sentence beside it.
5. **Logo strip rendered as typed-out names.** A row of company names in text where brand logos belong. Get the real assets, place them, re-render.
6. **Brand colors close but not exact.** Off by a few percent. Feed hex codes directly; verify computed values against the client's existing assets (the DOM-computed-values station catches this; this line says to actually compare against the brand source, not the stylesheet).
7. **The client's logo replaced with text.** Default generator behavior. Place the real SVG and check all three homes: navbar, footer, favicon.

## The quality pass (before anything reaches the client)

1. **Spacing is consistent across sections.** Padding, gutters, and gaps follow one system; drift between sections is the loudest tell. (Instrumented: spacing-scale conformance station.)
2. **One font family, used with intent.** Fonts creeping in mid-page is a giveaway. Lock to one or two; check every heading and button. (Instrumented: type-scale conformance station.)
3. **Type hierarchy actually works.** Headings, body, captions clearly distinct; the eye travels in the intended order.
4. **Imagery reinforces the headline.** If the eye lands on a feature instead of the offer, re-direct the image, not the copy.
5. **Interactive elements actually function.** Animations, scroll behavior, mobile responsiveness: the first pass usually looks right and does not behave right. Drive the interactions on the rendered artifact; looking is not testing.
6. **Code is clean, no dead artifacts.** Orphaned classes, unused divs, broken links. Generators rarely clean up after themselves.
7. **The hero tells the right story.** Flashy but wrong is still wrong: does the first viewport sell the offer? This one takes judgment; pair it with the seven-laws first-scroll check (`references/packs/website-seven-laws.md`, Law III).

## The rule of thumb (the frame for every engagement)

Generated design is the pitch and the proof of concept, never the final. Nothing ships without the human-standard pass; in CALLIOPE that pass IS the gate, and this sweep is one of its instruments. The gate does not soften because the generator was impressive.

## Coverage manifest (source to instrument)

Fingerprint side: eyebrow text > F1. Italic serif + colored word > F2. Numbered sections > F3. Mismatched stock images > F4. Logo strip as typed names > F5. Near-miss brand colors > F6. Logo replaced with text > F7. Quality-pass side: consistent spacing > Q1. One font with intent > Q2. Type hierarchy > Q3. Imagery matches copy > Q4. Interactive elements function > Q5. Clean code, no dead artifacts > Q6. Hero tells the right story > Q7. Rule of thumb (pitch and proof, never final without a human pass) > closing frame.
