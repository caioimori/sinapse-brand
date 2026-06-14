# StatusPill / StatusBadge (data-driven)

## Propósito
**UM** componente data-driven por token map (`status -> { label, intensidade, icone }`) que substitui os **4 mapas de status duplicados + 131 cores hardcoded** (`bg-slate/blue/amber-XXX`) achados em soier-spaces, central-plastica, orquestrador, sayuri. Em B&W diferencia por **intensidade/peso, não hue**.

## Props / API
```ts
type StatusIntensity = 'neutral' | 'active' | 'ok' | 'warn' | 'critical' | 'muted';

type StatusDef = { label: string; intensity: StatusIntensity; icon?: LucideIcon; pulse?: boolean };

type StatusPillProps = {
  status: string;            // chave do map
  map?: Record<string, StatusDef>;  // override do token map padrão
  size?: 'sm' | 'md';
  className?: string;
};
```

## Token map único (fonte da verdade — substitui os 4 mapas)
```ts
import { Circle, CheckCircle2, AlertTriangle, XCircle, Clock } from 'lucide-react';

export const STATUS_MAP: Record<string, StatusDef> = {
  todo:              { label: 'A fazer',     intensity: 'muted',   icon: Circle },
  in_progress:       { label: 'Em andamento',intensity: 'active',  icon: Clock, pulse: true },
  pending_approval:  { label: 'Aprovação',   intensity: 'warn',    icon: Clock },
  approved:          { label: 'Aprovado',    intensity: 'ok',      icon: CheckCircle2 },
  done:              { label: 'Concluído',   intensity: 'ok',      icon: CheckCircle2 },
  rejected:          { label: 'Rejeitado',   intensity: 'critical',icon: XCircle },
  error:             { label: 'Erro',        intensity: 'critical',icon: AlertTriangle },
  review:            { label: 'Revisão',     intensity: 'active',  icon: Circle },
};
```

## Snippet de referência (B&W por intensidade)
```tsx
import { cn } from '@/lib/cn';

// B&W absoluto — diferenciação por peso/opacity da borda+fundo, não por hue
const intensityStyles: Record<StatusIntensity, string> = {
  neutral:  'border-[var(--color-border)] text-[var(--color-muted)] bg-transparent',
  muted:    'border-[var(--color-border)] text-[var(--color-muted)] bg-[var(--color-surface)] opacity-70',
  active:   'border-[var(--color-border-strong)] text-[var(--color-foreground)] bg-[var(--color-surface-2)]',
  ok:       'border-[var(--color-border-strong)] text-[var(--color-foreground)] bg-[var(--color-surface-2)] font-medium',
  warn:     'border-dashed border-[var(--color-border-strong)] text-[var(--color-foreground)] bg-[var(--color-surface)]',
  critical: 'border-[var(--color-foreground)] text-[var(--color-foreground)] bg-[var(--color-surface-3)] font-medium',
};

const sizes = {
  sm: 'h-5 px-1.5 text-[10px] gap-1',
  md: 'h-6 px-2 text-[11px] gap-1.5',
};

export function StatusPill({ status, map = STATUS_MAP, size = 'md', className }: StatusPillProps) {
  const def = map[status] ?? { label: status, intensity: 'neutral' as StatusIntensity };
  const Icon = def.icon;
  return (
    <span className={cn(
      'inline-flex items-center rounded-[var(--radius-pill)] border font-mono uppercase tracking-[0.14em] tabular-nums',
      sizes[size],
      intensityStyles[def.intensity],
      className,
    )}>
      {def.pulse && <span className="status-dot" aria-hidden />}
      {Icon && !def.pulse && <Icon className="size-3" aria-hidden />}
      <span>{def.label}</span>
    </span>
  );
}
```

## Variantes (intensity)
| intensity | aparência B&W |
|-----------|---------------|
| `neutral`/`muted` | borda fina, texto muted |
| `active` | borda forte + surface-2 (+ pulse opcional) |
| `ok` | borda forte + peso medium |
| `warn` | borda tracejada |
| `critical` | borda foreground sólida + peso |

> Cliente que **precisa** de cor (não-B&W) passa um `map` próprio com `intensity` mapeada pra `--color-state-*` do seu `[data-brand]`. O componente nunca hardcoda hue.

## Aparece em
`caio__apse-os` (StatusPill spec), `soier__soier-spaces` (status-badge/priority-badge/payment-status-badge — os 4 a unificar), `soier__central-plastica`, `soier__orquestrador-sp3` (máquina de status 8 estados), `soier__sayuri-store`.

## Dívidas a corrigir antes de promover
- Este componente **é a correção** da maior dívida da auditoria (131 cores hardcoded em 26 arquivos no soier-spaces).
- Migrar `statusColors`, `status-badge`, `priority-badge`, `payment-status-badge` todos pra `STATUS_MAP` único.
- Validar que orquestrador-sp3 troque seu mapa multicolor por intensity.
