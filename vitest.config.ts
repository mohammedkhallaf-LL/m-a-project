/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";

const dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Runs Storybook stories as Playwright-driven interaction/a11y tests.
 * Kept separate from vite.config.ts (the app's build config) and from
 * `npm test` (the SPEC.md acceptance suite) — this is purely for
 * `npm run test:storybook`.
 */
export default defineConfig({
  plugins: [
    storybookTest({
      configDir: path.join(dirname, ".storybook"),
    }),
  ],
  test: {
    name: "storybook",
    browser: {
      enabled: true,
      headless: true,
      provider: playwright(),
      instances: [{ browser: "chromium" }],
    },
  },
});
