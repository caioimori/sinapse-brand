# Nav (scroll-spy + backdrop-blur)

## Propósito
Navegação de LP: fixed top, `backdrop-blur` on-scroll, links mono `//label` com underline animado e **scroll-spy** via IntersectionObserver (link ativo conforme a seção visível). CTA à direita (variante `cta`).

## Props / API
```ts
type NavLink = { href: string; label: string; id: string };
type NavProps = { links: NavLink[]; logoSrc?: string; ctaHref?: string; ctaLabel?: string };
```

## Snippet de referência (extraído de sinapse-club lp-nav.tsx)
```tsx
'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export function Nav({ links, ctaHref = '#precos', ctaLabel = 'Ver planos' }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  // backdrop-blur on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // scroll-spy
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const els = links.map((l) => document.getElementById(l.id)).filter((e): e is HTMLElement => !!e);
    if (!els.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.1, 0.5, 1] },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [links]);

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full border-b transition-all duration-300',
        scrolled
          ? 'border-[var(--color-border)] bg-[var(--color-background)]/85 backdrop-blur-xl supports-[backdrop-filter]:bg-[var(--color-background)]/75'
          : 'border-transparent bg-[var(--color-background)]/60 backdrop-blur-md',
      )}
      style={{ WebkitBackdropFilter: 'saturate(1.8) blur(20px)' }}
    >
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center"><img src="/brand/sinapse.svg" alt="sinapse" className="h-6 w-auto" /></Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => {
            const isActive = activeId === link.id;
            return (
              <Link key={link.id} href={link.href}
                className={cn('group relative font-mono text-[15px] tracking-tight transition-colors',
                  isActive ? 'text-[var(--color-foreground)]' : 'text-[var(--color-muted)] hover:text-[var(--color-foreground)]')}>
                {link.label}
                {/* underline animado */}
                <span className={cn('absolute -bottom-1.5 left-0 h-[1.5px] bg-[var(--color-foreground)] transition-all duration-500 ease-out',
                  isActive ? 'w-full' : 'w-0 group-hover:w-full')} />
              </Link>
            );
          })}
        </nav>

        <Link href={ctaHref} className="rounded-[var(--radius-pill)] bg-[var(--color-foreground)] text-[var(--color-background)] px-4 h-9 inline-flex items-center text-[13px] font-semibold transition-all duration-300 hover:-translate-y-0.5">
          {ctaLabel}
        </Link>
      </div>
    </header>
  );
}
```

## Variantes
| Estado | Aparência |
|--------|-----------|
| topo da página | borda transparente, blur leve |
| scrolled (>12px) | borda visível, `backdrop-blur-xl`, fundo 85% |
| link ativo | underline full + cor foreground |
| mobile | menu fullscreen (ver lp-mindloop HeaderV3) |

## Aparece em
`caio__sinapse-club` (referência scroll-spy), `caio__sinapse-lp-mindloop` (HeaderV3 + barra de progresso), `soier__colegio-modulo` (header sticky), `soier__vascularte-site` (header glass), `soier__snps` (nav-wrap com mask-image fade).

## Dívidas a corrigir antes de promover
- Usar tokens (`bg-[var(--color-background)]`), não `bg-background/85` hardcoded de DS de cliente.
- O underline animado já é o padrão — extrair como util `link-reveal` (ver motion-pack).
- Adicionar menu mobile fullscreen (lp-mindloop tem o melhor).
