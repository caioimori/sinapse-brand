import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./lib/cn";

/**
 * Badge — Elemento decorativo inline.
 * Distinto de StatusPill (decorativo vs data-driven com intensity).
 * variant: outline | solid | subtle | bracket
 * bracket usa pseudo-content "[ ]" via CSS (não suportado direto em React — usa wrapper span).
 */

const badgeVariants = cva(
  "inline-flex items-center font-mono uppercase tracking-[0.18em] tabular-nums",
  {
    variants: {
      variant: {
        outline:
          "rounded-[var(--radius-pill)] border border-[var(--border-strong)] text-foreground",
        solid:
          "rounded-[var(--radius-pill)] bg-foreground text-background",
        subtle:
          "rounded-[var(--radius-pill)] bg-[var(--subtle)] text-foreground",
        bracket: "text-foreground gap-0",
      },
      size: {
        sm: "px-2 py-0.5 text-[10px]",
        md: "px-2.5 py-0.5 text-[11px]",
      },
    },
    defaultVariants: { variant: "outline", size: "md" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({
  className,
  variant,
  size,
  children,
  ...props
}: BadgeProps) {
  if (variant === "bracket") {
    return (
      <span
        className={cn(badgeVariants({ variant, size }), className)}
        {...props}
      >
        <span aria-hidden className="opacity-50 mr-1">
          [
        </span>
        {children}
        <span aria-hidden className="opacity-50 ml-1">
          ]
        </span>
      </span>
    );
  }

  return (
    <span
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </span>
  );
}

export { badgeVariants };
