import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowUpRight } from "lucide-react";
import { cn } from "./lib/cn";

/**
 * Button — Primitivo de ação.
 * variant: primary | ghost | outline | subtle | destructive | cta
 * size: xs | sm | md | lg | icon
 *
 * `cta` é pill-shaped com chip-seta (ArrowUpRight) rotate-45 no hover.
 * `asChild` não implementado; use wrapper custom se precisar de Slot/Link.
 */

const buttonVariants = cva(
  [
    "group inline-flex items-center justify-center gap-2 font-medium",
    "transition-all duration-[var(--dur-fast)] ease-[var(--ease-smooth)]",
    "active:scale-[0.98]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]",
    "disabled:opacity-50 disabled:pointer-events-none",
  ],
  {
    variants: {
      variant: {
        primary:
          "rounded-[var(--radius-md)] bg-foreground text-background hover:bg-foreground/90 hover:-translate-y-0.5",
        ghost:
          "rounded-[var(--radius-md)] bg-transparent text-foreground hover:bg-[var(--subtle)]",
        outline:
          "rounded-[var(--radius-md)] border border-[var(--border-strong)] text-foreground hover:bg-[var(--subtle)]",
        subtle:
          "rounded-[var(--radius-md)] bg-[var(--muted)] text-foreground hover:bg-[var(--muted)]/70",
        destructive:
          "rounded-[var(--radius-md)] bg-[var(--destructive)]/10 text-[var(--destructive)] border border-[var(--destructive)]/30 hover:bg-[var(--destructive)]/20",
        cta: "rounded-[var(--radius-pill)] bg-foreground text-background pl-6 pr-2 hover:-translate-y-0.5",
      },
      size: {
        xs: "h-7 px-2.5 text-xs",
        sm: "h-8 px-3 text-sm",
        md: "h-9 px-4 text-sm",
        lg: "h-11 px-6 text-base",
        icon: "h-9 w-9 p-0",
      },
    },
    compoundVariants: [
      { variant: "cta", size: "md", class: "h-12" },
      { variant: "cta", size: "lg", class: "h-13" },
    ],
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Renderiza o chip-seta no CTA (padrão: true quando variant="cta") */
  showArrow?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, showArrow, ...props }, ref) => {
    const isCta = variant === "cta";
    const renderArrow = showArrow ?? isCta;

    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {children}
        {renderArrow && (
          <span className="ml-1 grid h-8 w-8 place-items-center rounded-full bg-background/15 transition-transform duration-[var(--dur-fast)] group-hover:rotate-45">
            <ArrowUpRight size={16} aria-hidden />
          </span>
        )}
      </button>
    );
  }
);
Button.displayName = "Button";

export { buttonVariants };
