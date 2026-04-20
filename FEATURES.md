# Component Features

## UI Components

### `StoryFeedPage` — `app/components/story-feed-page/story-feed-page.tsx`
The top-level page layout for displaying a paginated feed of stories.

- Accepts a `title`, a list of story `ids`, and a `loadingIds` flag as props
- Delegates all data and state logic to `useStoryFeed`
- Shows `CardSkeleton` placeholders while loading (ids or stories)
- Renders stories as a responsive animated grid via `AnimatedGrid`
- Opens a `CommentsDrawer` when a story's comments button is clicked

---

### `Card` — `app/components/card/card.tsx`
Displays a single Hacker News story.

- Generic over `CardBaseProps` — can be extended with extra item fields
- Discriminated union prop: `{ loading: true }` renders `CardSkeleton`; `{ loading: false, item, onCommentsClick }` renders story content
- Story title links to the external URL (opens in a new tab, `noopener noreferrer`)
- Shows author (`by`), upvote count (▲ points), and comment count
- Comments count is a button; disabled (and non-interactive) when no `onCommentsClick` handler is provided
- Displays the story's numeric ID as a monospace badge

### `CardSkeleton` — `app/components/card/card-skeleton.tsx`
Loading placeholder for `Card`.

- Mirrors the three-section layout of `Card` (title, meta, ID badge)
- Uses CSS `animate-pulse` for a shimmer effect

---

### `Pagination` — `app/components/pagination/pagination.tsx`
Page navigation control.

- Props: `count` (total items), `pageSize`, `page`, `onPageChange`, `loading`
- Renders `PaginationSkeleton` while `loading` is true
- Shows all page numbers when total pages ≤ 7; otherwise uses ellipsis (`…`) to collapse distant pages, always keeping the first and last page visible
- Prev/Next arrow buttons disabled at the boundaries
- ARIA labels on prev/next buttons; `data-testid` attributes for testing

### `PaginationSkeleton` — `app/components/pagination/pagination-skeleton.tsx`
Loading placeholder for `Pagination`.

- Renders 5 pulsing page-button placeholders flanked by disabled prev/next arrows

---

### `CommentsDrawer` — `app/components/comments/comments-drawer.tsx`
Slide-in drawer that shows top-level comments for a selected story.

- Controlled by a `story: HNItem | null` prop; `null` hides the drawer
- Animated entry/exit: backdrop fades in, drawer slides in from the right (Framer Motion spring)
- Delegates data fetching, keyboard handling, and scroll locking to `useCommentsDrawer`
- Shows `CommentSkeleton` placeholders (×6) while loading
- Displays total comment count from `story.descendants`
- Accessible: `role="dialog"`, `aria-modal`, `aria-labelledby` pointing to the story title

### `Comment` — `app/components/comments/comment.tsx`
Renders a single comment with optional nested replies.

- Props: `item: HNItem`, `depth` (default `0`)
- Nesting capped at `MAX_DEPTH = 3`; border color lightens with each depth level
- Renders comment HTML via `dangerouslySetInnerHTML` (content comes from the HN API)
- Styles inline links, paragraphs, `<pre>`, and `<code>` blocks within comment HTML
- Shows author and a relative timestamp via `formatTimeAgo`
- Falls back to `[deleted]` when `item.text` is absent
- If the comment has replies and depth is within limit, shows a toggle button (expand/collapse)
- Lazily loads replies via `CommentReplies` sub-component (fetches only when expanded)
- Filters deleted and dead replies using `isVisibleComment`

### `CommentSkeleton` — `app/components/comments/comment-skeleton.tsx`
Loading placeholder for `Comment`.

- Accepts an optional `compact` prop: compact mode shows one short line; default shows three lines of varying width
- Uses CSS `animate-pulse`

---

### `AnimatedGrid` — `app/components/animated-grid.tsx`
Animated wrapper for the story card grid.

- Wraps children in a responsive CSS grid (1 / 2 / 3 columns at sm / md breakpoints)
- Accepts a `motionKey` — changing the key triggers a page-transition animation (slide out left, slide in from right)
- Uses Framer Motion `AnimatePresence` with `mode="wait"` so the exit animation completes before the new grid enters

