import { createContext, useContext, useState, type ReactNode } from "react";

/**
 * PulseBoard has no backend, so this is a UI-level gate, not real access
 * control: the password ships inside the client bundle and is readable via
 * devtools. It's here to keep the dashboard out of casual view, nothing more.
 */
const STORAGE_KEY = "pulseboard.authenticated";
export const ROOT_USERNAME = "root";

const ROOT_PASSWORD = import.meta.env.VITE_ROOT_PASSWORD;
export const AUTH_DISABLED = import.meta.env.VITE_DISABLE_AUTH === "true";

interface AuthContextValue {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function readStoredAuth(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => AUTH_DISABLED || readStoredAuth());

  function setAuthenticated(next: boolean) {
    setIsAuthenticated(next);
    if (AUTH_DISABLED) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, String(next));
    } catch {
      // localStorage unavailable (private browsing, etc.) — auth falls back to session-only.
    }
  }

  function login(username: string, password: string) {
    const ok = Boolean(ROOT_PASSWORD) && username === ROOT_USERNAME && password === ROOT_PASSWORD;
    if (ok) setAuthenticated(true);
    return ok;
  }

  function logout() {
    setAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
