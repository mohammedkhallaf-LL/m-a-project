# PulseBoard

React 19 + TypeScript + Vite. Playwright for tests.

- `npm run dev` — dev server on http://localhost:5173
- `npm test` — acceptance tests (starts the dev server if needed)
- `npm run typecheck` — tsc
- `npm run storybook` — design system guide on http://localhost:6006

## Working standards

These apply to every change in this repo, not just new features:

- **Keep `npm test` green and finish on time.** Before considering any task
  done, run the acceptance suite and `npm run typecheck` and confirm both
  pass — don't hand back work you haven't verified.
- **Match the design and don't regress accessibility.** Compare new UI
  against `design/` at desktop, tablet, and mobile widths. Reuse the tokens
  and component classes in `src/styles/` rather than one-off styles, respect
  `prefers-reduced-motion`, keep focus states visible, and never convey
  status by color alone (see the Storybook status-pill docs).
  Note if dark mode isn't in scope for a given change rather than skipping
  it silently.
- **Prefer the smallest number of well-chosen tool calls over brute force.**
  Use plan mode for multi-step work, take screenshots to verify visual
  changes, and reach for subagents/parallel work when a task actually
  decomposes — but don't add process for its own sake.
- **When something goes wrong, say so and show the recovery**, not just the
  final diff — a clear "this broke, here's why, here's the fix" beats
  silently redoing work.
- **Optimize for the person reading this next**, whether that's a teammate
  or someone evaluating the repo cold: clear commit messages, no dead code
  or half-finished paths, and a README/CLAUDE.md that stays accurate as the
  project changes.
