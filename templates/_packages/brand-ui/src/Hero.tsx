import { cn } from "./lib/cn";

/**
 * Hero — Bloco de abertura de LP.
 * Headline: clamp(3.75rem,11vw,11rem) font-display — obrigatoriamente fora da dead-zone.
 * Layout default: assimétrico (texto à esquerda, espaço à direita).
 * variant: 'asymmetric' | 'centered' | 'split'
 *
 * Server component — sem hooks. Animações data-reveal via CSS.
 */

export interface HeroCta {
  href: string;
  label: string;
}

export interface HeroProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  primaryCta?: HeroCta;
  secondaryCta?: HeroCta;
  trustLine?: string;
  variant?: "asymmetric" | "centered" | "split";
  children?: React.ReactNode;
  className?: string;
}

export function Hero({
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  trustLine,
  variant = "asymmetric",
  children,
  className,
}: HeroProps) {
  return (
    <section
      className={cn(
        "pattern-grid relative flex min-h-screen items-center pt-14",
        className
      )}
    >
      {/* glow sutil de fundo */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden
      >
        <div className="h-[60vh] w-[60vw] rounded-full bg-foreground/[0.025] blur-3xl" />
      </div>

      <div
        className={cn(
          "relative z-10 mx-auto px-[var(--container-pad,clamp(1.5rem,4vw,5rem))]",
          "w-[var(--container-default)]"
        )}
      >
        <div
          className={cn(
            variant === "centered" && "text-center",
            variant === "asymmetric" && "max-w-[56ch]",
            variant === "split" && "grid grid-cols-2 gap-16 items-center"
          )}
        >
          <div>
            {eyebrow && (
              <p
                className="font-mono uppercase tracking-[0.22em] text-[var(--muted-fg)] mb-4"
                style={{ fontSize: "11px" }}
                data-reveal
              >
                {eyebrow}
              </p>
            )}

            {/* Headline display: clamp(3.75rem,11vw,11rem) — bem acima da dead-zone 32-48px */}
            <h1
              className="font-display font-light tracking-[-0.035em] text-balance leading-[0.92]"
              style={{ fontSize: "var(--text-display, clamp(3.75rem,11vw,11rem))" }}
              data-reveal
            >
              {title}
            </h1>

            {subtitle && (
              <p
                className="mt-8 text-[var(--muted-fg)]"
                style={{ fontSize: "var(--text-body)", maxWidth: "38ch" }}
                data-reveal
              >
                {subtitle}
              </p>
            )}

            {(primaryCta || secondaryCta) && (
              <div
                className={cn(
                  "mt-10 flex flex-wrap gap-4",
                  variant === "centered" && "justify-center"
                )}
                data-reveal
              >
                {primaryCta && (
                  <a
                    href={primaryCta.href}
                    className={cn(
                      "group inline-flex items-center gap-2",
                      "rounded-[var(--radius-pill)] bg-foreground text-background",
                      "pl-6 pr-2 h-12 font-medium",
                      "transition-transform duration-[var(--dur-fast)] hover:-translate-y-0.5",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                    )}
                  >
                    {primaryCta.label}
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-background/15 transition-transform duration-[var(--dur-fast)] group-hover:rotate-45">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                        <path d="M7 17L17 7M17 7H7M17 7v10" />
                      </svg>
                    </span>
                  </a>
                )}
                {secondaryCta && (
                  <a
                    href={secondaryCta.href}
                    className={cn(
                      "inline-flex items-center h-12 px-6",
                      "rounded-[var(--radius-md)] border border-[var(--border-strong)]",
                      "font-medium transition-colors hover:bg-[var(--subtle)]",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                    )}
                  >
                    {secondaryCta.label}
                  </a>
                )}
              </div>
            )}

            {trustLine && (
              <p
                className="mt-6 font-mono text-[var(--muted-fg)] opacity-50"
                style={{ fontSize: "11px" }}
                data-reveal
              >
                {trustLine}
              </p>
            )}
          </div>

          {/* split: slot direito para imagem ou conteúdo */}
          {variant === "split" && children && (
            <div className="relative">{children}</div>
          )}
        </div>
      </div>
    </section>
  );
}
