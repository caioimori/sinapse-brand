import { cn } from "./lib/cn";

/**
 * DashboardTable — Tabela de dados para dashboards.
 * Header: mono 10px uppercase tracking-[0.18em].
 * Rows: h-11 padrão / h-9 densa. Hover surface se clicável.
 * Numérico: tabular-nums text-right.
 */

export interface Column<T> {
  key: keyof T & string;
  header: string;
  align?: "left" | "center" | "right";
  numeric?: boolean;
  render?: (row: T) => React.ReactNode;
}

export interface DashboardTableProps<T extends Record<string, unknown>> {
  columns: Column<T>[];
  rows: T[];
  empty?: React.ReactNode;
  onRowClick?: (row: T) => void;
  dense?: boolean;
  className?: string;
}

export function DashboardTable<T extends Record<string, unknown>>({
  columns,
  rows,
  empty,
  onRowClick,
  dense = false,
  className,
}: DashboardTableProps<T>) {
  const isClickable = Boolean(onRowClick);

  return (
    <div
      className={cn(
        "w-full overflow-x-auto rounded-[var(--radius-xl)] border border-[var(--border)]",
        className
      )}
    >
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-[var(--border)] bg-[var(--subtle)]">
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className={cn(
                  "px-4 py-3 font-mono uppercase tracking-[0.18em] text-[var(--muted-fg)]",
                  col.align === "right" || col.numeric ? "text-right" : "",
                  col.align === "center" ? "text-center" : "",
                  !col.align && !col.numeric ? "text-left" : ""
                )}
                style={{ fontSize: "10px" }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-12 text-center text-[var(--muted-fg)]"
              >
                {empty ?? (
                  <span
                    className="font-mono uppercase tracking-[0.18em]"
                    style={{ fontSize: "11px" }}
                  >
                    Sem dados
                  </span>
                )}
              </td>
            </tr>
          ) : (
            rows.map((row, idx) => (
              <tr
                key={idx}
                onClick={() => onRowClick?.(row)}
                className={cn(
                  "border-b border-[var(--border)] last:border-0",
                  dense ? "h-9" : "h-11",
                  isClickable &&
                    "cursor-pointer hover:bg-[var(--subtle)] transition-colors duration-[var(--dur-fast)]"
                )}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cn(
                      "px-4",
                      col.numeric || col.align === "right"
                        ? "text-right tabular-nums"
                        : "",
                      col.align === "center" ? "text-center" : ""
                    )}
                  >
                    {col.render
                      ? col.render(row)
                      : (row[col.key] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
