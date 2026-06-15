import { STATUS_MAP, type StatusKey } from "@/lib/status-map";

export function StatusPill({ status }: { status: StatusKey }) {
  const { label, intensity, Icon } = STATUS_MAP[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] border border-[var(--border)] px-2.5 py-0.5 font-mono text-[var(--text-meta)] uppercase tracking-wider"
      style={{
        color: `rgba(245,245,240,0.${intensity === "100" ? "95" : intensity})`,
      }}
    >
      <Icon size={11} aria-hidden /> {label}
    </span>
  );
}
