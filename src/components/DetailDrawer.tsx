import { useEffect, useRef } from "react";
import type { Account, AccountStatus } from "../types";
import { formatCurrency, formatDate } from "../lib/format";
import { Pill, type PillTone } from "./Pill";

const STATUS_TONE: Record<AccountStatus, PillTone> = {
  Active: "good",
  Trial: "info",
  "At risk": "warn",
  Churned: "bad",
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
    <>
      <div className="drawer-overlay" onClick={onClose} />
      <aside className="detail-drawer" data-testid="detail-drawer" role="dialog" aria-modal="true" aria-labelledby="drawer-heading">
        <div className="drawer-header">
          <div>
            <p className="drawer-eyebrow">Account</p>
            <h2 id="drawer-heading">{account.name}</h2>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            data-testid="drawer-close"
            className="drawer-close"
            aria-label="Close details"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <dl className="drawer-grid">
          <div className="drawer-field">
            <dt>Plan</dt>
            <dd>{account.plan}</dd>
          </div>
          <div className="drawer-field">
            <dt>Region</dt>
            <dd>{account.region}</dd>
          </div>
          <div className="drawer-field">
            <dt>MRR</dt>
            <dd>{formatCurrency(account.mrr)}</dd>
          </div>
          <div className="drawer-field">
            <dt>Seats</dt>
            <dd>{account.seats}</dd>
          </div>
          <div className="drawer-field">
            <dt>Status</dt>
            <dd>
              <Pill tone={STATUS_TONE[account.status]}>{account.status}</Pill>
            </dd>
          </div>
          <div className="drawer-field">
            <dt>Health</dt>
            <dd>{account.health}</dd>
          </div>
          <div className="drawer-field">
            <dt>Signed up</dt>
            <dd>{formatDate(account.signedUpAt)}</dd>
          </div>
          <div className="drawer-field">
            <dt>Last active</dt>
            <dd>{formatDate(account.lastActiveAt)}</dd>
          </div>
        </dl>

        <div className="drawer-section">
          <p className="drawer-section-label">Owner</p>
          <p className="drawer-owner-name">{account.owner}</p>
          <p>
            <a href={`mailto:${account.ownerEmail}`}>{account.ownerEmail}</a>
          </p>
        </div>

        <div className="drawer-section">
          <p className="drawer-section-label">Notes</p>
          <p>{account.notes}</p>
        </div>
      </aside>
    </>
  );
}
