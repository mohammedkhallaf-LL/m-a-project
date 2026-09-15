import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import type { Account, AccountStatus } from "../types";
import { formatCurrency } from "../lib/format";
import { accountStatusLabel, planLabel, translateKey } from "../lib/labels";
import { Pill, type PillTone } from "./Pill";

type SortKey = "name" | "plan" | "region" | "owner" | "mrr" | "seats" | "status" | "health";
type SortDir = "asc" | "desc";

const STATUS_TONE: Record<AccountStatus, PillTone> = {
  Active: "good",
  Trial: "info",
  "At risk": "warn",
  Churned: "neutral",
};

interface Column {
  key: SortKey;
  labelKey: string;
  testId?: string;
}

const COLUMNS: Column[] = [
  { key: "name", labelKey: "accounts.columns.account" },
  { key: "plan", labelKey: "accounts.columns.plan" },
  { key: "region", labelKey: "accounts.columns.region" },
  { key: "owner", labelKey: "accounts.columns.owner" },
  { key: "mrr", labelKey: "accounts.columns.mrr", testId: "sort-mrr" },
  { key: "seats", labelKey: "accounts.columns.seats" },
  { key: "status", labelKey: "accounts.columns.status" },
  { key: "health", labelKey: "accounts.columns.health" },
];

interface AccountsTableProps {
  accounts: Account[];
  onSelect: (account: Account, trigger: HTMLElement | null) => void;
}

export function AccountsTable({ accounts, onSelect }: AccountsTableProps) {
  const { t } = useTranslation();
  const [filterText, setFilterText] = useState("");
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  const filtered = useMemo(() => {
    const q = filterText.trim().toLowerCase();
    if (!q) return accounts;
    return accounts.filter((a) =>
      [a.name, a.owner, a.plan, a.region, a.status].some((f) => f.toLowerCase().includes(q)),
    );
  }, [accounts, filterText]);

  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    const dir = sortDir === "asc" ? 1 : -1;
    return [...filtered].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (typeof av === "number" && typeof bv === "number") return (av - bv) * dir;
      return String(av).localeCompare(String(bv)) * dir;
    });
  }, [filtered, sortKey, sortDir]);

  return (
    <section className="card">
      <div className="table-toolbar">
        <div>
          <h2 className="card__title">{t("accounts.title")}</h2>
          <p className="card__subtitle">{t("accounts.subtitle", { count: accounts.length })}</p>
        </div>
        <input
          type="text"
          className="filter-input"
          data-testid="table-filter"
          placeholder={t("accounts.filterPlaceholder")}
          aria-label={t("accounts.filterAriaLabel")}
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
      </div>

      <div className="table-scroll">
        <table className="table" data-testid="accounts-table">
          <thead>
            <tr>
              {COLUMNS.map((col) => {
                const active = sortKey === col.key;
                return (
                  <th key={col.key} aria-sort={active ? (sortDir === "asc" ? "ascending" : "descending") : "none"}>
                    <button
                      type="button"
                      className="table-sort-btn"
                      data-testid={col.testId}
                      onClick={() => toggleSort(col.key)}
                    >
                      {translateKey(t, col.labelKey)}
                      <span aria-hidden="true">{active ? (sortDir === "asc" ? "↑" : "↓") : ""}</span>
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {sorted.map((a) => (
              <tr
                key={a.id}
                data-testid="account-row"
                data-account-id={a.id}
                onClick={() => onSelect(a, null)}
              >
                <td>
                  <button
                    type="button"
                    className="btn btn--ghost"
                    style={{ padding: 0, minHeight: "auto", fontWeight: "var(--font-weight-semibold)", color: "var(--color-text)" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect(a, e.currentTarget);
                    }}
                  >
                    {a.name}
                  </button>
                </td>
                <td>{planLabel(t, a.plan)}</td>
                <td>{a.region}</td>
                <td>{a.owner}</td>
                <td data-numeric="true" data-testid="cell-mrr">{formatCurrency(a.mrr)}</td>
                <td data-numeric="true">{a.seats}</td>
                <td>
                  <Pill tone={STATUS_TONE[a.status]}>{accountStatusLabel(t, a.status)}</Pill>
                </td>
                <td>
                  <HealthBar value={a.health} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {sorted.length === 0 && (
          <div className="table-empty" data-testid="table-empty">
            {t("accounts.empty", { query: filterText })}
          </div>
        )}
      </div>
    </section>
  );
}

function HealthBar({ value }: { value: number }) {
  const { t } = useTranslation();
  const tone = value >= 70 ? "good" : value >= 45 ? "warning" : "bad";
  return (
    <div className="meter" aria-label={t("accounts.healthAria", { value })}>
      <div className="meter__track">
        <div className={`meter__fill meter__fill--${tone}`} style={{ width: `${value}%` }} />
      </div>
      <span className="meter__value">{value}</span>
    </div>
  );
}
