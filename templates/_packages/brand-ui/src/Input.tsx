import { forwardRef } from "react";
import { cn } from "./lib/cn";

/**
 * Input — Campo de texto primitivo.
 * Label — mono uppercase 11px, tracking 0.22em.
 * FormField — Label + Input + mensagem de erro.
 */

// ─── Input ─────────────────────────────────────────────────────────────────

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-[var(--radius-md)]",
        "bg-[var(--input)] border",
        "px-3 text-sm text-foreground placeholder:text-[var(--muted-fg)]",
        "transition-colors duration-[var(--dur-fast)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        error
          ? "border-[var(--destructive)] focus-visible:ring-[var(--destructive)]"
          : "border-[var(--border)] focus-visible:border-foreground",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

// ─── Label ──────────────────────────────────────────────────────────────────

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export function Label({ className, children, ...props }: LabelProps) {
  return (
    <label
      className={cn(
        "block font-mono uppercase tracking-[0.22em] opacity-70",
        className
      )}
      style={{ fontSize: "11px" }}
      {...props}
    >
      {children}
    </label>
  );
}

// ─── FormField ──────────────────────────────────────────────────────────────

export interface FormFieldProps {
  label?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
  htmlFor?: string;
}

export function FormField({
  label,
  error,
  children,
  className,
  htmlFor,
}: FormFieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <Label htmlFor={htmlFor}>{label}</Label>
      )}
      {children}
      {error && (
        <p
          className="font-mono text-[var(--destructive)]"
          style={{ fontSize: "11px" }}
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
