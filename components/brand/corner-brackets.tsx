/**
 * CornerBrackets — sistema HUD/scope reticle (NYO pattern).
 *
 * Wrap qualquer elemento com 4 brackets nos cantos.
 * Aplicado via 1 SVG L-shape replicado com rotate (consolidado em CSS class).
 *
 * Uso:
 *   <CornerBrackets><div>conteúdo</div></CornerBrackets>
 *   <CornerBrackets corners={["tl","br"]}>...</CornerBrackets>
 */

type Corner = "tl" | "tr" | "bl" | "br";

interface Props {
  children: React.ReactNode;
  corners?: Corner[];
  className?: string;
  size?: number; // px (default 14)
}

export function CornerBrackets({
  children,
  corners = ["tl", "tr", "bl", "br"],
  className,
  size,
}: Props) {
  return (
    <div
      className={`corner-bracket-wrap ${className ?? ""}`}
      style={size ? ({ ["--bracket-size" as string]: `${size}px` } as React.CSSProperties) : undefined}
    >
      {corners.map((c) => (
        <span key={c} className={`corner-bracket ${c}`} aria-hidden />
      ))}
      {children}
    </div>
  );
}
