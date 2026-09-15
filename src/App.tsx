import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useDashboardData } from "./hooks/useDashboardData";
import { useTheme } from "./hooks/useTheme";
import { TopNav, type Route } from "./components/TopNav";
import { Dashboard } from "./pages/Dashboard";
import { Users } from "./pages/Users";
import { Settings } from "./pages/Settings";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import { AuthGate } from "./auth/AuthGate";
import type { User } from "./types";

export default function App() {
  return (
    <AuthProvider>
      <AuthGate>
        <PulseBoard />
      </AuthGate>
    </AuthProvider>
  );
}

function PulseBoard() {
  const data = useDashboardData();
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const [route, setRoute] = useState<Route>("dashboard");
  const [users, setUsers] = useState<User[] | null>(null);

  useEffect(() => {
    if (data && users === null) setUsers(data.users);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (!data) {
    return (
      <main className="page">
        <p>Loading…</p>
      </main>
    );
  }

  return (
    <div className="app-shell">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <TopNav
        period={data.meta.period}
        route={route}
        onNavigate={setRoute}
        theme={theme}
        onToggleTheme={toggleTheme}
        onLogout={logout}
      />
      {route === "dashboard" ? (
        <Dashboard kpis={data.kpis} revenueSeries={data.revenueSeries} accounts={data.accounts} />
      ) : route === "users" ? (
        <Users users={users ?? data.users} onChange={setUsers} />
      ) : (
        <Settings />
      )}
    </div>
  );
}
