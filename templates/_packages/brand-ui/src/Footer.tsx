import { cn } from "./lib/cn";
import { Container } from "./Container";

/**
 * Footer — Rodapé de página com colunas, tagline, copyright e links sociais.
 * Grid: [1.5fr_repeat(auto-fit,minmax(120px,1fr))].
 * Baseline: mono 10px uppercase tracking-[0.18em].
 * Usa Container fluido — nunca max-w-7xl.
 *
 * Server component.
 */

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

export interface SocialLink {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

export interface FooterProps {
  columns?: FooterColumn[];
  tagline?: string;
  copyright?: string;
  social?: SocialLink[];
  logoText?: string;
  className?: string;
}

export function Footer({
  columns,
  tagline,
  copyright,
  social,
  logoText = "[ SNPS ]",
  className,
}: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer
      className={cn("border-t border-[var(--border)] py-16", className)}
    >
      <Container>
        {columns && columns.length > 0 ? (
          <>
            {/* Grid com colunas */}
            <div
              className="grid gap-12"
              style={{
                gridTemplateColumns: `1.5fr repeat(${columns.length}, minmax(120px, 1fr))`,
              }}
            >
              {/* Coluna identidade */}
              <div>
                <p className="font-mono uppercase tracking-[0.22em]" style={{ fontSize: "11px" }}>
                  {logoText}
                </p>
                {tagline && (
                  <p
                    className="mt-4 text-[var(--muted-fg)]"
                    style={{ fontSize: "var(--text-body)", maxWidth: "24ch" }}
                  >
                    {tagline}
                  </p>
                )}
                {social && social.length > 0 && (
                  <div className="mt-6 flex gap-3">
                    {social.map((s) => (
                      <a
                        key={s.href}
                        href={s.href}
                        aria-label={s.label}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "grid h-8 w-8 place-items-center rounded-[var(--radius-md)]",
                          "border border-[var(--border)] text-[var(--muted-fg)]",
                          "transition-colors hover:border-[var(--border-strong)] hover:text-foreground",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                        )}
                      >
                        {s.icon ?? (
                          <span
                            className="font-mono uppercase"
                            style={{ fontSize: "9px" }}
                          >
                            {s.label.slice(0, 2)}
                          </span>
                        )}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Colunas de links */}
              {columns.map((col) => (
                <div key={col.heading}>
                  <p
                    className="font-mono uppercase tracking-[0.18em] text-[var(--muted-fg)] mb-4"
                    style={{ fontSize: "10px" }}
                  >
                    {col.heading}
                  </p>
                  <ul className="space-y-3">
                    {col.links.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          className="text-sm text-[var(--muted-fg)] transition-colors hover:text-foreground focus-visible:outline-none focus-visible:underline"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Baseline */}
            <div className="mt-16 flex items-center justify-between border-t border-[var(--border)] pt-6">
              <p
                className="font-mono uppercase tracking-[0.18em] text-[var(--muted-fg)]"
                style={{ fontSize: "10px" }}
              >
                {copyright ?? `© ${year} SINAPSE AI. Todos os direitos reservados.`}
              </p>
              {social && social.length > 0 && (
                <p
                  className="font-mono uppercase tracking-[0.18em] text-[var(--muted-fg)]"
                  style={{ fontSize: "10px" }}
                />
              )}
            </div>
          </>
        ) : (
          /* Footer simples sem colunas */
          <div className="flex items-center justify-between">
            <span
              className="font-mono uppercase tracking-[0.22em]"
              style={{ fontSize: "11px" }}
            >
              {logoText}
            </span>
            <p
              className="text-[var(--muted-fg)]"
              style={{ fontSize: "var(--text-meta, 11px)" }}
            >
              {copyright ?? `© ${year} SINAPSE AI. Todos os direitos reservados.`}
            </p>
          </div>
        )}
      </Container>
    </footer>
  );
}
