# Badge (eyebrow pill mono)

## Propósito
Pill curto mono uppercase: tags, contadores, kbd, labels de seção, savings. Distinto do `StatusPill` (que é data-driven por estado) — `Badge` é genérico/decorativo. Assinatura SINAPSE: mono `[colchetes]` ou `//prefix`.

## Props / API
```ts
type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: 'outline' | 'solid' | 'subtle' | 'bracket';
  size?: 'sm' | 'md';
};
```

## Variantes
| Variant | aparência |
|---------|-----------|
| `outline` | borda + transparente |
| `solid` | foreground bg invertido |
| `subtle` | surface bg |
| `bracket` | `[ texto ]` via ::before/::after (assinatura guia) |

## Snippet de referência (consolidado crm + guia claude-code-push)
```tsx
import { cn } from '@/lib/cn';

const variants = {
  outline: 'border border-[var(--color-border-strong)] text-[var(--color-foreground)] bg-transparent',
  solid:   'bg-[var(--color-foreground)] text-[var(--color-background)]',
  subtle:  'bg-[var(--color-surface-2)] text-[var(--color-foreground)] border border-[var(--color-border)]',
  bracket: 'text-[var(--color-foreground)] before:content-["[_"] after:content-["_]"]',
};
const sizes = { sm: 'h-5 px-1.5 text-[10px]', md: 'h-6 px-2 text-[11px]' };

export function Badge({ variant = 'outline', size = 'sm', className, children, ...rest }: BadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center gap-1 rounded-[var(--radius-pill)] font-mono uppercase tracking-[0.18em] tabular-nums',
      variants[variant], sizes[size], className,
    )} {...rest}>
      {children}
    </span>
  );
}
```

### Variante bracket pura CSS (guia, sem React)
```css
.tag {
  font-family: var(--font-mono);
  font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase;
  color: var(--color-foreground);
}
.tag::before { content: "[ "; }
.tag::after  { content: " ]"; }
```

### kbd (atalho de teclado)
```tsx
<kbd className="font-mono text-[10px] tabular-nums px-1.5 py-0.5 rounded-[var(--radius-sm)] bg-[var(--color-surface-3)] border border-[var(--color-border)] tracking-[0.1em]">⌘K</kbd>
```

## Aparece em
`caio__sinapse-crm` (kbd, preview pill, nav badge), `caio__sinapse-club` (savings badge, popular badge), `soier__colegio-modulo`, `soier__snps` (`.pill` mono-uppercase), guias (tag `[colchetes]`).

## Dívidas a corrigir antes de promover
- Diferenciar de `StatusPill`: Badge é decorativo, StatusPill é estado data-driven — não misturar.
- A variante `bracket` é a assinatura mono dos guias — manter como CSS-only pra single-file.
