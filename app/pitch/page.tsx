import type { Metadata } from "next";
import { Container } from "@/components/brand/container";
import { Nav } from "@/components/brand/nav";
import { Footer } from "@/components/brand/footer";
import { NextSectionAuto } from "@/components/brand/next-section-auto";
import { PageHeader } from "@/components/brand/page-header";
import { MetaLabel } from "@/components/brand/meta";
import { CornerBrackets } from "@/components/brand/corner-brackets";

export const metadata: Metadata = {
  title: "Pitch — SINAPSE Brand",
  description: "Pitch deck SINAPSE — 9 slides 16:9 do ecossistema completo.",
};

const SLIDES = [
  { n: "01", t: "Cover", body: "SINAPSE — Comunidade + distribuição pra empresários escalarem com IA.", meta: "Capa" },
  { n: "02", t: "O mundo virou", body: "IA comoditizou o técnico. Quem reina hoje é quem tem comunidade e sabe distribuir.", meta: "Problem" },
  { n: "03", t: "O ICP", body: "Empresário com casca. Já rodou. Já tomou cacetada. Quer framework, não tutorial.", meta: "Audience" },
  { n: "04", t: "O ecossistema", body: "3 braços: Educação (mentorias R$1k/8 calls) · Comunidade (forum R$30-38/mês) · Implementação (diagnóstico + hub).", meta: "Solution" },
  { n: "05", t: "Anti-mercado", body: "Sem teoria solta. Sem guru. Sem palco. Sem promessa furada. Sem ferramenta-sem-operação.", meta: "Differential" },
  { n: "06", t: "Tração atual", body: "T02 rodando · T03 em waitlist · forum 24/7 ativo · MindLoop primeiro hub-cliente.", meta: "Traction" },
  { n: "07", t: "Visão 12 meses", body: "R$ 200k/mês · cohorts cíclicas · forum gigante · plataformas/startups com valuation.", meta: "Vision" },
  { n: "08", t: "Time", body: "Caio Imori (Chief AI Officer-as-a-Service) + Matheus Soier. Construído por quem opera todo dia.", meta: "Team" },
  { n: "09", t: "CTA", body: "Aplique pra T03 ou entre no forum hoje. Ou agende diagnóstico.", meta: "Action" },
];

export default function Pitch() {
  return (
    <main className="min-h-screen flex flex-col overflow-x-hidden">
      <Nav />
      <PageHeader
        section="Pitch"
        number="0.1"
        title="Brand pitch deck."
        emphasis="9 slides · 5 minutos · ecossistema."
        subtitle="Apresentação SINAPSE — problema do mundo IA, ICP empresário-com-casca, 3 braços do ecossistema, tração atual, visão. 16:9 ao vivo ou export PDF."
        tokens="9 slides"
      />

      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {SLIDES.map((s) => (
              <CornerBrackets key={s.n} className="bg-background border border-border overflow-hidden flex flex-col">
                <div className="aspect-[16/9] bg-card border-b border-border p-6 flex flex-col justify-between gap-3 relative">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] tracking-[0.25em] opacity-50">/{s.n}</span>
                    <span className="font-mono text-[10px] tracking-[0.22em] opacity-50 uppercase">{s.meta}</span>
                  </div>
                  <div className="font-display font-light text-[clamp(1.25rem,3vw,2rem)] leading-[1] tracking-[-0.03em]">
                    {s.t}
                  </div>
                  <span className="font-mono text-[10px] tracking-[0.25em] opacity-50 self-end">SINAPSE / 0.1.{s.n}</span>
                </div>
                <div className="p-5 flex-1">
                  <p className="font-sans text-sm opacity-75 leading-relaxed">{s.body}</p>
                </div>
              </CornerBrackets>
            ))}
          </div>

          <div className="mt-12 flex items-center justify-center gap-4 flex-wrap">
            <button className="btn-magnetic font-mono text-[11px] tracking-[0.25em] px-6 py-3.5 bg-foreground text-background">
              ABRIR APRESENTAÇÃO →
            </button>
            <a href="#" className="link-cs font-mono text-[11px] tracking-[0.25em] opacity-65 hover:opacity-100">
              EXPORT PDF
            </a>
          </div>
        </Container>
      </section>

      <NextSectionAuto current="0.1" />
      <Footer />
    </main>
  );
}
