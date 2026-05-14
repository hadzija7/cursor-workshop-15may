<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Cursor Café Planner Agent Guide

## Purpose

This repo is a 15-minute Cursor SDLC workshop demo. Keep changes easy to explain live: small diffs, visible behavior, clear verification, and docs that help a presenter recover if the demo runs short.

## Repo Map

| Path | Purpose |
| --- | --- |
| `src/app/page.tsx` | Next.js entrypoint for the demo UI. |
| `src/components/` | UI components for the café planner. |
| `src/lib/meals.ts` | Seed data and meal domain types. |
| `src/lib/plan.ts` | Pure derived-data helpers for filtering and summaries. |
| `docs/workshop-script.md` | Presenter script and prompts to paste into Cursor. |
| `specs/meal-planner.md` | Product behavior reference for agents. |
| `TODO.md` | Workshop improvement backlog. |
| `scripts/suggest-next-work.ts` | Cursor SDK automation example. |

## Commands

| Command | Use |
| --- | --- |
| `pnpm install` | Install dependencies. |
| `pnpm dev` | Run the app locally. |
| `pnpm lint` | Run ESLint. |
| `pnpm build` | Verify the Next.js build. |
| `pnpm test` | Run unit tests. |
| `pnpm suggest` | Run the Cursor SDK next-work suggestion script. |

## Working Rules

- Use `pnpm`, not `npm` or `yarn`.
- Keep the duplicate-add bug unless the task is explicitly the Debug mode fix.
- Prefer pure helpers in `src/lib/plan.ts` for calculations that need tests.
- Keep UI changes accessible enough for a live demo: labels, buttons, readable contrast, and obvious states.
- Update `TODO.md`, `docs/workshop-script.md`, or `specs/meal-planner.md` when a workshop step changes.
