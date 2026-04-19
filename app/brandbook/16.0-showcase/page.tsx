import type { Metadata } from "next";
import { Container } from "@/components/brand/container";
import { Nav } from "@/components/brand/nav";
import { Footer } from "@/components/brand/footer";
import { NextSectionAuto } from "@/components/brand/next-section-auto";
import { PageHeader } from "@/components/brand/page-header";
import { MetaLabel } from "@/components/brand/meta";
import { CornerBrackets } from "@/components/brand/corner-brackets";

export const metadata: Metadata = {
  title: "16.0 Showcase — SINAPSE Brand",
  description: "Provas em uso · landing pages · carrosséis · decks · case studies.",
};

const CASES = [
  { id: "16.1", title: "Landing MindLoop", kind: "Landing page", date: "Q2 2026", desc: "Hub de soluções IA pro cliente MindLoop. Hero · features · pricing · CTA." },
  { id: "16.2", title: "Carrossel IG · 'Fim das vagas operacionais'", kind: "Social", date: "Mar 2026", desc: "10 slides 4:5 · hook + desenvolvimento + CTA." },
  { id: "16.3", title: "Deck SINAPSE pra investidores", kind: "Deck 16:9", date: "Abr 2026", desc: "9 slides · problema · solução · mercado · go-to-market." },
  { id: "16.4", title: "Email signature SINAPSE/AI", kind: "Email", date: "Mar 2026", desc: "Logo lockup · stack atual · contatos." },
  { id: "16.5", title: "Proposta comercial v3", kind: "Proposal", date: "Abr 2026", desc: "Diagnóstico · escopo · investimento · timeline." },
  { id: "16.6", title: "Editorial v0.1", kind: "Long-read", date: "Abr 2026", desc: "Brand story em 5 capítulos · single column 1024px." },
];

export default function Showcase() {
  return (
    <main className="min-h-screen flex flex-col overflow-x-hidden">
      <Nav />
      <PageHeader
        section="Showcase · Index"
        number="16.0"
        title="A marca em movimento real."
        emphasis="Casos · saídas · provas."
        subtitle="Landing pages · carrosséis · decks · email · proposta · editorial. Cada caso mostra o sistema sem desvio."
        tokens="6 cases"
      />

      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {CASES.map((c, i) => (
              <CornerBrackets key={c.id} className="bg-background border border-border overflow-hidden flex flex-col">
                <div className="aspect-[16/10] bg-card flex items-center justify-center relative overflow-hidden">
                  <div className={`absolute inset-0 ${i % 3 === 0 ? "pattern-grid" : i % 3 === 1 ? "pattern-dots" : "pattern-crosshair"} opacity-50`} />
                  <div className="relative text-center px-4">
                    <MetaLabel>{c.id}</MetaLabel>
                    <h3 className="mt-2 font-display font-light text-2xl md:text-3xl tracking-tight max-w-[16ch] mx-auto">
                      {c.title}
                    </h3>
                  </div>
                </div>
                <div className="p-5 md:p-6 border-t border-border flex-1 flex flex-col gap-3">
                  <div className="flex items-baseline justify-between gap-3 flex-wrap">
                    <MetaLabel>{c.kind}</MetaLabel>
                    <span className="font-mono text-[10px] tracking-[0.18em] opacity-50">{c.date}</span>
                  </div>
                  <p className="font-sans text-sm opacity-65 leading-relaxed flex-1">{c.desc}</p>
                  <a href="#" className="link-cs font-mono text-[10px] tracking-[0.22em] opacity-65 hover:opacity-100 mt-2">
                    VER CASE →
                  </a>
                </div>
              </CornerBrackets>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-border bg-muted">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <CornerBrackets className="bg-background border border-border p-10 md:p-16 text-center">
            <MetaLabel>// SUBMIT YOUR CASE</MetaLabel>
            <h2 className="mt-3 font-display font-light text-[clamp(2rem,5vw,4rem)] leading-[0.95] tracking-[-0.04em] max-w-[20ch] mx-auto">
              Usou SINAPSE no seu projeto?
            </h2>
            <p className="mt-4 font-sans text-base opacity-65 max-w-xl mx-auto">
              Mande pra brand@sinapse.club que adicionamos no showcase.
            </p>
          </CornerBrackets>
        </Container>
      </section>

      <NextSectionAuto current="16.0" />
      <Footer />
    </main>
  );
}
