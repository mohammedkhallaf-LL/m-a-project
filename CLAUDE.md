# PulseBoard

React 19 + TypeScript + Vite. Playwright for tests.

- `npm run dev` — dev server on http://localhost:5173
- `npm test` — acceptance tests (starts the dev server if needed). This is
  the SPEC.md acceptance contract — keep it pointed at
  `tests/acceptance.spec.ts`; don't repoint it at Storybook or anything else.
- `npm run typecheck` — tsc
- `npm run storybook` — design system guide on http://localhost:6006
- `npm run build-storybook` — static Storybook build (`storybook-static/`,
  gitignored)
- `npm run test:storybook` — Storybook stories as Playwright-driven
  interaction/a11y tests via `@storybook/addon-vitest`. **Currently broken**
  in this dependency combo (Storybook 10.6 / Vitest 4.1 /
  `@vitest/browser-playwright` 4.1): fails with a React/vitest browser-mode
  module-interop error before any story runs. `npm run storybook` and
  `npm run build-storybook` are unaffected — only this runner is impacted.
  Try bumping `@storybook/addon-vitest`/`vitest`/`@vitest/browser-playwright`
  together before debugging further; don't sink time re-diagnosing the same
  failure without checking for a version bump first.

## Styling stack

- **Tokens**: `src/styles/tokens.css` is the single source of truth for
  color, type, spacing, radius, shadow, and motion — plain CSS custom
  properties, grounded in the mockups in `design/`. Never hardcode a hex or
  px value in component code; reference `var(--token)`.
- **Hand-written components**: `src/styles/components.css` — `.card`,
  `.btn`, `.pill`, `.field`, `.table`, `.drawer`, `.dialog`, etc. Plain
  classes on plain markup, documented live in Storybook
  (`npm run storybook`).
- **Tailwind v4**: installed and wired to the same tokens via
  `src/styles/theme.css` (`@theme inline` mapping `--color-brand` →
  `var(--color-brand)`, etc.) — utility classes like `bg-brand` or
  `rounded-lg` resolve through the identical custom properties the
  hand-written classes use. Don't add a second Tailwind config with its own
  palette; extend `tokens.css` + `theme.css` instead.
- **shadcn/ui**: initialized (`components.json`, `src/components/ui/`).
  shadcn's semantic slot tokens (`--background`, `--primary`, `--card`,
  `--border`, `--ring`, `--sidebar-*`, ...) are remapped in `src/styles.css`
  to the same `tokens.css` values — shadcn components and the hand-written
  `.btn`/`.card`/`.pill` classes share one palette. When editing colors,
  change `tokens.css`; both systems update.
  - **Known CLI bug**: `npx shadcn add <component>` sometimes writes files
    to a literal `./@/...` directory at the repo root instead of resolving
    the `@/*` alias to `src/`. After running `shadcn add`, check for a stray
    `@/` folder and `mv` its contents into the matching `src/` path, then
    `rm -rf @/`.
  - Installed: `dialog`, `table`, `drawer`, `button`. Add more with
    `npx shadcn@latest add <name>` (recheck for the `@/` bug each time).
- **Recharts** — the revenue-vs-target chart on the Dashboard. Composable
  `<BarChart>`/`<LineChart>` components; combine both in one `<ComposedChart>`
  for the bar+line-target look in `design/`. Feed it `--color-chart-revenue`
  / `--color-chart-target` for series colors so it matches the token system.
- **TanStack Table** (`@tanstack/react-table`) — headless sorting/filtering
  logic for the Accounts table and Users table. Render rows with shadcn's
  `table` primitives (`src/components/ui/table.tsx`) styled through the
  existing `.table` classes/tokens, not a new visual system.

## Working standards

These apply to every change in this repo, not just new features:

- **Tests run on request, not automatically.** Don't run `npm test` (or any
  Playwright/Storybook test suite) after every change by default — only run
  it when explicitly asked to, or right before a PR/final handoff. Do keep
  `npm run typecheck` clean as you go; it's fast and catches real breakage
  without the overhead of a full browser test run.
- **When writing new tests, cover the best-case path only.** Don't add
  edge-case, error-path, or adversarial-input coverage unless explicitly
  asked — keep new test additions to the straightforward happy path. This
  doesn't apply retroactively to `tests/acceptance.spec.ts`, which is
  SPEC.md's fixed acceptance contract, not something to trim.
- **Match the design, stay responsive, and don't regress accessibility.**
  Every page/component must work at the 375px, 768px, and 1024px+ widths
  shown in `design/` (mobile/tablet/desktop) — no fixed pixel widths that
  break below ~1024px. Table scroll, KPI card wrapping, and the drawer going
  full-width on mobile are already part of the reference design, not
  optional extras; verify against `design/` at all three widths before
  calling a UI change done. Reuse the tokens and component classes in
  `src/styles/` rather than one-off styles, respect `prefers-reduced-motion`,
  keep focus states visible, and never convey status by color alone (see the
  Storybook status-pill docs). Note if dark mode isn't in scope for a given
  change rather than skipping it silently.
- **Before merging a feature, dispatch the `responsive-check` subagent.**
  Whenever the user indicates a feature is ready to merge ("let's merge
  this", "ready to merge", "merge this feature", or similar), proactively
  launch the `responsive-check` agent (`.claude/agents/responsive-check.md`)
  before completing the merge — it audits the app at 375/768/1024/1440px
  across every route and reports concrete breakage. Don't skip this because
  the change "only touched one component"; layout regressions are easy to
  miss without an actual breakpoint sweep.
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
