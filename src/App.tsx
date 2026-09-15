import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { useTheme } from "./hooks/useTheme";
import { TopNav, type Route } from "./components/TopNav";
import { Dashboard } from "./pages/Dashboard";
import { Users } from "./pages/Users";
import { Settings } from "./pages/Settings";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import { AuthGate } from "./auth/AuthGate";
import type { DashboardData } from "./types";

export default function App({ data }: { data: DashboardData }) {
  return (
    <AuthProvider>
      <AuthGate>
        <PulseBoard data={data} />
      </AuthGate>
    </AuthProvider>
  );
}

function PulseBoard({ data }: { data: DashboardData }) {
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const [route, setRoute] = useState<Route>("dashboard");
  const [users, setUsers] = useState(data.users);

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
        <Users users={users} onChange={setUsers} />
      ) : (
        <Settings />
      )}
    </div>
  );
}
