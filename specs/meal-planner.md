# Meal Planner Spec

## Overview

Cursor Café Planner helps a coworking group choose a shared lunch. It is intentionally small so a presenter can demonstrate Cursor's SDLC support in 15 minutes.

## Users

- Workshop presenter: uses the repo to demonstrate Cursor features.
- Workshop attendee: watches a familiar product improve through planning, implementation, debugging, tests, review, and automation.

## Core Behavior

- Display a set of meal options with name, description, diet tags, prep time, servings, estimated cost, ingredients, and a short vibe.
- Allow filtering by diet tag and maximum prep time.
- Allow adding meals to a lunch plan as distinct rows with a **quantity** (baseline app uses quantity `1` only).
- Prevent adding the same meal twice as separate rows until the quantity workshop extension is implemented; already-added meals show a disabled green **Added** control on the card.
- Show selected meals (with quantity and servings metadata), total estimated cost, total servings, and a starter shopping list.
- Allow clearing the selected plan.

## Baseline vs Workshop Extension

**Baseline (shipping demo):**

- Each meal appears at most once in the plan with quantity `1`.
- Totals use `summarizePlan(planLines)` where each line is `{ meal, quantity }`.

**Workshop extension:**

- Allow ordering **multiple quantities** of the same meal (for example increment/decrement controls on the card or in the summary list).
- Totals and ingredient aggregation must scale with line quantity (`summarizePlan` already multiplies cost and servings by `quantity`; extend UI and state updates accordingly).

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
