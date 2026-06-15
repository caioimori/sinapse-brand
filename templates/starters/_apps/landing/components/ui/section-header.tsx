export function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div style={{ maxWidth: "42ch" }}>
      <p className="eyebrow">{eyebrow}</p>
      {/* var(--text-h2) = clamp(1.75rem,4.5vw,3.25rem) — topo escapa 32-48px */}
      <h2
        className="mt-3 font-display font-light tracking-[-0.02em] text-balance"
        style={{ fontSize: "var(--text-h2)", lineHeight: 1.05 }}
      >
        {title}
      </h2>
      {description && (
        <p
          className="mt-4 text-[var(--muted-fg)]"
          style={{ fontSize: "var(--text-body)" }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
