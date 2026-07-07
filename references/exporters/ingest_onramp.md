# Ingest onramp (Phase 0.5)

Extract what already exists so the engagement starts from reality: a returning client's memory, or a new client's live site, repo, or old brand PDF. Output lands in `.calliope/ingest/` and is confirmed with the client before it constrains anything.

## Source: returning client

Load `clients/<slug>/` (profile, decisions, taste_profile, engagements). Confirm, do not re-interview: "still <decider> signing off? palette still locked? anything changed since <last engagement>?" Only changed facts reopen interview questions.

## Source: live URL

Dispatch a Strategist extraction (fresh subagent). Stations:
1. **Design-system snapshot:** computed type stack (families, sizes in use, scale guess), color inventory (sampled, clustered into system-vs-noise), spacing patterns, component inventory (buttons, cards, nav patterns).
2. **Voice snapshot:** headline register, CTA language, terminology the brand already owns.
3. **Asset inventory:** logo variants found, imagery style, icon style.
4. **Judgment layer:** what reads as designed vs accreted; the 3 things worth keeping; the 3 things fighting the brand.

Instrument station 1 with AURA (`references/adapters/aura.md`), CALLIOPE's own extraction engine: run `node engines/aura/bin/aura.mjs <url> --out .calliope/ingest/aura/` for a curated design system (canonical tokens with semantic roles, a detected type scale and spacing verdict, and a drift report) instead of eyeballing. AURA proposes the system-vs-noise call; the Strategist ratifies it against the brief (the accent role especially). Stations 2 to 4 (voice, assets, judgment) stay Strategist-read.
Output: `.calliope/ingest/site_extraction.md` (DOM computed values, not eyeballing).

## Source: repo

Same stations, source-side: design tokens/variables files, component library structure, style architecture (Tailwind config, CSS vars, theme files), plus a drift check (do the tokens match what renders?). Note the stack: it constrains the build deliverable's shape.
Output: `.calliope/ingest/repo_extraction.md`.

## Source: brand PDF / old guidelines

Extract: stated rules (palette values, type stack, logo rules, do/don'ts), then annotate honestly: which rules the client's live presence actually follows vs ignores (the gap list is discovery gold: it shows what the last system failed to make usable).
Output: `.calliope/ingest/brand_doc_extraction.md`.

## Confirmation ritual (all sources)

Present the extraction as "here is what your current presence says" in plain language: keep/kill/question per major finding. Client reactions are early taste signal (log them). Confirmed facts become constraints in the design interview; contested ones become interview questions. Nothing extracted is treated as sacred: the brief decides what survives.
