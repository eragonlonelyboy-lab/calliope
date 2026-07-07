# AURA

**Read a live site's design system off the rendered DOM, and return a curated, opinionated token set plus a drift report that says what to fix and why.**

Every design-system extractor on the market does the same thing: point a headless browser at a URL, read the computed styles, and hand you back every value it found, neatly labelled. That is a raw dump. The tedious part, the part a designer actually gets paid for, is the judgment: which of these six near-identical greys is the real system colour and which five are drift, what the type scale actually is under the noise, whether the spacing is a grid or an accident.

AURA does that judgment. Extraction is the commodity. The editorial layer is the point.

## What it does that a raw extractor does not

- **Prunes to canonical.** Perceptually near-identical colours (CIEDE2000 in CIELAB) collapse to one canonical token; the rest are reported as drift that should fold into it.
- **Names by role, with a reason.** Each surviving colour gets a semantic role (background, surface, text, accent, border) inferred from luminance, usage context, and WCAG contrast, and every choice carries a one-line rationale and a confidence.
- **Finds the real scale.** Detects the modular type ratio and the spacing grid, snaps observed values onto them, and flags the off-scale values. When there is no consistent grid, it says so, because that is the useful finding.
- **Emits a tight system, not an exhaustive one.** A curated palette (roughly ten to sixteen colours) plus a separate drift report, instead of two hundred tokens you have to hand-prune.

## Install

```bash
cd engines/aura
npm install
npx playwright install chromium
```

## Use

```bash
aura https://stripe.com                 # writes to ./.aura
aura https://stripe.com --out ./tokens  # choose the output dir
aura https://stripe.com --report-only   # print the Markdown critique to stdout
aura https://stripe.com --json          # print the judged system as JSON
```

Outputs: `design-system.md` (the curated critique, the star output), plus `tokens.dtcg.json` (W3C DTCG), `tokens.css` (custom properties), `tailwind.config.mjs`, `figma.variables.json`, and `system.json` (the full judged model).

Or from code:

```js
import { analyze } from './engines/aura/src/index.mjs';
const { system, emit } = await analyze('https://stripe.com');
```

## Real output (Stripe)

From 3617 rendered elements, AURA curated the palette to five roled colours plus a small extended set, and flagged 77 drift values:

| Token | Value | Role | Why |
| --- | --- | --- | --- |
| `color/background` | `#ffffff` | background | Most-used background-context tone and the lightest surface. |
| `color/text` | `#061b31` | text | Highest text-context usage with a 17.4:1 contrast against the background. |
| `color/accent` | `#533afd` | accent | Most-used clearly-saturated colour; reads as the brand action colour. |

Six near-white tones (`#f8fafd`, `#f6f9fc`, `#f5f5f5`, ...) collapsed into `color/background`. That collapse is the pruning a raw extractor leaves for you to do by hand.

## Honest limitations

AURA v0.1 is strong on the mechanical judgment (colour clustering, scale detection, drift) and honest about the hard part:

- **Semantic role precision is the frontier, not a solved problem.** Picking the one true brand accent from frequency and saturation alone is genuinely hard; on colour-rich marketing sites the accent pick can land on a gradient tone rather than the button colour. Treat roles as a strong first pass a human confirms, not gospel. This is the layer worth hardening, and it is where the moat is.
- **State and responsive coverage is single-pass.** It reads the default state at a desktop viewport after one lazy-load scroll. Hover, focus, dark-mode, and breakpoint variants are not yet cycled.
- **Motion capture is limited** to declared CSS; JS-driven animation is under-reported.
- Coverage of unusual SPAs, shadow DOM, and auth-gated content is best-effort.

None of this is hidden because the value is the judgment layer, and a judgment tool that overclaims is worthless.

## Provenance

AURA is a clean-room implementation. The extraction technique (`getComputedStyle` over the rendered DOM) is a universal browser API owed to no one; the colour science uses [culori](https://culorijs.org) (MIT). No third-party extractor's source was copied. AURA is the design-system-reading engine for CALLIOPE.

## License

MIT, Copyright (c) 2026 Lee Jun Ying. See [LICENSE](./LICENSE).
