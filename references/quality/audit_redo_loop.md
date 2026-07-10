# The instrumented audit-redo loop

Build → render for real → inspect with instruments → fix → re-inspect → repeat until ZERO findings → only then checkpoint the client. Never trust the code; measure the rendered result. This loop is what "audits like a QA lead who doesn't accept looks-fine" means in practice.

## The loop (QA role runs it; builder fixes inside it)

1. **Render for real.** The artifact runs on its actual surface: a website serves and loads in a browser; a deck opens in its player; a PDF renders at print size. Reading source is not rendering.
2. **Inspect with instruments.** Per medium (packs name the exact set), the web-standard station list:
   - **DOM computed values:** padding/margin/type-size/line-height/color as the browser resolved them (preview_inspect / DevTools), not as the stylesheet intended.
   - **`npx impeccable detect`:** the anti-pattern CLI, run on the built output.
   - **Contrast ratios:** measured per text/background pair against the pack's floor (WCAG AA unless the pack states otherwise).
   - **Spacing-scale conformance:** computed spacings snap to the design system's scale; orphan values are findings.
   - **Type-scale conformance:** rendered sizes match the declared scale.
   - **Responsive floor:** render at the Phase 2 device floor + one mobile width; layout must be designed, not squeezed.
   - **Perf ritual (animated/3D work):** Chrome DevTools pass per the technique atlas: frame timing during interaction, layout-thrash check, memory after 60s idle: against the pack's perf budget.
   - **Console + network:** zero errors; no failed or accidental external requests.
   - **Slop fingerprint sweep:** the named AI tells and the pre-client quality pass in `slop_fingerprint.md`; mandatory for web and deck artifacts, every hit a finding.
3. **Findings.** Element-anchored, numbered, measured (format in `references/roles/qa.md`). A finding without a measurement or reproduction is a CD note, not a QA finding.
4. **Fix round.** Builder fixes findings only (surgical; adjacent improvements go to build notes). Every fix names which finding it kills.
5. **Re-inspect.** Full station pass again, not just the fixed spots (fixes regress neighbors).
6. **Exit:** ZERO findings. Then the artifact faces the CD gate (judgment rows). Then, and only then, the client sees it.

## Bounded retry

3 fix rounds on the same finding without kill → stop. QA writes the finding history, the AM escalates to the client in plain language (what resists, what was tried, options). Silent grinding is forbidden: it burns approved budget and hides state.

## Non-web media

The loop holds; instruments change. Decks: rendered-slide pass (overflow, bleed, contrast on projector profile), asset-resolution check. PDF: print-size render, bleed/margin measure, embedded-font check. Video: frame-step review at cuts, loudness + caption check. Each pack's "QA stations" section is authoritative.

## Directed-external variant

The artifact lives in a third-party tool; instruments cannot reach it. The loop runs on user-supplied screenshots: overlay measurement (grid/scale estimates), sampled colors for contrast approximation, visual anti-pattern scan. Every report opens with: **"visual-audit only; instrumented checks unavailable on screenshots."** Corrections return as prompts in the tool's dialect (see its adapter). The zero-findings rule still applies to what IS checkable; unverifiable dimensions are listed as unverified, never assumed passing.
