import type { Kpi } from "../types";
import { formatDelta, formatKpiValue, isDeltaGood } from "../lib/format";

export function KpiRow({ kpis }: { kpis: Kpi[] }) {
  return (
    <section className="kpi-row" data-testid="kpi-row" aria-label="Key metrics">
      {kpis.map((kpi) => (
        <KpiCard key={kpi.id} kpi={kpi} />
      ))}
    </section>
  );
}

function KpiCard({ kpi }: { kpi: Kpi }) {
  const good = isDeltaGood(kpi);
  const arrow = kpi.delta > 0 ? "▲" : kpi.delta < 0 ? "▼" : "→";

  return (
    <article className="kpi-card" data-testid="kpi-card">
      <p className="kpi-label">{kpi.label}</p>
      <p className="kpi-value">{formatKpiValue(kpi)}</p>
      <p className={`kpi-delta ${good ? "is-good" : "is-bad"}`}>
        <span aria-hidden="true">{arrow}</span> {formatDelta(kpi.delta)}{" "}
        <span className="kpi-delta-caption">vs last month</span>
      </p>
    </article>
  );
}
