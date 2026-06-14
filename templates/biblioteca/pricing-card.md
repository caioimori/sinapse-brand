# Pricing card

## Propósito
Card de plano com **plano popular invertido** (foreground bg sobre paleta restrita B&W), savings badge, features com Check, valor `clamp` display, CTA `mt-auto` com `min-h` reservado pra alinhar. Em LP: grid 3 colunas (`md:grid-cols-3`) com gap hairline.

## Props / API
```ts
interface Plan {
  id: string;
  label: string;
  tagline: string;
  monthlyPrice: number;
  billingNote: string;
  savings: string | null;
  popular: boolean;
  cta: string;
  features: string[];
}
type PricingProps = { plans: Plan[]; eyebrow?: string; title?: string; description?: string };
```

## Snippet de referência (extraído de sinapse-club lp-pricing.tsx)
```tsx
import Link from 'next/link';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

function formatBRL(v: number) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).replace('R$', 'R$ ');
}

function PlanCard({ plan }: { plan: Plan }) {
  const pop = plan.popular;
  return (
    <div className={cn(
      'group relative flex h-full flex-col rounded-2xl border p-6 transition-all duration-500 ease-out sm:p-7 lg:p-8',
      pop
        ? 'border-[var(--color-foreground)] bg-[var(--color-foreground)] text-[var(--color-background)] shadow-lg hover:-translate-y-1'
        : 'border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-foreground)] hover:-translate-y-1 hover:border-[var(--color-foreground)]/30',
    )}>
      {pop && (
        <div className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-[var(--color-background)] px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--color-foreground)] shadow-md">
          <Sparkles className="size-3" /> Mais escolhido
        </div>
      )}

      <div className="mb-5">
        <h3 className={cn('text-base font-semibold tracking-tight sm:text-lg', pop ? 'text-[var(--color-background)]' : 'text-[var(--color-foreground)]')}>{plan.label}</h3>
        <p className={cn('mt-1 text-xs sm:text-sm', pop ? 'text-[var(--color-background)]/70' : 'text-[var(--color-muted)]')}>{plan.tagline}</p>
      </div>

      {/* valor — display, fora da dead-zone */}
      <div className="mb-1 flex items-baseline gap-1.5">
        <span className="font-display font-light tracking-tight tabular-nums text-[clamp(3rem,5vw,3.75rem)]">{formatBRL(plan.monthlyPrice)}</span>
        <span className={cn('text-sm', pop ? 'text-[var(--color-background)]/70' : 'text-[var(--color-muted)]')}>/mês</span>
      </div>
      <p className={cn('mb-5 text-xs leading-relaxed', pop ? 'text-[var(--color-background)]/60' : 'text-[var(--color-muted)]')}>{plan.billingNote}</p>

      {/* savings badge slot — min-h reservado p/ alinhar grid */}
      <div className="mb-6 min-h-[28px]">
        {plan.savings && (
          <div className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold', pop ? 'bg-[var(--color-background)]/15 text-[var(--color-background)]' : 'bg-[var(--color-surface-2)] text-[var(--color-foreground)]')}>
            <span className={cn('size-1.5 rounded-full', pop ? 'bg-[var(--color-background)]' : 'bg-[var(--color-foreground)]')} />
            {plan.savings}
          </div>
        )}
      </div>

      <div className={cn('mb-6 h-px w-full', pop ? 'bg-[var(--color-background)]/15' : 'bg-[var(--color-border)]')} />

      <ul className="mb-8 space-y-3.5">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-sm leading-snug">
            <Check className={cn('mt-0.5 size-4 shrink-0', pop ? 'text-[var(--color-background)]' : 'text-[var(--color-foreground)]')} />
            <span className={pop ? 'text-[var(--color-background)]/90' : 'text-[var(--color-foreground)]/90'}>{f}</span>
          </li>
        ))}
      </ul>

      {/* CTA bottom-aligned */}
      <Link href={`/subscribe/${plan.id}`} className={cn(
        'group/cta mt-auto flex h-12 w-full items-center justify-center gap-2 rounded-[var(--radius-lg)] text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5',
        pop ? 'bg-[var(--color-background)] text-[var(--color-foreground)]' : 'bg-[var(--color-foreground)] text-[var(--color-background)]',
      )}>
        <span className="transition-transform duration-300 group-hover/cta:-translate-x-1">{plan.cta}</span>
        <ArrowRight className="size-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover/cta:translate-x-0 group-hover/cta:opacity-100" />
      </Link>
    </div>
  );
}

export function Pricing({ plans }: PricingProps) {
  return (
    <section id="precos" className="relative border-t border-[var(--color-border)] bg-[var(--color-surface)] py-24 sm:py-32">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        <div className="grid items-stretch gap-6 md:grid-cols-3 md:gap-5 lg:gap-6">
          {plans.map((p) => <PlanCard key={p.id} plan={p} />)}
        </div>
      </div>
    </section>
  );
}
```

## Variantes
| Variante | uso |
|----------|-----|
| `popular: true` invertido | destaque do plano âncora |
| grid 3-col gap-px hairline | LP |
| card escuro invertido + line-items (proposta-igor) | proposta single-page |

## Aparece em
`caio__sinapse-club` (referência), `caio__sinapse-lp-mindloop` (PricingV3), `soier__snps` (CTA conversion suite), `caio__proposta-igor-advocacia` (pricing escuro line-items), `soier__vascularte-apresentacao` (score/stat boxes).

## Dívidas a corrigir antes de promover
- O original do club usava `text-4xl/5xl` no valor (dead-zone) → snippet acima já usa `clamp(3rem,5vw,3.75rem)`.
- `min-h-[28px]` no slot de savings é essencial pra alinhar cards de alturas diferentes — manter.
- Parametrizar via `plans[]` (data layer), nunca hardcode no markup (proposta-igor erra isso).
