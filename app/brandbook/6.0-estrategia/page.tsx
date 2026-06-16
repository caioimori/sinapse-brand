import type { Metadata } from "next";
import { Container } from "@/components/brand/container";
import { Nav } from "@/components/brand/nav";
import { Footer } from "@/components/brand/footer";
import { NextSectionAuto } from "@/components/brand/next-section-auto";
import { PageHeader } from "@/components/brand/page-header";
import { MetaLabel } from "@/components/brand/meta";
import { CornerBrackets } from "@/components/brand/corner-brackets";

export const metadata: Metadata = {
  title: "6.0 Estratégia — SINAPSE Brand",
  description: "Brandbook estratégico profundo: 11 sections — propósito, arquétipo, BrandScript, voz, jornada.",
};

const SECTIONS = [
  { id: "6.1", t: "Propósito & Valores", d: "Por que existimos · 4 valores não-negociáveis · MVV.", icon: "✦", body: "SINAPSE existe pra transformar quem opera em quem escala. Valores: restrição como identidade, operação sobre hype, framework sobre tutorial, comunidade sobre audiência passiva. MVV alinhada em maio/2026." },
  { id: "6.2", t: "Arquétipo", d: "Magician 45% + Sovereign 35% + Creator 20% · 3-axis weighted.", icon: "△", body: "Magician (transformação) lidera — entrega visível do invisível. Sovereign (autoridade) modera — comando sem berrar. Creator (ofício) sustenta — produto é feito, não improvisado." },
  { id: "6.3", t: "Posicionamento", d: "Categoria · audience-of-one · contraste competitivo.", icon: "⌖", body: "Categoria: operação assistida por IA (não curso, não agência). Audiência: empresário com casca, já rodou, cansou de guru. Contra: substituir processo sem entender operação existente." },
  { id: "6.4", t: "BrandScript", d: "StoryBrand framework · hero · problem · plan · CTA.", icon: "▶", body: "Herói: empresário que opera todo dia. Problema: IA comoditizou o técnico, mas a operação continua artesanal. Guia: SINAPSE. Plano: diagnóstico → hub → sistema. Ação: aplicar pra cohort ou entrar no forum." },
  { id: "6.5", t: "Truelines", d: "Frases-matriz · DNA verbal · repetir até ressoar.", icon: "//", body: "\"A IA não é o herói. O sistema é.\" · \"Framework, não tutorial.\" · \"Operação executada, não palco.\" · \"Rick Rubin da operação do cliente.\" — repetir em todo ponto de contato." },
  { id: "6.6", t: "Naming", d: "Convenção produtos · sub-marcas · arquitetura nominal.", icon: "[]", body: "SINAPSE (master) · SINAPSE-AI (framework técnico) · sinapse.club (forum) · SINAPSE Mentorias (educação) · SINAPSE Hub [nome-cliente] (implementação). Prefixo SINAPSE sempre, sufixo descritivo." },
  { id: "6.7", t: "Vocabulário", d: "Allow words · block words · power words · termos do setor.", icon: "✓✕", body: "ALLOW: sistema, operação, framework, doutrina, hub, cohort, comunidade. BLOCK: guru, hack, fórmula, copia-e-cola, genialidade. POWER: \"escalar sem escalar time\", \"operação assistida\", \"fonte da verdade\"." },
  { id: "6.8", t: "Traits da Voz", d: "5 dimensões bipolares · Formal↔Informal · Sério↔Divertido · etc.", icon: "≋", body: "Formal 70/30 · Sério 80/20 · Direto 90/10 · Técnico 60/40 · Pessoal 40/60. Autoridade calma, sem formalismo corporativo. Rick Rubin, não Jordan Belfort." },
  { id: "6.9", t: "Jornada do Herói", d: "Cliente como herói · 5 fases · depoimentos reais por fase.", icon: "→", body: "1. Reconhece o gargalo · 2. Descobre SINAPSE (forum/mentoria/conteúdo) · 3. Diagnostica com o time · 4. Implementa hub · 5. Opera autonomamente. Depoimento por fase = prova social escalonada." },
  { id: "6.10", t: "Contrato Bilateral", d: "Promessas SINAPSE + exigências do cliente · juramento 1ª pessoa.", icon: "⊕", body: "SINAPSE promete: diagnóstico honesto, sistema versionado, entrega em cohort. Cliente promete: processos documentados, time aberto, meta clara. Quebra de um lado = encerra o contrato, sem ressentimento." },
  { id: "6.11", t: "Os Fundadores", d: "Caio Imori · Matheus Soier · narrativa pessoal e técnica.", icon: "◐", body: "Caio Imori (arquiteto estratégico, ex-Módulo) + Matheus Soier (sócio operacional). Construído por quem opera todo dia — não investidor, não acadêmico. Vida real, não pitch deck." },
];

