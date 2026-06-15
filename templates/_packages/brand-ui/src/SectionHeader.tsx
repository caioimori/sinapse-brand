import { cn } from "./lib/cn";

/**
 * SectionHeader — Cabeçalho de seção com eyebrow, headline H2 e descrição.
 * H2: clamp(1.75rem,4.5vw,3.25rem) — topo e base escapam dead-zone 32-48px.
 * align: 'left' | 'center'
 */

export interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        align === "center" && "text-center mx-auto",
        className
      )}
      style={{ maxWidth: align === "center" ? "52ch" : "42ch" }}
    >
      {eyebrow && (
        <p
          className="font-mono uppercase tracking-[0.22em] text-[var(--muted-fg)] mb-3"
          style={{ fontSize: "11px" }}
        >
          {eyebrow}
        </p>
      )}
      {/* var(--text-h2) = clamp(1.75rem,4.5vw,3.25rem) — escapa dead-zone 32-48px */}
      <h2
        className="font-display font-light tracking-[-0.02em] text-balance"
        style={{ fontSize: "var(--text-h2)", lineHeight: 1.05 }}
      >
        {title}
      </h2>
      {description && (
        <p
          className="mt-4 text-[var(--muted-fg)]"
          style={{ fontSize: "var(--text-body)" }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
