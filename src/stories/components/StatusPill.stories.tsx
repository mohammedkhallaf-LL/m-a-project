import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/Status Pill",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const AccountStatuses: Story = {
  name: "Account status (Dashboard)",
  render: () => (
    <div style={{ display: "flex", gap: "0.75rem", fontFamily: "var(--font-sans)" }}>
      <span className="pill pill--success">Active</span>
      <span className="pill pill--info">Trial</span>
      <span className="pill pill--warning">At risk</span>
      <span className="pill pill--neutral">Churned</span>
    </div>
  ),
};

export const UserStatuses: Story = {
  name: "User status (Users page)",
  render: () => (
    <div style={{ display: "flex", gap: "0.75rem", fontFamily: "var(--font-sans)" }}>
      <span className="pill pill--success">Active</span>
      <span className="pill pill--info">Invited</span>
      <span className="pill pill--danger">Suspended</span>
    </div>
  ),
};

export const UsageNote: Story = {
  name: "Usage",
  render: () => (
    <p style={{ fontFamily: "var(--font-sans)", maxWidth: 480, color: "var(--color-text-muted)" }}>
      Pills always pair a semantic background/text color with a text label — never color
      alone (WCAG "don't convey information by color alone"). Map each domain status to
      one pill variant and reuse it everywhere that status appears.
    </p>
  ),
};
