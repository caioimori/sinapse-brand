# Hero (display headline + identity layer)

## Propósito
Bloco de abertura. Headline display fora da dead-zone (60-176px via clamp), `text-balance`, subheadline `font-light`, CTAs (variante `cta`), eyebrow badge com status-dot, entrada escalonada (reveal). Fundo com grid sutil + glow (cheap, sem filter blur pesado) — nunca liso. Assimetria preferida sobre centro simétrico trivial (rule 06).

## Props / API
```ts
type HeroProps = {
  eyebrow?: string;       // ex: "Soft launch · vagas abertas"
  title: React.ReactNode; // pode quebrar linha + span muted
  subtitle?: string;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  trustLine?: string;
};
```

## Snippet de referência (extraído de sinapse-club lp-hero.tsx)
```tsx
import Link from 'next/link';

export function Hero({ eyebrow, title, subtitle, primaryCta, secondaryCta, trustLine }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-24">
      {/* grid sutil mascarado */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 75%)',
        }} />
      {/* glow ambiente — radial puro, sem filter blur custoso */}
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/3 size-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-foreground)]/[0.03] blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-4 text-center">
        {eyebrow && (
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-1.5 text-xs font-medium text-[var(--color-muted)] opacity-0"
            style={{ animation: 'fade-in 0.6s ease-out 0.1s forwards' }}>
            <span className="size-1.5 rounded-full bg-[var(--color-foreground)] animate-pulse" />
            {eyebrow}
          </div>
        )}

        {/* HEADLINE display — fora da dead-zone, text-balance */}
        <h1 className="mb-6 font-display font-light leading-[0.92] tracking-[-0.035em] text-balance text-[clamp(3.75rem,11vw,11rem)] opacity-0"
          style={{ animation: 'text-reveal 0.9s cubic-bezier(0.22,1,0.36,1) 0.2s forwards' }}>
          {title}
        </h1>

        {subtitle && (
          <p className="mx-auto mb-10 max-w-xl text-base font-light leading-relaxed text-[var(--color-muted)] opacity-0 sm:text-lg"
            style={{ animation: 'fade-in-up 0.7s ease-out 0.45s forwards' }}>
            {subtitle}
          </p>
        )}

        <div className="flex flex-col items-center gap-3 opacity-0 sm:flex-row sm:justify-center"
          style={{ animation: 'fade-in-up 0.7s ease-out 0.6s forwards' }}>
          {primaryCta && (
            <Link href={primaryCta.href} className="group h-12 inline-flex items-center rounded-[var(--radius-pill)] bg-[var(--color-foreground)] text-[var(--color-background)] px-7 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5">
              {primaryCta.label}
              <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          )}
          {secondaryCta && (
            <Link href={secondaryCta.href} className="h-12 inline-flex items-center px-5 text-sm text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors">
              {secondaryCta.label}
            </Link>
          )}
        </div>

        {trustLine && <p className="mt-6 text-xs text-[var(--color-muted)] opacity-0" style={{ animation: 'fade-in 0.6s ease-out 0.85s forwards' }}>{trustLine}</p>}
      </div>
    </section>
  );
}
```

## Variantes
| Variante | uso |
|----------|-----|
| centrado (club) | LP de produto/assinatura |
| assimétrico grid 1.3fr/0.8fr (caioimori-pages) | guia editorial, preferido por rule 06 |
| split 1fr/1fr (vascularte/sayuri) | imagem + texto |

## Aparece em
`caio__sinapse-crm` (hero display 60-176px), `caio__sinapse-club` (referência), `caio__sinapse-brand`, `caio__sinapse-lp-mindloop` (clip-path line-reveal), `soier__colegio-modulo` (palavra rotativa aria-live).

## Dívidas a corrigir antes de promover
- Hero centrado simétrico trivial = anti-pattern "template genérico" — preferir assimetria.
- Sempre `text-balance` + clamp display (nunca text-4xl/5xl em degraus).
- Trocar entrada via `style inline animation-delay` por util/data-attr (reveal escalonado do motion-pack).
- Adicionar identity layer (grain/grid) — alguns heros ficam "liso premium genérico".
