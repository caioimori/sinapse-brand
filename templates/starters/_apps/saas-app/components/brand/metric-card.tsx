import { cn } from "@/lib/cn";

interface MetricCardProps {
  eyebrow: string;
  value: string;
  delta?: { value: string; positive: boolean };
  className?: string;
}

export function MetricCard({ eyebrow, value, delta, className }: MetricCardProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-xl)] border border-[var(--border)] bg-card p-5",
        className
      )}
    >
      <p className="eyebrow">{eyebrow}</p>
      {/* valor display: clamp(3rem,5vw,4rem) = 48-64px — escapa a dead-zone */}
      <p
        className="mt-3 font-display font-light tabular-nums leading-none"
        style={{ fontSize: "clamp(3rem, 5vw, 4rem)" }}
      >
        {value}
      </p>
      {delta && (
        <span
          className={cn(
            "mt-2 inline-block font-mono text-[var(--text-meta)] tracking-wider",
            delta.positive
              ? "text-foreground"
              : "text-[var(--muted-fg)] border-b border-dashed"
          )}
        >
          {delta.positive ? "↑" : "↓"} {delta.value}
        </span>
      )}
    </div>
  );
}
