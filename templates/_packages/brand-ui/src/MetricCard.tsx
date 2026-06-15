import { cn } from "./lib/cn";

/**
 * MetricCard — Card de KPI com valor display, delta e sparkline opcional.
 * Valor usa clamp(3rem,5vw,4rem) — obrigatoriamente fora da dead-zone 32-48px.
 * Delta diferenciado por borda sólida (positivo) vs tracejada (negativo) — nunca por hue.
 */

interface Delta {
  direction: "up" | "down" | "flat";
  text: string;
  positive: boolean;
}

export interface MetricCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string;
  delta?: Delta;
  sparkline?: number[];
}

export function MetricCard({
  label,
  value,
  delta,
  className,
  ...props
}: MetricCardProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-xl)] border border-[var(--border)] bg-card p-5",
        className
      )}
      {...props}
    >
      {/* eyebrow label — mono uppercase */}
      <p
        className="font-mono uppercase tracking-[0.18em] opacity-60"
        style={{ fontSize: "11px" }}
      >
        {label}
      </p>

      {/* valor KPI: clamp(3rem,5vw,4rem) — escapa dead-zone 32-48px */}
      <p
        className="mt-3 font-display font-light tabular-nums leading-none"
        style={{ fontSize: "clamp(3rem, 5vw, 4rem)" }}
      >
        {value}
      </p>

      {delta && (
        <span
          className={cn(
            "mt-2 inline-block font-mono tracking-wider",
            "text-[var(--muted-fg)]",
            delta.positive
              ? "text-foreground border-b border-foreground"
              : "border-b border-dashed border-[var(--muted-fg)]"
          )}
          style={{ fontSize: "11px" }}
        >
          {delta.direction === "up" && "↑ "}
          {delta.direction === "down" && "↓ "}
          {delta.text}
        </span>
      )}
    </div>
  );
}
