import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Foundations/Colors",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

interface Swatch {
  name: string;
  token: string;
  fg?: string;
}

function SwatchGrid({ title, swatches }: { title: string; swatches: Swatch[] }) {
  return (
    <div style={{ marginBottom: "2rem" }}>
      <h3 style={{ fontFamily: "system-ui", marginBottom: "0.75rem" }}>{title}</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "1rem",
        }}
      >
        {swatches.map((s) => (
          <div
            key={s.token}
            style={{
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-md)",
              overflow: "hidden",
              fontFamily: "system-ui",
            }}
          >
            <div
              style={{
                height: 64,
                background: `var(${s.token})`,
                color: s.fg ? `var(${s.fg})` : undefined,
              }}
            />
            <div style={{ padding: "0.5rem 0.75rem" }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{s.name}</div>
              <code style={{ fontSize: 12, color: "var(--color-text-muted)" }}>{s.token}</code>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const BRAND: Swatch[] = [
  { name: "Brand", token: "--color-brand" },
  { name: "Brand hover", token: "--color-brand-hover" },
  { name: "Brand active", token: "--color-brand-active" },
];

const NEUTRALS: Swatch[] = [
  { name: "Canvas", token: "--color-canvas" },
  { name: "Surface", token: "--color-surface" },
  { name: "Surface sunken", token: "--color-surface-sunken" },
  { name: "Border", token: "--color-border" },
  { name: "Border strong", token: "--color-border-strong" },
  { name: "Text", token: "--color-text" },
  { name: "Text muted", token: "--color-text-muted" },
  { name: "Text subtle", token: "--color-text-subtle" },
];

const SEMANTIC: Swatch[] = [
  { name: "Success", token: "--color-success-bg" },
  { name: "Warning", token: "--color-warning-bg" },
  { name: "Danger", token: "--color-danger-bg" },
  { name: "Info", token: "--color-info-bg" },
  { name: "Neutral status", token: "--color-neutral-status-bg" },
];

const CHART: Swatch[] = [
  { name: "Revenue", token: "--color-chart-revenue" },
  { name: "Revenue (strong)", token: "--color-chart-revenue-strong" },
  { name: "Target", token: "--color-chart-target" },
];

export const Brand: Story = {
  render: () => <SwatchGrid title="Brand" swatches={BRAND} />,
};

export const Neutrals: Story = {
  render: () => <SwatchGrid title="Neutrals" swatches={NEUTRALS} />,
};

export const Semantic: Story = {
  render: () => <SwatchGrid title="Semantic status" swatches={SEMANTIC} />,
};

export const Chart: Story = {
  render: () => <SwatchGrid title="Chart series" swatches={CHART} />,
};

export const AllTokens: Story = {
  name: "All colors",
  render: () => (
    <div>
      <SwatchGrid title="Brand" swatches={BRAND} />
      <SwatchGrid title="Neutrals" swatches={NEUTRALS} />
      <SwatchGrid title="Semantic status" swatches={SEMANTIC} />
      <SwatchGrid title="Chart series" swatches={CHART} />
    </div>
  ),
};
