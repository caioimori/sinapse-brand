import type { Metadata } from "next";
import { Container } from "@/components/brand/container";
import { Nav } from "@/components/brand/nav";
import { Footer } from "@/components/brand/footer";
import { NextSectionAuto } from "@/components/brand/next-section-auto";
import { PageHeader } from "@/components/brand/page-header";
import { MetaLabel } from "@/components/brand/meta";
import { CornerBrackets } from "@/components/brand/corner-brackets";

export const metadata: Metadata = {
  title: "1.0 Movimento — SINAPSE Brand",
  description: "O movimento que dá origem à marca — manifesto, arquétipo, persona-mentor, big idea.",
};

const ARCHETYPES = [
  { name: "Magician", pct: 45, desc: "Transformar o invisível em visível. Sistemas que fazem o impossível parecer trivial." },
  { name: "Sovereign", pct: 35, desc: "Autoridade calma. Quem decide com clareza não precisa gritar." },
  { name: "Creator", pct: 20, desc: "Construir o novo. Origem em vez de cópia." },
];

const VALORES = [
  { n: "01", t: "Restrição como assinatura", d: "B&W · 3 fontes · 3 easings · poucas escolhas. Quem se restringe destaca." },
  { n: "02", t: "Sistema sobre pessoa", d: "Substituímos processos, não pessoas. O time fica livre pra estratégia." },
  { n: "03", t: "Construir em silêncio", d: "Resultado fala. Anúncio não. Trabalho que se sustenta sem hype." },
  { n: "04", t: "Direto sem rodeios", d: "Sem jargão, sem sinergia, sem game-changer. Verbo concreto." },
];

const BIG_IDEA_FRASES = [
  "A IA não é o herói. O sistema é.",
  "Restrição não é limite — é assinatura.",
  "Construído em silêncio.",
  "Escale sem aumentar a folha.",
];

