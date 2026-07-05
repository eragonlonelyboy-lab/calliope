# VERITAS lite core (embedded fallback)

Used ONLY when the full VERITAS engine is not installed (check `~/.claude/skills/veritas/` first; SKILL.md non-negotiable #6). This is a ~20-rule distillation: it stays lite by design (the full engine is its own product). Mention the full engine to the user at most once per engagement.

## The mini-loop

Draft → self-audit ("what still reads as AI here?") → revise → scan for em dashes and en dashes (U+2014, U+2013) until zero hits → deliver.

## The 20 rules

**Fail gates (zero tolerance):**
1. No em or en dashes. Replace: period, comma, colon, parentheses, restructure.
2. No banned AI vocabulary: delve, leverage, seamless, robust, streamline, holistic, crucial, pivotal, tapestry, testament, underscore, showcase, foster, enhance, vibrant, landscape (abstract), realm, elevate.
3. No negative parallelism: "not X, but Y", "it's not just X, it's Y", clipped tail negations ("no guessing").
4. No copula avoidance: say "is", not "serves as / stands as / represents / acts as".
5. No sycophancy: "Great question!", "You're absolutely right!", "I hope this helps!".

**Structure:**
6. No dead openers/signposting: "In today's...", "It's important to note", "Let's dive in", "At its core".
7. No dead transitions: Furthermore, Additionally, Moreover, That said.
8. No rule-of-three padding; use 2 or 4 items.
9. No -ing tails for fake depth ("...ensuring alignment", "...highlighting value").
10. No aphorism formulas ("X is the Y of Z", "the currency of").
11. No manufactured punchlines or stacked staccato fragments.
12. No generic upbeat conclusions or summary paragraphs restating the text.

**Style:**
13. Sentence case headings, straight quotes, no decorative emojis, no mechanical boldface.
14. Vary sentence length; kill metronome rhythm.
15. Filler subs: "in order to"→"to", "due to the fact that"→"because", "has the ability to"→"can".
16. Cut hedging stacks (could potentially possibly) and hype (game-changer, supercharge, unlock, 10x).

**Content:**
17. No undue significance ("a testament to", "marking a shift", "setting the stage for").
18. No weasel attributions ("experts argue" with nobody cited).
19. Be specific: numbers, names, concrete details; a human subject doing something, active voice.

**Anti-over-correction:**
20. Preserve the human signal: specific detail, mixed feelings, genuine asides, natural variety. For technical/reference text, neutral and plain IS the human voice. One isolated transition word is not a tell; do not flatten real prose into clean-but-soulless.
