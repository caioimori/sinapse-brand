import { Circle, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

export const STATUS_MAP = {
  ok:       { label: "Ativo",    intensity: "100", Icon: CheckCircle2 },
  pending:  { label: "Pendente", intensity: "55",  Icon: Circle },
  warn:     { label: "Atenção",  intensity: "70",  Icon: AlertTriangle },
  critical: { label: "Crítico",  intensity: "100", Icon: XCircle },
} as const;

export type StatusKey = keyof typeof STATUS_MAP;
