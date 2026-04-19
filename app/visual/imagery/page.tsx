import type { Metadata } from "next";
import { Container } from "@/components/brand/container";
import { Nav } from "@/components/brand/nav";
import { Footer } from "@/components/brand/footer";
import { NextSectionAuto } from "@/components/brand/next-section-auto";
import { PageHeader } from "@/components/brand/page-header";
import { MetaLabel } from "@/components/brand/meta";

export const metadata: Metadata = {
  title: "Imagery — SINAPSE Visual",
  description: "Direção fotográfica · texturas · do/don't visual.",
};

const DOS = [
  { l: "B&W radical", d: "Contraste alto, zero accent cromático" },
  { l: "Arquitetura brutalista", d: "Geometria limpa, escala monumental" },
  { l: "Industrial · texturas", d: "Concreto, metal, papel — naturalmente B&W" },
  { l: "Editorial documental", d: "Fotografia tipo monograph, sem retoque excessivo" },
];

const DONTS = [
  { l: "Stock photos coloridas", d: "Banco de imagens com pessoas felizes em frente a laptops" },
  { l: "Gradients chamativos", d: "Quaisquer transições de cor saturadas" },
  { l: "Emojis em mídia", d: "Glyphs decorativos, sim — emojis coloridos, nunca" },
  { l: "Filtros de Instagram", d: "Look Vintage/Noir já é overdone — fotografia direta" },
];

export default function Imagery() {
  return (
    <main className="min-h-screen flex flex-col overflow-x-hidden">
      <Nav />
      <PageHeader
        section="Visual · Imagery"
        number="V.4"
        title="Direção fotográfica."
        emphasis="B&W. Industrial. Direto."
        subtitle="Toda imagem na SINAPSE é B&W de alto contraste. Arquitetura, objetos, textura. Zero stock photo, zero gradient saturado."
        tokens="4 do · 4 don't"
      />

      {/* Texture wall preview */}
      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <SectionHeading n="01" l="Texture wall · references" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
            {[
              "pattern-grid",
              "pattern-dots",
              "pattern-crosshair",
              "scanlines",
              "hazard-stripes",
              "pattern-grid",
              "pattern-dots",
              "pattern-crosshair",
            ].map((c, i) => (
              <div key={i} className={`${c} aspect-square bg-foreground/10 relative overflow-hidden border border-border`}>
                <div className="absolute bottom-2 left-2 font-mono text-[10px] tracking-[0.18em] opacity-60 mix-blend-difference text-white">
                  REF.{String(i + 1).padStart(2, "0")}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Do / Don't */}
      <section className="border-b border-border bg-muted">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <SectionHeading n="02" l="Do / Don't" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
            {/* DO column */}
            <div className="bg-background p-6 md:p-8 flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-foreground text-background flex items-center justify-center font-mono text-[12px]">✓</span>
                <MetaLabel>// DO</MetaLabel>
              </div>
              <ul className="space-y-3">
                {DOS.map((d) => (
                  <li key={d.l} className="border-t border-border pt-3 first:border-t-0 first:pt-0">
                    <div className="font-display text-base md:text-lg tracking-tight">{d.l}</div>
                    <p className="font-sans text-sm opacity-65 mt-1">{d.d}</p>
                  </li>
                ))}
              </ul>
            </div>
            {/* DON'T column */}
            <div className="bg-background p-6 md:p-8 flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full border border-foreground flex items-center justify-center font-mono text-[12px]">✕</span>
                <MetaLabel>// DON&apos;T</MetaLabel>
              </div>
              <ul className="space-y-3">
                {DONTS.map((d) => (
                  <li key={d.l} className="border-t border-border pt-3 first:border-t-0 first:pt-0">
                    <div className="font-display text-base md:text-lg tracking-tight opacity-50 line-through">{d.l}</div>
                    <p className="font-sans text-sm opacity-50 mt-1">{d.d}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Filter recipe */}
      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <SectionHeading n="03" l="Filter recipe · CSS" />
          <pre className="bg-card border border-border p-6 font-mono text-[12px] leading-[1.7] overflow-x-auto rounded-lg">
{`/* Aplicar a fotografia colorida no brand */
img.brand {
  filter: grayscale(100%) contrast(1.1) brightness(0.95);
  transition: filter 0.6s var(--ease-smooth);
}
img.brand:hover { filter: grayscale(100%) contrast(1.2); }`}
          </pre>
        </Container>
      </section>

      <NextSectionAuto current="V.4" />
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
