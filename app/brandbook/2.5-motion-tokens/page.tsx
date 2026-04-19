import type { Metadata } from "next";
import { Container } from "@/components/brand/container";
import { Nav } from "@/components/brand/nav";
import { Footer } from "@/components/brand/footer";
import { NextSectionAuto } from "@/components/brand/next-section-auto";
import { PageHeader } from "@/components/brand/page-header";
import { MetaLabel } from "@/components/brand/meta";
import { EasingDemo, DurationDemo, KeyframeDemo } from "./motion-demos";

export const metadata: Metadata = {
  title: "2.5 Motion Tokens — SINAPSE Brand",
  description: "3 easings disciplinados · 5 durações · keyframes nomeados. Live demos.",
};

export default function MotionTokens() {
  return (
    <main className="min-h-screen flex flex-col overflow-x-hidden">
      <Nav />
      <PageHeader
        section="Foundations · Motion Tokens"
        number="2.5"
        title="O dicionário do movimento."
        emphasis="Disciplina nas curvas."
        subtitle="3 easings (smooth · back · swift) · 5 durações · keyframes nomeados consumíveis via Tailwind. Restrição é assinatura — não exceção."
        tokens="3 + 5 + 7"
        next={{ label: "Semantic", href: "/brandbook/2.6-semantic" }}
      />

      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="flex items-end justify-between gap-4 mb-8 md:mb-12 flex-wrap">
            <div>
              <MetaLabel>[01] / Easings · 3 curves</MetaLabel>
              <h2 className="mt-3 font-display font-light text-[clamp(1.5rem,4vw,3rem)] leading-[1.05] tracking-[-0.035em] max-w-[24ch]">
                Três curvas. <span className="font-medium italic">Nunca mais.</span>
              </h2>
            </div>
            <MetaLabel>auto-loop</MetaLabel>
          </div>
          <EasingDemo />
        </Container>
      </section>

      <section className="border-b border-border bg-muted">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="flex items-end justify-between gap-4 mb-8 md:mb-12 flex-wrap">
            <div>
              <MetaLabel>[02] / Durations · 5 steps</MetaLabel>
              <h2 className="mt-3 font-display font-light text-[clamp(1.5rem,4vw,3rem)] leading-[1.05] tracking-[-0.035em] max-w-[24ch]">
                150 → 800ms. <span className="font-medium">Cada uma com função.</span>
              </h2>
            </div>
          </div>
          <DurationDemo />
        </Container>
      </section>

      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="flex items-end justify-between gap-4 mb-8 md:mb-12 flex-wrap">
            <div>
              <MetaLabel>[03] / Keyframes · trigger live</MetaLabel>
              <h2 className="mt-3 font-display font-light text-[clamp(1.5rem,4vw,3rem)] leading-[1.05] tracking-[-0.035em] max-w-[24ch]">
                Animations nomeadas. <span className="font-medium">Click pra ver.</span>
              </h2>
            </div>
          </div>
          <KeyframeDemo />
        </Container>
      </section>

      <NextSectionAuto current="2.5" />
      <Footer />
    </main>
  );
}
