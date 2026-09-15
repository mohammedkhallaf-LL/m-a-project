import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import type { RevenuePoint } from "../types";
import { formatCurrency } from "../lib/format";

function monthLabel(iso: string): string {
  return new Date(`${iso}-01`).toLocaleDateString("en-US", { month: "short" });
}

function formatAxisValue(v: number): string {
  return v === 0 ? "0" : `$${v / 1000}k`;
}

export function RevenueChart({ series }: { series: RevenuePoint[] }) {
  const latest = series[series.length - 1];
  const accessibleName = latest
    ? `Revenue versus target, last 12 months. Latest month revenue ${formatCurrency(latest.revenue)} against a target of ${formatCurrency(latest.target)}.`
    : "Revenue versus target, last 12 months.";

  const data = series.map((p) => ({ ...p, monthLabel: monthLabel(p.month) }));

  return (
    <section className="card">
      <h2 className="card__title">Revenue vs target</h2>
      <p className="card__subtitle">Monthly recurring revenue, last 12 months</p>
      <div className="chart-legend">
        <span className="chart-legend__item">
          <span className="chart-legend__swatch" style={{ background: "var(--color-chart-revenue)" }} aria-hidden="true" />
          Revenue
        </span>
        <span className="chart-legend__item">
          <span className="chart-legend__swatch" style={{ background: "var(--color-chart-target)" }} aria-hidden="true" />
          Target
        </span>
      </div>
      <div data-testid="revenue-chart" role="img" aria-label={accessibleName} style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 16, right: 16, bottom: 0, left: 0 }}>
            <CartesianGrid vertical={false} stroke="var(--color-border)" />
            <XAxis
              dataKey="monthLabel"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--color-text-muted)", fontSize: 12 }}
            />
            <YAxis
              tickFormatter={formatAxisValue}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--color-text-muted)", fontSize: 12 }}
            />
            <Bar dataKey="revenue" fill="var(--color-chart-revenue)" radius={[3, 3, 0, 0]} maxBarSize={40} />
            <Line
              dataKey="target"
              stroke="var(--color-chart-target)"
              strokeWidth={2}
              dot={{ r: 4, fill: "var(--color-chart-target)", strokeWidth: 0 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
