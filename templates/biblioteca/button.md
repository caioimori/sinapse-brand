# Button

## Propósito
Botão base da lib, consumido em 6+ repos. `cva` com variants × sizes, `forwardRef`, focus-ring acessível, `active:scale-[0.98]`. Centraliza também a variante **`cta`/`hero`** (pill com chip-seta `group-hover:rotate-45`) hoje copiada como string longa 6× em smart-plastica, club, lp-mindloop.

## Props / API
```ts
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost' | 'outline' | 'subtle' | 'destructive' | 'cta';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'icon';
  asChild?: boolean;   // Radix Slot — renderiza como <a> ou Link
};
```

## Variantes
| Variant | Quando usar |
|---------|-------------|
| `primary` | ação principal — `bg-foreground text-background` (invertido B&W) |
| `ghost` | ação secundária discreta, hover surface |
| `outline` | ação alternativa com borda |
| `subtle` | superfície clicável (cards, switchers) |
| `destructive` | ação perigosa — usa `--destructive` isolado |
| `cta` | CTA de LP — pill com chip-seta que rotaciona no hover |

| Size | h |
|------|---|
| `xs` | 28px | `sm` 32px | `md` 40px | `lg` 48px | `icon` quadrado |

## Snippet de referência (consolidado de sinapse-crm + colegio-modulo cva)
```tsx
import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/cn';

export const buttonVariants = cva(
  cn(
    'inline-flex shrink-0 items-center justify-center gap-2 font-sans font-medium whitespace-nowrap select-none',
    'transition-[background,opacity,border-color,transform] duration-[var(--dur-base)] ease-[var(--ease-apple)]',
    'active:scale-[0.98] active:duration-100',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]',
    'disabled:opacity-50 disabled:pointer-events-none',
  ),
  {
    variants: {
      variant: {
        primary:     'bg-[var(--color-foreground)] text-[var(--color-background)] hover:opacity-90 shadow-sm',
        ghost:       'bg-transparent text-[var(--color-foreground)] hover:bg-[var(--color-surface-2)]',
        outline:     'bg-transparent text-[var(--color-foreground)] border border-[var(--color-border-strong)] hover:bg-[var(--color-surface)] hover:border-[var(--color-foreground)]',
        subtle:      'bg-[var(--color-surface)] text-[var(--color-foreground)] border border-[var(--color-border)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-2)]',
        destructive: 'bg-[var(--destructive)]/10 text-[var(--destructive)] hover:bg-[var(--destructive)]/20',
        // variante CTA assinatura — substitui a string copiada 6x
        cta:         'group/cta rounded-[var(--radius-pill)] bg-[var(--color-foreground)] text-[var(--color-background)] pl-6 pr-2 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]',
      },
      size: {
        xs:   'h-7 px-2.5 text-[11px] gap-1.5 rounded-[var(--radius-md)]',
        sm:   'h-8 px-3 text-[12px] gap-2 rounded-[var(--radius-md)]',
        md:   'h-10 px-4 text-[13px] gap-2 rounded-[var(--radius-lg)]',
        lg:   'h-12 px-6 text-sm gap-2.5 rounded-[var(--radius-lg)]',
        icon: 'size-10 p-0 rounded-[var(--radius-lg)]',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant, size, asChild, className, type = 'button', ...rest }, ref,
) {
  const Comp = asChild ? Slot : 'button';
  return <Comp ref={ref} type={asChild ? undefined : type} className={cn(buttonVariants({ variant, size }), className)} {...rest} />;
});
```

### Chip-seta da variante `cta` (markup)
```tsx
<Button variant="cta" size="lg" asChild>
  <a href="#precos">
    Ver planos
    <span className="ml-3 grid size-8 place-items-center rounded-full bg-[var(--color-background)] text-[var(--color-foreground)] transition-transform duration-300 group-hover/cta:rotate-45">→</span>
  </a>
</Button>
```

## Aparece em
`caio__sinapse-crm` (variants×sizes), `caio__sinapse-club` (button-variants.ts cva), `soier__colegio-modulo` (cva 5 variants, "outlined-fills-on-hover"), `soier__central-plastica`, `soier__soier-spaces` (sizes xs/icon-xs ricos), `soier__vascularte-site` (buttonStyles.ts).

## Dívidas a corrigir antes de promover
- Unificar: hoje crm usa objeto `variants` simples, club/modulo usam `cva`. Padronizar `cva`.
- A variante `cta` mata o anti-pattern "CTA copiado como string longa 6×" (smart-plastica/club/lp-mindloop).
- Garantir `focus-visible` ring acessível em todas (vascularte tinha foco fraco).
