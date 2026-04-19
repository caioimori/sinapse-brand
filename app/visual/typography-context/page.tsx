import type { Metadata } from "next";
import { Container } from "@/components/brand/container";
import { Nav } from "@/components/brand/nav";
import { Footer } from "@/components/brand/footer";
import { NextSectionAuto } from "@/components/brand/next-section-auto";
import { PageHeader } from "@/components/brand/page-header";
import { MetaLabel } from "@/components/brand/meta";
import { CornerBrackets } from "@/components/brand/corner-brackets";

export const metadata: Metadata = {
  title: "Typography in Context — SINAPSE Visual",
  description: "Tipografia em uso editorial — hero · long-form · captions · UI.",
};

export default function TypographyContext() {
  return (
    <main className="min-h-screen flex flex-col overflow-x-hidden">
      <Nav />
      <PageHeader
        section="Visual · Typography Context"
        number="V.2"
        title="Tipografia em uso."
        emphasis="Cada par com função."
        subtitle="Sora display em hero gigante · Inter sans em long-form · JetBrains Mono em meta. Demos editoriais reais."
        tokens="3 fontes · 5 contextos"
      />

      {/* Hero scale */}
      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <SectionHeading n="01" l="Hero scale (Sora display)" />
          <CornerBrackets className="bg-card border border-border p-8 md:p-16 lg:p-20">
            <h1 className="font-display font-light text-[clamp(2.5rem,10vw,8rem)] leading-[0.9] tracking-[-0.05em]">
              Construído <span className="font-medium italic">em silêncio.</span>
            </h1>
          </CornerBrackets>
        </Container>
      </section>

      {/* Long form */}
      <section className="border-b border-border bg-muted">
        <Container size="narrow" className="py-12 sm:py-16 md:py-20 lg:py-24">
          <SectionHeading n="02" l="Long-form reading (Inter sans)" />
          <article className="bg-background border border-border p-8 md:p-12 lg:p-16">
            <h2 className="font-display font-light text-3xl md:text-4xl leading-tight tracking-tight max-w-[26ch]">
              O sistema é o herói. <span className="italic font-medium">A pessoa só consome.</span>
            </h2>
            <div className="mt-8 space-y-5 font-sans text-base md:text-lg leading-relaxed opacity-80 max-w-2xl">
              <p>SINAPSE não substitui pessoas. Substitui processos. A diferença é tudo.</p>
              <p>Quando você automatiza um processo, libera o time pra estratégia. Quando substitui pessoas, perde contexto, cultura e o vínculo que sustenta a operação.</p>
              <p>Por isso construímos squads de agentes que <strong className="font-semibold">amplificam</strong>, não que substituem. Cada agente faz uma camada de operação repetitiva, e o time humano fica livre pra decidir.</p>
              <p className="border-l-2 border-foreground pl-5 italic">&ldquo;A IA não é o herói. O sistema é.&rdquo;</p>
            </div>
          </article>
        </Container>
      </section>

      {/* Pull quote massive */}
      <section className="border-b border-border bg-foreground text-background">
        <Container className="py-16 md:py-28">
          <SectionHeading n="03" l="Pull quote massivo" inverted />
          <blockquote className="font-display font-light text-[clamp(2rem,6vw,5rem)] leading-[1.05] tracking-[-0.035em] max-w-5xl">
            <span className="opacity-50">&ldquo;</span>Restrição não é limite — é assinatura.<span className="opacity-50">&rdquo;</span>
          </blockquote>
          <cite className="block mt-8 font-mono text-[10px] tracking-[0.25em] opacity-60 uppercase not-italic">— Doutrina SINAPSE</cite>
        </Container>
      </section>

      {/* UI labels */}
      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <SectionHeading n="04" l="UI labels (JetBrains Mono)" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { eye: "//FOUNDATIONS", body: "60+ tokens" },
              { eye: "//MOTION", body: "3 easings · 5 durations" },
              { eye: "//SHADERS", body: "5 wallpapers WebGL2" },
              { eye: "//COMPONENTS", body: "Buttons · Cards · Forms" },
            ].map((u) => (
              <div key={u.eye} className="bg-background border border-border p-5">
                <div className="font-mono text-[11px] tracking-[0.22em] opacity-60">{u.eye}</div>
                <div className="mt-2 font-display text-base">{u.body}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Caption micro */}
      <section className="border-b border-border bg-card">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <SectionHeading n="05" l="Caption · meta micro" />
          <div className="space-y-4">
            <div>
              <p className="font-display text-2xl">Imagem editorial brand</p>
              <p className="mt-2 font-mono text-[10px] tracking-[0.22em] opacity-50 uppercase">caption · 04.19.2026 · ph. caio imori</p>
            </div>
            <div className="border-t border-border pt-4">
              <p className="font-display text-2xl">Diagrama ecosistema</p>
              <p className="mt-2 font-mono text-[10px] tracking-[0.22em] opacity-50 uppercase">fig 02 · sinapse stack overview · v0.3</p>
            </div>
          </div>
        </Container>
      </section>

      <NextSectionAuto current="V.2" />
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
