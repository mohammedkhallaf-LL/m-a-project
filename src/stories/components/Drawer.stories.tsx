import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/Drawer",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function AccountDetailDemo() {
  const [open, setOpen] = useState(true);

  return (
    <div style={{ position: "relative", height: "640px", background: "var(--color-canvas)", fontFamily: "var(--font-sans)" }}>
      {!open && (
        <div style={{ padding: "1.5rem" }}>
          <button className="btn btn--primary" onClick={() => setOpen(true)}>
            View account
          </button>
        </div>
      )}
      {open && (
        <>
          <div className="drawer-overlay" onClick={() => setOpen(false)} />
          <div className="drawer" role="dialog" aria-modal="true" data-testid="detail-drawer">
            <div className="drawer__header">
              <div>
                <p className="drawer__eyebrow">Account</p>
                <h2 className="drawer__title">Orion Health</h2>
              </div>
              <button className="icon-btn" aria-label="Close" data-testid="drawer-close" onClick={() => setOpen(false)}>
                <CloseIcon />
              </button>
            </div>
            <div className="drawer__grid">
              <div>
                <p className="drawer__field-label">Plan</p>
                <p className="drawer__field-value">Enterprise</p>
              </div>
              <div>
                <p className="drawer__field-label">Region</p>
                <p className="drawer__field-value">NA</p>
              </div>
              <div>
                <p className="drawer__field-label">MRR</p>
                <p className="drawer__field-value">$11,400</p>
              </div>
              <div>
                <p className="drawer__field-label">Seats</p>
                <p className="drawer__field-value">160</p>
              </div>
              <div>
                <p className="drawer__field-label">Status</p>
                <span className="pill pill--success">Active</span>
              </div>
              <div>
                <p className="drawer__field-label">Health</p>
                <div className="meter">
                  <div className="meter__track">
                    <div className="meter__fill meter__fill--good" style={{ width: "88%" }} />
                  </div>
                  <span className="meter__value">88</span>
                </div>
              </div>
            </div>
            <div style={{ marginTop: "1.5rem" }}>
              <p className="drawer__field-label">Owner</p>
              <p className="drawer__field-value">Priya Raman</p>
              <a href="#" style={{ color: "var(--color-brand)" }}>priya.raman@pulseboard.dev</a>
            </div>
            <div style={{ marginTop: "1.5rem" }}>
              <p className="drawer__field-label">Notes</p>
              <p>Largest account. Quarterly business review scheduled Sep 18.</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export const AccountDetail: Story = {
  name: "Account detail drawer",
  render: () => <AccountDetailDemo />,
};
