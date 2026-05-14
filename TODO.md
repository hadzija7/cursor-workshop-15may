# Cursor Café Planner Improvement Backlog

Use this backlog during the workshop. Each phase is intentionally small enough to complete or explain in a few minutes.

## Phase 1: Plan the Improvement

- [ ] Ask Cursor to inspect the repo and explain the product in plain language.
- [ ] Ask Cursor to create a 15-minute implementation plan for making the meal planner more useful.
- [ ] Confirm that changes stay scoped to the planner UI, meal data, and pure helper functions.

Suggested prompt:

```text
Inspect this repo and explain what the product does. Then make a short plan for improving the café planner in a way that is visible in the UI and safe to finish in 15 minutes.
```

## Phase 2: Add Filters and Summary Polish

- [ ] Improve the dietary and prep-time filter UI.
- [ ] Make empty and selected states clearer.
- [ ] Add one more visible summary metric, such as average cost per serving.

Suggested prompt:

```text
Improve the planner UI so the filters and lunch summary are easier for workshop attendees to understand. Keep the changes small and explain what files you plan to edit before editing.
```

## Phase 3: Debug Duplicate Adds

- [ ] Reproduce the bug: click the same meal twice and watch cost, servings, and ingredients inflate.
- [ ] Switch to Debug mode.
- [ ] Ask Cursor to gather evidence from the UI state and code path.
- [ ] Fix the root cause so one meal can only appear once in the plan.
- [ ] Verify the button label and summary still make sense after the fix.

Suggested prompt:

```text
Debug this bug: clicking the same meal twice adds it twice to the lunch plan and inflates the totals. Gather evidence first, identify the root cause, then propose the smallest safe fix.
```

## Phase 4: Multitask Quality Work

- [ ] Use Multitask to run parallel agents for separate workstreams.
- [ ] Agent A: add focused tests for filtering, summaries, and duplicate handling.
- [ ] Agent B: review the UI/accessibility and suggest small improvements.
- [ ] Agent C: update workshop docs with what changed.
- [ ] Merge only the useful, low-risk outputs.

Suggested multitask prompt:

```text
Run three parallel tasks: one agent should add focused tests for meal-plan logic, one should review the UI/accessibility and suggest small improvements, and one should update the workshop notes to reflect the duplicate-add fix. Keep changes small and report conflicts.
```

## Phase 5: Extract More Pure Helpers

- [ ] Move any remaining derived state out of components and into `src/lib/plan.ts`.
- [ ] Keep component props simple and readable.
- [ ] Add tests for any new helper.

## Phase 6: Cursor SDK Automation

- [ ] Review `scripts/suggest-next-work.ts`.
- [ ] Set `CURSOR_API_KEY`.
- [ ] Run `pnpm suggest`.
- [ ] Discuss how this pattern can support CI, issue triage, release notes, or PR review.

## Phase 7: Code Review and Docs

- [ ] Ask Cursor for a senior-engineer code review.
- [ ] Fix only clear, high-signal issues.
- [ ] Update this backlog and `docs/workshop-script.md` if the flow changes.
