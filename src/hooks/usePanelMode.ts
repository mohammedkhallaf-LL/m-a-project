import { useState } from "react";

export type PanelMode = "drawer" | "dialog";

const STORAGE_KEY = "pulseboard-panel-mode";

function getStoredPanelMode(): PanelMode | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "drawer" || stored === "dialog" ? stored : null;
  } catch {
    return null;
  }
}

export function usePanelMode() {
  const [mode, setModeState] = useState<PanelMode>(() => getStoredPanelMode() ?? "drawer");

  function setMode(next: PanelMode) {
    setModeState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // localStorage unavailable (private mode, etc.) — preference still applies for this session.
    }
  }

  return { mode, setMode };
}
