import type { Metadata } from "next";
import { Container } from "@/components/brand/container";
import { Nav } from "@/components/brand/nav";
import { Footer } from "@/components/brand/footer";
import { NextSectionAuto } from "@/components/brand/next-section-auto";
import { PageHeader } from "@/components/brand/page-header";
import { MetaLabel } from "@/components/brand/meta";

export const metadata: Metadata = {
  title: "Editorial — SINAPSE Brand",
  description: "Brand story em formato long-read editorial.",
};

const CHAPTERS = [
  { n: "01", t: "O ponto de partida", d: "Onde tudo começou — a insatisfação com o operacional." },
  { n: "02", t: "A insatisfação", d: "Por que substituir processos é diferente de substituir pessoas." },
  { n: "03", t: "O movimento", d: "Construindo a alternativa — squads de agentes especializados." },
  { n: "04", t: "O sistema", d: "Como SINAPSE funciona na prática — stack, integração, onboarding." },
  { n: "05", t: "O futuro", d: "Roadmap · plataforma · mentorias · expansão regional." },
];

export default function Editorial() {
  return (
    <main className="min-h-screen flex flex-col overflow-x-hidden">
      <Nav />
      <PageHeader
        section="Editorial"
        number="16.5"
        title="Brand story em long-read."
        emphasis="5 capítulos. Single column. Calmo."
        subtitle="A história da marca em formato editorial — leitura linear, ritmo cinematográfico, tipografia respirada."
        tokens="5 chapters"
      />

      <section className="border-b border-border">
        <Container size="narrow" className="py-12 sm:py-16 md:py-20 lg:py-24">
          {/* TOC */}
          <div className="bg-card border border-border p-6 md:p-8 mb-12 rounded-lg">
            <MetaLabel>// SUMÁRIO</MetaLabel>
            <ol className="mt-5 space-y-3">
              {CHAPTERS.map((c) => (
                <li key={c.n}>
                  <a href={`#cap-${c.n}`} className="group/toc flex items-baseline gap-4 py-2 border-b border-border last:border-0">
                    <span className="font-mono text-[11px] tracking-[0.22em] opacity-50 w-8 shrink-0">{c.n}</span>
                    <span className="font-display text-lg md:text-xl tracking-tight transition-transform duration-base ease-smooth group-hover/toc:translate-x-1">
                      {c.t}
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </div>

          {/* Chapters preview */}
          {CHAPTERS.map((c) => (
            <article key={c.n} id={`cap-${c.n}`} className="bg-background border border-border p-6 md:p-12 mb-6 scroll-mt-24 rounded-lg">
              <div className="flex items-baseline gap-5 mb-6">
                <span className="font-mono text-[10px] tracking-[0.25em] opacity-50">CAPÍTULO {c.n}</span>
                <div className="flex-1 h-px bg-border" />
              </div>
              <h2 className="font-display font-light text-[clamp(1.75rem,4vw,3rem)] leading-[1.05] tracking-[-0.035em] max-w-[20ch]">
                {c.t}
              </h2>
              <p className="mt-6 font-sans text-base md:text-lg opacity-75 leading-relaxed">{c.d}</p>
              <p className="mt-6 font-sans text-base opacity-60 leading-relaxed italic">
                Conteúdo completo em desenvolvimento — capítulo será iterado conforme manifesto+posicionamento maturarem.
              </p>
            </article>
          ))}
        </Container>
      </section>

      <NextSectionAuto current="16.5" />
      <Footer />
    </main>
  );
}
