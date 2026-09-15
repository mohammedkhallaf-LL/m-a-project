import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

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

  useEffect(() => {
    if (AUTH_DISABLED) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, String(isAuthenticated));
    } catch {
      // localStorage unavailable (private browsing, etc.) — auth falls back to session-only.
    }
  }, [isAuthenticated]);

  const login = useCallback((username: string, password: string) => {
    const ok = Boolean(ROOT_PASSWORD) && username === ROOT_USERNAME && password === ROOT_PASSWORD;
    if (ok) setIsAuthenticated(true);
    return ok;
  }, []);

  const logout = useCallback(() => setIsAuthenticated(false), []);

  const value = useMemo(() => ({ isAuthenticated, login, logout }), [isAuthenticated, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
