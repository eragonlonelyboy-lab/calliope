# Exporter: DESIGN.md (portable design-system spec)

One markdown file any AI tool or developer can consume to reproduce the system faithfully. The schema follows the open-design/Stitch convention (agent-friendly, prose+tables, no proprietary format) so it works as input to Claude Code, Stitch, v0, or a human.

## Schema

```markdown
# DESIGN.md: <client / project>

## Identity
One paragraph: the point of view. What this design is FOR and what it refuses.
The 3-5 client design principles, by name, one line each.

## Typography
| Role | Family | Weight | Size (px/rem) | Line height | Tracking | Usage rule |
Display / Heading 1-3 / Body / Small / Mono rows as applicable.
Scale ratio stated. Fallback stack stated. License note.

## Color
| Token | Value | Job | Contrast partner(s) |
Every color has a JOB (surface/ink/accent/signal...). Forbidden uses listed
("accent never backgrounds text blocks"). Dark-mode column if a dark mode exists.

## Spacing & layout
Base unit. Scale steps. Grid (columns, gutters, margins per breakpoint).
Radius scale. Shadow/elevation scale with exact values.

## Components            (when the system defines them)
Per component: anatomy, states, do/don't in one line each.

## Motion
Easing family (named curves + values). Duration scale. What moves and what never
moves. prefers-reduced-motion behavior.

## Imagery
Style-locks: palette anchors, lighting character, composition rules, texture.
What imagery is banned. Icon grid + stroke rules.

## Voice              (when a copy pass shipped)
Register, never-says list, 3 example rewrites (before/after).

## Sources of truth
Where tokens live in code (paths), where assets live, who owns changes.
```

## Export rules

- Values are exact (hex, px/rem, ms, curve coordinates), never adjectives. A DESIGN.md line must be executable by a tool that has no taste.
- Generated from the gated system, not from intentions: extract values from the shipped artifact/tokens (drift check: rendered values win over stylesheet claims).
- Ship next to `dev_tokens.md` output when both are selected; DESIGN.md is the why+rules layer, tokens are the machine layer. State this in the file header.
- VERITAS-clean prose; tables exempt.
