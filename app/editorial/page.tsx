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
  {
    n: "01",
    t: "O ponto de partida",
    d: "IA comoditizou o técnico. Em 2023, qualquer um com GPT-4 conseguia gerar código, copy, imagem. O diferencial deixou de ser saber fazer — virou saber operar.",
    body: "O empresário que operava bem começou a rodar mais rápido que o técnico que só sabia fazer. E o técnico que só sabia fazer virou commodity. SINAPSE nasceu dessa inversão: não vende IA, vende operação. Não vende ferramenta, vende sistema.",
  },
  {
    n: "02",
    t: "A insatisfação",
    d: "Substituir pessoa por IA é preguiça intelectual. Substituir processo ruim por processo bom — com ou sem IA — é o trabalho real.",
    body: "O mercado virou teatro: cursos de prompt, automações frágeis, agentes genéricos vendidos como milagre. Ninguém fala de operação. Ninguém fala de manter. SINAPSE escolheu o caminho oposto — framework, não tutorial. Doutrina, não hype.",
  },
  {
    n: "03",
    t: "O movimento",
    d: "Squads de agentes especializados. Orquestração por domínio. Regras NON-NEGOTIABLE. Tudo versionado, tudo auditável.",
    body: "Em vez de 1 agente generalista, 20+ orquestradores especializados — brand, copy, design, finance, growth, product. Cada um com persona, rules, dependencies. O sistema emergiu: SINAPSE-AI, o motor que entrega o resto.",
  },
  {
    n: "04",
    t: "O sistema",
    d: "3 braços: educação (mentorias + cursos), comunidade (forum sinapse.club), implementação (hubs de IA pra clientes).",
    body: "A economia fecha: educação entrega contexto, comunidade entrega continuidade, implementação entrega receita. Quem entra por um braço descobre os outros. Compostabilidade em produto, não só em tech.",
  },
  {
    n: "05",
    t: "O futuro",
    d: "12 meses: R$ 200k/mês, cohorts cíclicas, forum com 500+ empresários operando em rede, primeiros hubs-cliente com valuation.",
    body: "SINAPSE não quer ser mais uma startup de IA. Quer ser a infraestrutura invisível por trás de empresários que já operam — a camada que transforma quem faz em quem escala. Rick Rubin da operação.",
  },
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
              <h2 className="font-display font-light text-[clamp(1.75rem,4.5vw,3.25rem)] leading-[1.05] tracking-[-0.035em] max-w-[20ch] text-balance">
                {c.t}
              </h2>
              <p className="mt-6 font-sans text-base md:text-lg opacity-80 leading-relaxed">{c.d}</p>
              <p className="mt-6 font-sans text-base md:text-lg opacity-65 leading-relaxed">
                {c.body}
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
