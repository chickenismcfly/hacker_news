# Hacker News Client

A React app for browsing Hacker News top and new stories, built with Vite and Tailwind CSS. Features theme selection (Lilac, Ocean, Rose), paginated feeds, and nested comments.

## Stack

- **React 18** with TypeScript
- **Vite** — dev server and bundler
- **Tailwind CSS v4** — styling
- **TanStack Query** — data fetching and caching
- **React Router v6** — client-side routing
- **Framer Motion** — animations
- **Vitest + Testing Library** — unit and component tests

## Getting Started

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run test` | Run all tests (watch mode) |
| `npm run test:unit -- --run` | Run unit tests only |
| `npm run test:a11y` | Run accessibility tests |
| `npm run lint` | Lint source files |

## Project Structure

```
app/
  api/          # HN API client and types
  components/   # Shared UI components (Card, Pagination)
  top-stories/  # Top stories page and hook
  new-stories/  # New stories page and hook
  main.tsx      # App entry point
```