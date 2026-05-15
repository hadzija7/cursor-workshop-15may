# Cursor Cafe Planner Improvement Backlog

Use this backlog during the workshop. Each phase is intentionally small enough to complete or explain in a few minutes.

## Phase 1: Plan the Improvement

- Ask Cursor to inspect the repo and explain the product in plain language.
- Ask Cursor to create a 15-minute implementation plan for making the meal planner more useful.
- Confirm that changes stay scoped to the planner UI, meal data, and pure helper functions.

Suggested prompt:

```text
Inspect this repo and explain what the product does. Then make a short plan for improving the cafe planner in a way that is visible in the UI and safe to finish in 15 minutes.
```

## Phase 2: Restore Diet Filters, Summary Cost, and Filter Polish

Baseline ships with a **rough** filter panel (dropdown + range) and only **All / Vegetarian / Vegan** in the UI. Gluten-free and high-protein stay on meal data but are not filter choices yet. The summary shows **servings only**; total cost is still computed in `summarizePlan` but hidden.

- **Diet filters:** expose **Gluten-free** and **High-protein** alongside the existing options (chips or buttons work well).
- **Summary:** show **total estimated cost** using `formatCurrency(summary.totalCost)` next to servings.
- **Filter UX:** replace the placeholder layout with a clearer, more polished filter section (hierarchy, spacing, and prep-time affordance).

Suggested prompt:

```text
Polish the cafe planner Phase 2 gaps: (1) add Gluten-free and High-protein back to the diet filter control, (2) show total estimated cost in the plan summary again with formatCurrency, (3) redesign the filter area for clarity and a nicer layout. Keep edits scoped to src/components/ plus any spec notes. Explain which files you will touch before editing.
```

## Phase 3: Multiple Quantities per Meal

- Confirm baseline: each dish appears once at quantity `1`, green **Added** on the card when selected.
- Implement quantity controls (increment/decrement, minimum `1`, or remove line).
- Keep one `PlanLine` per `meal.id`; scale totals through `summarizePlan`.
- Verify cost, servings, and ingredients behave correctly when quantity changes.

Suggested prompt:

```text
Implement multiple quantities per meal in the cafe planner. Baseline state stores each dish once at quantity 1. Add UI to increase/decrease quantity (minimum 1) or remove the line, keep totals correct via summarizePlan(planLines), and update specs/meal-planner.md if behavior changes.
```

## Phase 4: Multitask Quality Work

- Use Multitask to run parallel agents for separate workstreams.
- Agent A: add focused tests for filtering, summaries, and quantity scaling.
- Agent B: review the UI/accessibility and suggest small improvements.
- Agent C: update workshop docs with what changed.
- Merge only the useful, low-risk outputs.

Suggested multitask prompt:

```text
Run three parallel tasks: one agent should add focused tests for meal-plan logic (including quantity scaling), one should review the UI/accessibility and suggest small improvements, and one should update the workshop notes to reflect the multi-quantity feature. Keep changes small and report conflicts.
```

## Phase 5: Extract More Pure Helpers

- Move any remaining derived state out of components and into `src/lib/plan.ts`.
- Keep component props simple and readable.
- Add tests for any new helper.

## Phase 6: Cursor SDK Automation

- Review `scripts/suggest-next-work.ts`.
- Set `CURSOR_API_KEY`.
- Run `pnpm suggest`.
- Discuss how this pattern can support CI, issue triage, release notes, or PR review.

## Phase 7: Code Review and Docs

- Ask Cursor for a senior-engineer code review.
- Fix only clear, high-signal issues.
- Update this backlog and `docs/workshop-script.md` if the flow changes.

