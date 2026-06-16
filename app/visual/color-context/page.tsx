import type { Metadata } from "next";
import { Container } from "@/components/brand/container";
import { Nav } from "@/components/brand/nav";
import { Footer } from "@/components/brand/footer";
import { NextSectionAuto } from "@/components/brand/next-section-auto";
import { PageHeader } from "@/components/brand/page-header";
import { MetaLabel } from "@/components/brand/meta";
import { CornerBrackets } from "@/components/brand/corner-brackets";

export const metadata: Metadata = {
  title: "Color in Context — SINAPSE Visual",
  description: "Cor aplicada em situações reais — backgrounds, hierarquia, estados.",
};

export default function ColorContext() {
  return (
    <main className="min-h-screen flex flex-col overflow-x-hidden">
      <Nav />
      <PageHeader
        section="Visual · Color in Context"
        number="V.1"
        title="B&W em situação."
        emphasis="Sem accent. Hierarquia pura."
        subtitle="Vanta vs Bone em uso real. Como hierarquia surge sem cor — opacity, weight, contrast, scale."
        tokens="2 ed · 6 contextos"
      />

      {/* Hierarchy via opacity */}
      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <SectionHeading n="01" l="Hierarquia via opacity" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
            <div className="bg-[#F5F5F0] text-[#0A0A0A] p-8 md:p-12 min-h-[320px] flex flex-col gap-4">
              <div className="font-mono text-[10px] tracking-[0.22em] opacity-50">// BONE</div>
              <h3 className="font-display font-light text-[clamp(1.75rem,4.5vw,3.25rem)] tracking-tight leading-[0.95] text-balance">Headline primária 100%</h3>
              <p className="font-sans text-base opacity-70">Subtitle 70% — segundo nível de leitura.</p>
              <p className="font-sans text-sm opacity-50">Body 50% — texto de apoio.</p>
              <p className="font-mono text-[11px] opacity-30 mt-auto">Caption 30% — meta info</p>
            </div>
            <div className="bg-[#0A0A0A] text-[#F5F5F0] p-8 md:p-12 min-h-[320px] flex flex-col gap-4">
              <div className="font-mono text-[10px] tracking-[0.22em] opacity-50">// VANTA</div>
              <h3 className="font-display font-light text-[clamp(1.75rem,4.5vw,3.25rem)] tracking-tight leading-[0.95] text-balance">Headline primária 100%</h3>
              <p className="font-sans text-base opacity-70">Subtitle 70% — segundo nível de leitura.</p>
              <p className="font-sans text-sm opacity-50">Body 50% — texto de apoio.</p>
              <p className="font-mono text-[11px] opacity-30 mt-auto">Caption 30% — meta info</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Cards em contexto */}
      <section className="border-b border-border bg-muted">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <SectionHeading n="02" l="Card stack — same theme" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { bg: "#F5F5F0", fg: "#0A0A0A", l: "Default" },
              { bg: "#FAFAF7", fg: "#0A0A0A", l: "Card elevated" },
              { bg: "#0A0A0A", fg: "#F5F5F0", l: "Inverted" },
            ].map((c) => (
              <div key={c.l} className="border border-border p-6 md:p-8 min-h-[240px] flex flex-col justify-between" style={{ background: c.bg, color: c.fg }}>
                <div>
                  <div className="font-mono text-[10px] tracking-[0.22em] opacity-60 uppercase">// {c.l}</div>
                  <h3 className="mt-3 font-display text-xl md:text-2xl tracking-tight">Card title</h3>
                  <p className="mt-2 font-sans text-sm opacity-65">Body do card. Quando usar cada variant.</p>
                </div>
                <code className="font-mono text-[10px] opacity-50">{c.bg}</code>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Estados de input */}
      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <SectionHeading n="03" l="Form contrast" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
            <div className="bg-[#F5F5F0] text-[#0A0A0A] p-8 md:p-12 flex flex-col gap-4">
              <div className="font-mono text-[10px] tracking-[0.22em] opacity-50">// FORM ON BONE</div>
              <input className="bg-white border border-black/10 px-4 py-3 rounded-lg text-sm" placeholder="Nome" />
              <input className="bg-white border border-black/10 px-4 py-3 rounded-lg text-sm" placeholder="Email" />
              <button className="bg-foreground text-background px-6 py-3 rounded-lg font-mono text-[11px] tracking-[0.22em]">ENVIAR →</button>
            </div>
            <div className="bg-[#0A0A0A] text-[#F5F5F0] p-8 md:p-12 flex flex-col gap-4">
              <div className="font-mono text-[10px] tracking-[0.22em] opacity-50">// FORM ON VANTA</div>
              <input className="bg-white/10 border border-white/20 px-4 py-3 rounded-lg text-sm placeholder:text-white/40 text-white" placeholder="Nome" />
              <input className="bg-white/10 border border-white/20 px-4 py-3 rounded-lg text-sm placeholder:text-white/40 text-white" placeholder="Email" />
              <button className="bg-white text-black px-6 py-3 rounded-lg font-mono text-[11px] tracking-[0.22em]">ENVIAR →</button>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA emphasis */}
      <section className="border-b border-border bg-muted">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <SectionHeading n="04" l="CTA emphasis" />
          <CornerBrackets className="bg-foreground text-background p-12 md:p-20 text-center">
            <div className="font-mono text-[10px] tracking-[0.25em] opacity-60">// INVERTED CTA</div>
            <h2 className="mt-4 font-display font-light text-[clamp(3.25rem,6vw,4.5rem)] leading-[0.95] tracking-[-0.04em] max-w-[20ch] mx-auto text-balance">
              Inverter a paleta <span className="font-medium italic">cria emphasis.</span>
            </h2>
          </CornerBrackets>
        </Container>
      </section>

      <NextSectionAuto current="V.1" />
      <Footer />
    </main>
  );
}

function SectionHeading({ n, l }: { n: string; l: string }) {
  return (
    <div className="mb-8 md:mb-10">
      <MetaLabel>[{n}] / {l}</MetaLabel>
    </div>
  );
}
