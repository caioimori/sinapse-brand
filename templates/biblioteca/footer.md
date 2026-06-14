# Footer

## Propósito
Rodapé mono com frame de bordas, colunas de links, logo, eyebrow de copyright e linha mono. Consistente entre LP e app. Identity: borda superior `--color-border`, texto mono muted.

## Props / API
```ts
type FooterColumn = { title: string; links: { label: string; href: string }[] };
type FooterProps = {
  columns?: FooterColumn[];
  tagline?: string;
  copyright?: string;     // ex: "© 2026 SINAPSE"
  social?: { label: string; href: string; icon?: React.ReactNode }[];
};
```

## Snippet de referência (consolidado club/brand/modulo)
```tsx
import Link from 'next/link';
import { Container } from '@/components/ui/container';

export function Footer({ columns = [], tagline, copyright, social = [] }: FooterProps) {
  return (
    <footer className="relative border-t border-[var(--color-border)] bg-[var(--color-background)] py-16">
      {/* frame de bordas verticais (identity) */}
      <Container size="default">
        <div className="grid gap-12 md:grid-cols-[1.5fr_repeat(auto-fit,minmax(120px,1fr))]">
          {/* brand col */}
          <div className="flex flex-col gap-4">
            <img src="/brand/sinapse.svg" alt="sinapse" className="h-6 w-auto" />
            {tagline && <p className="max-w-xs text-sm text-[var(--color-muted)] leading-relaxed">{tagline}</p>}
            {social.length > 0 && (
              <div className="flex items-center gap-3 mt-2">
                {social.map((s) => (
                  <a key={s.label} href={s.href} aria-label={s.label}
                    className="text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors">
                    {s.icon ?? s.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* link columns */}
          {columns.map((col) => (
            <nav key={col.title} className="flex flex-col gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-muted)] opacity-60">{col.title}</span>
              {col.links.map((l) => (
                <Link key={l.href} href={l.href} className="text-sm text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors">{l.label}</Link>
              ))}
            </nav>
          ))}
        </div>

        {/* baseline */}
        <div className="mt-12 flex flex-col gap-2 border-t border-[var(--color-border)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          {copyright && <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-muted)]">{copyright}</span>}
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-muted)] opacity-50">São Paulo · BR</span>
        </div>
      </Container>
    </footer>
  );
}
```

## Variantes
| Variante | uso |
|----------|-----|
| LP completo (colunas + social) | site institucional/LP |
| mono minimal (só copyright) | guia/proposta single-file |
| app | linha discreta no shell |

## Aparece em
`caio__sinapse-club` (lp-footer), `caio__sinapse-brand` (Footer brand), `soier__colegio-modulo`, `soier__snps` (footer numerado), `soier__vascularte-site`.

## Dívidas a corrigir antes de promover
- Usar `Container` (fluido), não `max-w-7xl`.
- Manter mono uppercase consistente (design-system-astro mistura "São Paulo" acentuado com resto uppercase — escolher 1 tom).
