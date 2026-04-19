import type { Metadata } from "next";
import { Container } from "@/components/brand/container";
import { Nav } from "@/components/brand/nav";
import { Footer } from "@/components/brand/footer";
import { NextSectionAuto } from "@/components/brand/next-section-auto";
import { PageHeader } from "@/components/brand/page-header";
import { MetaLabel } from "@/components/brand/meta";

export const metadata: Metadata = {
  title: "Patterns — SINAPSE Visual",
  description: "Pattern library · grid · dots · crosshair · hazard · scanlines.",
};

const PATTERNS = [
  { name: "pattern-grid", className: "pattern-grid", desc: "Grid hairline 80px" },
  { name: "pattern-dots", className: "pattern-dots", desc: "Dot grid 24px" },
  { name: "pattern-crosshair", className: "pattern-crosshair", desc: "Crosshair 120px" },
  { name: "hazard-stripes", className: "hazard-stripes", desc: "Diagonal stripes 10px" },
  { name: "scanlines", className: "scanlines bg-foreground/10", desc: "CRT scanlines 1px" },
  { name: "grain-overlay", className: "grain-overlay bg-foreground/5", desc: "SVG noise animado" },
];

export default function Patterns() {
  return (
    <main className="min-h-screen flex flex-col overflow-x-hidden">
      <Nav />
      <PageHeader
        section="Visual · Patterns"
        number="V.P"
        title="Pattern library."
        emphasis="6 texturas SVG."
        subtitle="Grid · dots · crosshair · hazard stripes · scanlines · grain. Variants densas e esparsas. Aplicáveis como bg ou overlay."
        tokens="6 patterns"
      />

      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {PATTERNS.map((p) => (
              <div key={p.name} className="bg-background border border-border flex flex-col">
                <div className={`${p.className} aspect-square w-full relative`}>
                  <div className="absolute top-3 right-3 font-mono text-[10px] tracking-[0.22em] opacity-60 mix-blend-difference text-white">
                    PREVIEW
                  </div>
                </div>
                <div className="p-4 border-t border-border">
                  <code className="font-mono text-[11px] tracking-tight">.{p.name}</code>
                  <p className="mt-1 font-sans text-xs opacity-65">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-border bg-muted">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <MetaLabel>// USAGE</MetaLabel>
          <h2 className="mt-3 font-display font-light text-[clamp(1.75rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.035em] max-w-[36ch] mb-6">
            Como aplicar
          </h2>
          <pre className="bg-background border border-border p-6 font-mono text-[12px] leading-[1.7] overflow-x-auto rounded-lg">
{`{/* Como background de section */}
<section className="pattern-grid">...</section>

{/* Como overlay sobre card */}
<div className="relative">
  <div className="pattern-dots absolute inset-0 opacity-50" />
  <div className="relative z-10">...</div>
</div>

{/* Em theme dark, opacity sobe automaticamente via CSS */}`}
          </pre>
        </Container>
      </section>

      <NextSectionAuto current="V.P" />
      <Footer />
    </main>
  );
}
