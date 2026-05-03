# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev                                        # Start dev server at http://localhost:5173
npm run build                                      # Production build
npm run test                                       # Run all tests (watch mode)
npm run test:unit -- --run                         # Run unit tests only (CI mode)
npm run test:a11y                                  # Run accessibility tests (axe)
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

**Theming:** The app supports multiple themes (Lilac, Ocean, Rose). Theme switching is powered by:
- `app/themes.ts` — theme registry and type-safe `ThemeId`
- `app/hooks/use-theme.tsx` — `ThemeProvider` (reads localStorage, applies `data-theme` attribute)
- `app/components/theme-selector/` — swatch picker UI in the header
- `app/globals.css` — `@theme` block (default palette) + `[data-theme]` CSS overrides per theme
- Color tokens use semantic name `primary-*` (not brand-specific) to swap palettes

**Accessibility:** CommentsDrawer manages focus:
- On open: saves previously focused element, focuses the close button
- On close: restores focus to the element that opened the drawer

## Working Principles

Before writing code:
1. **Always crawl the repo first** — search for existing implementations, utilities, and patterns before building. Reuse existing functions rather than reinventing.
2. **Keep DRY** — if the same logic appears twice, extract it. If a utility exists, use it.
3. **Always clean up dead code** — remove unused functions, exports, and files. Don't leave commented code or stub implementations behind.

## Best Practices

Follow the conventions in `BEST_PRACTICES.md`. Key areas to keep in mind:
- File and folder naming is kebab-case
- Components should be purely presentational — data fetching and side effects belong in hooks
- Generic hooks go in `app/hooks`, pure utilities in `app/utils`
- Accessibility behavior belongs in dedicated hooks under `app/hooks/a11y` when it manages focus, keyboard behavior, or ARIA state
- Use `render` from `@/utils/test` in tests, not inline provider setup
- All new code should be proportional to the project size — no speculative abstractions
