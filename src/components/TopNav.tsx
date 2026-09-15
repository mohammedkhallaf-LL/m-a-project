export type Route = "dashboard" | "users";

export function TopNav({
  period,
  route,
  onNavigate,
}: {
  period: string;
  route: Route;
  onNavigate: (route: Route) => void;
}) {
  return (
    <header className="app-nav">
      <div className="app-nav__brand">
        <span className="app-nav__mark" aria-hidden="true" />
        <h1>PulseBoard</h1>
      </div>
      <nav className="app-nav__links">
        <button
          type="button"
          className="app-nav__link"
          data-testid="nav-dashboard"
          aria-current={route === "dashboard" ? "page" : undefined}
          onClick={() => onNavigate("dashboard")}
        >
          Dashboard
        </button>
        <button
          type="button"
          className="app-nav__link"
          data-testid="nav-users"
          aria-current={route === "users" ? "page" : undefined}
          onClick={() => onNavigate("users")}
        >
          Users
        </button>
      </nav>
      <div className="app-nav__period">{period}</div>
    </header>
  );
}
