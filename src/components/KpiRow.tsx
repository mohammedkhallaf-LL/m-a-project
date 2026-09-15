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
    <article className="card kpi-card" data-testid="kpi-card">
      <p className="kpi-card__label">{kpi.label}</p>
      <p className="kpi-card__value">{formatKpiValue(kpi)}</p>
      <p className={`kpi-card__delta ${good ? "kpi-card__delta--good" : "kpi-card__delta--bad"}`}>
        <span aria-hidden="true">{arrow}</span> {formatDelta(kpi.delta)}
        <span className="kpi-card__delta-note"> vs last month</span>
      </p>
    </article>
  );
}
