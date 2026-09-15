import { useState } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "pulseboard-theme";

function getStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "light" || stored === "dark" ? stored : null;
  } catch {
    return null;
  }
}

function systemPrefersDark(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

// Applied at import, before the first render, so the page never paints in
// the wrong theme and flips after mount.
const initialTheme: Theme = getStoredTheme() ?? (systemPrefersDark() ? "dark" : "light");
applyTheme(initialTheme);

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // localStorage unavailable (private mode, etc.) — theme still applies for this session.
    }
  }

  return { theme, toggleTheme };
}
