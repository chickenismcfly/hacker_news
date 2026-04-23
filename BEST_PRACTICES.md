# Best Practices

A reference for conventions and patterns followed in this project.

---

## Project Structure

Feature-based organization: each feature owns its page and hooks. Shared UI lives in `/components`, generic hooks in `/hooks`, pure utilities in `/utils`, and API utilities in `/api`.

```
/app
  /api                    - Types, constants, data-fetching hooks
  /components             - Shared UI components and their hooks (colocated with tests)
  /hooks                  - Generic, reusable hooks (useEscapeKey, useScrollLock)
  /utils                  - Pure utility functions (time formatting, item filtering)
  /top-stories            - Feature page + data hook
  /new-stories            - Feature page + data hook
  app.tsx                 - Router and layout shell
  providers.tsx           - Centralised provider composition
  main.tsx                - Entry point
/utils
  /test                   - Shared testing utilities
```

---

## Naming Conventions

| Thing             | Convention                         | Example                  |
|-------------------|------------------------------------|--------------------------|
| React components  | PascalCase export, kebab-case file | `card-skeleton.tsx`      |
| Custom hooks      | `use` prefix, kebab-case file      | `use-pagination.ts`      |
| Utility functions | camelCase export, kebab-case file  | `paginate-data.ts`       |
| Unit test files   | Colocated, `.test.ts/tsx` suffix   | `card.test.tsx`          |
| A11y test files   | Colocated, `.a11y.test.ts/tsx` suffix | `card.a11y.test.tsx`  |
| Folders           | kebab-case                         | `story-feed-page/`       |

---

## TypeScript

- **Strict mode** is enabled — all values must be typed.
- Use **generic constraints** for reusable components:
  ```typescript
  type CardProps<T extends CardBaseProps> =
    | { loading: true }
    | { loading: false; item: T };
  ```
- Mark optional fields explicitly with `?` in interfaces.
- Use `UseQueryResult<T, Error>` as the return type for hooks that wrap React Query.
- Import path alias `@/*` maps to the project root — use it instead of deep relative paths.

---

## React Patterns

### Separation of Concerns

Keep components purely presentational by extracting logic into dedicated hooks:

- **Data fetching and state** → custom hook alongside the component (e.g. `use-story-feed.ts`, `use-comments-drawer.ts`)
- **Generic side effects** → shared hook in `/hooks` (e.g. `use-escape-key.ts`, `use-scroll-lock.ts`)
- **Pure transformations** → utility function in `/utils`

A component should not contain `useEffect`, `useQuery`, or complex `useMemo` — those belong in a hook.

### Custom Hooks

Each hook should have a single responsibility and return typed values. When a hook needs multiple side effects, compose smaller focused hooks rather than handling everything inline.

### Data Flow Pattern

Pages orchestrate; components present. The standard pattern for a feed page:

1. Fetch IDs → `useTopStories` / `useNewStories`
2. Delegate pagination, fetching, and prop mapping → `useStoryFeed`
   - Manage pagination state → `usePagination`
   - Derive paginated slice → `paginateData` (memoised)
   - Fetch item details in batch → `useItemsBatch`
3. Render → `StoryFeedPage` (receives only what it needs to display)

### Provider Composition

All global providers live in `providers.tsx` and are applied once in `app.tsx`. Don't spread providers across unrelated files.

---

## State Management (React Query)

- Use `useQuery` with **typed results**: `UseQueryResult<T, Error>`.
- Query key structure: `[feature, ...params]` — e.g., `["topStories"]`, `["itemsBatch", ids]`.
- Set `staleTime` explicitly (currently 5-minute intervals) to control refetch behaviour.
- Use the `enabled` flag for conditional/dependent queries (e.g. skip when ID list is empty).
- Let React Query own loading and error states — don't duplicate them with local `useState`.

---

## Error Handling

Check `response.ok` immediately after every `fetch` call and throw a descriptive error:

```typescript
if (!response.ok) throw new Error("Failed to fetch top stories");
```

Errors surface through React Query's `isError` / `error` fields — handle them at the component level with loading skeletons or error UI.

---

## Loading States

- Use skeleton components (`CardSkeleton`, `PaginationSkeleton`, `CommentSkeleton`) for all loading states.
- Combine loading flags at the hook level before surfacing them:
  ```typescript
  const loading = loadingIds || loadingStories;
  ```
