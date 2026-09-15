import { useEffect, useState } from "react";
import type { DashboardData } from "../types";

export function useDashboardData() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/data.json")
      .then((res) => res.json())
      .then((json: DashboardData) => {
        if (!cancelled) setData(json);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return data;
}
