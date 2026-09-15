import { useState } from "react";
import type { Account, AccountStatus } from "../types";
import { formatCurrency } from "../lib/format";
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
  label: string;
  testId?: string;
}

const COLUMNS: Column[] = [
  { key: "name", label: "Account" },
  { key: "plan", label: "Plan" },
  { key: "region", label: "Region" },
  { key: "owner", label: "Owner" },
  { key: "mrr", label: "MRR", testId: "sort-mrr" },
  { key: "seats", label: "Seats" },
  { key: "status", label: "Status" },
  { key: "health", label: "Health" },
];

interface AccountsTableProps {
  accounts: Account[];
  onSelect: (account: Account, trigger: HTMLElement | null) => void;
}

export function AccountsTable({ accounts, onSelect }: AccountsTableProps) {
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

  const query = filterText.trim().toLowerCase();
  const filtered = query
    ? accounts.filter((a) =>
        [a.name, a.owner, a.plan, a.region, a.status].some((f) => f.toLowerCase().includes(query)),
      )
    : accounts;

  const dir = sortDir === "asc" ? 1 : -1;
  const sorted = sortKey
    ? [...filtered].sort((a, b) => {
        const av = a[sortKey];
        const bv = b[sortKey];
        if (typeof av === "number" && typeof bv === "number") return (av - bv) * dir;
        return String(av).localeCompare(String(bv)) * dir;
      })
    : filtered;

  return (
    <section className="card">
      <div className="table-toolbar">
        <div>
          <h2 className="card__title">Accounts</h2>
          <p className="card__subtitle">{accounts.length} accounts</p>
        </div>
        <input
          type="text"
          className="filter-input"
          data-testid="table-filter"
          placeholder="Filter by name, owner, plan, region, or status"
          aria-label="Filter accounts"
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
                      {col.label}
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
                <td>{a.plan}</td>
                <td>{a.region}</td>
                <td>{a.owner}</td>
                <td data-numeric="true" data-testid="cell-mrr">{formatCurrency(a.mrr)}</td>
                <td data-numeric="true">{a.seats}</td>
                <td>
                  <Pill tone={STATUS_TONE[a.status]}>{a.status}</Pill>
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
            No accounts match &ldquo;{filterText}&rdquo;.
          </div>
        )}
      </div>
    </section>
  );
}

function HealthBar({ value }: { value: number }) {
  const tone = value >= 70 ? "good" : value >= 45 ? "warning" : "bad";
  return (
    <div className="meter" aria-label={`Health score ${value} out of 100`}>
      <div className="meter__track">
        <div className={`meter__fill meter__fill--${tone}`} style={{ width: `${value}%` }} />
      </div>
      <span className="meter__value">{value}</span>
    </div>
  );
}
