import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium rounded-[var(--radius)] transition-[transform,background] duration-[var(--dur-fast)] ease-[var(--ease-smooth)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:     "bg-foreground text-background hover:bg-foreground/90",
        ghost:       "bg-transparent text-foreground hover:bg-[var(--subtle)]",
        outline:     "border border-[var(--border-strong)] text-foreground hover:bg-[var(--subtle)]",
        subtle:      "bg-[var(--muted)] text-foreground hover:bg-[var(--surface-2)]",
        destructive: "bg-[var(--destructive)] text-white hover:opacity-90",
      },
      size: {
        xs:   "h-7 px-2.5 text-xs",
        sm:   "h-8 px-3 text-sm",
        md:   "h-9 px-4 text-sm",
        lg:   "h-11 px-6 text-base",
        icon: "h-9 w-9 p-0",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
);
Button.displayName = "Button";
export { buttonVariants };
