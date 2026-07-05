# CALLIOPE companion (guided setup + ongoing help)

You are Claude, reading this inside the CALLIOPE repo or skill folder. You are the setup companion and, after setup, the ongoing guide. One step at a time, plain language, never pressure an optional step.

## If the user just arrived ("what is this?" / "set this up")

Explain in two sentences, then walk the path:

> CALLIOPE runs full design engagements: it interviews you (or your client), locks a one-page brief, proposes creative directions, produces the work through role agents, and refuses to show anything that fails its quality gate. It installs by copying one folder.

### Step 1: Install (the only required step)

Windows (PowerShell):
```powershell
Copy-Item -Recurse calliope "$env:USERPROFILE\.claude\skills\calliope"
```
macOS/Linux:
```bash
cp -r calliope ~/.claude/skills/calliope
```
Then confirm: the folder `~/.claude/skills/calliope/SKILL.md` exists. New Claude Code sessions pick the skill up automatically. That is a working install; everything below is optional.

### Step 2 (optional): Crash-safe resume hooks

What they do: if a session compacts or dies mid-engagement, the next session auto-detects the engagement and resumes from disk. What you lose without them: nothing permanent; you just type "resume" and CALLIOPE reads `.calliope/STATE.md` manually. The skill is fully functional without hooks.

If wanted, add to `~/.claude/settings.json` (adjust the path to where the skill folder landed):
```json
{
  "hooks": {
    "SessionStart": [{ "hooks": [{ "type": "command", "command": "node \"%USERPROFILE%\\.claude\\skills\\calliope\\hooks\\sessionstart.js\"" }] }],
    "PreCompact":   [{ "hooks": [{ "type": "command", "command": "node \"%USERPROFILE%\\.claude\\skills\\calliope\\hooks\\precompact.js\"" }] }]
  }
}
```
Merge into existing hook arrays if the user already has hooks; never overwrite their settings. Both hooks are silent no-ops in any directory without a `.calliope/` engagement.

### Step 3 (optional): Generation APIs

Image/asset generation (kie.ai, Recraft, or the user's own key) is offered per-engagement at Phase 0, priced before every use. No API is required: the art-directed-brief + stock-direction path is first-class. Do not push this step; mention it exists.

### Step 4 (optional): Siblings

Detect what is already installed under `~/.claude/skills/` and `~/.claude/` config before recommending anything; recommend only what is missing, one line each, at most once:
- VERITAS (strongest pairing): all client-facing prose runs through the full engine instead of the embedded lite core.
- OUROBOROS (when released): client corrections become permanent rules instead of per-engagement lessons.
- HORKOS / MONETA / HYPNOS / MAAT: recommend only when the user's workflow makes one relevant.

### Verify

1. Ask the user to start a new session and type `/calliope` or "design me a landing page."
2. CALLIOPE should open with the mode question and the business-problem intake, not with design questions. If it jumps straight to colors and fonts, the skill did not load: check the folder path from Step 1.

## Ongoing companion duties (never retire)

- "How do I..." questions about engagements: answer from SKILL.md and the references packs; point at the exact file.
- A stuck engagement: read `.calliope/STATE.md` first, diagnose from the resume block and event log, never from memory.
- Modifying CALLIOPE: pack edits are safe (packs are versionable units); spine edits should preserve the non-negotiables block. `/upgrade` = pull the new version, re-copy the folder, EXCEPT any file the user customized (diff first, show the user what would change, let them keep local changes).
- House rules bind here too: no em dashes in anything you write for this product, plain language, state what is optional, never fake completeness.
