import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/brand/container";
import { MetaLabel } from "@/components/brand/meta";
import { Nav } from "@/components/brand/nav";
import { Footer } from "@/components/brand/footer";
import { NextSectionAuto } from "@/components/brand/next-section-auto";
import { PageHeader } from "@/components/brand/page-header";

export const metadata: Metadata = {
  title: "Foundations — SINAPSE Brand",
  description: "Design tokens que governam tudo que é SINAPSE: tipografia, cor, espaçamento, superfícies, motion e aliases semânticos.",
};

const FOUNDATIONS = [
  {
    n: "01",
    title: "Typography",
    sub: "SORA · INTER · JETBRAINS MONO",
    desc: "Display, sans e mono. Escala modular, pesos controlados, letter-spacing trabalhado.",
    href: "/brandbook/2.1-typography",
    sample: "Sora",
    sampleClass: "font-display font-light text-6xl md:text-8xl tracking-[-0.04em]",
  },
  {
    n: "02",
    title: "Color",
    sub: "13 STEPS GRAY · 2 FUNCIONAIS",
    desc: "B&W radical. Zero accent cromático. Cores funcionais isoladas de error/success, fora do brand.",
    href: "/brandbook/2.2-color",
    sample: "⬛",
    sampleClass: "text-6xl md:text-8xl",
  },
  {
    n: "03",
    title: "Spacing",
    sub: "14 STEPS NUMERIC + 5 NAMED",
    desc: "Escala de 0 a 180px. Categorias de uso por intenção (micro · components · section · editorial).",
    href: "/brandbook/2.3-spacing",
    sample: "·  ·  ·",
    sampleClass: "font-mono text-4xl md:text-6xl tracking-[0.5em]",
  },
  {
    n: "04",
    title: "Surfaces",
    sub: "ELEVATION · RADIUS · BORDERS",
    desc: "Profundidade via semantic tokens. Bordas sutis. Raios restritos. Glass effects discretos.",
    href: "/brandbook/2.4-surfaces",
    sample: "□",
    sampleClass: "text-6xl md:text-8xl opacity-80",
  },
  {
    n: "05",
    title: "Motion",
    sub: "EASINGS · DURATIONS · PATTERNS",
    desc: "Três easings canônicos. Quatro durações. Vocabulário nomeado de padrões (reveal · marquee · magnet).",
    href: "/brandbook/2.5-motion-tokens",
    sample: "→",
    sampleClass: "font-display font-light text-6xl md:text-8xl",
  },
  {
    n: "06",
    title: "Semantic",
    sub: "ALIASES · SHADCN MAPPING",
    desc: "Camada de intenção (bg.surface, text.primary) mapeada pro shadcn/ui. Componentes consomem daqui.",
    href: "/brandbook/2.6-semantic",
    sample: "{ }",
    sampleClass: "font-mono text-5xl md:text-7xl",
  },
];

export default function Foundations() {
  return (
    <main className="min-h-screen flex flex-col overflow-x-hidden">
      <Nav />
      <PageHeader
        section="Foundations"
        number="2.0"
        title="Os primitivos do sistema."
        subtitle="Seis camadas de tokens governam tudo que é SINAPSE: tipografia, cor, espaçamento, superfícies, motion e aliases semânticos. Toda decisão visual sai daqui."
        tokens="60+"
        next={{ label: "Typography", href: "/brandbook/2.1-typography" }}
      />

      <section className="border-b border-border pattern-dots">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="flex items-end justify-between gap-4 mb-10 md:mb-14 flex-wrap">
            <div>
              <MetaLabel>[01] / Explore</MetaLabel>
              <h2 className="mt-4 font-display font-light text-[clamp(1.75rem,4.5vw,3.5rem)] leading-[1] tracking-[-0.035em]">
                Seis camadas. <span className="font-medium">Um sistema.</span>
              </h2>
            </div>
            <MetaLabel>06 Foundations</MetaLabel>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {FOUNDATIONS.map((f) => (
              <Link
                key={f.n}
                href={f.href}
                className="bg-background p-8 md:p-10 hover:bg-card transition-colors group relative flex flex-col gap-6 min-h-[360px]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[10px] tracking-[0.3em] opacity-40">{f.n}</span>
                    <span className="h-px w-10 bg-border group-hover:bg-foreground transition-colors" />
                  </div>
                  <span className="font-mono text-[10px] tracking-[0.3em] opacity-40 group-hover:opacity-100 transition-opacity">→</span>
                </div>

                <div className="flex-1 flex items-center justify-center py-6">
                  <span className={f.sampleClass}>{f.sample}</span>
                </div>

                <div>
                  <div className="font-display font-medium text-2xl md:text-3xl tracking-tight leading-none">{f.title}</div>
                  <div className="mt-2 font-mono text-[10px] tracking-[0.25em] opacity-50 uppercase">{f.sub}</div>
                  <p className="mt-4 font-sans text-sm opacity-60 leading-relaxed">{f.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="grid md:grid-cols-[1fr,2fr] gap-10 md:gap-16">
            <div className="md:sticky md:top-24 md:self-start">
              <MetaLabel>[02] / Export</MetaLabel>
              <h2 className="mt-4 font-display font-light text-[clamp(1.75rem,4vw,3rem)] leading-[1] tracking-[-0.035em]">
                Copie. Cole.<br />
                <span className="font-medium italic">Use.</span>
              </h2>
            </div>
            <div className="flex flex-col gap-6">
              <p className="font-sans text-base md:text-lg opacity-65 leading-relaxed max-w-2xl">
                Todos os tokens estão disponíveis em CSS vars prontas pra colar em qualquer projeto Next.js, React ou Tailwind + shadcn/ui. Zero configuração.
              </p>
              <Link
                href="/brandbook/token-export"
                className="btn-magnetic group/cta inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.25em] px-6 py-4 border border-foreground self-start"
              >
                ABRIR TOKEN EXPORT
                <span className="inline-block transition-transform duration-base ease-smooth group-hover/cta:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <NextSectionAuto current="2.0" />
      <Footer />
    </main>
  );
}
