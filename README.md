# Cursor Café Planner

A small Next.js demo repo for a 15-minute workshop on Cursor across the SDLC.

The app is intentionally simple: a coworking group chooses lunch options, filters meals by dietary needs, adds meals to a shared plan, and sees cost, servings, and ingredients. The domain is familiar enough for non-engineers, but still gives you real software work to demonstrate: planning, UI edits, debugging, tests, review, docs, and automation.

## Getting Started

Install and run with `pnpm`:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Useful Commands

```bash
pnpm lint
pnpm build
pnpm test
pnpm suggest
```

`pnpm suggest` is the Cursor SDK demo. It requires `CURSOR_API_KEY` and asks a local Cursor agent to inspect `TODO.md` and suggest the next workshop improvement.

## Workshop Flow

Use `docs/workshop-script.md` as the presenter script.

The intended 15-minute arc is:

1. Ask Cursor to understand the repo and create a short implementation plan.
2. Use Agent mode to improve the planner UI across multiple files.
3. Use Agent mode (or Debug mode if needed) to add multiple quantities per meal on top of the baseline single-add behavior.
4. Use Multitask to parallelize tests, UI/accessibility review, and docs updates.
5. Show the Cursor SDK script as an example of SDLC automation outside the IDE.

## Important Demo Detail

The baseline app adds each meal at most once with quantity `1` and shows a green **Added** state on the card. The workshop extension layers on quantity controls while keeping one plan row per dish (`PlanLine` in `src/lib/plan.ts`).
