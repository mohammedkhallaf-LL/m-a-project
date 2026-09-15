import type { ReactNode } from "react";
import { useAuth } from "./AuthContext";
import { LoginForm } from "./LoginForm";

export function AuthGate({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <LoginForm />;
}
