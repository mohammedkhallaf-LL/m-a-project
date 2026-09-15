import type { Kpi } from "../types";

export function formatCurrency(n: number): string {
  return "$" + Math.round(n).toLocaleString("en-US");
}

export function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

export function formatPercent(fraction: number, digits = 1): string {
  return (fraction * 100).toFixed(digits) + "%";
}

export function formatDelta(delta: number): string {
  const sign = delta >= 0 ? "+" : "";
  return `${sign}${(delta * 100).toFixed(1)}%`;
}

export function formatKpiValue(kpi: Kpi): string {
  switch (kpi.format) {
    case "currency":
      return formatCurrency(kpi.value);
    case "percent":
      return formatPercent(kpi.value);
    case "number":
      return formatNumber(kpi.value);
    case "score":
      return String(kpi.value);
  }
}

/** True when the change is good news, given the KPI's higherIsBetter rule. */
export function isDeltaGood(kpi: Kpi): boolean {
  return kpi.delta >= 0 === kpi.higherIsBetter;
}

export function formatDate(iso: string): string {
  const d = new Date(iso.length <= 7 ? `${iso}-01` : iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function formatLastLogin(iso: string | null): string {
  if (!iso) return "—";
  return formatDate(iso);
}
