import type { Metadata } from "next";
import { Container } from "@/components/brand/container";
import { Nav } from "@/components/brand/nav";
import { Footer } from "@/components/brand/footer";
import { NextSectionAuto } from "@/components/brand/next-section-auto";
import { PageHeader } from "@/components/brand/page-header";
import { MetaLabel } from "@/components/brand/meta";
import { CornerBrackets } from "@/components/brand/corner-brackets";

export const metadata: Metadata = {
  title: "2.4 Surfaces — SINAPSE Brand",
  description: "Cards · elevations · borders · radii · backdrop-blur tokens.",
};

const ELEVATIONS = [
  { name: "Flat", classes: "bg-card", desc: "Mesma camada da página. Bordas hairline." },
  { name: "Outlined", classes: "bg-background border border-border", desc: "Borda explícita, sem fill." },
  { name: "Subtle", classes: "bg-muted", desc: "Fill sutil, levemente mais escuro." },
  { name: "Elevated", classes: "bg-card border border-border shadow-sm", desc: "Borda + sombra mínima." },
];

const RADII = [
  { name: "none", value: "0", className: "rounded-none" },
  { name: "sm", value: "2px", className: "rounded-sm" },
  { name: "DEFAULT", value: "4px", className: "rounded" },
  { name: "md", value: "6px", className: "rounded-md" },
  { name: "lg", value: "8px", className: "rounded-lg" },
  { name: "xl", value: "12px", className: "rounded-xl" },
  { name: "full", value: "9999px", className: "rounded-full" },
];

const BORDERS = [
  { name: "Hairline", className: "border border-border", desc: "1px @ rgba(0,0,0,0.1) — default" },
  { name: "Strong", className: "border border-foreground", desc: "1px @ foreground — emphasis" },
  { name: "Dashed", className: "border border-dashed border-border", desc: "Decorative" },
  { name: "Double", className: "border-2 border-double border-border", desc: "Editorial accent" },
];

export default function Surfaces() {
  return (
    <main className="min-h-screen flex flex-col overflow-x-hidden">
      <Nav />
      <PageHeader
        section="Foundations · Surfaces"
        number="2.4"
        title="Profundidade restrita."
        emphasis="Bordas precisas."
        subtitle="Em B&W radical, profundidade vem de borda + opacidade — não de sombras pesadas. Quatro elevations · sete radii · quatro borders. Tudo via tokens."
        tokens="15"
        next={{ label: "Motion Tokens", href: "/brandbook/2.5-motion-tokens" }}
      />

      {/* Elevations */}
      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="flex items-end justify-between gap-4 mb-8 md:mb-12 flex-wrap">
            <div>
              <MetaLabel>[01] / Elevations</MetaLabel>
              <h2 className="mt-3 font-display font-light text-[clamp(1.75rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.035em] max-w-[20ch]">
                Quatro camadas. <span className="font-medium">Zero sombra dramática.</span>
              </h2>
            </div>
            <MetaLabel>04 levels</MetaLabel>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {ELEVATIONS.map((e) => (
              <div key={e.name} className={`${e.classes} p-6 md:p-8 min-h-[200px] flex flex-col justify-between`}>
                <div>
                  <MetaLabel>{e.name}</MetaLabel>
                  <p className="mt-3 font-sans text-sm opacity-65 leading-relaxed">{e.desc}</p>
                </div>
                <code className="font-mono text-[10px] opacity-50 mt-6 break-all">{e.classes}</code>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Radii */}
      <section className="border-b border-border bg-muted">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="flex items-end justify-between gap-4 mb-8 md:mb-12 flex-wrap">
            <div>
              <MetaLabel>[02] / Radii</MetaLabel>
              <h2 className="mt-3 font-display font-light text-[clamp(1.75rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.035em] max-w-[20ch]">
                Sete raios. <span className="font-medium">Sharp first.</span>
              </h2>
            </div>
            <MetaLabel>0 → 12 → 9999</MetaLabel>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 md:gap-4">
            {RADII.map((r) => (
              <div key={r.name} className="bg-background border border-border p-3 md:p-4 flex flex-col items-center gap-3">
                <div className={`w-full aspect-square bg-foreground ${r.className}`} />
                <div className="text-center">
                  <div className="font-mono text-[10px] tracking-[0.18em] opacity-80">{r.name}</div>
                  <div className="font-mono text-[9px] opacity-50 mt-0.5">{r.value}</div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Borders */}
      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="flex items-end justify-between gap-4 mb-8 md:mb-12 flex-wrap">
            <div>
              <MetaLabel>[03] / Borders</MetaLabel>
              <h2 className="mt-3 font-display font-light text-[clamp(1.75rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.035em] max-w-[24ch]">
                Bordas como sintaxe. <span className="font-medium">Não como decoração.</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {BORDERS.map((b) => (
              <div key={b.name} className={`${b.className} p-6 md:p-8 min-h-[160px] flex flex-col justify-between`}>
                <div>
                  <MetaLabel>{b.name}</MetaLabel>
                  <p className="mt-3 font-sans text-sm opacity-65 leading-relaxed">{b.desc}</p>
                </div>
                <code className="font-mono text-[10px] opacity-50 mt-6 break-all">{b.className}</code>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Backdrop blur + glass */}
      <section className="relative border-b border-border pattern-grid overflow-hidden">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24 relative">
          <div className="flex items-end justify-between gap-4 mb-8 md:mb-12 flex-wrap">
            <div>
              <MetaLabel>[04] / Glass / Backdrop</MetaLabel>
              <h2 className="mt-3 font-display font-light text-[clamp(1.75rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.035em] max-w-[22ch]">
                Glass discreto. <span className="font-medium">Nunca jelly.</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <CornerBrackets className="bg-background/70 backdrop-blur-md border border-border p-8 min-h-[200px] flex flex-col justify-between">
              <MetaLabel>backdrop-blur-md</MetaLabel>
              <code className="font-mono text-[10px] opacity-60">bg-background/70 backdrop-blur-md</code>
            </CornerBrackets>
            <CornerBrackets className="bg-background/85 backdrop-blur-sm border border-border p-8 min-h-[200px] flex flex-col justify-between">
              <MetaLabel>backdrop-blur-sm</MetaLabel>
              <code className="font-mono text-[10px] opacity-60">bg-background/85 backdrop-blur-sm</code>
            </CornerBrackets>
            <CornerBrackets className="bg-background border border-border p-8 min-h-[200px] flex flex-col justify-between">
              <MetaLabel>opaque</MetaLabel>
              <code className="font-mono text-[10px] opacity-60">bg-background</code>
            </CornerBrackets>
          </div>
        </Container>
      </section>

      <NextSectionAuto current="2.4" />
      <Footer />
    </main>
  );
}
