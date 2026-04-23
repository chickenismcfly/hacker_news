# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev                                        # Start dev server at http://localhost:5173
npm run build                                      # Production build
npm run test                                       # Run all tests (watch mode)
npm run test -- --run                              # Run all tests once (CI mode)
npm run test -- --run path/to/file.test.ts         # Run a single test file
npm run lint                                       # Lint source files
```

## Architecture

React + Vite SPA browsing the Hacker News Firebase API. All app code lives under `app/`.

**Data flow for a feed page:**
1. A feature hook (`useTopStories` / `useNewStories`) fetches the full ID list (~500 IDs) from the HN API.
2. `useStoryFeed` paginates those IDs with `usePagination` + `paginateData`, then batch-fetches the current page's items in parallel via `useItemsBatch`.
3. `StoryFeedPage` receives pre-mapped `CardProps[]` and stays purely presentational.

The `CommentsDrawer` is controlled via a `selectedStory: HNItem | null` state owned by `useStoryFeed` — `null` closes it.

**Module boundaries:**
- `app/components/` — shared UI; each component owns its hook and tests colocated alongside it
- `app/hooks/` — generic reusable hooks (`useEscapeKey`, `useScrollLock`)
- `app/utils/` — pure utility functions (`formatTimeAgo`, `isVisibleComment`)
- `app/api/` — HN API client, types, and data-fetching hooks
- `utils/test/` — shared test helpers; always import `render` from `@/utils/test`, not inline

**Barrel imports:** pagination exports are consolidated — import from `@/app/components/pagination`, not individual files within it.

## Best Practices

Follow the conventions in `BEST_PRACTICES.md`. Key areas to keep in mind:
- File and folder naming is kebab-case
- Components should be purely presentational — data fetching and side effects belong in hooks
- Generic hooks go in `app/hooks`, pure utilities in `app/utils`
- Use `render` from `@/utils/test` in tests, not inline provider setup
- All new code should be proportional to the project size — no speculative abstractions
