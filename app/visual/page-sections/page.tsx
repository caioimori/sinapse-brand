import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/brand/container";
import { Nav } from "@/components/brand/nav";
import { Footer } from "@/components/brand/footer";
import { NextSectionAuto } from "@/components/brand/next-section-auto";
import { PageHeader } from "@/components/brand/page-header";
import { MetaLabel } from "@/components/brand/meta";
import { CornerBrackets } from "@/components/brand/corner-brackets";

export const metadata: Metadata = {
  title: "Page Sections — SINAPSE Visual",
  description: "Hero · Features · Stats · Testimonials · Pricing · CTA — sections em uso real.",
};

export default function PageSections() {
  return (
    <main className="min-h-screen flex flex-col overflow-x-hidden">
      <Nav />
      <PageHeader
        section="Visual · Page Sections"
        number="V.0"
        title="Sections em produção."
        emphasis="Compostas com tokens."
        subtitle="Hero · Features · Stats · Testimonials · Pricing · FAQ · CTA. Cada section pronta para copy/paste."
        tokens="7 sections"
      />

      {/* Hero */}
      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <SectionHeading num="01" label="Hero" />
          <CornerBrackets className="block bg-card border border-border p-8 md:p-16 lg:p-20 min-h-[420px] flex flex-col justify-center">
            <div className="font-mono text-[10px] tracking-[0.25em] opacity-50 mb-4">// HERO</div>
            <h1 className="font-display font-light text-[clamp(2rem,8vw,6rem)] leading-[0.95] tracking-[-0.045em] max-w-[18ch]">
              Escale sem aumentar <span className="font-medium italic">a folha.</span>
            </h1>
            <p className="mt-6 max-w-xl font-sans text-base md:text-lg opacity-65 leading-relaxed">
              SINAPSE substitui processos repetitivos por agentes IA que executam 24/7. Sem contratar mais gente.
            </p>
            <div className="mt-8 flex items-center gap-4 flex-wrap">
              <button className="btn-magnetic font-mono text-[11px] tracking-[0.25em] px-6 py-4 bg-foreground text-background border border-foreground">
                AGENDAR DEMO →
              </button>
              <Link href="/brandbook/16.0-showcase" className="link-cs font-mono text-[11px] tracking-[0.25em] opacity-65 hover:opacity-100">
                VER CASES
              </Link>
            </div>
          </CornerBrackets>
        </Container>
      </section>

      {/* Stats */}
      <section className="border-b border-border bg-muted">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <SectionHeading num="02" label="Stats grid" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
            {[
              { v: "+300%", l: "Eficiência operacional" },
              { v: "24/7", l: "Agentes ativos" },
              { v: "−65%", l: "Tempo manual" },
              { v: "30d", l: "Onboarding" },
            ].map((s) => (
              <div key={s.l} className="bg-background p-6 md:p-8 flex flex-col gap-3">
                <div className="font-display font-light text-[clamp(2rem,5vw,4rem)] leading-none tracking-[-0.04em]">
                  {s.v}
                </div>
                <div className="font-mono text-[10px] tracking-[0.22em] opacity-60 uppercase">{s.l}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Features 3-col */}
      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <SectionHeading num="03" label="Features grid" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {[
              { t: "Agentes especializados", d: "Squads pré-configurados pra vendas, marketing, suporte e operações." },
              { t: "Integração nativa", d: "WhatsApp, CRM, e-mail, Google Workspace, Notion. Plug & play." },
              { t: "Aprende com seu time", d: "Cada interação melhora a performance. Sem prompt engineering." },
            ].map((f, i) => (
              <article key={f.t} className="bg-background border border-border p-6 md:p-8 flex flex-col gap-4 min-h-[240px]">
                <div className="font-mono text-[10px] tracking-[0.22em] opacity-50">// 0{i + 1}</div>
                <h3 className="font-display text-xl md:text-2xl tracking-tight">{f.t}</h3>
                <p className="font-sans text-sm opacity-65 leading-relaxed mt-auto">{f.d}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Testimonial pull */}
      <section className="border-b border-border bg-foreground text-background">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="font-mono text-[10px] tracking-[0.25em] opacity-60 mb-6">// TESTIMONIAL</div>
          <blockquote className="font-display font-light text-[clamp(1.75rem,4.5vw,3.5rem)] leading-[1.15] tracking-[-0.025em] max-w-4xl">
            &ldquo;Reduzi 4 vagas operacionais. Os agentes da SINAPSE fazem tudo que essas pessoas faziam — e ainda escalam à noite.&rdquo;
          </blockquote>
          <div className="mt-8 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-background/15" />
            <div>
              <div className="font-display text-base">Carlos M.</div>
              <div className="font-mono text-[10px] tracking-[0.22em] opacity-60 uppercase">CEO · Empresa X</div>
            </div>
          </div>
        </Container>
      </section>

      {/* Pricing */}
      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <SectionHeading num="04" label="Pricing tiers" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {[
              { name: "Starter", price: "R$ 1.5k", desc: "1 agente · operação simples" },
              { name: "Pro", price: "R$ 5k", desc: "Squad de 3 agentes · integração CRM", featured: true },
              { name: "Enterprise", price: "Sob consulta", desc: "Squad ilimitado · custom agents" },
            ].map((p) => (
              <div key={p.name} className={`p-6 md:p-8 border min-h-[280px] flex flex-col gap-5 ${p.featured ? "bg-foreground text-background border-foreground" : "bg-background border-border"}`}>
                <div className="flex items-start justify-between">
                  <MetaLabel>{p.name}</MetaLabel>
                  {p.featured && <span className="font-mono text-[10px] tracking-[0.22em] uppercase">⌕ POPULAR</span>}
                </div>
                <div className="font-display font-light text-[clamp(2rem,4vw,3rem)] leading-none tracking-[-0.035em]">{p.price}</div>
                <p className="font-sans text-sm opacity-65 leading-relaxed">{p.desc}</p>
                <button className={`mt-auto btn-magnetic font-mono text-[11px] tracking-[0.25em] px-6 py-3.5 border ${p.featured ? "border-background" : "border-foreground"}`}>
                  COMEÇAR →
                </button>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA final */}
      <section className="border-b border-border bg-card">
        <Container className="py-16 md:py-24">
          <CornerBrackets className="bg-background border border-border p-10 md:p-16 text-center">
            <div className="font-mono text-[10px] tracking-[0.25em] opacity-50 mb-4">// CTA FINAL</div>
            <h2 className="font-display font-light text-[clamp(2rem,6vw,5rem)] leading-[0.95] tracking-[-0.04em] max-w-[18ch] mx-auto">
              Pronto pra <span className="font-medium italic">escalar?</span>
            </h2>
            <button className="mt-8 btn-magnetic font-mono text-[11px] tracking-[0.25em] px-8 py-4 bg-foreground text-background">
              FALAR COM ESPECIALISTA →
            </button>
          </CornerBrackets>
        </Container>
      </section>

      <NextSectionAuto current="V.0" />
      <Footer />
    </main>
  );
}

function SectionHeading({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex items-end justify-between gap-4 mb-8 md:mb-10 flex-wrap">
      <div>
        <MetaLabel>[{num}] / {label}</MetaLabel>
      </div>
    </div>
  );
}
