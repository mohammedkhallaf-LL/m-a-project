import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/KPI Card",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function Kpi({
  label,
  value,
  delta,
  good,
}: {
  label: string;
  value: string;
  delta: string;
  good: boolean;
}) {
  return (
    <div className="card kpi-card" data-testid="kpi-card">
      <span className="kpi-card__label">{label}</span>
      <span className="kpi-card__value">{value}</span>
      <span className={`kpi-card__delta ${good ? "kpi-card__delta--good" : "kpi-card__delta--bad"}`}>
        <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
          {good ? <path d="M5 1l4 6H1z" fill="currentColor" /> : <path d="M5 9L1 3h8z" fill="currentColor" />}
        </svg>
        {delta}
        <span className="kpi-card__delta-note">&nbsp;vs last month</span>
      </span>
    </div>
  );
}

export const SingleCard: Story = {
  render: () => (
    <div style={{ maxWidth: 280, fontFamily: "var(--font-sans)" }}>
      <Kpi label="Monthly recurring revenue" value="$85,370" delta="+5.5%" good />
    </div>
  ),
};

export const Row: Story = {
  name: "KPI row (Dashboard header)",
  render: () => (
    <div className="kpi-row" data-testid="kpi-row" style={{ fontFamily: "var(--font-sans)" }}>
      <Kpi label="Monthly recurring revenue" value="$85,370" delta="+5.5%" good />
      <Kpi label="Active accounts" value="15" delta="+7.1%" good />
      <Kpi label="Churn rate" value="3.2%" delta="-0.4%" good />
      <Kpi label="Net promoter score" value="47" delta="+9.0%" good />
    </div>
  ),
};

export const NegativeChange: Story = {
  render: () => (
    <div style={{ maxWidth: 280, fontFamily: "var(--font-sans)" }}>
      <Kpi label="Active accounts" value="12" delta="-3.1%" good={false} />
    </div>
  ),
};
