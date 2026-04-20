# Claude Code Instructions

## Best Practices

Follow the conventions in `BEST_PRACTICES.md` as guidelines. Use judgment — apply them consistently on non-trivial code, but don't over-engineer small or one-off changes.

Key areas to keep in mind:
- File and folder naming is kebab-case
- Components should be purely presentational — data fetching and side effects belong in hooks
- Generic hooks go in `/hooks`, pure utilities in `/utils`
- Use `render` from `@/utils/test` in tests, not inline provider setup
- All new code should be proportional to the project size — no speculative abstractions