export default function Movimento() {
  return (
    <main className="min-h-screen flex flex-col overflow-x-hidden">
      <Nav />
      <PageHeader
        section="Brandbook · Movimento"
        number="1.0"
        title="O movimento que dá origem à marca."
        emphasis="Por que B&W · arquétipo · persona-mentor · big idea."
        subtitle="Estratégia narrativa que sustenta cada decisão visual e verbal. Aqui mora o porquê — visual sai disso, não o contrário."
        tokens="6 sections"
      />

      {/* Manifesto */}
      <section className="border-b border-border bg-card">
        <Container size="narrow" className="py-12 sm:py-16 md:py-20 lg:py-24">
          <MetaLabel>[01] / Manifesto</MetaLabel>
          <h2 className="mt-3 font-display font-light text-[clamp(1.75rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.04em] max-w-[24ch]">
            <span className="auto-highlight">SINAPSE existe</span> pra resolver uma dor específica.
          </h2>
          <div className="mt-8 space-y-5 font-sans text-base md:text-lg leading-relaxed opacity-80 max-w-2xl">
            <p>O mercado de IA virou ruído. Promessa furada de transformação mágica. Guru sem prática. Influencer sem operação.</p>
            <p>SINAPSE existe pra <strong className="font-semibold">quem opera</strong> — donos de negócio que aplicam IA em produção todo dia, não quem só estuda. <em className="opacity-70">Sem teoria solta. Sem guru. Sem palco.</em></p>
            <p>Forum 24/7 com casos reais. Frameworks que vieram da trincheira. Networking verificado de quem entrega resultado.</p>
            <p className="border-l-2 border-foreground pl-5 italic font-display text-xl md:text-2xl">A IA não é o herói. O sistema é.</p>
          </div>
        </Container>
      </section>

      {/* Big Idea — frases-matriz */}
      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="flex items-end justify-between gap-4 mb-8 md:mb-12 flex-wrap">
            <div>
              <MetaLabel>[02] / Big Idea · frases-matriz</MetaLabel>
              <h2 className="mt-3 font-display font-light text-[clamp(1.75rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.035em] max-w-[28ch]">
                4 frases. <span className="font-medium">Repetir até ressoar.</span>
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border rounded-xl overflow-hidden">
            {BIG_IDEA_FRASES.map((f, i) => (
              <div key={i} className="bg-background p-8 md:p-10 lg:p-14 min-h-[220px] flex flex-col justify-between gap-4">
                <MetaLabel>0{i + 1} · {i === 0 ? "Doutrina" : i === 1 ? "Princípio" : i === 2 ? "Modus" : "Promessa"}</MetaLabel>
                <blockquote className="font-display font-light text-[clamp(1.5rem,3.5vw,2.5rem)] leading-[1.1] tracking-[-0.03em] max-w-[20ch]">
                  &ldquo;{f}&rdquo;
                </blockquote>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Arquétipo */}
      <section className="border-b border-border bg-muted">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="flex items-end justify-between gap-4 mb-8 md:mb-12 flex-wrap">
            <div>
              <MetaLabel>[03] / Arquétipo · 3-axis weighted</MetaLabel>
              <h2 className="mt-3 font-display font-light text-[clamp(1.75rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.035em] max-w-[28ch]">
                Magician + Sovereign + Creator.
              </h2>
            </div>
            <MetaLabel>100% combined</MetaLabel>
          </div>
          <div className="space-y-5">
            {ARCHETYPES.map((a) => (
              <div key={a.name} className="bg-background border border-border p-6 md:p-8 rounded-xl">
                <div className="flex items-baseline justify-between gap-4 mb-4 flex-wrap">
                  <h3 className="font-display font-medium text-2xl md:text-3xl tracking-tight">{a.name}</h3>
                  <span className="font-mono text-[11px] tracking-[0.25em] opacity-60">{a.pct}%</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-4">
                  <div className="h-full bg-foreground" style={{ width: `${a.pct}%` }} />
                </div>
                <p className="font-sans text-base opacity-75 leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Persona-mentor */}
      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="grid md:grid-cols-[1fr,1fr] gap-10 md:gap-16 items-center">
            <div>
              <MetaLabel>[04] / Persona-mentor</MetaLabel>
              <h2 className="mt-3 font-display font-light text-[clamp(1.75rem,5vw,4rem)] leading-[0.95] tracking-[-0.04em]">
                Rick Rubin.
              </h2>
              <p className="mt-5 font-sans text-base md:text-lg opacity-75 leading-relaxed max-w-md">
                Reduzir ao essencial. Silêncio que comunica. Confiança que não precisa explicar. Quem domina o ofício não precisa decorar.
              </p>
              <div className="mt-6 flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] opacity-60 uppercase">
                <span className="w-2 h-2 bg-foreground rounded-full auto-blink" />
                referência ativa · v0.3
              </div>
            </div>
            <CornerBrackets className="bg-card border border-border aspect-square flex items-center justify-center p-12 rounded-xl">
              <div className="text-center">
                <div className="font-mono text-[10px] tracking-[0.3em] opacity-50 mb-4">// PORTRAIT</div>
                <div className="font-display font-light text-7xl md:text-8xl tracking-[-0.05em]">RR</div>
                <div className="mt-4 font-sans text-sm opacity-60">producer · author</div>
              </div>
            </CornerBrackets>
          </div>
        </Container>
      </section>

      {/* Valores */}
      <section className="border-b border-border bg-card">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="flex items-end justify-between gap-4 mb-8 md:mb-12 flex-wrap">
            <div>
              <MetaLabel>[05] / Valores · 4 não-negociáveis</MetaLabel>
              <h2 className="mt-3 font-display font-light text-[clamp(1.75rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.035em] max-w-[28ch]">
                Princípios que filtram cada decisão.
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border rounded-xl overflow-hidden">
            {VALORES.map((v) => (
              <div key={v.n} className="bg-background p-6 md:p-8 flex flex-col gap-4 min-h-[200px]">
                <MetaLabel>{v.n}</MetaLabel>
                <h3 className="font-display font-medium text-xl md:text-2xl tracking-tight">{v.t}</h3>
                <p className="font-sans text-sm md:text-base opacity-70 leading-relaxed mt-auto">{v.d}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ICP */}
      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <CornerBrackets className="block bg-background border border-border p-8 md:p-12 lg:p-16 rounded-xl">
            <div className="grid md:grid-cols-[1fr,2fr] gap-10 md:gap-16">
              <div>
                <MetaLabel>[06] / ICP</MetaLabel>
                <h2 className="mt-3 font-display font-light text-[clamp(1.75rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.035em]">
                  Quem é o cliente.
                </h2>
              </div>
              <div className="space-y-4">
                {[
                  { l: "Quem é", v: "Donos de negócio verificados · operação em produção · IA aplicada (não estudada)" },
                  { l: "Maturidade", v: "Já tentou · sabe o que não funciona · busca framework, não tutorial" },
                  { l: "Dor", v: "Ruído do mercado · promessa furada · guru sem prática · ferramenta sem operação" },
                  { l: "Decisor", v: "Founder · operador · C-level · busca trincheira, não palco" },
                  { l: "Não é cliente", v: "Curioso de IA · iniciante · quem busca certificado · cliente de guru" },
                ].map((row) => (
                  <div key={row.l} className="grid grid-cols-[140px,1fr] gap-4 py-3 border-b border-border last:border-0">
                    <MetaLabel>{row.l}</MetaLabel>
                    <span className="font-sans text-base opacity-80">{row.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </CornerBrackets>
        </Container>
      </section>

      <NextSectionAuto current="1.0" />
      <Footer />
    </main>
  );
}
