# Pack: pdf

Print-adjacent documents: reports, whitepapers, proposals, one-pagers, brochures, editorial pieces. A PDF is a fixed canvas read in sequence; the design decisions are pagination decisions. Installed corpus: `pdf` (generation/manipulation toolkit) plus `taste-skill` for layout judgment.

## Bar interpretation

1. **Point of view, not a template.** The document has an editorial voice in its layout: grid, type, and pacing derived from this client's brief. Test: strip the logo from the cover and page 3; if it could be any consultancy's deck-as-PDF, fail.
2. **Typography that does work.** A heading system with declared levels (H1 to H3 max, each visually distinct without numbering), body type set for long-form reading, running heads and folios that orient without shouting. Test: open a random spread; reader can state chapter, section, and page role in three seconds.
3. **Restrained color system.** Ink plus 1-2 accents with named jobs (emphasis, data, wayfinding). Test: every non-black element names its job; decorative color on tables or headings fails.
4. **Hierarchy that breathes.** Whitespace is pacing: chapter openers get air, dense sections get relief pages or pull-quotes. Test: flip through at thumbnail size; density should visibly vary with the narrative, not sit uniform.
5. **Imagery with intent.** Figures, charts, and photos each carry a caption naming what the reader should take from them. Test: cover the caption; if the figure's job is unclear, the figure or the caption fails. Clip-art and unbriefed stock fail outright.
6. **Motion that whispers.** PDFs are static; the equivalent is reading rhythm. Pull-quotes, callouts, and section breaks are the choreography. Test: callouts appear where the argument turns, not on a fixed every-other-page schedule.
7. **Designed for its surface.** Page size is a decision (A4 or Letter, stated in STATE.md), and screen vs print duality is designed: single-page scroll reading works AND spreads compose if print is in scope. Test: reviewer confirms the page size was chosen for the audience, not inherited from a tool default.
8. **The invisible expensive stuff.** Fonts embedded, text selectable (never rasterized pages), real bookmarks and linked TOC, tagged reading order, sane file size, correct metadata (title, author). Test: run the hygiene station below; any miss fails.

## Benchmark

**Stripe annual letters** (editorial system): one text family doing all hierarchy work through size and weight, generous margins, charts in the brand accent only; steal the discipline of type-only hierarchy and chart restraint. **IBM report design language** (corporate authority): strict grid, bold numeric callouts, data tables with almost no rules; steal the confidence to delete lines and let alignment structure the table. **Craig Mod's essays-as-books** (pacing): full-bleed image pages as breathing room, one idea per spread, whitespace as chapters change; steal the pacing map, density varying with the argument. **Brockmann-lineage Swiss annual reports** (grid law): visible baseline discipline, column grid held even when content resists; steal the rule that every element sits on the grid or has a written reason.

## Measurable floors

| Floor | Number | How measured |
|-------|--------|--------------|
| Body type | 9.5-11.5pt serif or 9-11pt sans for print; 11-13pt equivalent for screen-first | rendered size inspected |
| Leading | 1.35-1.55x body size; never below 1.3 | computed from rendered text |
| Line length | 45-75 characters per line in body columns | count on 3 sample pages |
| Margins | outer margin ≥12% of page width; inner ≥15mm if print-bound in scope | measured on page geometry |
| Contrast | WCAG AA (4.5:1) for body, 3:1 for large display text | worst text/bg pair |
| Fonts | 100% embedded or subset-embedded | `pdffonts` or equivalent report |
| Text layer | selectable text on every content page; zero rasterized text pages | select-all test per page |
| Reading order | tagged PDF; extraction order matches visual order | text-extraction diff |
| File size | ≤500KB per 10 pages text-led; ≤1.5MB per 10 pages image-led | file size / page count |
| Bookmarks | TOC entries link; bookmarks present for every H1 | click-through check |

## QA stations

Web stations from `references/quality/audit_redo_loop.md` are replaced by:
1. **Page-by-page render review** at 100% zoom: overset text, orphans/widows, baseline drift, elements off-grid.
2. **Thumbnail pass**: all pages at once; pacing, density variation, grid consistency across the document.
3. **Font report**: embedded/subset status for every font.
4. **Extraction diff**: extracted text order vs visual order; headings extract as headings.
5. **Hygiene sweep**: metadata fields, bookmarks, TOC links, file size vs floor.
6. **Print simulation** (when print in scope): grayscale proof still reads; bleed present on full-bleed elements (3mm); no RGB-only signal colors carrying meaning.
7. **Screen-reading walk**: single-page continuous scroll at laptop size; nothing depends on seeing a spread.