- Never render partial data — gate on the combined loading flag.
- Skeleton components accept a `compact` prop where a shorter placeholder is appropriate (e.g. nested replies).

---

## Testing

### Coverage targets
- **Pure functions:** test boundary conditions, empty inputs, and type preservation.
- **Hooks:** use `renderHook` + `act` to test initialisation, custom params, and state transitions.
- **Components:** test both loading and loaded states; use semantic queries (`getByRole`, `getByTestId`, `getByText`).

### Shared test utilities (`/utils/test`)
Use the helpers exported from this module — don't inline provider setup in individual test files:
- `render` — re-exported from `@testing-library/react`
- `renderWithQueryClient` — wraps in a `QueryClientProvider`
- `QueryClientWrapper` — reusable wrapper component for `renderHook`

### Text matching
When asserting on text that is split across JSX expressions, use a regex to avoid exact-match failures:
```typescript
// ✗ Fails when rendered as "▲ " + "42" + " points"
expect(screen.getByText("42 points")).toBeInTheDocument();

// ✓
expect(screen.getByText(/42 points/)).toBeInTheDocument();
```

### Mocking
Mock child components (e.g. `CardSkeleton`, `PaginationSkeleton`) when testing a parent to keep tests focused on the unit under test.

### Accessibility Testing (axe)
- Accessibility tests live in separate `*.a11y.test.ts/tsx` files
- Import `axe` from `utils/test/a11y`
- Run with `npm run test:a11y` (separate from unit tests)
- Test both loading and loaded states for components with loading skeletons
- The axe instance has the `region` rule disabled (not meaningful at component level)

---

## Theming & Design Tokens

The app supports multiple themes via CSS custom properties:

**File structure:**
- `app/globals.css` — Default theme (`@theme` block) and theme overrides (`[data-theme="ocean"]`, `[data-theme="rose"]`)
- `app/themes.ts` — Theme registry with `ThemeId` union type
- `app/hooks/use-theme.tsx` — `ThemeProvider` context; manages localStorage persistence and DOM attribute
- `app/components/theme-selector/` — Theme swatch picker UI

**Color tokens:**
- Use semantic token names (`primary-50`, `primary-100`, etc.) — never hardcode brand names
- Tailwind's default `slate-*` colors remain for secondary text, disabled states, etc.
- To add a new theme: add entry to `themes` array in `app/themes.ts`, then add `[data-theme="id"]` CSS block in `globals.css`

---

## UI (Tailwind CSS + Framer Motion)

- Use `MotionBox` (`motion.div`) for any element that needs Framer Motion animation props.
- Wrap animated lists or page transitions in `AnimatePresence` to handle exit animations correctly.
- Use `AnimatedGrid` for paginated list rendering — it handles key-based slide transitions automatically.
- Tailwind classes follow a mobile-first responsive order: base → `sm:` → `md:`.

---

## Configuration

| File              | Purpose                                                              |
|-------------------|----------------------------------------------------------------------|
| `tsconfig.json`   | Strict mode, ESNext target, `@/*` path alias                        |
| `vite.config.ts`  | Vite bundler, React plugin, Tailwind CSS plugin                     |
| `eslint.config.mjs` | Flat config (ESLint v9+)                                          |
| `vitest.config.ts` (via `vite.config.ts`) | jsdom environment, globals, setup file  |
| `vitest.setup.ts` | Loads `@testing-library/jest-dom` and `structuredClone` polyfill    |

Prefer framework defaults over custom configuration. Only add config when there is a specific need.

---

## Dependencies

- Pin **major versions**, use `^` for minor/patch flexibility.
- Keep `@types/*` packages aligned with their corresponding runtime packages.

Key dependency versions:
- React 18, Vite 6
- Tailwind CSS v4, Framer Motion v12
- TanStack Query v5
- TypeScript 5, Vitest 3, Testing Library 16, jest-axe 10

---

## What to Avoid

- Don't put data fetching, `useEffect`, or complex memoisation directly in components — extract to a hook.
- Don't duplicate the same filter predicate (e.g. `isVisibleComment`) inline — share it from `/utils`.
- Don't add error handling for scenarios that can't happen — trust TypeScript and framework guarantees.
- Don't create one-off helpers or abstractions for single-use logic.
- Don't duplicate server state in `useState` — React Query owns it.
- Don't spread providers; compose them once in `providers.tsx`.
- Don't leave loading states unhandled — always render a skeleton or error UI.