export default function Estrategia() {
  return (
    <main className="min-h-screen flex flex-col overflow-x-hidden">
      <Nav />
      <PageHeader
        section="Brandbook · Estratégia"
        number="6.0"
        title="O brandbook que vive sob a marca."
        emphasis="11 sections · profundo."
        subtitle="Propósito · arquétipo · posicionamento · BrandScript · truelines · vocabulário · 5 dimensões de tom · jornada · contrato bilateral · fundadores. Cada section é doutrina."
        tokens="11 sections"
      />

      {/* TOC visual */}
      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="flex items-end justify-between gap-4 mb-8 md:mb-12 flex-wrap">
            <div>
              <MetaLabel>[01] / Sumário visual</MetaLabel>
              <h2 className="mt-3 font-display font-light text-[clamp(3.25rem,5vw,4rem)] leading-[1] tracking-[-0.035em] text-balance">
                11 capítulos. <span className="font-medium italic">Doutrina completa.</span>
              </h2>
            </div>
            <MetaLabel>scroll · escaneável</MetaLabel>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border rounded-xl overflow-hidden">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#sec-${s.id}`}
                className="group/sec bg-background p-6 md:p-7 hover:bg-card transition-colors duration-base ease-smooth flex flex-col gap-4 min-h-[200px]"
              >
                <div className="flex items-center justify-between">
                  <MetaLabel>{s.id}</MetaLabel>
                  <span className="font-display text-xl opacity-50 group-hover/sec:opacity-100 transition-opacity">
                    {s.icon}
                  </span>
                </div>
                <h3 className="font-display font-medium text-lg md:text-xl tracking-tight">{s.t}</h3>
                <p className="font-sans text-sm opacity-65 leading-relaxed mt-auto">{s.d}</p>
                <span className="font-mono text-[10px] tracking-[0.22em] opacity-50 group-hover/sec:opacity-100 transition-opacity">
                  LER →
                </span>
              </a>
            ))}
          </div>
        </Container>
      </section>

      {/* Sections (preview de cada uma com placeholder de profundidade) */}
      <section className="border-b border-border bg-muted">
        <Container size="narrow" className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="space-y-6">
            {SECTIONS.map((s) => (
              <article
                key={s.id}
                id={`sec-${s.id}`}
                className="bg-background border border-border p-6 md:p-10 rounded-xl scroll-mt-24"
              >
                <div className="flex items-baseline gap-5 mb-5">
                  <span className="font-mono text-[11px] tracking-[0.25em] opacity-60">{s.id}</span>
                  <div className="flex-1 h-px bg-border" />
                  <span className="font-display text-xl opacity-50">{s.icon}</span>
                </div>
                <h3 className="font-display font-light text-[clamp(3.25rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.035em] max-w-[24ch]">
                  {s.t}
                </h3>
                <p className="mt-4 font-sans text-base md:text-lg opacity-80 leading-relaxed">{s.d}</p>
                <p className="mt-5 font-sans text-base md:text-lg opacity-65 leading-relaxed">
                  {s.body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA contrato */}
      <section className="border-b border-border bg-foreground text-background">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <CornerBrackets className="block border border-background/20 p-8 md:p-16 rounded-xl text-center">
            <MetaLabel>// CONTRATO DA MARCA</MetaLabel>
            <h2 className="mt-3 font-display font-light text-[clamp(3.25rem,6vw,5rem)] leading-[0.95] tracking-[-0.04em] max-w-[24ch] mx-auto">
              Promessas. Exigências. <span className="font-medium italic">Mútuas.</span>
            </h2>
            <p className="mt-5 font-sans text-base md:text-lg opacity-70 max-w-[65ch] mx-auto leading-relaxed">
              SINAPSE entrega operação executada · cliente entrega processos documentados, time aberto a mudança, e meta clara. Sem isso, não funciona.
            </p>
          </CornerBrackets>
        </Container>
      </section>

      <NextSectionAuto current="6.0" />
      <Footer />
    </main>
  );
}
