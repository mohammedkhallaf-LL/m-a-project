import type { RevenuePoint } from "../types";
import { formatCurrency } from "../lib/format";

const WIDTH = 720;
const HEIGHT = 300;
const PADDING = { top: 16, right: 16, bottom: 28, left: 56 };

function monthLabel(iso: string): string {
  return new Date(`${iso}-01`).toLocaleDateString("en-US", { month: "short" });
}

export function RevenueChart({ series }: { series: RevenuePoint[] }) {
  const innerW = WIDTH - PADDING.left - PADDING.right;
  const innerH = HEIGHT - PADDING.top - PADDING.bottom;

  const maxRaw = Math.max(...series.map((p) => Math.max(p.revenue, p.target)));
  const maxValue = Math.max(25000, Math.ceil(maxRaw / 25000) * 25000);

  const step = innerW / series.length;
  const barWidth = Math.min(40, step * 0.55);

  const yFor = (v: number) => PADDING.top + innerH - (v / maxValue) * innerH;
  const barHeight = (v: number) => (v / maxValue) * innerH;
  const xCenter = (i: number) => PADDING.left + i * step + step / 2;

  const ticks = [0, 0.25, 0.5, 0.75, 1].map((f) => Math.round(maxValue * f));
  const linePoints = series.map((p, i) => `${xCenter(i)},${yFor(p.target)}`).join(" ");

  const latest = series[series.length - 1];
  const accessibleName = latest
    ? `Revenue versus target, last 12 months. Latest month revenue ${formatCurrency(latest.revenue)} against a target of ${formatCurrency(latest.target)}.`
    : "Revenue versus target, last 12 months.";

  return (
    <section className="chart-card">
      <div className="chart-heading">
        <h2>Revenue vs target</h2>
        <p className="chart-subtitle">Monthly recurring revenue, last 12 months</p>
      </div>
      <div className="chart-legend">
        <span className="legend-item">
          <span className="legend-swatch swatch-revenue" aria-hidden="true" /> Revenue
        </span>
        <span className="legend-item">
          <span className="legend-swatch swatch-target" aria-hidden="true" /> Target
        </span>
      </div>
      <div className="chart-wrapper" data-testid="revenue-chart" role="img" aria-label={accessibleName}>
        <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="chart-svg" aria-hidden="true">
          {ticks.map((t) => (
            <g key={t}>
              <line x1={PADDING.left} x2={WIDTH - PADDING.right} y1={yFor(t)} y2={yFor(t)} className="chart-gridline" />
              <text x={PADDING.left - 10} y={yFor(t)} textAnchor="end" dominantBaseline="middle" className="chart-tick">
                {t === 0 ? "0" : `$${t / 1000}k`}
              </text>
            </g>
          ))}
          {series.map((p, i) => (
            <rect
              key={`bar-${p.month}`}
              x={xCenter(i) - barWidth / 2}
              y={yFor(p.revenue)}
              width={barWidth}
              height={barHeight(p.revenue)}
              rx={3}
              className="chart-bar"
            />
          ))}
          <polyline points={linePoints} className="chart-line" fill="none" />
          {series.map((p, i) => (
            <circle key={`dot-${p.month}`} cx={xCenter(i)} cy={yFor(p.target)} r={4} className="chart-dot" />
          ))}
          {series.map((p, i) => (
            <text key={`label-${p.month}`} x={xCenter(i)} y={HEIGHT - 6} textAnchor="middle" className="chart-tick">
              {monthLabel(p.month)}
            </text>
          ))}
        </svg>
      </div>
    </section>
  );
}
