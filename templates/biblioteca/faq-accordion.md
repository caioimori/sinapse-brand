# FAQ accordion

## Propósito
Accordion de perguntas. Duas implementações canônicas: **zero-JS nativo** (`<details>/<summary>` — preferido pra LP estática/single-file) e **controlado React** (um item aberto por vez, animação de grid-rows — preferido em app/LP Next). Marker custom com ícone `+`/`×` rotacionado, acessível.

## Props / API
```ts
type FaqItem = { q: string; a: string };
type FaqProps = { items: FaqItem[]; eyebrow?: string; title?: string; singleOpen?: boolean };
```

## Variante A — zero-JS nativo (`<details>`, extraído de smart-plastica/proposta-igor)
```tsx
export function FaqZeroJs({ items, title = 'Perguntas frequentes' }: FaqProps) {
  return (
    <section id="faq" className="border-t border-[var(--color-border)] py-24">
      <div className="mx-auto max-w-[860px] px-4">
        <h2 className="mb-12 text-center font-display font-light text-[clamp(1.75rem,4vw,2.5rem)] text-balance">{title}</h2>
        <div className="divide-y divide-[var(--color-border)]">
          {items.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left">
                <span className="text-sm font-medium text-[var(--color-foreground)] sm:text-base">{f.q}</span>
                <span className="grid size-7 shrink-0 place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-background)] transition-transform duration-300 group-open:rotate-45 group-open:bg-[var(--color-foreground)] group-open:text-[var(--color-background)]">+</span>
              </summary>
              <p className="mt-4 text-sm font-light leading-relaxed text-[var(--color-muted)]">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
```
```css
/* remove marker default cross-browser */
summary::-webkit-details-marker { display: none; }
```

## Variante B — controlado React (extraído de sinapse-club lp-faq.tsx)
```tsx
'use client';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

function AccordionItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-[var(--color-border)]">
      <button type="button" onClick={onToggle} aria-expanded={isOpen}
        className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left transition-colors hover:text-[var(--color-foreground)]">
        <span className="text-sm font-medium text-[var(--color-foreground)] sm:text-base">{q}</span>
        <span className={cn('flex size-7 shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-background)] transition-transform duration-300',
          isOpen && 'rotate-45 bg-[var(--color-foreground)] text-[var(--color-background)]')}>
          <Plus className="size-3.5" />
        </span>
      </button>
      {/* animação grid-rows 0fr -> 1fr (sem medir altura) */}
      <div className={cn('grid overflow-hidden transition-all duration-300', isOpen ? 'grid-rows-[1fr] pb-5' : 'grid-rows-[0fr]')}>
        <div className="overflow-hidden">
          <p className="text-sm font-light leading-relaxed text-[var(--color-muted)]">{a}</p>
        </div>
      </div>
    </div>
  );
}

export function Faq({ items, singleOpen = true }: FaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <section id="faq" className="border-t border-[var(--color-border)] bg-[var(--color-surface)]/40 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-4">
        {items.map((f, i) => (
          <AccordionItem key={i} q={f.q} a={f.a} isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)} />
        ))}
      </div>
    </section>
  );
}
```

## Variantes
| Variante | quando |
|----------|--------|
| A — zero-JS `<details>` | LP estática, single-file, máxima acessibilidade |
| B — React controlado | quando quer "1 aberto por vez" e animação grid-rows |

## Aparece em
`caio__proposta-igor-advocacia` (CSS-only max-height), `soier__smart-plastica-sp` (`<details>` nativo), `soier__snps`, `soier__sayuri-store` (mega-menu + filtros `<details>`), `soier__colegio-modulo`.

## Dívidas a corrigir antes de promover
- A animação `grid-rows-[0fr]→[1fr]` é o melhor truque (não precisa medir altura) — padronizar nessa.
- `summary::-webkit-details-marker { display: none }` obrigatório na variante A.
- Evitar `onclick=this.parentElement.classList.toggle` inline (proposta-igor) — usar `<details>` nativo.