## Technique atlas

| Technique | When to use | Slop version | Implements |
|-----------|-------------|--------------|------------|
| Column grid | every multi-page doc; 2-3 columns A4/Letter, margins as proportion not default 1in | tool-default margins, single ragged column at full page width | `pdf` + `taste-skill` |
| Baseline grid | body-heavy documents; locks facing text blocks | ignored for images so captions float off-rhythm | `taste-skill` |
| Heading system | 3 levels max, distinct by size/weight/space-before | 5+ levels, bold-and-bigger only, no space logic | `taste-skill` |
| Running heads + folios | any doc over 8 pages; orient the flipping reader | repeated full title every page, folio in a decorated box | `pdf` |
| Pull-quotes | mark argument turns; one per 3-5 pages max | every page, chosen for length not weight, giant quote marks | `taste-skill` |
| Callout boxes | definitions, warnings, sidebars with a named job | tinted box around anything vaguely important, nested boxes | `taste-skill` |
| Table design | align numerics right, minimal rules (header rule + closing rule), zebra only past ~8 rows | full grid of borders, centered numbers, zebra on 3 rows | `pdf` |
| Cover as promise | cover states the document's one idea in the interior's own type and palette | stock hero photo + logo + title in a different style than inside | `taste-skill` |
| Figure/caption system | consistent caption position, numbering, and size; caption states the takeaway | captions that repeat the title, floating figures far from their reference | `pdf` |
| Whitespace pacing | chapter openers, section breathers, deliberate part-title pages | uniform density page after page, or random half-empty pages | `taste-skill` |
| Print/screen duality | decide primary surface; add bleed + CMYK-awareness at concept tier when print is real | RGB neon in a doc headed to a print shop; bleed forgotten on full-bleed pages | `pdf` |

## Treatment flavor

Stylescape = cover concept + one interior spread + type/color specimen page + a pacing map (page-by-page density sketch showing where air, figures, and callouts land). Temperatures: mild = disciplined single-column report, type and grid do everything; medium = editorial layout with pull-quotes, figure system, and a designed cover; hot = magazine-grade, full-bleed imagery, aggressive scale contrast, part-title pages (Craig Mod energy). Technique palette lists atlas rows by name with the job each does in this document.

## Research notes

Phase 4 adds these stations:
- Collect 2-3 documents the client currently ships: their real baseline, not their aspiration. Note what readers already tolerate.
- Audit competitor whitepapers in the sector: page size, length, density norms, whether anyone designs at all (an undesigned sector is positioning room).
- Confirm the distribution channel (email attachment, gated download, print run): it sets the file-size ceiling and the bleed decision.
- Check the client's fonts are licensed for embedding; if not, resolve substitutes before the treatment locks type.
- Ask how the document is actually read: skimmed on a phone from an email, or printed for a boardroom. This decides the primary surface in dimension 7.

## Gate wiring

- **Build:** `pdf` skill for generation and manipulation; `taste-skill` for grid, type, and spacing judgment before any page is produced.
- **Audit:** QA stations above run manually against this pack's floors; `pdf` skill's extraction tools drive stations 4 and 5.
- **Polish:** CD verdict language maps to concrete moves: "quieter" = remove rules and tints, add margin; "bolder" = scale contrast on openers and pull-quotes, not more color.
- Missing `pdf` skill → generate via HTML-to-PDF pipeline and verify the same floors; note the degradation. Missing `taste-skill` → apply this pack's atlas slop column as a manual lint.

## Pre-flight (builder self-check)

1. Page size stated and reasoned in STATE.md.
2. Grid declared: columns, margins, baseline.
3. Heading system has 3 levels or fewer, each visually distinct.
4. Body type, leading, and line length inside floors on 3 sampled pages.
5. Every color names its job.
6. Every figure has a takeaway caption placed by the system.
7. Pull-quotes and callouts sit at argument turns, counted against the pacing map.
8. Cover uses interior type and palette; it promises what the interior delivers.
9. Tables pass the rules-discipline row of the atlas.
10. No orphan headings at page bottoms; widows checked on every page.
11. Fonts embedded and license permits embedding.
12. Text selectable on every page; zero rasterized text.
13. Bookmarks present and TOC links work.
14. Metadata title and author set.
15. File size inside the floor for the page count.
16. Extraction order matches visual order.
17. If print in scope: 3mm bleed present, grayscale proof still reads.
18. Thumbnail pass shows deliberate pacing, not uniform density.
