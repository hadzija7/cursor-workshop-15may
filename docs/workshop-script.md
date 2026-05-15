# 15-Minute Cursor SDLC Workshop Script

## Setup Before Presenting

Run these ahead of time:

```bash
pnpm install
pnpm lint
pnpm build
pnpm test
pnpm dev
```

Open the app at [http://localhost:3000](http://localhost:3000). Keep `TODO.md`, `specs/meal-planner.md`, and `src/components/cafe-planner.tsx` easy to access.

## Presenter Goal

Show Cursor as an SDLC partner, not only a code generator. The audience should see the same repo move through requirements, implementation, debugging, quality, review, docs, and automation.

## Minute-by-Minute Flow

### Understand the product (Ask mode)

General info:

```text
Inspect this repo and explain what the product does in 2 sentences.
```

- Repo-aware explanation

Canvas:

```text
create a canvas for showing me product architecture /canvas. check specs/meal-planner.md for context.
```

- UI overview of the product
- `specs/meal-planner.md` give the agent product context.

Plan:

- using plan mode (TODO list)

### Implement feature: Add multiple plan items

Baseline behavior: Only 1 meal of a kind can be added

Improvement: One meal item can be added multiple times

Switch to Agent mode (or Debug mode if something regresses).

Prompt:

```text
Implement multiple quantities per meal in the cafe planner. Baseline state stores each dish once at quantity 1. Add UI to increase/decrease quantity (minimum 1) or remove the line, keep totals correct via summarizePlan(planLines).
```

### Add rules

- rule for updating [features.md](http://features.md) file when a new feature is added
- rule for updating todo list, ones the item is complete

### Implement Multiple changes with Multitask

Prompt (Phase 2 backlog: diet filter options, summary cost, filter polish):

```text
Polish the cafe planner Phase 2 gaps: 
- Diet filters: expose Gluten-free and High-protein alongside the existing options (chips or buttons work well).
- Summary: show total estimated cost using formatCurrency(summary.totalCost) next to servings.
- Filter UX: replace the placeholder layout with a clearer, more polished filter section (hierarchy, spacing, and prep-time affordance).
- Testing: write test for these new features
```

### Debugging

### Cloud agents with UI recordings

### Cursor SDK Automation

Open `scripts/suggest-next-work.ts`.

Say: "The same agent workflow can leave the IDE and become automation."

Show the command without running it unless `CURSOR_API_KEY` is configured:

```bash
pnpm suggest
```

Explain:

- The script uses `@cursor/sdk`.
- It asks a local Cursor agent to inspect `TODO.md`.
- This pattern can support CI checks, issue triage, release notes, or PR review.

### Code review and docs

- Cursor Bugbot
- Cursor Automations

## Closing Line

Cursor is useful across the whole SDLC when the work is shaped well: give it context, plan small, debug with evidence, parallelize independent work, verify behavior, and turn repeatable workflows into automation.