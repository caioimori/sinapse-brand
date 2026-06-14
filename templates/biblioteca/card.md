# Card + MetricCard / KPIBlock

## Propósito
`Card` composable (bg-surface + border + radius-xl + padding configurável) e `MetricCard` (KPI de dashboard): eyebrow mono + valor display `tabular-nums` **fora da dead-zone** + delta badge + Sparkline SVG inline. Bloco recorrente em todo SaaS app.

## Props / API
```ts
// Card
type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
};

// MetricCard
type MetricCardProps = {
  label: string;
  value: string;
  delta?: { direction: 'up' | 'down' | 'flat'; text: string; positive: boolean };
  sparkline?: number[];
  className?: string;
};
```

## Variantes
| Card padding | px | | MetricCard delta | |
|--------------|----|---|------------------|---|
| `none` | 0 | | `up`/`down`/`flat` | glyph ↑↓→ |
| `sm` | 16 | | `positive: true` | borda sólida |
| `md` | 20 | | `positive: false` | borda tracejada |
| `lg` | 24 | | | |

## Snippet de referência (extraído de sinapse-crm)
```tsx
import { cn } from '@/lib/cn';

const paddings = { none: '', sm: 'p-4', md: 'p-5', lg: 'p-6' };

export function Card({ hover, padding = 'md', className, children, ...rest }) {
  return (
    <div
      className={cn(
        'relative bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-xl)]',
        paddings[padding],
        hover && 'transition-[border-color,background] duration-[var(--dur-base)] ease-[var(--ease-apple)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-2)]',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
```

```tsx
const trendGlyph = { up: '↑', down: '↓', flat: '→' };

export function MetricCard({ label, value, delta, sparkline, className }: MetricCardProps) {
  return (
    <Card hover padding="md" className={cn('flex flex-col gap-3', className)}>
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-muted)]">
          {label}
        </span>
        {delta && (
          <span className={cn(
            'inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.16em] tabular-nums px-1.5 py-0.5 rounded-[var(--radius-sm)] border',
            delta.positive
              ? 'border-[var(--color-border-strong)] text-[var(--color-foreground)] bg-[var(--color-surface-2)]'
              : 'border-dashed border-[var(--color-border-strong)] text-[var(--color-foreground)]',
          )}>
            <span aria-hidden>{trendGlyph[delta.direction]}</span>
            <span>{delta.text}</span>
          </span>
        )}
      </div>

      {/* CORRIGIDO: valor empurrado p/ display, fora da dead-zone */}
      <div className="font-display font-light leading-[0.95] tracking-[-0.025em] text-[clamp(3rem,4vw,3.75rem)] tabular-nums">
        {value}
      </div>

      {sparkline && (
        <div className="text-[var(--color-foreground)] opacity-80 -mb-1">
          <Sparkline data={sparkline} width={200} height={32} />
        </div>
      )}
    </Card>
  );
}
```

## Aparece em
`caio__sinapse-crm` (Card + MetricCard + Sparkline), `caio__sinapse-club` (card.tsx data-slot/cva), `soier__central-plastica` (KPI grid eyebrow + tabular-nums), `soier__soier-spaces` (StatCard com skeleton), `caio__apse-os` (KPIBlock spec).

## Dívidas a corrigir antes de promover
- **Dead-zone:** o original do crm usava `clamp(2rem,3.5vw,2.75rem)` = 32-44px (proibido). Snippet acima já corrige para `clamp(3rem,4vw,3.75rem)` (48-60px) — empurrar todo KPI value pra >=48px ou tratar como display 60px+.
- Em B&W a diferenciação up/down é fraca (mesma cor de texto, só borda) — usar peso/intensidade + glyph, não hue.
- Radius de card de dashboard: manter <=12-16px (não estourar pra 24px).
