import { cn } from "./lib/cn";

/**
 * StatusPill — Indicador de estado data-driven.
 * Diferencia status por peso/opacity (B&W), nunca por hue.
 *
 * StatusIntensity define o nível visual:
 *   neutral  — borda fina, opacidade baixa
 *   active   — borda forte, superfície elevada
 *   ok       — borda sólida foreground, positivo
 *   warn     — borda tracejada, atenção
 *   critical — borda foreground sólida + dot pulsante
 *   muted    — máxima opacidade reduzida
 */

export type StatusIntensity =
  | "neutral"
  | "active"
  | "ok"
  | "warn"
  | "critical"
  | "muted";

export interface StatusDef {
  label: string;
  intensity: StatusIntensity;
  pulse?: boolean;
}

export const STATUS_MAP: Record<string, StatusDef> = {
  todo:             { label: "A fazer",    intensity: "neutral" },
  in_progress:      { label: "Em andamento", intensity: "active", pulse: true },
  pending_approval: { label: "Aguardando", intensity: "warn" },
  approved:         { label: "Aprovado",   intensity: "ok" },
  done:             { label: "Concluído",  intensity: "ok" },
  rejected:         { label: "Rejeitado",  intensity: "critical" },
  error:            { label: "Erro",       intensity: "critical", pulse: true },
  review:           { label: "Em revisão", intensity: "active" },
  paused:           { label: "Pausado",    intensity: "muted" },
  archived:         { label: "Arquivado",  intensity: "muted" },
};

const intensityStyles: Record<StatusIntensity, string> = {
  neutral:  "border border-[var(--border)] text-[var(--muted-fg)] opacity-70",
  active:   "border border-[var(--border-strong)] bg-[var(--subtle)] text-foreground",
  ok:       "border border-foreground text-foreground",
  warn:     "border border-dashed border-[var(--border-strong)] text-foreground",
  critical: "border border-foreground bg-foreground/5 text-foreground",
  muted:    "border border-[var(--border)] text-[var(--muted-fg)] opacity-40",
};

export interface StatusPillProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: string;
  /** Mapa customizado de status — sobrepõe STATUS_MAP para as chaves fornecidas */
  map?: Record<string, StatusDef>;
  size?: "sm" | "md";
}

export function StatusPill({
  status,
  map,
  size = "md",
  className,
  ...props
}: StatusPillProps) {
  const resolvedMap = map ? { ...STATUS_MAP, ...map } : STATUS_MAP;
  const def: StatusDef = resolvedMap[status] ?? {
    label: status,
    intensity: "neutral",
  };

  const { label, intensity, pulse } = def;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-[var(--radius-pill)]",
        "font-mono uppercase",
        size === "sm" ? "px-2 py-0.5 tracking-[0.15em]" : "px-2.5 py-0.5 tracking-wider",
        intensityStyles[intensity],
        className
      )}
      style={{ fontSize: size === "sm" ? "10px" : "11px" }}
      {...props}
    >
      {pulse && (
        <span
          className="relative flex h-1.5 w-1.5 shrink-0"
          aria-hidden
        >
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
        </span>
      )}
      {label}
    </span>
  );
}
