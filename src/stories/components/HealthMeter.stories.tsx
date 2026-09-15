import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/Health Meter",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function Meter({ value, tone }: { value: number; tone: "good" | "warning" | "bad" }) {
  return (
    <div className="meter">
      <div className="meter__track">
        <div className={`meter__fill meter__fill--${tone}`} style={{ width: `${value}%` }} />
      </div>
      <span className="meter__value">{value}</span>
    </div>
  );
}

export const Levels: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontFamily: "var(--font-sans)" }}>
      <Meter value={88} tone="good" />
      <Meter value={65} tone="warning" />
      <Meter value={42} tone="bad" />
      <Meter value={12} tone="bad" />
    </div>
  ),
};
