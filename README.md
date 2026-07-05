# CALLIOPE: Complete Agency Lifecycle

**Listen, Iterate, Orchestrate, Produce, Evaluate.** A full design agency in your terminal: interviews like a strategist, proposes like a creative director, builds like a production team, audits like a QA lead who does not accept "looks fine."

Calliope is the chief of the Muses, the muse of epic narrative: not the one who paints the scene, the one who guides the telling. That is the product: every other AI design tool paints scenes. CALLIOPE guides the whole telling, from the first interview question to the signed UAT log, and treats generators (including Anthropic's own Claude Design) as production instruments it directs.

## What an engagement looks like

```
you:      /calliope
CALLIOPE: Before we talk about what this looks like, tell me why it exists.
          What happened that made someone build it?
...20 minutes later...
CALLIOPE: Here is your brief, one page. Sign off and we build to it.
          Anything we change later, we change here first.
          Your three design principles: Quiet Authority, One Clear Door,
          Earned Motion. Every verdict I give you will cite them by name.
...at every checkpoint...
CALLIOPE: QA round 2: zero findings. CD gate: 8.4/10, all principles held.
          Now you get to see it.
```

Work below the quality threshold physically cannot reach you. That is the difference between a generator and an agency.

## CALLIOPE vs the generators

| | Claude Design / v0 / Stitch | CALLIOPE |
|---|---|---|
| Discovery | a prompt box | soul interview + design interview + signed brief, before any pixel |
| Quality | you eyeball it | instrumented audit loop (DOM values, contrast, anti-pattern CLI) to zero findings, then a scored gate against YOUR named principles |
| Memory | per-chat | per-client taste profile that compounds across engagements |
| The tools themselves | are the product | are instruments: CALLIOPE directs Claude Design, Figma, Canva, Stitch, v0, Midjourney through per-tool adapter packs |

The generators are good. That is exactly why the missing product is the agency that directs them.

## How it works

1. **Interview.** Story first, zero design vocabulary. Then constraints, references, and 2-3 measurable success criteria.
2. **Contract.** A one-page brief you sign, plus 3-5 design principles derived from your answers. Every later verdict cites them by name.
3. **Treatments.** 2-3 narrative concepts, each with a stylescape at three temperatures. Always one recommendation, argued in your principles' terms.
4. **Production.** Role agents (Strategist, Creative Director, Art Director, Copywriter, Builders, QA) per medium: 9 medium packs from brand identity to video.
5. **The gate.** Build, render for real, measure, fix, repeat to zero findings, score. Below 8.0, it does not ship. A 7.9 fails.
6. **Close.** Itemized pass/fail UAT, handoff bundle, auto-generated case study, and a check-in date against your success metrics.

Three modes: **Director** (CALLIOPE builds), **Coach** (you build, it teaches and gates), **Directed-external** (a third-party tool builds, CALLIOPE directs it through prompt + screenshot rounds).

## Install (Windows first)

```powershell
Copy-Item -Recurse calliope "$env:USERPROFILE\.claude\skills\calliope"
```

```bash
cp -r calliope ~/.claude/skills/calliope
```

That is the whole install. Zero configuration: the skill activates on any design request, or invoke `/calliope`. Optional crash-safe resume hooks exist; the companion CLAUDE.md walks you through them only if you want them. Re-run safe: copying again just updates.

## Benchmarks

`node benchmarks/run.js` runs the structure lint: 100+ deterministic checks (every medium pack carries all 9 required sections, every adapter all 6, hooks parse, zero em dashes across every file). What a lint can and cannot prove about design quality: [docs/HONEST-NUMBERS.md](docs/HONEST-NUMBERS.md). Short version: nobody can benchmark taste honestly, so we do not pretend to. The lint proves the agency's process is complete; a real Phase 0-3 run on your own project proves whether the interviews earn their minutes.

## What ships

9 medium packs (brand, website, app, slides, PDF, campaign, packaging, video, illustration/3D: each with a bar interpretation, named benchmarks, measurable floors, QA stations, technique atlas, treatment flavor). 7 tool adapters (Claude Design, Figma, Canva, Stitch, v0/Lovable, image-gen UIs, PowerPoint). 7 role agents. 6 rituals. An engagement state layer any session can resume from disk. Complete at launch: future versions refine, they do not complete.

## From the same forge

CALLIOPE is a Demiurge product. Each tool stands alone; together they run a studio.

| Product | Dream |
|---------|-------|
| VERITAS | strips AI tells from prose and rewrites in your voice |
| HORKOS | your agent swore it was done; HORKOS checks the receipts |
| MONETA | honest token discipline: measured, never estimate theater |
| HYPNOS | consolidates agent memory; every change a reviewable diff |
| MAAT | multi-agent attention terminal: status with evidence |

**Pair it with VERITAS.** Every word CALLIOPE puts in front of your client (briefs, treatments, case studies) runs VERITAS-clean when the full engine is installed; without it you get the embedded 20-rule lite core. The full engine is better. It is one file.

## License

MIT, and the file is actually in the repo. If CALLIOPE runs one engagement that beats the deck your last agency charged five figures for, the star button is cheaper than their invoice.
