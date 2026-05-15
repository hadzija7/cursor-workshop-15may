<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Cursor Cafe Planner Agent Guide

## Purpose

This repo is a 15-minute Cursor SDLC workshop demo. Keep changes easy to explain live: small diffs, visible behavior, clear verification, and docs that help a presenter recover if the demo runs short.

## Repo Map

| Path | Purpose |
| --- | --- |
| `src/app/page.tsx` | Next.js entrypoint for the demo UI. |
| `src/components/` | UI components for the cafe planner. |
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
- Baseline UX: each meal is added once at quantity `1` with a disabled green **Added** button when selected; see `specs/meal-planner.md` for the multi-quantity workshop extension.
- Prefer pure helpers in `src/lib/plan.ts` for calculations that need tests.
- Keep UI changes accessible enough for a live demo: labels, buttons, readable contrast, and obvious states.
- Update `TODO.md`, `docs/workshop-script.md`, or `specs/meal-planner.md` when a workshop step changes.

## Cursor Cloud specific instructions

- **No external services needed.** This is a zero-infrastructure frontend-only Next.js app. All data is hardcoded seed data; no database, Docker, or environment variables are required.
- **Dev server:** `pnpm dev` starts Next.js on `http://localhost:3000`. The server supports hot reload for all `src/` changes.
- **Commands reference:** See the Commands table above — `pnpm lint`, `pnpm test`, `pnpm build`, and `pnpm dev` all work out of the box after `pnpm install`.
- **Build script warnings:** `pnpm install` may warn about ignored build scripts for `esbuild` and `sqlite3`. These are non-blocking; `pnpm-workspace.yaml` already handles `sharp` and `unrs-resolver`, and the remaining warnings do not affect dev/test/build.
- **`pnpm suggest`** requires a `CURSOR_API_KEY` environment variable and is optional — it is not needed for the app itself.
