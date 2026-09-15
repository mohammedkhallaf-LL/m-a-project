import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Foundations/Spacing & Radius",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const SPACE = ["1", "2", "3", "4", "5", "6", "8", "10", "12"];
const RADIUS = ["sm", "md", "lg", "full"];
const SHADOW = ["sm", "md", "lg"];

export const SpacingScale: Story = {
  name: "Spacing scale (4px base)",
  render: () => (
    <div style={{ fontFamily: "var(--font-sans)", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      {SPACE.map((s) => (
        <div key={s} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <code style={{ width: 140, fontSize: 13 }}>--space-{s}</code>
          <div style={{ background: "var(--color-brand)", height: 16, width: `var(--space-${s})` }} />
        </div>
      ))}
    </div>
  ),
};

export const RadiusScale: Story = {
  render: () => (
    <div style={{ fontFamily: "var(--font-sans)", display: "flex", gap: "1.5rem" }}>
      {RADIUS.map((r) => (
        <div key={r} style={{ textAlign: "center" }}>
          <div
            style={{
              width: 80,
              height: 80,
              background: "var(--color-surface-sunken)",
              border: "1px solid var(--color-border)",
              borderRadius: `var(--radius-${r})`,
            }}
          />
          <code style={{ fontSize: 12 }}>--radius-{r}</code>
        </div>
      ))}
    </div>
  ),
};

export const ShadowScale: Story = {
  render: () => (
    <div style={{ fontFamily: "var(--font-sans)", display: "flex", gap: "2.5rem", padding: "1rem" }}>
      {SHADOW.map((s) => (
        <div key={s} style={{ textAlign: "center" }}>
          <div
            style={{
              width: 100,
              height: 70,
              background: "var(--color-surface)",
              borderRadius: "var(--radius-md)",
              boxShadow: `var(--shadow-${s})`,
            }}
          />
          <code style={{ fontSize: 12 }}>--shadow-{s}</code>
        </div>
      ))}
    </div>
  ),
};
