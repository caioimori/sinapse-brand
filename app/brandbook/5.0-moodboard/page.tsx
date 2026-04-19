import type { Metadata } from "next";
import { Container } from "@/components/brand/container";
import { Nav } from "@/components/brand/nav";
import { Footer } from "@/components/brand/footer";
import { NextSectionAuto } from "@/components/brand/next-section-auto";
import { PageHeader } from "@/components/brand/page-header";
import { MetaLabel } from "@/components/brand/meta";
import { CornerBrackets } from "@/components/brand/corner-brackets";

export const metadata: Metadata = {
  title: "5.0 Moodboard — SINAPSE Brand",
  description: "O ar que a marca respira — texture wall · cinematic stills · referências B&W.",
};

const MOODS = [
  { tag: "BRUTALISMO", label: "Concrete monolítico", className: "pattern-grid bg-foreground/5" },
  { tag: "TIPOGRAFIA", label: "Sora display × scale", className: "bg-foreground text-background" },
  { tag: "INDUSTRIAL", label: "Texture metal raw", className: "scanlines bg-card" },
  { tag: "MINIMAL", label: "Off-white silence", className: "bg-card" },
  { tag: "CINEMA", label: "Noir contrast", className: "bg-foreground" },
  { tag: "SYMBOL", label: "Geometric reduction", className: "pattern-crosshair" },
  { tag: "GRID", label: "Modular system", className: "pattern-dots bg-foreground/5" },
  { tag: "MOTION", label: "Lenis flow", className: "bg-muted" },
  { tag: "GRAIN", label: "SVG noise overlay", className: "grain-overlay bg-foreground/8" },
];

const VIBES = [
  { name: "Rick Rubin", role: "Persona-mentor", desc: "Reduzir ao essencial. Silêncio que comunica." },
  { name: "Massimo Vignelli", role: "Doutrina visual", desc: "Sistema, restrição, eternidade." },
  { name: "Dieter Rams", role: "Princípios produto", desc: "Menos, mas melhor." },
  { name: "Kanye / DONDA", role: "Aesthetic radical", desc: "B&W absoluto. Tipografia gigante." },
];

export default function Moodboard() {
  return (
    <main className="min-h-screen flex flex-col overflow-x-hidden">
      <Nav />
      <PageHeader
        section="Brandbook · Moodboard"
        number="5.0"
        title="O ar que a marca respira."
        emphasis="Texture wall · vibe references."
        subtitle="Brutalismo · cinema noir · tipografia editorial · industrial. Tudo B&W. Zero stock photo, zero gradient saturado."
        tokens="9 moods · 4 references"
      />

      {/* 9-mood texture wall */}
      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="flex items-end justify-between gap-4 mb-8 md:mb-12 flex-wrap">
            <div>
              <MetaLabel>[01] / Texture wall</MetaLabel>
              <h2 className="mt-3 font-display font-light text-[clamp(1.75rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.035em] max-w-[28ch]">
                9 moods. <span className="font-medium italic">Mesma palette.</span>
              </h2>
            </div>
            <MetaLabel>3×3 grid</MetaLabel>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
            {MOODS.map((m) => (
              <div key={m.tag} className={`${m.className} relative aspect-square overflow-hidden border border-border rounded-lg`}>
                <div className="absolute top-3 left-3 font-mono text-[10px] tracking-[0.22em] opacity-60 mix-blend-difference text-white">
                  // {m.tag}
                </div>
                <div className="absolute bottom-3 right-3 font-mono text-[10px] tracking-[0.18em] opacity-60 mix-blend-difference text-white text-right">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Vibe references */}
      <section className="border-b border-border bg-muted">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="flex items-end justify-between gap-4 mb-8 md:mb-12 flex-wrap">
            <div>
              <MetaLabel>[02] / Vibe references</MetaLabel>
              <h2 className="mt-3 font-display font-light text-[clamp(1.75rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.035em] max-w-[28ch]">
                De onde vem o tom.
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {VIBES.map((v) => (
              <CornerBrackets key={v.name} className="bg-background border border-border p-6 md:p-7 min-h-[200px] flex flex-col gap-4">
                <MetaLabel>{v.role}</MetaLabel>
                <h3 className="font-display font-medium text-xl md:text-2xl tracking-tight">{v.name}</h3>
                <p className="font-sans text-sm opacity-65 mt-auto leading-relaxed">{v.desc}</p>
              </CornerBrackets>
            ))}
          </div>
        </Container>
      </section>

      {/* Cinematic still */}
      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <MetaLabel>[03] / Cinematic still placeholder</MetaLabel>
          <div className="mt-8 bg-foreground text-background aspect-[21/9] flex items-center justify-center relative overflow-hidden rounded-lg">
            <div className="absolute inset-0 pattern-grid opacity-20" />
            <div className="absolute inset-0 grain-overlay" />
            <div className="relative text-center px-6">
              <div className="font-mono text-[10px] tracking-[0.3em] opacity-60 mb-4">// FRAME 01 · 21:9</div>
              <h3 className="font-display font-light text-[clamp(2rem,7vw,6rem)] leading-[0.95] tracking-[-0.045em] max-w-[14ch] mx-auto">
                Construído em <span className="italic font-medium">silêncio.</span>
              </h3>
            </div>
          </div>
        </Container>
      </section>

      <NextSectionAuto current="5.0" />
      <Footer />
    </main>
  );
}