### `MotionBox` — `app/components/motion-box.tsx`
Thin alias for `motion.div` from Framer Motion, used throughout the app as an animatable `div`.

---

## Hooks

### `useStoryFeed` — `app/components/story-feed-page/use-story-feed.ts`
Encapsulates all data and state logic for `StoryFeedPage`.

- Manages pagination state via `usePagination`
- Slices the full ID list to the current page via `paginateData`
- Fetches the current page's stories in parallel via `useItemsBatch`
- Maps fetched stories to `CardProps`, wiring up `onCommentsClick`
- Returns skeleton props while loading so the component stays purely presentational

### `useCommentsDrawer` — `app/components/comments/use-comments-drawer.ts`
Encapsulates all side-effect and data logic for `CommentsDrawer`.

- Fetches top-level comment items via `useItemsBatch` using `story.kids`
- Filters out deleted and dead comments via `isVisibleComment`
- Delegates keyboard dismissal to `useEscapeKey`
- Delegates body scroll locking to `useScrollLock`

### `usePagination` — `app/components/pagination/use-pagination.ts`
Manages pagination state.

- Options: `initialPage` (default `1`), `pageSize` (default `10`)
- Returns `currentPage`, `pageSize`, and `setCurrentPage`

### `useEscapeKey` — `app/hooks/use-escape-key.ts`
Generic hook that calls a callback when the `Escape` key is pressed.

- Adds/removes a `keydown` listener on `document`
- Reusable for any overlay or modal dismiss pattern

### `useScrollLock` — `app/hooks/use-scroll-lock.ts`
Generic hook that locks body scroll while `active` is true.

- Sets `document.body.style.overflow = "hidden"` when active; clears on deactivation or unmount

### `useItemsBatch` — `app/api/use-items-batch.ts`
Fetches multiple HN items in parallel.

- Accepts an array of item IDs; returns a React Query `UseQueryResult<HNItem[]>`
- Fires one `fetch` per ID concurrently via `Promise.all`
- Query is disabled when the ID list is empty

### `useTopStories` — `app/top-stories/use-top-stories.ts`
Fetches the list of top story IDs from the HN API.

- Returns up to ~500 IDs; stale time is 5 minutes

### `useNewStories` — `app/new-stories/use-new-stories.ts`
Fetches the list of newest story IDs from the HN API.

- Returns up to ~500 IDs; stale time is 5 minutes

---

## Utilities

### `paginateData` — `app/components/pagination/paginate-data.ts`
Pure function that slices an array for a given page.

- `paginateData<T>(data, currentPage, pageSize): T[]`
- Returns the items for `currentPage` based on `pageSize`

### `formatTimeAgo` — `app/utils/time.ts`
Formats a Unix timestamp as a human-readable relative string.

- Returns `Xs ago`, `Xm ago`, `Xh ago`, or `Xd ago` depending on elapsed time

### `isVisibleComment` — `app/utils/hn-item.ts`
Predicate that returns `true` for comments that are neither deleted nor dead.

- Used by both `useCommentsDrawer` and `CommentReplies` to filter the comment list

---

## Types

### `HNItem` — `app/api/types.ts`
TypeScript interface for a Hacker News item (story, comment, poll, pollopt, or job).

| Field         | Type                                                    | Notes                     |
|---------------|---------------------------------------------------------|---------------------------|
| `id`          | `number`                                                | Unique item ID            |
| `type`        | `"story" \| "comment" \| "poll" \| "pollopt" \| "job"` |                           |
| `by`          | `string`                                                | Author username           |
| `time`        | `number`                                                | Unix timestamp            |
| `text`        | `string?`                                               | HTML body (comments/jobs) |
| `url`         | `string?`                                               | External link (stories)   |
| `score`       | `number?`                                               | Upvote count              |
| `title`       | `string?`                                               | Story/poll title          |
| `descendants` | `number?`                                               | Total comment count       |
| `kids`        | `number[]?`                                             | Child item IDs            |
| `parent`      | `number?`                                               | Parent item ID            |
| `deleted`     | `boolean?`                                              |                           |
| `dead`        | `boolean?`                                              |                           |
