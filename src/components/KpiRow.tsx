import { useTranslation } from "react-i18next";
import type { Kpi } from "../types";
import { formatDelta, formatKpiValue, isDeltaGood } from "../lib/format";
import { kpiLabel } from "../lib/labels";

export function KpiRow({ kpis }: { kpis: Kpi[] }) {
  const { t } = useTranslation();
  return (
    <section className="kpi-row" data-testid="kpi-row" aria-label={t("kpi.ariaLabel")}>
      {kpis.map((kpi) => (
        <KpiCard key={kpi.id} kpi={kpi} />
      ))}
    </section>
  );
}

function KpiCard({ kpi }: { kpi: Kpi }) {
  const { t } = useTranslation();
  const good = isDeltaGood(kpi);
  const arrow = kpi.delta > 0 ? "▲" : kpi.delta < 0 ? "▼" : "→";

  return (
    <article className="card kpi-card" data-testid="kpi-card">
      <p className="kpi-card__label">{kpiLabel(t, kpi)}</p>
      <p className="kpi-card__value">{formatKpiValue(kpi)}</p>
      <p className={`kpi-card__delta ${good ? "kpi-card__delta--good" : "kpi-card__delta--bad"}`}>
        <span aria-hidden="true">{arrow}</span> {formatDelta(kpi.delta)}
        <span className="kpi-card__delta-note"> {t("kpi.vsLastMonth")}</span>
      </p>
    </article>
  );
}
