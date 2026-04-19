import type { Metadata } from "next";
import { Container } from "@/components/brand/container";
import { Nav } from "@/components/brand/nav";
import { Footer } from "@/components/brand/footer";
import { NextSectionAuto } from "@/components/brand/next-section-auto";
import { PageHeader } from "@/components/brand/page-header";
import { MetaLabel } from "@/components/brand/meta";

export const metadata: Metadata = {
  title: "Layout & Grid — SINAPSE Visual",
  description: "12-col base grid · bento variations · auto-fit content grid.",
};

export default function LayoutGrid() {
  return (
    <main className="min-h-screen flex flex-col overflow-x-hidden">
      <Nav />
      <PageHeader
        section="Visual · Layout & Grid"
        number="V.3"
        title="O sistema de grade."
        emphasis="12 colunas · bento · auto-fit."
        subtitle="12-col padrão · bento dashboard · auto-fit minmax · single-column editorial · asymmetric."
        tokens="6 patterns"
      />

      {/* 12-col */}
      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <SectionHeading n="01" l="12-col grid" />
          <div className="bg-card border border-border p-4 md:p-6">
            <div className="grid grid-cols-12 gap-2">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="bg-foreground/15 h-20 flex items-center justify-center font-mono text-[10px] opacity-70">
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Bento 4-col */}
      <section className="border-b border-border bg-muted">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <SectionHeading n="02" l="Bento 4-col asimétrico" />
          <div className="grid grid-cols-4 grid-rows-3 gap-3 md:gap-4 min-h-[480px]">
            <div className="col-span-2 row-span-2 bg-foreground text-background p-6 flex flex-col justify-between">
              <MetaLabel>// FEATURED 2×2</MetaLabel>
              <div className="font-display text-2xl md:text-3xl tracking-tight">Big card</div>
            </div>
            <div className="col-span-2 row-span-1 bg-background border border-border p-6 flex items-center justify-between">
              <MetaLabel>// 2×1</MetaLabel>
              <span className="font-display text-lg">Wide</span>
            </div>
            <div className="col-span-1 row-span-1 bg-background border border-border p-4 flex items-center justify-center"><span className="font-mono text-[10px]">1×1</span></div>
            <div className="col-span-1 row-span-1 bg-background border border-border p-4 flex items-center justify-center"><span className="font-mono text-[10px]">1×1</span></div>
            <div className="col-span-4 row-span-1 bg-background border border-border p-6 flex items-center justify-center">
              <span className="font-display text-lg">Full-width row 4×1</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Auto-fit */}
      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <SectionHeading n="03" l="Auto-fit minmax(280px, 1fr)" />
          <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-background border border-border p-5 min-h-[140px]">
                <MetaLabel>card {i + 1}</MetaLabel>
                <p className="mt-2 font-sans text-sm opacity-65">Auto-fit reflow</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Editorial 1-col */}
      <section className="border-b border-border bg-card">
        <Container size="narrow" className="py-12 sm:py-16 md:py-20 lg:py-24">
          <SectionHeading n="04" l="Editorial single-column (max 1024px)" />
          <article className="bg-background border border-border p-6 md:p-12 space-y-5 font-sans leading-relaxed opacity-80">
            <p>Editorial pages usam single-column max 1024px (size=&quot;narrow&quot;). Conforto de leitura prioritário, tipografia respirada, line-height 1.7+.</p>
            <p>Esse padrão é usado em manifestos, blog posts longos, MDX content, artigos editoriais.</p>
          </article>
        </Container>
      </section>

      {/* Asymmetric 1+2 */}
      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <SectionHeading n="05" l="Asymmetric sticky 1fr+2fr" />
          <div className="grid md:grid-cols-[1fr,2fr] gap-8 md:gap-16">
            <div className="md:sticky md:top-24 md:self-start">
              <MetaLabel>// LEFT STICKY</MetaLabel>
              <h3 className="mt-3 font-display font-light text-3xl md:text-4xl tracking-tight">Title fica grudado.</h3>
            </div>
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="bg-background border border-border p-6">
                  <MetaLabel>row {i + 1}</MetaLabel>
                  <p className="mt-2 font-sans text-sm opacity-70">Conteúdo flui enquanto title sticky observa.</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <NextSectionAuto current="V.3" />
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
