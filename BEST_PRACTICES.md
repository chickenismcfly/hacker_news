# Best Practices

A reference for conventions and patterns followed in this project.

---

## Project Structure

Feature-based organization: each feature owns its page, hooks, and related files. Shared UI lives in `/components`, API utilities in `/app/api`.

```
/app
  /api                  - Types, constants, data-fetching hooks
  /components           - Shared UI components (colocated with tests)
  /top-stories          - Feature page + hooks
  /new-stories          - Feature page + hooks
  layout.tsx
  page.tsx
  Providers.tsx         - Centralized provider composition
/utils
  /test                 - Shared testing utilities
```

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
- Use `UseQueryResult<T, Error>` as return types for hooks that wrap React Query.
- Import path alias `@/*` maps to the project root — use it instead of relative paths.

---

## Naming Conventions

| Thing             | Convention                       | Example            |
|-------------------|----------------------------------|--------------------|
| React components  | PascalCase                       | `CardSkeleton.tsx` |
| Custom hooks      | camelCase, `use` prefix          | `usePagination.ts` |
| Utility functions | camelCase                        | `paginateData.ts`  |
| Test files        | Colocated, `.test.ts/tsx` suffix | `Card.test.tsx`    |

---

## React Patterns

### Client Components
Mark every interactive component with `"use client"` at the top to establish the server/client boundary in the Next.js App Router.

### Custom Hooks
Extract data-fetching and stateful logic into dedicated hook files. A hook should do one thing and return typed values.

### Data Flow Pattern
Pages orchestrate; components present. The standard pattern for a feed page:

1. Fetch IDs → `useTopStories` / `useNewStories`
2. Fetch item details in batch → `useItemsBatch`
3. Manage pagination state → `usePagination`
4. Derive paginated slice → `paginateData` (memoized)
5. Map to component props → pass to render

### Provider Composition
All global providers live in `Providers.tsx` and are applied once in the root layout. Don't spread providers across unrelated files.

---

## State Management (React Query)

- Use `useQuery` with **typed results**: `UseQueryResult<T, Error>`.
- Query key structure: `[feature, ...params]` — e.g., `["topStories", limit]`.
- Set `staleTime` explicitly (currently 5-minute intervals) to control refetch behavior.
- Use the `enabled` flag for conditional/dependent queries.
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

- Use skeleton components (`CardSkeleton`, `PaginationSkeleton`) for all loading states.
- Compose loading flags at the page level before passing them down:
  ```typescript
  const loading = loadingIds || loadingStories;
  ```
- Never render partial data — gate on the combined loading flag.

---

## Testing

### Coverage targets
- **Pure functions:** test boundary conditions, empty inputs, and type preservation.
- **Hooks:** use `renderHook` + `act` to test initialization, custom params, and state transitions.
- **Components:** test both loading and loaded states; use semantic queries (`getByRole`, `getByTestId`, `getByText`).

### Shared test utilities (`/utils/test`)
Use the helpers exported from this module — don't inline provider setup in individual test files:
- `renderWithChakra` — wraps in Chakra UI
- `renderWithQueryClient` — wraps in React Query
- `QueryClientWrapper` — reusable wrapper component

### Mocking
Mock child components (e.g., `CardSkeleton`) when testing a parent to keep tests focused on the unit under test.

---

## UI (Chakra UI + Framer Motion)

- Use `MotionBox` (the custom Chakra + Framer Motion bridge component) for animated layouts.
- Wrap animated lists in `AnimatePresence` to handle exit animations correctly.
- Use `AnimatedGrid` for list rendering — it handles key-based animation triggers.
- Follow Chakra's compound component pattern: `Card.Root`, `CardHeader`, `CardBody`, etc.

---

## Configuration

| File | Purpose |
|---|---|
| `tsconfig.json` | Strict mode, ESNext target, `@/*` path alias, incremental builds |
| `next.config.ts` | React Compiler enabled, typed with `NextConfig` |
| `eslint.config.mjs` | Flat config (ESLint v9+), extends `next/core-web-vitals` + TypeScript |
| `jest.config.ts` | Next.js Jest wrapper, jsdom environment, v8 coverage |
| `jest.setup.ts` | Loads `@testing-library/jest-dom` and `structuredClone` polyfill |

Prefer framework defaults over custom configuration. Only add config when there is a specific need.

---

## Dependencies

- Pin **major versions**, use `^` for minor/patch flexibility.
- Keep `@types/*` packages aligned with their corresponding runtime packages.
- Every new runtime dependency should have a corresponding type definition.

Key dependency versions:
- React 18, Next.js 16
- Chakra UI v3, Framer Motion v12
- TanStack Query v5
- TypeScript 5, Jest 30, Testing Library 16

---

## What to Avoid

- Don't add error handling for scenarios that can't happen — trust TypeScript and framework guarantees.
- Don't create one-off helpers or abstractions for single-use logic.
- Don't duplicate server state in `useState` — React Query owns it.
- Don't spread providers; compose them once in `Providers.tsx`.
- Don't leave loading states unhandled — always render a skeleton or error UI.