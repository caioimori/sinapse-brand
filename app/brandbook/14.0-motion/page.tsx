import type { Metadata } from "next";
import { Container } from "@/components/brand/container";
import { Nav } from "@/components/brand/nav";
import { Footer } from "@/components/brand/footer";
import { NextSectionAuto } from "@/components/brand/next-section-auto";
import { PageHeader } from "@/components/brand/page-header";
import { MetaLabel } from "@/components/brand/meta";
import { CornerBrackets } from "@/components/brand/corner-brackets";
import { MotionVocab } from "./motion-vocab";

export const metadata: Metadata = {
  title: "14.0 Motion — SINAPSE Brand",
  description: "Vocabulário de movimento nomeado. Animations canônicas com preview ao vivo.",
};

export default function Motion() {
  return (
    <main className="min-h-screen flex flex-col overflow-x-hidden">
      <Nav />
      <PageHeader
        section="Design System · Motion"
        number="14.0"
        title="O vocabulário do movimento."
        emphasis="Cada animation tem nome."
        subtitle="6 animations nomeadas, com duração e contexto. Brand Reveal · Stagger Letters · Magnetic Pull · Draw Line · Ring Pulse · Fade Up Stagger. Click ↻ pra replay."
        tokens="6 named"
        next={{ label: "Templates", href: "/brandbook/15.0-templates" }}
      />

      {/* Vocab grid */}
      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="flex items-end justify-between gap-4 mb-8 md:mb-12 flex-wrap">
            <div>
              <MetaLabel>[01] / Animation vocabulary</MetaLabel>
              <h2 className="mt-3 font-display font-light text-[clamp(1.75rem,4.5vw,3.25rem)] leading-[1.05] tracking-[-0.035em] max-w-[24ch]">
                Live preview. <span className="font-medium italic">Cada uma com função.</span>
              </h2>
            </div>
            <MetaLabel>auto-play + replay</MetaLabel>
          </div>
          <MotionVocab />
        </Container>
      </section>

      {/* Reduced motion */}
      <section className="border-b border-border bg-muted">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <CornerBrackets className="block bg-background border border-border p-8 md:p-12">
            <div className="grid md:grid-cols-[2fr,1fr] gap-8 items-end">
              <div>
                <MetaLabel>[02] / Reduced motion</MetaLabel>
                <h2 className="mt-3 font-display font-light text-[clamp(1.75rem,4.5vw,3.25rem)] leading-[1.05] tracking-[-0.035em] max-w-[24ch]">
                  Acessibilidade primeiro. <span className="font-medium italic">Sempre.</span>
                </h2>
                <p className="mt-5 font-sans text-base opacity-65 max-w-xl leading-relaxed">
                  Toda animation respeita <code className="font-mono text-sm bg-muted px-1.5 py-0.5">prefers-reduced-motion: reduce</code>.
                  Em devices configurados pra menos motion, animations são reduzidas a 0.01ms = instantâneas.
                </p>
              </div>
              <div className="bg-card border border-border p-6 md:p-8 font-mono text-[12px] leading-[1.7]">
                <div className="opacity-50 mb-2">// CSS layer:base</div>
                @media (prefers-reduced-motion: reduce) {"{"}
                <br />
                &nbsp;&nbsp;*, *::before, *::after {"{"}
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;animation-duration: 0.01ms !important;
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;transition-duration: 0.01ms !important;
                <br />
                &nbsp;&nbsp;{"}"}
                <br />
                {"}"}
              </div>
            </div>
          </CornerBrackets>
        </Container>
      </section>

      <NextSectionAuto current="14.0" />
      <Footer />
    </main>
  );
}
