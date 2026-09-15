import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Foundations/Typography",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const SCALE = [
  { name: "2xl — KPI value", token: "--text-2xl", weight: "--font-weight-bold" },
  { name: "xl — section heading", token: "--text-xl", weight: "--font-weight-bold" },
  { name: "lg — card title", token: "--text-lg", weight: "--font-weight-semibold" },
  { name: "base — body", token: "--text-base", weight: "--font-weight-regular" },
  { name: "sm — label / meta", token: "--text-sm", weight: "--font-weight-medium" },
  { name: "xs — table header / pill", token: "--text-xs", weight: "--font-weight-semibold" },
];

export const Scale: Story = {
  render: () => (
    <div style={{ fontFamily: "var(--font-sans)", display: "flex", flexDirection: "column", gap: "1rem" }}>
      {SCALE.map((s) => (
        <div key={s.token} style={{ display: "flex", alignItems: "baseline", gap: "1rem" }}>
          <div
            style={{
              width: 220,
              fontSize: "var(--text-xs)",
              color: "var(--color-text-muted)",
              flexShrink: 0,
            }}
          >
            {s.name}
            <br />
            <code>{s.token}</code>
          </div>
          <div style={{ fontSize: `var(${s.token})`, fontWeight: `var(${s.weight})` }}>
            Monthly recurring revenue
          </div>
        </div>
      ))}
    </div>
  ),
};

export const Weights: Story = {
  render: () => (
    <div style={{ fontFamily: "var(--font-sans)", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <p style={{ fontWeight: "var(--font-weight-regular)" }}>Regular (400) — body text</p>
      <p style={{ fontWeight: "var(--font-weight-medium)" }}>Medium (500) — labels, nav links</p>
      <p style={{ fontWeight: "var(--font-weight-semibold)" }}>Semibold (600) — card titles</p>
      <p style={{ fontWeight: "var(--font-weight-bold)" }}>Bold (700) — headings, KPI values</p>
    </div>
  ),
};
