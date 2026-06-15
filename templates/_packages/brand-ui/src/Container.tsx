import { cn } from "./lib/cn";

/**
 * Container — Layout fluido com variantes de largura.
 * Nunca usa max-w-7xl. Usa CSS vars --container-* dos tokens.
 * size: narrow (860px) | default (1280px) | wide (1680px)
 */

const widths = {
  narrow: "w-[var(--container-narrow)]",
  default: "w-[var(--container-default)]",
  wide: "w-[var(--container-wide)]",
} as const;

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: keyof typeof widths;
  as?: React.ElementType;
}

export function Container({
  size = "default",
  as: As = "div",
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <As
      className={cn(
        "mx-auto px-[var(--container-pad,clamp(1.5rem,4vw,5rem))]",
        widths[size],
        className
      )}
      {...props}
    >
      {children}
    </As>
  );
}
