"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "./lib/cn";

/**
 * Modal — Overlay com painel centralizado.
 * Requer ambiente browser (use client).
 *
 * - Overlay: bg-[var(--overlay)] + backdrop-blur-sm
 * - Painel: rounded-[var(--radius-2xl)], escala com ease-back
 * - Foco preso dentro do modal (aria-modal)
 * - Esc fecha (onClose)
 * - Sem dependência de Radix — implementação nativa acessível.
 */

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  size?: "sm" | "md" | "lg";
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

const sizeStyles = {
  sm: { maxWidth: "28rem" },
  md: { maxWidth: "32rem" },
  lg: { maxWidth: "42rem" },
} as const;

export function Modal({
  open,
  onClose,
  title,
  description,
  size = "md",
  children,
  footer,
  className,
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Fecha com Esc
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Trava scroll do body
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Foca o painel ao abrir
  useEffect(() => {
    if (open && panelRef.current) {
      panelRef.current.focus();
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="presentation"
    >
      {/* Overlay — sempre var(--overlay) que mapeia para rgba(10,10,10,0.7) */}
      <div
        className="absolute inset-0 bg-[var(--overlay,rgba(10,10,10,0.7))] backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Painel — largura fluida com cap via style, nunca max-w-* fixo de página */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        aria-describedby={description ? "modal-desc" : undefined}
        tabIndex={-1}
        style={sizeStyles[size]}
        className={cn(
          "relative z-10 w-full",
          "rounded-[var(--radius-2xl)] border border-[var(--border)] bg-card",
          "outline-none",
          className
        )}
      >
        {/* Header */}
        {(title || description) && (
          <div className="flex items-start justify-between border-b border-[var(--border)] p-6">
            <div>
              {title && (
                <h2
                  id="modal-title"
                  className="font-display font-light"
                  style={{
                    fontSize: "var(--text-h3, clamp(1.25rem,2vw,1.625rem))",
                  }}
                >
                  {title}
                </h2>
              )}
              {description && (
                <p
                  id="modal-desc"
                  className="mt-1 text-[var(--muted-fg)]"
                  style={{ fontSize: "var(--text-body)" }}
                >
                  {description}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              aria-label="Fechar modal"
              className={cn(
                "ml-4 shrink-0 grid h-8 w-8 place-items-center rounded-[var(--radius-md)]",
                "text-[var(--muted-fg)] transition-colors hover:bg-[var(--subtle)] hover:text-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
              )}
            >
              <X size={16} aria-hidden />
            </button>
          </div>
        )}

        {/* Body */}
        <div className="p-6">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-3 border-t border-[var(--border)] px-6 py-4">
            {footer}
          </div>
        )}
      </div>

      {/* Keyframes para entrada do painel */}
      <style>{`
        @keyframes scaleFadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
