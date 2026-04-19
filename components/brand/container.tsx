import { cn } from "@/lib/utils";

/**
 * Container — padrão de mercado (Stripe, Linear, Vercel-style)
 *  max-width 1440px (xl breakpoint) · padding responsive
 *
 * Variants:
 *  default — content padrão
 *  narrow  — texto editorial (max 1024px)
 *  wide    — bento/showcase (max 1680px)
 *  fluid   — full-bleed
 */
export function Container({
  children,
  className = "",
  size = "default",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide" | "fluid";
}) {
  const max = {
    default: "max-w-[1440px]",
    narrow: "max-w-[1024px]",
    wide: "max-w-[1680px]",
    fluid: "max-w-none",
  }[size];

  return (
    <div className={cn("mx-auto px-4 sm:px-6 lg:px-10 xl:px-16", max, className)}>
      {children}
    </div>
  );
}
