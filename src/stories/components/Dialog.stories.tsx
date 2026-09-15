import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/Dialog",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const ConfirmDelete: Story = {
  name: "Confirm delete",
  render: () => (
    <div style={{ position: "relative", height: "360px", background: "var(--color-canvas)", fontFamily: "var(--font-sans)" }}>
      <div className="dialog-overlay" style={{ position: "absolute" }}>
        <div className="dialog" role="dialog" aria-modal="true" data-testid="confirm-delete">
          <h3 className="dialog__title">Delete user?</h3>
          <p className="dialog__body">
            This removes Tomás Ferreira permanently. This action cannot be undone.
          </p>
          <div className="dialog__actions">
            <button className="btn btn--secondary" data-testid="confirm-no">Cancel</button>
            <button className="btn btn--danger" data-testid="confirm-yes">Delete</button>
          </div>
        </div>
      </div>
    </div>
  ),
};
