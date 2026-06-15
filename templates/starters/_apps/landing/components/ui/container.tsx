import { cn } from "@/lib/cn";

const widths = {
  narrow:  "w-[var(--container-narrow)]",
  default: "w-[var(--container-default)]",
  wide:    "w-[var(--container-wide)]",
} as const;

export function Container({
  size = "default",
  className,
  children,
}: {
  size?: keyof typeof widths;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "mx-auto px-[var(--container-pad)]",
        widths[size],
        className
      )}
    >
      {children}
    </div>
  );
}
