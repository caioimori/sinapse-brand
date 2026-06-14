# DashboardTable (densa, tabular-nums)

## Propósito
Tabela densa de dashboard: header mono uppercase, linhas com hover, valores `tabular-nums`, células de status via `StatusPill`, densidade alta (rows compactas). Resolve a "tabela top" recorrente (leads, transações, pipeline).

## Props / API
```ts
type Column<T> = {
  key: keyof T | string;
  header: string;
  align?: 'left' | 'right';
  render?: (row: T) => React.ReactNode;
  numeric?: boolean;   // aplica tabular-nums + text-right
};
type DashboardTableProps<T> = {
  columns: Column<T>[];
  rows: T[];
  empty?: React.ReactNode;
  onRowClick?: (row: T) => void;
};
```

## Snippet de referência (consolidado — densidade Linear, padrão crm/central/soier-spaces)
```tsx
import { cn } from '@/lib/cn';

export function DashboardTable<T extends { id: string }>({ columns, rows, empty, onRowClick }: DashboardTableProps<T>) {
  if (rows.length === 0 && empty) return <>{empty}</>;
  return (
    <div className="overflow-x-auto rounded-[var(--radius-xl)] border border-[var(--color-border)]">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-[var(--color-border)]">
            {columns.map((c) => (
              <th key={String(c.key)} className={cn(
                'h-10 px-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-muted)] font-normal',
                c.align === 'right' || c.numeric ? 'text-right' : 'text-left',
              )}>
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              className={cn(
                'border-b border-[var(--color-border)] last:border-0 transition-colors',
                onRowClick && 'cursor-pointer hover:bg-[var(--color-surface)]',
              )}>
              {columns.map((c) => (
                <td key={String(c.key)} className={cn(
                  'h-11 px-4 text-[13px] text-[var(--color-foreground)]',
                  (c.align === 'right' || c.numeric) && 'text-right tabular-nums',
                )}>
                  {c.render ? c.render(row) : String((row as Record<string, unknown>)[c.key as string] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

## Variantes / densidade (modelo apse-os: densidade por contexto)
| Contexto | row height |
|----------|-----------|
| tabela densa (transações) | `h-9` (36px) |
| tabela padrão | `h-11` (44px) |
| linha clicável | `cursor-pointer` + hover surface |
| numérico | `tabular-nums text-right` |

## Aparece em
`caio__sinapse-crm` (tabela top do dashboard), `soier__central-plastica`, `soier__soier-spaces`, `caio__apse-os` (DataTable + tabela densidade-por-contexto spec).

## Dívidas a corrigir antes de promover
- Empty-state opinativo obrigatório (não tabela vazia muda) — passar `empty`.
- Valores monetários sempre `tabular-nums` + formatação `Intl.NumberFormat` BRL centralizada (central-plastica tem helper).
- Status na célula via `StatusPill` data-driven, nunca cor hardcoded.
