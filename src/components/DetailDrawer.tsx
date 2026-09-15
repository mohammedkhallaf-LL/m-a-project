import { useEffect, useRef } from "react";
import type { Account, AccountStatus } from "../types";
import { formatCurrency, formatDate } from "../lib/format";
import { Pill, type PillTone } from "./Pill";
import { Panel } from "./Panel";

const STATUS_TONE: Record<AccountStatus, PillTone> = {
  Active: "good",
  Trial: "info",
  "At risk": "warn",
  Churned: "neutral",
};

interface DetailDrawerProps {
  account: Account | null;
  onClose: () => void;
}

export function DetailDrawer({ account, onClose }: DetailDrawerProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!account) return;
    closeBtnRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [account, onClose]);

  if (!account) return null;

  return (
    <Panel testId="detail-drawer" onClose={onClose} ariaLabelledBy="drawer-heading" wide>
      <div className="drawer__header">
        <div>
          <p className="drawer__eyebrow">Account</p>
          <h2 className="drawer__title" id="drawer-heading">{account.name}</h2>
        </div>
        <button
          ref={closeBtnRef}
          type="button"
          data-testid="drawer-close"
          className="icon-btn"
          aria-label="Close details"
          onClick={onClose}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <dl className="drawer__grid">
        <div>
          <dt className="drawer__field-label">Plan</dt>
          <dd className="drawer__field-value">{account.plan}</dd>
        </div>
        <div>
          <dt className="drawer__field-label">Region</dt>
          <dd className="drawer__field-value">{account.region}</dd>
        </div>
        <div>
          <dt className="drawer__field-label">MRR</dt>
          <dd className="drawer__field-value">{formatCurrency(account.mrr)}</dd>
        </div>
        <div>
          <dt className="drawer__field-label">Seats</dt>
          <dd className="drawer__field-value">{account.seats}</dd>
        </div>
        <div>
          <dt className="drawer__field-label">Status</dt>
          <dd>
            <Pill tone={STATUS_TONE[account.status]}>{account.status}</Pill>
          </dd>
        </div>
        <div>
          <dt className="drawer__field-label">Health</dt>
          <dd className="drawer__field-value">{account.health}</dd>
        </div>
        <div>
          <dt className="drawer__field-label">Signed up</dt>
          <dd className="drawer__field-value">{formatDate(account.signedUpAt)}</dd>
        </div>
        <div>
          <dt className="drawer__field-label">Last active</dt>
          <dd className="drawer__field-value">{formatDate(account.lastActiveAt)}</dd>
        </div>
      </dl>

      <div style={{ marginTop: "var(--space-6)" }}>
        <p className="drawer__field-label">Owner</p>
        <p className="drawer__field-value">{account.owner}</p>
        <p>
          <a href={`mailto:${account.ownerEmail}`} style={{ color: "var(--color-brand)" }}>
            {account.ownerEmail}
          </a>
        </p>
      </div>

      <div style={{ marginTop: "var(--space-6)" }}>
        <p className="drawer__field-label">Notes</p>
        <p>{account.notes}</p>
      </div>
    </Panel>
  );
}
