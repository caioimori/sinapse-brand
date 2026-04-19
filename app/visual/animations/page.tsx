import type { Metadata } from "next";
import { Container } from "@/components/brand/container";
import { Nav } from "@/components/brand/nav";
import { Footer } from "@/components/brand/footer";
import { NextSectionAuto } from "@/components/brand/next-section-auto";
import { PageHeader } from "@/components/brand/page-header";
import { MetaLabel } from "@/components/brand/meta";
import { CornerBrackets } from "@/components/brand/corner-brackets";
import {
  NeuralNet,
  CRMFunnel,
  PaidMetrics,
  ToolStackOrbit,
  CopyTyping,
  GrowthChart,
  MarketingPulse,
  AgentSquad,
} from "@/components/brand/business-animations";

export const metadata: Metadata = {
  title: "Business Animations — SINAPSE Visual",
  description: "Animations narrando o SINAPSE — AI agents · CRM · paid media · tool stack · copy · growth.",
};

const ITEMS = [
  { I: NeuralNet, t: "Neural Network", d: "AI agents conectando · 4 nodes oscilando · ring pulse infinite", tag: "AI" },
  { I: AgentSquad, t: "Agent Squad", d: "4 agentes IA executando tasks em paralelo · status dots", tag: "AI" },
  { I: CRMFunnel, t: "CRM Funnel", d: "Cascade leads → qualified → meetings → clients · drops caindo", tag: "CRM" },
  { I: PaidMetrics, t: "Paid Metrics", d: "Bar chart subindo/descendo · CTR · CPC · ROAS · LTV", tag: "PAID" },
  { I: ToolStackOrbit, t: "Tool Stack Orbit", d: "Claude · GPT · Codex · Kimi · Qwen · OpenClaw orbitando SINAPSE", tag: "STACK" },
  { I: CopyTyping, t: "Copy Typing", d: "Headlines digitando + cursor blink · text shimmer", tag: "COPY" },
  { I: GrowthChart, t: "Growth Chart", d: "Linha climbing infinite · 7 datapoints aparecendo sequencial", tag: "METRICS" },
  { I: MarketingPulse, t: "Marketing Pulse", d: "Campanhas LP · ADS · EMAIL · SOCIAL pulsando radial", tag: "MARKETING" },
];

export default function BusinessAnimations() {
  return (
    <main className="min-h-screen flex flex-col overflow-x-hidden">
      <Nav />
      <PageHeader
        section="Visual · Business Animations"
        number="V.B"
        title="Animations narrando o negócio."
        emphasis="8 SVG animations · auto-loop infinito."
        subtitle="Cada animation conta um aspecto SINAPSE: AI agents · CRM funnel · paid media · tool stack · copy · marketing pulse · growth. Pure SVG · zero JS state · todas auto-loop."
        tokens="8"
      />

      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border rounded-2xl shadow-apple-md overflow-hidden">
            {ITEMS.map(({ I, t, d, tag }) => (
              <div key={t} className="bg-background flex flex-col">
                <div className="aspect-[16/10] bg-card border-b border-border relative overflow-hidden p-4">
                  <I />
                  <div className="absolute top-3 left-3 font-mono text-[9px] tracking-[0.25em] opacity-60 uppercase">// {tag}</div>
                  <div className="absolute top-3 right-3 font-mono text-[9px] tracking-[0.25em] opacity-60 uppercase flex items-center gap-2">
                    <span className="w-1 h-1 bg-current rounded-full auto-blink" />
                    LOOP
                  </div>
                </div>
                <div className="p-5 md:p-6 flex flex-col gap-2">
                  <h3 className="font-display text-lg md:text-xl tracking-tight">{t}</h3>
                  <p className="font-sans text-sm opacity-65 leading-relaxed">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Hero showcase com animation gigante */}
      <section className="border-b border-border bg-muted">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <CornerBrackets className="block bg-background border border-border p-8 md:p-16 rounded-xl">
            <div className="grid md:grid-cols-[1fr,1fr] gap-10 md:gap-16 items-center">
              <div>
                <MetaLabel>// FEATURED</MetaLabel>
                <h2 className="mt-3 font-display font-light text-[clamp(1.75rem,5vw,4rem)] leading-[0.95] tracking-[-0.04em] max-w-[18ch]">
                  O ecossistema <span className="font-medium italic">em movimento.</span>
                </h2>
                <p className="mt-5 font-sans text-base md:text-lg opacity-65 leading-relaxed max-w-md">
                  Toda ferramenta que SINAPSE usa orbitando o core. Animation 24s ciclo completo.
                </p>
              </div>
              <div className="aspect-square bg-card border border-border relative overflow-hidden p-4 rounded-xl">
                <ToolStackOrbit />
              </div>
            </div>
          </CornerBrackets>
        </Container>
      </section>

      <NextSectionAuto current="V.B" />
      <Footer />
    </main>
  );
}
