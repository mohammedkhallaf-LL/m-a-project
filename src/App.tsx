import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useDashboardData } from "./hooks/useDashboardData";
import { TopNav, type Route } from "./components/TopNav";
import { Dashboard } from "./pages/Dashboard";
import { Users } from "./pages/Users";
import type { User } from "./types";

export default function App() {
  const { t } = useTranslation();
  const data = useDashboardData();
  const [route, setRoute] = useState<Route>("dashboard");
  const [users, setUsers] = useState<User[] | null>(null);

  useEffect(() => {
    if (data && users === null) setUsers(data.users);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (!data) {
    return (
      <main className="page">
        <p>{t("common.loading")}</p>
      </main>
    );
  }

  return (
    <div className="app-shell">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <TopNav period={data.meta.period} route={route} onNavigate={setRoute} />
      {route === "dashboard" ? (
        <Dashboard kpis={data.kpis} revenueSeries={data.revenueSeries} accounts={data.accounts} />
      ) : (
        <Users users={users ?? data.users} onChange={setUsers} />
      )}
    </div>
  );
}
