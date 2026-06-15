import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "group inline-flex items-center justify-center gap-2 font-medium transition-all duration-[var(--dur-fast)] ease-[var(--ease-smooth)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]",
  {
    variants: {
      variant: {
        primary:
          "rounded-[var(--radius)] bg-foreground text-background px-5 h-11 hover:-translate-y-0.5",
        outline:
          "rounded-[var(--radius)] border border-[var(--border-strong)] px-5 h-11 hover:bg-[var(--subtle)]",
        cta: "rounded-[var(--radius-pill)] bg-foreground text-background pl-6 pr-2 h-12 hover:-translate-y-0.5",
      },
    },
    defaultVariants: { variant: "primary" },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant }), className)}
      {...props}
    >
      {children}
      {variant === "cta" && (
        <span className="ml-1 grid h-8 w-8 place-items-center rounded-full bg-background/15 transition-transform duration-[var(--dur-fast)] group-hover:rotate-45">
          <ArrowUpRight size={16} />
        </span>
      )}
    </button>
  )
);
Button.displayName = "Button";
