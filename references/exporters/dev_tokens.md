# Exporter: dev tokens

The design system as machine-consumable artifacts. Four formats, generated from one source of truth (the gated system's values, same extraction as DESIGN.md: rendered values win over intentions).

## Formats

1. **`tailwind.config.ts`**: theme extension: colors (by job name, not hue name: `accent`, not `orange`), fontFamily, fontSize with line heights, spacing scale, borderRadius, boxShadow, transition timing. Comment header: generated-by + date + "edit the system, regenerate this file."
2. **`tokens.css`**: CSS custom properties on `:root` (+ `[data-theme="dark"]` block when a dark mode exists). Same job-based naming: `--color-accent`, `--space-3`, `--type-display-size`.
3. **`tokens.json`**: W3C design-tokens format (`$value`/`$type`), the interchange layer for Figma plugins and token pipelines.
4. **SVG set**: logo variants + icon set, optimized (SVGO), currentColor where the system allows recoloring, fixed fills where it does not; viewBox-normalized to the icon grid.

## Generation rules

- One naming scheme across all four formats: a token renamed in one place is a bug.
- Include only what the system defines; no speculative tokens ("might need a warning color" ships nothing: the system decides, then the token exists).
- Every file self-describes: header comment naming source engagement, date, and the regeneration rule.
- Acceptance test (UAT line for this deliverable): the three code files import cleanly into a fresh project (`tailwind.config.ts` type-checks; `tokens.css` parses; `tokens.json` validates against the W3C schema) and the SVG set renders at 16/24/48px without optical breakage.
- Windows-first: generation scripts run in PowerShell paths; no bash-only tooling.
