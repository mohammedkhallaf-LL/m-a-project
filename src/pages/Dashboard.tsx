import type { DashboardData } from "../types";

/**
 * Placeholder — the Dashboard build (KPI row, revenue chart, accounts table,
 * detail drawer) is being developed in parallel. This stub keeps navigation
 * and the app shell working; swap in the real page here.
 */
export function Dashboard({ data }: { data: DashboardData }) {
  return (
    <main className="page">
      <div className="card">
        <h1 className="card__title">PulseBoard</h1>
        <p className="card__subtitle">
          Dashboard for {data.meta.product} — {data.meta.period}. Build in progress.
        </p>
      </div>
    </main>
  );
}
