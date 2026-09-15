import { useState } from "react";
import type { Account, Kpi, RevenuePoint } from "../types";
import { KpiRow } from "../components/KpiRow";
import { RevenueChart } from "../components/RevenueChart";
import { AccountsTable } from "../components/AccountsTable";
import { DetailDrawer } from "../components/DetailDrawer";

interface DashboardProps {
  kpis: Kpi[];
  revenueSeries: RevenuePoint[];
  accounts: Account[];
}

export function Dashboard({ kpis, revenueSeries, accounts }: DashboardProps) {
  const [selected, setSelected] = useState<Account | null>(null);
  const [returnFocus, setReturnFocus] = useState<HTMLElement | null>(null);

  function handleSelect(account: Account, trigger: HTMLElement | null) {
    setSelected(account);
    setReturnFocus(trigger);
  }

  function handleClose() {
    setSelected(null);
    returnFocus?.focus();
  }

  return (
    <div className="page">
      <KpiRow kpis={kpis} />
      <RevenueChart series={revenueSeries} />
      <AccountsTable accounts={accounts} onSelect={handleSelect} />
      <DetailDrawer account={selected} onClose={handleClose} />
    </div>
  );
}
