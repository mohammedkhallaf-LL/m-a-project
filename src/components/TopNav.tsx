export function TopNav({ period }: { period: string }) {
  return (
    <header className="topnav">
      <div className="topnav-brand">
        <span className="brand-mark" aria-hidden="true" />
        <h1>PulseBoard</h1>
      </div>
      <div className="topnav-period">{period}</div>
    </header>
  );
}
