export function GET() {
  return new Response(
    `# SINAPSE\n> Plataforma de orquestração de agentes de IA.\n\n## Planos\n- Start, Pro, Scale\n`,
    { headers: { "Content-Type": "text/plain" } }
  );
}
