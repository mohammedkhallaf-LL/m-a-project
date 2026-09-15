import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useDashboardData } from "./hooks/useDashboardData";
import { Dashboard } from "./pages/Dashboard";
import { Users } from "./pages/Users";
import type { User } from "./types";

type Page = "dashboard" | "users";

export default function App() {
  const data = useDashboardData();
  const [page, setPage] = useState<Page>("dashboard");
  const [users, setUsers] = useState<User[] | null>(null);

  useEffect(() => {
    if (data && users === null) setUsers(data.users);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div className="app-shell">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <nav className="app-nav">
        <div className="app-nav__brand">
          <span className="app-nav__mark" aria-hidden="true" />
          <span>PulseBoard</span>
        </div>
        <div className="app-nav__links">
          <button
            type="button"
            className="app-nav__link"
            data-testid="nav-dashboard"
            aria-current={page === "dashboard" ? "page" : undefined}
            onClick={() => setPage("dashboard")}
          >
            Dashboard
          </button>
          <button
            type="button"
            className="app-nav__link"
            data-testid="nav-users"
            aria-current={page === "users" ? "page" : undefined}
            onClick={() => setPage("users")}
          >
            Users
          </button>
        </div>
      </nav>

      {!data ? (
        <main className="page">
          <p>Loading…</p>
        </main>
      ) : page === "dashboard" ? (
        <Dashboard data={data} />
      ) : (
        <Users users={users ?? data.users} onChange={setUsers} />
      )}
    </div>
  );
}
