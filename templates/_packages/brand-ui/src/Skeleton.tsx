import { cn } from "./lib/cn";

/**
 * Skeleton — Placeholder de carregamento.
 * Usa bg-[var(--subtle)] + animate-pulse.
 * Passe className para definir dimensões (h-*, w-*, etc.).
 */

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-[var(--radius-md)] bg-[var(--subtle)]",
        className
      )}
      aria-hidden="true"
      {...props}
    />
  );
}
