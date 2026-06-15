import { Check } from "lucide-react";
import { cn } from "./lib/cn";

/**
 * PricingCard — Card de plano de preços.
 * popular inverte bg (fg/bg) para destaque visual B&W.
 * Valor: clamp(3rem,5vw,3.75rem) — fora da dead-zone.
 * Slot de savings com min-h para alinhar grid multi-coluna.
 *
 * Server component.
 */

export interface PricingPlan {
  id: string;
  label: string;
  tagline?: string;
  monthlyPrice: number;
  billingNote?: string;
  savings?: string | null;
  popular?: boolean;
  cta?: { label: string; href?: string; onClick?: () => void };
  features: string[];
  currency?: string;
}

export interface PricingCardProps {
  plan: PricingPlan;
  className?: string;
}

export function PricingCard({ plan, className }: PricingCardProps) {
  const {
    label,
    tagline,
    monthlyPrice,
    billingNote,
    savings,
    popular = false,
    cta,
    features,
    currency = "R$",
  } = plan;

  return (
    <div
      className={cn(
        "flex flex-col rounded-[var(--radius-xl)] p-8",
        popular
          ? "bg-foreground text-background"
          : "bg-card border border-[var(--border)]",
        className
      )}
    >
      {/* Savings badge slot — min-h mantém alinhamento em grid multi-coluna */}
      <div className="min-h-[28px]">
        {savings && (
          <span
            className={cn(
              "inline-block font-mono uppercase tracking-[0.15em] rounded-[var(--radius-pill)] px-2 py-0.5",
              popular
                ? "bg-background/15 text-background"
                : "border border-[var(--border-strong)] text-foreground"
            )}
            style={{ fontSize: "10px" }}
          >
            {savings}
          </span>
        )}
      </div>

      {popular && (
        <p
          className="mt-1 font-mono uppercase tracking-[0.18em]"
          style={{ fontSize: "10px", color: popular ? "rgba(250,250,247,0.5)" : undefined }}
        >
          Mais popular
        </p>
      )}

      <h3
        className="mt-2 font-display font-light"
        style={{ fontSize: "var(--text-h3, clamp(1.25rem,2vw,1.625rem))" }}
      >
        {label}
      </h3>

      {tagline && (
        <p
          className={cn(
            "mt-1",
            popular ? "text-background/70" : "text-[var(--muted-fg)]"
          )}
          style={{ fontSize: "var(--text-body)" }}
        >
          {tagline}
        </p>
      )}

      {/* Valor display: clamp(3rem,5vw,3.75rem) — fora da dead-zone 32-48px */}
      <p
        className="mt-6 font-display font-light tabular-nums leading-none"
        style={{ fontSize: "clamp(3rem, 5vw, 3.75rem)" }}
      >
        <span className={cn("text-sm align-top mt-3 inline-block", popular ? "text-background/60" : "text-[var(--muted-fg)]")}>
          {currency}
        </span>
        {monthlyPrice.toLocaleString("pt-BR")}
      </p>

      {billingNote && (
        <p
          className={cn(
            "mt-1 font-mono",
            popular ? "text-background/50" : "text-[var(--muted-fg)]"
          )}
          style={{ fontSize: "11px" }}
        >
          {billingNote}
        </p>
      )}

      {/* Features */}
      <ul className="mt-8 flex-1 space-y-3">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm">
            <Check
              size={15}
              className={cn(
                "mt-0.5 shrink-0",
                popular ? "text-background" : "text-foreground"
              )}
              aria-hidden
            />
            {f}
          </li>
        ))}
      </ul>

      {/* CTA — mt-auto mantém bottom-aligned */}
      {cta && (
        <div className="mt-8">
          {cta.href ? (
            <a
              href={cta.href}
              className={cn(
                "flex w-full items-center justify-center h-11 rounded-[var(--radius-md)]",
                "font-medium text-sm transition-opacity hover:opacity-80",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]",
                popular
                  ? "bg-background text-foreground"
                  : "bg-foreground text-background"
              )}
            >
              {cta.label}
            </a>
          ) : (
            <button
              onClick={cta.onClick}
              className={cn(
                "flex w-full items-center justify-center h-11 rounded-[var(--radius-md)]",
                "font-medium text-sm transition-opacity hover:opacity-80",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]",
                popular
                  ? "bg-background text-foreground"
                  : "bg-foreground text-background"
              )}
            >
              {cta.label}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
