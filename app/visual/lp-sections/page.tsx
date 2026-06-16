import type { Metadata } from "next";
import { Container } from "@/components/brand/container";
import { Nav } from "@/components/brand/nav";
import { Footer } from "@/components/brand/footer";
import { NextSectionAuto } from "@/components/brand/next-section-auto";
import { PageHeader } from "@/components/brand/page-header";
import { MetaLabel } from "@/components/brand/meta";
import { CornerBrackets } from "@/components/brand/corner-brackets";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "LP Sections — SINAPSE Visual",
  description: "Hero · social proof · features · pricing · FAQ · stats · CTA.",
};

export default function LPSections() {
  return (
    <main className="min-h-screen flex flex-col overflow-x-hidden">
      <Nav />
      <PageHeader
        section="Visual · LP Sections"
        number="V.L"
        title="Landing page sections."
        emphasis="7 blocos prontos."
        subtitle="Sections de landing page comerciais — copy/paste em qualquer LP SINAPSE ou cliente."
        tokens="7 sections"
      />

      {/* Social proof */}
      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <SectionHeading n="01" l="Social proof bar" />
          <div className="bg-card border border-border py-8 px-4 rounded-lg">
            <p className="text-center font-mono text-[10px] tracking-[0.25em] opacity-50 uppercase mb-6">
              // CONFIAM NA SINAPSE
            </p>
            <div className="flex items-center justify-center gap-8 md:gap-16 flex-wrap opacity-60">
              {["LOGOIPSUM 01", "LOGOIPSUM 02", "LOGOIPSUM 03", "LOGOIPSUM 04", "LOGOIPSUM 05"].map((l) => (
                <span key={l} className="font-display font-medium text-base md:text-lg tracking-tight whitespace-nowrap">
                  {l}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Feature checklist */}
      <section className="border-b border-border bg-muted">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <SectionHeading n="02" l="Feature checklist" />
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <MetaLabel>// O QUE VOCÊ GANHA</MetaLabel>
              <h3 className="mt-3 font-display font-light text-[clamp(3.25rem,4.5vw,3.75rem)] leading-[1.1] tracking-[-0.035em] max-w-[20ch]">
                Tudo incluso. Sem add-ons.
              </h3>
            </div>
            <ul className="space-y-3">
              {[
                "Squad de 3 agentes especializados",
                "Integração com WhatsApp + CRM",
                "Onboarding em 30 dias",
                "Suporte humano 24/7",
                "Métricas em tempo real",
                "Sem fidelidade contratual",
              ].map((f) => (
                <li key={f} className="flex items-start gap-3 bg-background border border-border p-4 rounded-lg">
                  <Check size={18} strokeWidth={2} className="shrink-0 mt-0.5" />
                  <span className="font-sans text-base">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* FAQ accordion */}
      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <SectionHeading n="03" l="FAQ accordion" />
          <div className="space-y-3 max-w-[72ch]">
            {[
              { q: "Quanto tempo leva pra ver resultados?", a: "Primeiros 30 dias: setup + integração. Maturação: 60-90 dias." },
              { q: "Substitui meu time?", a: "Não. Substitui processos repetitivos, libera o time pra estratégia." },
              { q: "Funciona pra qual tipo de empresa?", a: "Empresas médias e grandes com operação consolidada e fluxo de leads/clientes." },
              { q: "Tem fidelidade?", a: "Não. Contrato mensal." },
            ].map((f, i) => (
              <details key={f.q} open={i === 0} className="bg-background border border-border rounded-lg group/faq">
                <summary className="cursor-pointer p-5 flex items-center justify-between gap-4 list-none">
                  <span className="font-display text-base md:text-lg tracking-tight">{f.q}</span>
                  <span className="font-mono text-[14px] opacity-60 transition-transform duration-base ease-smooth group-open/faq:rotate-45">+</span>
                </summary>
                <div className="px-5 pb-5 font-sans text-sm opacity-70 leading-relaxed">{f.a}</div>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* Stats inverted */}
      <section className="border-b border-border bg-foreground text-background">
        <Container className="py-16 md:py-24">
          <SectionHeading n="04" l="Stats inverted" inverted />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-background/15">
            {[
              { v: "+50", l: "Empresas atendidas" },
              { v: "300%", l: "Eficiência média" },
              { v: "24/7", l: "Operação ativa" },
              { v: "30d", l: "Time-to-value" },
            ].map((s) => (
              <div key={s.l} className="bg-foreground p-6 md:p-10">
                <div className="font-display font-light text-[clamp(3.25rem,5vw,4rem)] leading-none tracking-[-0.035em]">
                  {s.v}
                </div>
                <div className="mt-3 font-mono text-[10px] tracking-[0.22em] opacity-70 uppercase">{s.l}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <CornerBrackets className="bg-card border border-border p-12 md:p-20 text-center">
            <MetaLabel>// FINAL CTA</MetaLabel>
            <h2 className="mt-3 font-display font-light text-[clamp(3.25rem,6vw,5rem)] leading-[0.95] tracking-[-0.04em] max-w-[20ch] mx-auto">
              Vamos conversar?
            </h2>
            <p className="mt-4 font-sans text-base md:text-lg opacity-65 max-w-[55ch] mx-auto">
              30 minutos sem custo, sem compromisso. Diagnóstico do seu fluxo atual.
            </p>
            <button className="mt-8 btn-magnetic font-mono text-[11px] tracking-[0.25em] px-8 py-4 bg-foreground text-background">
              AGENDAR DIAGNÓSTICO →
            </button>
          </CornerBrackets>
        </Container>
      </section>

      <NextSectionAuto current="V.L" />
      <Footer />
    </main>
  );
}

function SectionHeading({ n, l, inverted }: { n: string; l: string; inverted?: boolean }) {
  return (
    <div className="mb-8 md:mb-10">
      <div className={`font-mono text-[10px] tracking-[0.3em] uppercase ${inverted ? "opacity-70" : "opacity-50"}`}>
        [{n}] / {l}
      </div>
    </div>
  );
}
