# Component Features

## UI Components

### `StoryFeedPage` — `app/components/StoryFeedPage.tsx`
The top-level page layout for displaying a paginated feed of stories.

- Accepts a `title`, a list of story `ids`, and a `loadingIds` flag as props
- Paginates story IDs client-side (9 stories per page) using `paginateData`
- Fetches the current page's stories in parallel via `useItemsBatch`
- Shows `CardSkeleton` placeholders while loading (ids or stories)
- Renders stories as a responsive animated grid via `AnimatedGrid`
- Opens a `CommentsDrawer` when a story's comments button is clicked

---

### `Card` — `app/components/card/Card.tsx`
Displays a single Hacker News story.

- Generic over `CardBaseProps` — can be extended with extra item fields
- Discriminated union prop: `{ loading: true }` renders `CardSkeleton`; `{ loading: false, item, onCommentsClick }` renders story content
- Story title links to the external URL (opens in a new tab, `noopener noreferrer`)
- Shows author (`by`), upvote count (▲ points), and comment count
- Comments count is a button; disabled (and non-interactive) when no `onCommentsClick` handler is provided
- Displays the story's numeric ID as a monospace badge

### `CardSkeleton` — `app/components/card/CardSkeleton.tsx`
Loading placeholder for `Card`.

- Mirrors the three-section layout of `Card` (title, meta, ID badge)
- Uses CSS `animate-pulse` for a shimmer effect

---

### `Pagination` — `app/components/pagination/Pagination.tsx`
Page navigation control.

- Props: `count` (total items), `pageSize`, `page`, `onPageChange`, `loading`
- Renders `PaginationSkeleton` while `loading` is true
- Shows all page numbers when total pages ≤ 7; otherwise uses ellipsis (`…`) to collapse distant pages, always keeping the first and last page visible
- Prev/Next arrow buttons disabled at the boundaries
- ARIA labels on prev/next buttons; `data-testid` attributes for testing

### `PaginationSkeleton` — `app/components/pagination/PaginationSkeleton.tsx`
Loading placeholder for `Pagination`.

- Renders 5 pulsing page-button placeholders flanked by disabled prev/next arrows

### `usePagination` — `app/components/pagination/usePagination.ts`
Hook that manages pagination state.

- Options: `initialPage` (default `1`), `pageSize` (default `10`)
- Returns `currentPage`, `pageSize`, and `setCurrentPage`

### `paginateData` — `app/components/pagination/paginateData.ts`
Pure utility that slices an array for a given page.

- `paginateData<T>(data, currentPage, pageSize): T[]`
- Returns the items for `currentPage` based on `pageSize`

---

### `CommentsDrawer` — `app/components/comments/CommentsDrawer.tsx`
Slide-in drawer that shows top-level comments for a selected story.

- Controlled by a `story: HNItem | null` prop; `null` hides the drawer
- Animated entry/exit: backdrop fades in, drawer slides in from the right (Framer Motion spring)
- Fetches top-level comment items in batch via `useItemsBatch` using `story.kids`
- Filters out deleted and dead comments
- Shows `CommentSkeleton` placeholders (×6) while loading
- Displays total comment count from `story.descendants`
- Closes on: close button click, backdrop click, or `Escape` key
- Locks body scroll while open (`document.body.style.overflow = "hidden"`)
- Accessible: `role="dialog"`, `aria-modal`, `aria-labelledby` pointing to the story title

### `Comment` — `app/components/comments/Comment.tsx`
Renders a single comment with optional nested replies.

- Props: `item: HNItem`, `depth` (default `0`)
- Nesting capped at `MAX_DEPTH = 3`; border color lightens with each depth level
- Renders comment HTML safely via `dangerouslySetInnerHTML` (content comes from the HN API)
- Styles inline links, paragraphs, `<pre>`, and `<code>` blocks within comment HTML
- Shows author and a relative timestamp (`formatTimeAgo`: seconds / minutes / hours / days)
- Falls back to `[deleted]` when `item.text` is absent
- If the comment has replies and depth is within limit, shows a toggle button (expand/collapse)
- Lazily loads replies via `CommentReplies` sub-component (fetches only when expanded)

### `CommentSkeleton` — `app/components/comments/CommentSkeleton.tsx`
Loading placeholder for `Comment`.

- Accepts an optional `compact` prop: compact mode shows one short line; default shows three lines of varying width
- Uses CSS `animate-pulse`

---

### `AnimatedGrid` — `app/components/AnimatedGrid.tsx`
Animated wrapper for the story card grid.

- Wraps children in a responsive CSS grid (1 / 2 / 3 columns at sm / md breakpoints)
- Accepts a `motionKey` — changing the key triggers a page-transition animation (slide out left, slide in from right)
- Uses Framer Motion `AnimatePresence` with `mode="wait"` so the exit animation completes before the new grid enters

### `MotionBox` — `app/components/MotionBox.tsx`
Thin alias for `motion.div` from Framer Motion, used throughout the app as an animatable `div`.

---

## API & Data Hooks

### `useItemsBatch` — `app/api/useItemsBatch.ts`
Fetches multiple HN items in parallel.

- Accepts an array of item IDs; returns a React Query `UseQueryResult<HNItem[]>`
- Fires one `fetch` per ID concurrently via `Promise.all`
- Query is disabled when the ID list is empty

### `useTopStories` — `app/top-stories/useTopStories.ts`
Fetches the list of top story IDs from the HN API.

- Returns up to ~500 IDs; stale time is 5 minutes

### `useNewStories` — `app/new-stories/useNewStories.ts`
Fetches the list of newest story IDs from the HN API.

- Returns up to ~500 IDs; stale time is 5 minutes

### `HNItem` — `app/api/types.ts`
TypeScript interface for a Hacker News item (story, comment, poll, pollopt, or job).

| Field         | Type                                            | Notes                        |
|---------------|-------------------------------------------------|------------------------------|
| `id`          | `number`                                        | Unique item ID               |
| `type`        | `"story" \| "comment" \| "poll" \| "pollopt" \| "job"` |                   |
| `by`          | `string`                                        | Author username              |
| `time`        | `number`                                        | Unix timestamp               |
| `text`        | `string?`                                       | HTML body (comments/jobs)    |
| `url`         | `string?`                                       | External link (stories)      |
| `score`       | `number?`                                       | Upvote count                 |
| `title`       | `string?`                                       | Story/poll title             |
| `descendants` | `number?`                                       | Total comment count          |
| `kids`        | `number[]?`                                     | Child item IDs               |
| `parent`      | `number?`                                       | Parent item ID               |
| `deleted`     | `boolean?`                                      |                              |
| `dead`        | `boolean?`                                      |                              |