"use client";
import { useEffect, useState } from "react";
import { NAV } from "@/lib/nav";
import { cn } from "@/lib/cn";

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  if (!open) return null;

  const filtered = NAV.filter((n) =>
    n.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh]"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-[var(--container-narrow)] rounded-[var(--radius-xl)] border border-[var(--border)] bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-[var(--border)] px-4 py-3">
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar..."
            className="w-full bg-transparent text-sm text-foreground placeholder:text-[var(--muted-fg)] focus:outline-none"
          />
        </div>
        <ul className="max-h-64 overflow-y-auto p-2">
          {filtered.length === 0 && (
            <li className="px-3 py-2 text-sm text-[var(--muted-fg)]">
              Nenhum resultado
            </li>
          )}
          {filtered.map(({ href, label, Icon }) => (
            <li key={href}>
              <a
                href={href}
                className={cn(
                  "flex items-center gap-3 rounded-[var(--radius-md)] px-3 py-2 text-sm text-foreground transition-colors hover:bg-[var(--subtle)]"
                )}
                onClick={() => setOpen(false)}
              >
                <Icon size={15} className="text-[var(--muted-fg)]" />
                {label}
              </a>
            </li>
          ))}
        </ul>
        <div className="border-t border-[var(--border)] px-4 py-2">
          <span className="font-mono text-[var(--text-meta)] text-[var(--muted-fg)] uppercase tracking-wider">
            esc para fechar · ↑↓ navegar
          </span>
        </div>
      </div>
    </div>
  );
}
