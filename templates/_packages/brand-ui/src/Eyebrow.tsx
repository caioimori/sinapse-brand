import { cn } from "./lib/cn";

/**
 * Eyebrow — Rótulo de seção mono uppercase pequeno.
 * prefix: '//' | '[]' | 'none'
 * Tamanho: 11px — abaixo da dead-zone 32-48px.
 */

export interface EyebrowProps extends React.HTMLAttributes<HTMLParagraphElement> {
  prefix?: "//" | "[]" | "none";
  as?: React.ElementType;
}

const prefixMap = {
  "//": "// ",
  "[]": "[ ",
  none: "",
} as const;

const suffixMap = {
  "//": "",
  "[]": " ]",
  none: "",
} as const;

export function Eyebrow({
  prefix = "none",
  as: As = "p",
  className,
  children,
  ...props
}: EyebrowProps) {
  return (
    <As
      className={cn(
        "font-mono uppercase tracking-[0.22em] text-[var(--muted-fg)]",
        className
      )}
      style={{ fontSize: "11px" }}
      {...props}
    >
      {prefix !== "none" && (
        <span aria-hidden className="opacity-50">
          {prefixMap[prefix]}
        </span>
      )}
      {children}
      {prefix === "[]" && (
        <span aria-hidden className="opacity-50">
          {suffixMap[prefix]}
        </span>
      )}
    </As>
  );
}
