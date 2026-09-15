import { useTranslation } from "react-i18next";
import type { Account, AccountStatus } from "../types";
import { formatCurrency, formatDate } from "../lib/format";
import { accountStatusLabel, planLabel } from "../lib/labels";
import { dateLocale } from "../i18n";
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
  const { t, i18n } = useTranslation();
  const locale = dateLocale(i18n.language);

  if (!account) return null;

  return (
    <Panel
      testId="detail-drawer"
      onClose={onClose}
      ariaLabelledBy="drawer-heading"
      wide
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
    >
      <div className="drawer__header">
        <div>
          <p className="drawer__eyebrow">{t("drawer.eyebrow")}</p>
          <h2 className="drawer__title" id="drawer-heading">{account.name}</h2>
        </div>
        <button
          type="button"
          data-testid="drawer-close"
          className="icon-btn"
          aria-label={t("drawer.close")}
          onClick={onClose}
          autoFocus
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <dl className="drawer__grid">
        <div>
          <dt className="drawer__field-label">{t("drawer.fields.plan")}</dt>
          <dd className="drawer__field-value">{planLabel(t, account.plan)}</dd>
        </div>
        <div>
          <dt className="drawer__field-label">{t("drawer.fields.region")}</dt>
          <dd className="drawer__field-value">{account.region}</dd>
        </div>
        <div>
          <dt className="drawer__field-label">{t("drawer.fields.mrr")}</dt>
          <dd className="drawer__field-value">{formatCurrency(account.mrr)}</dd>
        </div>
        <div>
          <dt className="drawer__field-label">{t("drawer.fields.seats")}</dt>
          <dd className="drawer__field-value">{account.seats}</dd>
        </div>
        <div>
          <dt className="drawer__field-label">{t("drawer.fields.status")}</dt>
          <dd>
            <Pill tone={STATUS_TONE[account.status]}>{accountStatusLabel(t, account.status)}</Pill>
          </dd>
        </div>
        <div>
          <dt className="drawer__field-label">{t("drawer.fields.health")}</dt>
          <dd className="drawer__field-value">{account.health}</dd>
        </div>
        <div>
          <dt className="drawer__field-label">{t("drawer.fields.signedUp")}</dt>
          <dd className="drawer__field-value">{formatDate(account.signedUpAt, locale)}</dd>
        </div>
        <div>
          <dt className="drawer__field-label">{t("drawer.fields.lastActive")}</dt>
          <dd className="drawer__field-value">{formatDate(account.lastActiveAt, locale)}</dd>
        </div>
      </dl>

      <div style={{ marginTop: "var(--space-6)" }}>
        <p className="drawer__field-label">{t("drawer.fields.owner")}</p>
        <p className="drawer__field-value">{account.owner}</p>
        <p>
          <a href={`mailto:${account.ownerEmail}`} style={{ color: "var(--color-brand)" }}>
            {account.ownerEmail}
          </a>
        </p>
      </div>

      <div style={{ marginTop: "var(--space-6)" }}>
        <p className="drawer__field-label">{t("drawer.fields.notes")}</p>
        <p>{account.notes}</p>
      </div>
    </Panel>
  );
}
