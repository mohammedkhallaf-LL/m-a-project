import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/Dialog",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function ConfirmDeleteDemo() {
  const [open, setOpen] = useState(true);

  return (
    <div style={{ position: "relative", height: "360px", background: "var(--color-canvas)", fontFamily: "var(--font-sans)" }}>
      {!open && (
        <div style={{ padding: "1.5rem" }}>
          <button className="btn btn--danger" onClick={() => setOpen(true)}>
            Delete user
          </button>
        </div>
      )}
      {open && (
        <div className="dialog-overlay" onClick={() => setOpen(false)}>
          <div
            className="dialog"
            role="dialog"
            aria-modal="true"
            data-testid="confirm-delete"
            onClick={(event) => event.stopPropagation()}
          >
            <h3 className="dialog__title">Delete user?</h3>
            <p className="dialog__body">
              This removes Tomás Ferreira permanently. This action cannot be undone.
            </p>
            <div className="dialog__actions">
              <button className="btn btn--secondary" data-testid="confirm-no" onClick={() => setOpen(false)}>
                Cancel
              </button>
              <button className="btn btn--danger" data-testid="confirm-yes" onClick={() => setOpen(false)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export const ConfirmDelete: Story = {
  name: "Confirm delete",
  render: () => <ConfirmDeleteDemo />,
};
