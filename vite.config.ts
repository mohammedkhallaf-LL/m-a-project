import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import stylex from "@stylexjs/unplugin/vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * StyleX (see CLAUDE.md "Styling stack — StyleX") is opt-in for new
 * components going forward; existing tokens.css/Tailwind/shadcn styling is
 * untouched. @stylexjs/unplugin appends its aggregated CSS into the asset
 * produced by src/styles.css (imported from src/main.tsx), so it needs no
 * separate PostCSS config or CSS entry file of its own — this replaced an
 * earlier attempt to wire @stylexjs/postcss-plugin directly, which broke
 * production builds (its Babel parser isn't configured for JSX and choked
 * on every .tsx file; see git history on this file for details).
 * Ordered before react() per StyleX's own Vite docs, to preserve Fast Refresh.
 */
export default defineConfig({
  plugins: [stylex({ useCSSLayers: true }), react(), tailwindcss()],
  resolve: {
    alias: { "@": path.resolve(dirname, "./src") },
  },
  server: { port: 5173, strictPort: true },
});
