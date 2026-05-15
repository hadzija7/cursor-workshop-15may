# Meal Planner Spec

## Overview

Cursor Cafe Planner helps a coworking group choose a shared lunch. It is intentionally small so a presenter can demonstrate Cursor's SDLC support in 15 minutes.

## Users

- Workshop presenter: uses the repo to demonstrate Cursor features.
- Workshop attendee: watches a familiar product improve through planning, implementation, debugging, tests, review, and automation.

## Core Behavior

- Display a set of meal options with name, description, diet tags, prep time, servings, estimated cost, ingredients, and a short vibe.
- Allow filtering by **maximum prep time** and a **subset of diet tags** in the baseline UI: All, Vegetarian, and Vegan only. Meal records may still include **gluten-free** and **high-protein** tags; Phase 2 re-exposes those as filter choices.
- Allow adding meals to a lunch plan as distinct rows with a **quantity** (minimum **1** per row). Each dish appears **at most once** as a row; repeat orders bump `quantity`, not a second row.
- After add, meal cards expose **increment / decrement**: decrement at quantity `1` **removes** the row from the plan. **Remove** per line appears in the live plan panel for an explicit dismiss.
- Show selected meals (with quantity and servings metadata), **total servings**, and a starter shopping list. **Total estimated cost** is intentionally omitted from the summary panel in baseline; Phase 2 brings it back (`summarizePlan` still computes `totalCost` for tests and future UI).
- Allow clearing the selected plan.

## Intentionally rough baseline UI

The filter strip uses a deliberately plain layout so Phase 2 can demonstrate a visible redesign without changing domain logic first.

## Baseline vs Workshop Extension

**Shipping planner behavior:**

- Each meal appears at most once in the plan with `quantity >= 1` while listed; increments stack on that row only.
- UI: steppers on meal cards plus matching controls and **Remove** in the sticky plan summary.
- Totals and ingredient aggregation use `summarizePlan(planLines)` for `{ meal, quantity }`; cost and servings scale with quantity.

**Possible future workshop tweaks (still Phase 2 in other areas):**

- Extra diet filters (**gluten-free**, **high-protein**, etc.).
- Visible **total cost** in the summary panel (computed today via `summarizePlan`, not surfaced in UI).

## Data Model

`Meal` lives in `src/lib/meals.ts` and includes:

- `id`
- `name`
- `description`
- `emoji`
- `prepMinutes`
- `servings`
- `costPerServing`
- `dietTags`
- `ingredients`
- `vibe`

Plan rows use `PlanLine` in `src/lib/plan.ts`: `{ meal: Meal; quantity: number }`.

## Derived Logic

Pure helper logic lives in `src/lib/plan.ts`:

- `filterMeals(meals, diet, maxPrepMinutes)`
- `summarizePlan(planLines)`
- `formatCurrency(value)`

Prefer adding tests around these helpers before adding complex UI tests.

## Acceptance Criteria

- The app builds with `pnpm build`.
- Linting passes with `pnpm lint`.
- Unit tests pass with `pnpm test`.
- The homepage is understandable without verbal explanation.
- The workshop docs clearly identify which behavior is intentionally unfinished.
