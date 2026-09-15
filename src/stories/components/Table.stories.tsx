import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/Table",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const ROWS = [
  { id: "acc-001", name: "Northwind Logistics", plan: "Enterprise", region: "NA", owner: "Priya Raman", mrr: "$9,800", status: "Active" as const },
  { id: "acc-002", name: "Acme Robotics", plan: "Growth", region: "NA", owner: "Diego Alvarez", mrr: "$2,400", status: "Active" as const },
  { id: "acc-003", name: "Helios Energy", plan: "Enterprise", region: "EMEA", owner: "Sofia Lindqvist", mrr: "$7,200", status: "At risk" as const },
  { id: "acc-008", name: "Verde Agro", plan: "Starter", region: "LATAM", owner: "Camila Torres", mrr: "$360", status: "Churned" as const },
];

const PILL: Record<string, string> = {
  Active: "pill--success",
  Trial: "pill--info",
  "At risk": "pill--warning",
  Churned: "pill--neutral",
};

export const AccountsTable: Story = {
  render: () => (
    <div className="card" style={{ fontFamily: "var(--font-sans)" }}>
      <div className="table-toolbar">
        <div>
          <h3 className="card__title">Accounts</h3>
          <p className="card__subtitle">{ROWS.length} accounts</p>
        </div>
        <input className="filter-input" placeholder="Filter by name, owner, plan, region, status…" data-testid="table-filter" />
      </div>
      <div className="table-scroll">
        <table className="table" data-testid="accounts-table">
          <thead>
            <tr>
              <th>Account</th>
              <th>Plan</th>
              <th>Region</th>
              <th>Owner</th>
              <th>
                <button className="table-sort-btn" data-testid="sort-mrr">
                  MRR
                  <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                    <path d="M5 9L1 3h8z" fill="currentColor" />
                  </svg>
                </button>
              </th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.id} data-testid="account-row" data-account-id={r.id}>
                <td>{r.name}</td>
                <td>{r.plan}</td>
                <td>{r.region}</td>
                <td>{r.owner}</td>
                <td data-numeric="true" data-testid="cell-mrr">{r.mrr}</td>
                <td>
                  <span className={`pill ${PILL[r.status]}`}>{r.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ),
};

export const EmptyState: Story = {
  render: () => (
    <div className="card" style={{ fontFamily: "var(--font-sans)", maxWidth: 480 }}>
      <div className="table-toolbar">
        <h3 className="card__title">Accounts</h3>
        <input className="filter-input" defaultValue="zzz-no-match" data-testid="table-filter" />
      </div>
      <div className="empty-state" data-testid="table-empty">
        <p>No accounts match "zzz-no-match".</p>
      </div>
    </div>
  ),
};
