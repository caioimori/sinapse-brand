import { cn } from "./lib/cn";

/**
 * Card — Container de superfície elevada.
 * hover: adiciona lift sutil no hover (translate-y + shadow)
 * padding: controla espaçamento interno
 */

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const paddingMap = {
  none: "p-0",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
} as const;

export function Card({
  className,
  hover = false,
  padding = "md",
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-xl)] border border-[var(--border)] bg-card",
        paddingMap[padding],
        hover &&
          "transition-transform duration-[var(--dur-base)] ease-[var(--ease-smooth)] hover:-translate-y-0.5",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
