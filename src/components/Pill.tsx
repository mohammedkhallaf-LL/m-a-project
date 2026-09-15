export type PillTone = "good" | "warn" | "bad" | "info" | "neutral";

const TONE_CLASS: Record<PillTone, string> = {
  good: "pill--success",
  warn: "pill--warning",
  bad: "pill--danger",
  info: "pill--info",
  neutral: "pill--neutral",
};

export function Pill({ tone, children }: { tone: PillTone; children: React.ReactNode }) {
  return <span className={`pill ${TONE_CLASS[tone]}`}>{children}</span>;
}
