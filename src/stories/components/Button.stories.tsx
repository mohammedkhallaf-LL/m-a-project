import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/Button",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.75rem", fontFamily: "var(--font-sans)" }}>
      <button className="btn btn--primary">Save changes</button>
      <button className="btn btn--secondary">Cancel</button>
      <button className="btn btn--danger">Delete</button>
      <button className="btn btn--ghost">Ghost</button>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.75rem", fontFamily: "var(--font-sans)" }}>
      <button className="btn btn--primary" disabled>
        Save changes
      </button>
      <button className="btn btn--secondary" disabled>
        Cancel
      </button>
    </div>
  ),
};

export const IconButton: Story = {
  render: () => (
    <button className="icon-btn" aria-label="Close">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </button>
  ),
};
