# Adapter: v0 / Lovable

## Tier & detection

Native ceiling: **Tier 3 blind coach**. Neither tool exposes an MCP or write API that CALLIOPE can drive, so the default loop is prompt out, screenshot or preview link back.

Upgrade to **Tier 2 watch and guide** when browser access (Chrome extension or computer-use read tier) is granted this session. This is a meaningful upgrade: both tools render a live preview pane, so CALLIOPE audits the real render at real breakpoints instead of a static screenshot.

Detection sequence:
1. Ask whether browser access is available this session; never assume.
2. Verify by loading the project's preview URL (v0 share link or Lovable preview link).
3. Only after a successful load, claim Tier 2 in gate reports; otherwise report Tier 3.

Never Tier 1. If the user has the project's GitHub repo synced locally, that is not Tier 1 for the tool; it is the export path (see below).

## Capabilities & limits

Both are chat-driven full-app builders: one prompt yields a running app with live preview, then iteration by conversation. Direction pattern is identical, hence one adapter.

- **v0 (Vercel):** generates React / Next.js / TypeScript with shadcn/ui and Tailwind. Strongest raw frontend code quality in this class. Frontend-first; backend depth is thinner. Has a Git panel with branch, diff, and PR flow. Credit-based pricing; the free tier's credits can burn in one heavy session, so budget round trips (verify current plan in session).
- **Lovable:** generates React / Vite / TypeScript with Tailwind, shadcn/ui, and a Supabase backend (auth, Postgres, storage). Two-way GitHub sync. Visual Edits handles color, copy, and layout tweaks without spending prompt credits; route cosmetic corrections there first. Credit caps per plan (verify current plan in session).

Where they lie to you: the preview always looks finished.
- Auth screens render before auth works; forms render before they submit anywhere.
- The shadcn default look reads as "designed" while carrying zero brand.
- Treat the preview as a claim, not evidence.

Message caps shape direction: every prompt costs credits on both tools, so the Tier 3 round-trip economy rule (batch corrections, target 3 or fewer round trips per element group) is also a billing rule here.

## Walkthrough script

Tier 3:
1. CALLIOPE writes the opening prompt (full design-system injection, see dialect). User pastes it into the tool's chat.
2. User returns a full-page screenshot per breakpoint (desktop plus mobile minimum) or the preview share link.
3. CALLIOPE audits against the brief, issues one batched correction prompt per concern group.
4. On approval of a section, user tells the tool nothing more about it; new prompts must name only the next concern.
5. At done, user triggers GitHub export or sync, then the handoff path takes over.

Tier 2 additions: CALLIOPE opens the live preview in the browser, resizes through breakpoints itself, and reads visible text and layout directly. User still pastes prompts and clicks the tool's UI; CALLIOPE narrates which panel and button ("open the Code tab, find the component filename I name in the correction").

## Prompt dialect

House format applies (role, brief constraints, concrete spec, exact output wanted), specialized three ways:

1. **Design system injection in the first prompt, always.** These tools default to the shadcn/Tailwind house look, the "AI app" aesthetic, and retrofitting a design system into generated shadcn is expensive: every later restyle prompt fights defaults already woven through dozens of components. The opening prompt must carry exact tokens:
   - full type stack with weights, plus the type scale
   - palette as hex values, mapped to roles (background, surface, text, accent)
   - border radius values and shadow rules
   - spacing rhythm
   State "do not use default shadcn colors or radius; use only these tokens" explicitly. One paragraph of vibes is not injection; a token block is.
2. **One concern per message.** Both tools regress adjacent features when a prompt asks for two things: fix the nav and the footer in one message and the hero may re-render wrong. Batch corrections within a single concern (all typography fixes together), never across concerns. Prefix iteration prompts with "change only X; do not modify any other component."
3. **Anchor corrections on component names, not visuals.** Both tools show generated code in a code panel. "Fix the third card" invites the model to guess; "in PricingCard.tsx, set the CTA to variant secondary with our accent hex" lands. At Tier 3, ask the user to read the relevant filename from the code panel when it is not inferable; at Tier 2, read it directly.

For Lovable specifically: send pure cosmetic nits through Visual Edits instead of chat prompts; it is free of credit cost and cannot regress logic.

## Export & handoff path

GitHub is the only handoff path that preserves fidelity: v0 via its Git panel (branch, diff, PR), Lovable via two-way GitHub sync. Copy-paste of code snippets from the panel is a last resort and forfeits project structure.

Once exported, **the artifact re-enters CALLIOPE's own pipeline**: the repo is cloned into the deliverable dir and the website/app pack QA loop runs on the exported code with real instruments (computed styles, actual breakpoint rendering, lighthouse, link and form checks). This is the escape hatch from Tier 3: everything the blind-coach loop had to mark "unverified by visual audit only" gets re-verified with instruments after export.

Consequences for gating:
- Gate reports issued pre-export must state that instrument re-verification is pending.
- The engagement is not done at "looks approved in the preview"; done means post-export gates pass.
- Chain of custody goes in the direction file: which sections were approved in-tool at which tier, export commit hash, and which gates re-ran post-export.

## Known failure modes

- **Silent dependency bloat.** Each iteration can pull in new npm packages nobody asked for. Recovery: post-export, diff package.json against actual imports, prune, and re-run the build gate.
- **Regression of approved sections.** A new prompt quietly re-renders a previously approved section. Recovery: after every round trip, re-check the last approved section before auditing the new work; scope prompts with "change only X" up front to prevent it.
- **Auth and backend stubs that look done but are not wired.** Login forms, database calls, and payment buttons render perfectly while connected to nothing (v0 especially; Lovable's Supabase wiring is real more often but still verify RLS and actual writes). Flag every backend-touching feature for HORKOS-style evidence checks: proof is a successful round trip against the real backend, never a screenshot of the form. Verify in session which integrations the user's plan actually provisions.
- **Mobile breakpoints as afterthought.** Both generate desktop-first; mobile layouts are whatever Tailwind defaults produce. Recovery: demand mobile screenshots (or resize the live preview at Tier 2) from round trip one, not at the end, and include mobile behavior in the first prompt's spec.
- **Credit exhaustion mid-engagement.** A message cap hit mid-iteration strands the loop. Recovery: front-load the design-system prompt while credits exist, keep the round-trip budget, and export to GitHub early so work is never trapped in the tool.
