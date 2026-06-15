"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "./lib/cn";

/**
 * FaqAccordion — Accordion de perguntas frequentes.
 * Requer ambiente browser (use client) para variante controlada.
 *
 * variant: 'static' usa <details>/<summary> zero-JS.
 *          'animated' usa React controlado com animação grid-rows.
 * singleOpen: fecha outros items ao abrir um novo.
 */

export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqAccordionProps {
  items: FaqItem[];
  eyebrow?: string;
  title?: string;
  singleOpen?: boolean;
  variant?: "static" | "animated";
  className?: string;
}

// ─── Variante estática (zero-JS, SSR-friendly via <details>) ─────────────────

function StaticFaq({ items, eyebrow, title, className }: FaqAccordionProps) {
  return (
    <div className={className}>
      {eyebrow && (
        <p className="font-mono uppercase tracking-[0.22em] text-[var(--muted-fg)] mb-10" style={{ fontSize: "11px" }}>
          {eyebrow}
        </p>
      )}
      {title && (
        <h2
          className="font-display font-light tracking-[-0.02em] text-balance mb-10"
          style={{ fontSize: "var(--text-h2, clamp(1.75rem,4.5vw,3.25rem))", lineHeight: 1.05 }}
        >
          {title}
        </h2>
      )}
      {items.map((f) => (
        <details
          key={f.q}
          className="group border-b border-[var(--border)] py-5"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between font-display font-light text-lg">
            {f.q}
            <Plus
              size={18}
              className="shrink-0 transition-transform duration-[var(--dur-base)] group-open:rotate-45"
              aria-hidden
            />
          </summary>
          <p
            className="mt-4 text-[var(--muted-fg)]"
            style={{ fontSize: "var(--text-body)" }}
          >
            {f.a}
          </p>
        </details>
      ))}
    </div>
  );
}

// ─── Variante animada (React controlado) ─────────────────────────────────────

function AnimatedFaq({
  items,
  eyebrow,
  title,
  singleOpen = false,
  className,
}: FaqAccordionProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggle = (idx: number) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) {
        next.delete(idx);
      } else {
        if (singleOpen) next.clear();
        next.add(idx);
      }
      return next;
    });
  };

  return (
    <div className={className}>
      {eyebrow && (
        <p className="font-mono uppercase tracking-[0.22em] text-[var(--muted-fg)] mb-10" style={{ fontSize: "11px" }}>
          {eyebrow}
        </p>
      )}
      {title && (
        <h2
          className="font-display font-light tracking-[-0.02em] text-balance mb-10"
          style={{ fontSize: "var(--text-h2, clamp(1.75rem,4.5vw,3.25rem))", lineHeight: 1.05 }}
        >
          {title}
        </h2>
      )}
      <dl>
        {items.map((f, idx) => {
          const isOpen = openItems.has(idx);
          return (
            <div key={f.q} className="border-b border-[var(--border)]">
              <dt>
                <button
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  className={cn(
                    "flex w-full cursor-pointer items-center justify-between py-5",
                    "font-display font-light text-lg text-left",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2"
                  )}
                >
                  {f.q}
                  <Plus
                    size={18}
                    className={cn(
                      "shrink-0 transition-transform duration-[var(--dur-base)]",
                      isOpen && "rotate-45"
                    )}
                    aria-hidden
                  />
                </button>
              </dt>
              {/* grid-rows animação: 0fr → 1fr sem medir altura */}
              <dd
                className={cn(
                  "grid transition-[grid-template-rows] duration-[var(--dur-slow)] ease-[var(--ease-smooth)]",
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                )}
              >
                <div className="overflow-hidden">
                  <p
                    className="pb-5 text-[var(--muted-fg)]"
                    style={{ fontSize: "var(--text-body)" }}
                  >
                    {f.a}
                  </p>
                </div>
              </dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}

// ─── Export público ───────────────────────────────────────────────────────────

export function FaqAccordion({
  variant = "animated",
  ...props
}: FaqAccordionProps) {
  if (variant === "static") return <StaticFaq {...props} />;
  return <AnimatedFaq {...props} />;
}
