import { useMemo, useState } from "react";
import type { Account, AccountStatus } from "../types";
import { formatCurrency } from "../lib/format";
import { Pill, type PillTone } from "./Pill";

type SortKey = "name" | "plan" | "region" | "owner" | "mrr" | "seats" | "status" | "health";
type SortDir = "asc" | "desc";

const STATUS_TONE: Record<AccountStatus, PillTone> = {
  Active: "good",
  Trial: "info",
  "At risk": "warn",
  Churned: "bad",
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
    <section className="table-card">
      <div className="table-toolbar">
        <div>
          <h2>Accounts</h2>
          <p className="page-subtitle">{accounts.length} accounts</p>
        </div>
        <input
          type="text"
          className="table-filter-input"
          data-testid="table-filter"
          placeholder="Filter by name, owner, plan, region, or status"
          aria-label="Filter accounts"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
      </div>

      <div className="table-scroll">
        <table className="data-table" data-testid="accounts-table">
          <thead>
            <tr>
              {COLUMNS.map((col) => {
                const active = sortKey === col.key;
                return (
                  <th key={col.key} aria-sort={active ? (sortDir === "asc" ? "ascending" : "descending") : "none"}>
                    <button
                      type="button"
                      className="sort-btn"
                      data-testid={col.testId}
                      onClick={() => toggleSort(col.key)}
                    >
                      {col.label}
                      <span className="sort-indicator" aria-hidden="true">
                        {active ? (sortDir === "asc" ? "↑" : "↓") : ""}
                      </span>
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
                className="account-row"
                onClick={() => onSelect(a, null)}
              >
                <td>
                  <button type="button" className="row-name-btn" onClick={(e) => onSelect(a, e.currentTarget)}>
                    {a.name}
                  </button>
                </td>
                <td>{a.plan}</td>
                <td>{a.region}</td>
                <td>{a.owner}</td>
                <td data-testid="cell-mrr">{formatCurrency(a.mrr)}</td>
                <td>{a.seats}</td>
                <td>
                  <Pill tone={STATUS_TONE[a.status]}>{a.status}</Pill>
                </td>
                <td>
                  <HealthBar value={a.health} />
                </td>
              </tr>
            ))}
            {sorted.length === 0 && (
              <tr>
                <td colSpan={COLUMNS.length}>
                  <div className="table-empty" data-testid="table-empty">
                    No accounts match &ldquo;{filterText}&rdquo;.
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function HealthBar({ value }: { value: number }) {
  return (
    <div className="health" aria-label={`Health score ${value} out of 100`}>
      <div className="health-track">
        <div className="health-fill" style={{ width: `${value}%` }} />
      </div>
      <span className="health-value">{value}</span>
    </div>
  );
}
