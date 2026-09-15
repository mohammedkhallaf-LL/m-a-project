import { useEffect, useState } from "react";
import type { DashboardData } from "./types";
import { TopNav } from "./components/TopNav";
import { Dashboard } from "./pages/Dashboard";

export default function App() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/data.json")
      .then((res) => res.json())
      .then((json: DashboardData) => {
        if (cancelled) return;
        setData(json);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!data) {
    return (
      <main className="shell">
        <h1>PulseBoard</h1>
      </main>
    );
  }

  return (
    <div className="app-shell">
      <TopNav period={data.meta.period} />
      <main className="app-main">
        <Dashboard kpis={data.kpis} revenueSeries={data.revenueSeries} accounts={data.accounts} />
      </main>
    </div>
  );
}
