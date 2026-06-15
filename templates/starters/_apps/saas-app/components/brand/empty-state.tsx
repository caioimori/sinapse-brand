interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <div className="crosshair flex h-16 w-16 items-center justify-center rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--subtle)]">
        <span className="text-[var(--muted-fg)]" aria-hidden>
          ∅
        </span>
      </div>
      <div>
        <p
          className="font-display font-light"
          style={{ fontSize: "var(--text-h3)" }}
        >
          {title}
        </p>
        {description && (
          <p
            className="mt-1 text-[var(--muted-fg)]"
            style={{ fontSize: "var(--text-body)" }}
          >
            {description}
          </p>
        )}
      </div>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
