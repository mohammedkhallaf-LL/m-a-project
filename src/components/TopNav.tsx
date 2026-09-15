import type { Theme } from "../hooks/useTheme";

export type Route = "dashboard" | "users";

export function TopNav({
  period,
  route,
  onNavigate,
  theme,
  onToggleTheme,
}: {
  period: string;
  route: Route;
  onNavigate: (route: Route) => void;
  theme: Theme;
  onToggleTheme: () => void;
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
      <button
        type="button"
        className="icon-btn"
        aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        onClick={onToggleTheme}
      >
        {theme === "dark" ? <SunIcon /> : <MoonIcon />}
      </button>
    </header>
  );
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M8 1v1.5M8 13.5V15M15 8h-1.5M2.5 8H1M12.95 3.05l-1.06 1.06M4.11 11.89l-1.06 1.06M12.95 12.95l-1.06-1.06M4.11 4.11 3.05 3.05"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M13.5 9.5A5.5 5.5 0 0 1 6.5 2.5a5.5 5.5 0 1 0 7 7Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
