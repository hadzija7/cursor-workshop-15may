# Meal Planner Spec

## Overview

Cursor Café Planner helps a coworking group choose a shared lunch. It is intentionally small so a presenter can demonstrate Cursor's SDLC support in 15 minutes.

## Users

- Workshop presenter: uses the repo to demonstrate Cursor features.
- Workshop attendee: watches a familiar product improve through planning, implementation, debugging, tests, review, and automation.

## Core Behavior

- Display a set of meal options with name, description, diet tags, prep time, servings, estimated cost, ingredients, and a short vibe.
- Allow filtering by diet tag and maximum prep time.
- Allow adding meals to a lunch plan.
- Show selected meals, total estimated cost, total servings, and a starter shopping list.
- Allow clearing the selected plan.

## Deliberate Workshop Bug

The initial implementation allows duplicate meal additions. Clicking the same meal twice adds it twice to the plan and inflates totals. This is intentional and should be preserved until the Debug mode workshop step.

Expected post-debug behavior:

- A meal can appear in the plan at most once.
- Re-clicking an already selected meal should either do nothing or clearly communicate that it is already selected.
- Total cost, servings, and ingredient list should be based on unique selected meals.

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

## Derived Logic

Pure helper logic lives in `src/lib/plan.ts`:

- `filterMeals(meals, diet, maxPrepMinutes)`
- `summarizePlan(meals)`
- `formatCurrency(value)`

Prefer adding tests around these helpers before adding complex UI tests.

## Acceptance Criteria

- The app builds with `pnpm build`.
- Linting passes with `pnpm lint`.
- Unit tests pass with `pnpm test`.
- The homepage is understandable without verbal explanation.
- The workshop docs clearly identify which behavior is intentionally unfinished.
