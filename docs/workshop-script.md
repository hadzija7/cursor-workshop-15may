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

### 0:00-2:00 Understand and Plan

Say: "We are going to improve a tiny lunch-planning product. First, I want Cursor to understand the repo before changing it."

Prompt:

```text
Inspect this repo and explain what the product does. Then make a short plan for improving the café planner in a way that is visible in the UI and safe to finish in 15 minutes.
```

Show:

- Repo-aware explanation.
- Plan mode for scoped implementation.
- How `TODO.md` and `specs/meal-planner.md` give the agent product context.

### 2:00-5:00 Implement a Visible Feature

Prompt:

```text
Improve the planner UI so the filters and lunch summary are easier for workshop attendees to understand. Keep the changes small and explain what files you plan to edit before editing.
```

Show:

- Multi-file edits across `src/components/`.
- Context-aware component reuse.
- Running `pnpm lint` or checking the browser after the change.

Fallback if time is tight:

- Ask Cursor to only add one summary metric.
- Skip visual polish and move to the quantity task.

### 5:00-8:00 Multi-Quantity Workshop Task

Establish baseline behavior:

1. Add a meal once and note the green **Added** button and quantity `×1` in the summary.
2. Explain that coworkers often want two trays of the same dish.

Switch to Agent mode (or Debug mode if something regresses).

Prompt:

```text
Implement multiple quantities per meal in the café planner. Baseline state stores each dish once at quantity 1. Add UI to increase/decrease quantity (minimum 1) or remove the line, keep totals correct via summarizePlan(planLines), and update specs/meal-planner.md if behavior changes.
```

Show:

- Reading `PlanLine` and `summarizePlan` in `src/lib/plan.ts`.
- Wiring controls without duplicate rows for the same `meal.id`.
- Verification in the browser and with `pnpm test`.

Fallback if time is tight:

- Implement only increment-from-summary or only one extra control.
- Mention tests as homework.

### 8:00-11:00 Multitask

Say: "Now the work splits naturally: tests, review, and docs do not need to happen serially."

Multitask prompt:

```text
Run three parallel tasks: one agent should add focused tests for meal-plan logic (including quantity scaling), one should review the UI/accessibility and suggest small improvements, and one should update the workshop notes to reflect the multi-quantity feature. Keep changes small and report conflicts.
```

Show:

- Parallel execution for independent SDLC workstreams.
- Reviewing outputs before merging.
- Choosing small, useful changes over accepting everything.

Fallback if time is tight:

- Use the prompt as a conceptual demo and only merge the test task.

### 11:00-13:00 Quality Gate

Prompt:

```text
Add focused tests for the pure meal-plan helpers. Cover filtering, total cost, total servings, ingredient aggregation, and quantity scaling on plan lines.
```

Run:

```bash
pnpm test
pnpm lint
```

Show:

- The difference between UI state and pure helper tests.
- How Cursor can add narrow tests without overbuilding.

### 13:00-15:00 Cursor SDK Automation

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

## Closing Line

Cursor is useful across the whole SDLC when the work is shaped well: give it context, plan small, debug with evidence, parallelize independent work, verify behavior, and turn repeatable workflows into automation.
