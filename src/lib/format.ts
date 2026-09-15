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

/**
 * Dates aren't pinned by the acceptance contract ("Dates may be displayed
 * however you like" — SPEC.md), so unlike the number formatters above,
 * these take the active UI locale.
 */
export function formatDate(iso: string, locale = "en-US"): string {
  const d = new Date(iso.length <= 7 ? `${iso}-01` : iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(locale, { month: "short", day: "numeric", year: "numeric" });
}

export function formatLastLogin(iso: string | null, locale = "en-US", never = "—"): string {
  if (!iso) return never;
  return formatDate(iso, locale);
}

/** `data.meta.period` arrives as an English month-year string ("August 2026");
 * re-render it in the active locale, falling back to the raw value. */
export function formatPeriod(period: string, locale = "en-US"): string {
  const d = new Date(period);
  if (Number.isNaN(d.getTime())) return period;
  return d.toLocaleDateString(locale, { month: "long", year: "numeric" });
}
