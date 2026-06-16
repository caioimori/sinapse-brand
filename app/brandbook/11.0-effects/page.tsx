import type { Metadata } from "next";
import { Container } from "@/components/brand/container";
import { Nav } from "@/components/brand/nav";
import { Footer } from "@/components/brand/footer";
import { NextSectionAuto } from "@/components/brand/next-section-auto";
import { PageHeader } from "@/components/brand/page-header";
import { MetaLabel } from "@/components/brand/meta";
import { CornerBrackets } from "@/components/brand/corner-brackets";
import { MagneticDemo, HighlightDemo, AccordionDemo, TiltDemo } from "./effect-cards";
import { ShaderCanvas } from "@/components/brand/shader-canvas";
import { SHADERS } from "@/components/brand/shaders";

export const metadata: Metadata = {
  title: "11.0 Effects — SINAPSE Brand",
  description: "Library completa de utilities visuais. Patterns · brackets · masks · interactions.",
};

const PATTERNS = [
  { name: "pattern-grid", className: "pattern-grid" },
  { name: "pattern-dots", className: "pattern-dots" },
  { name: "pattern-crosshair", className: "pattern-crosshair" },
  { name: "hazard-stripes", className: "hazard-stripes" },
];

export default function Effects() {
  return (
    <main className="min-h-screen flex flex-col overflow-x-hidden">
      <Nav />
      <PageHeader
        section="Design System · Effects"
        number="11.0"
        title="A library de efeitos."
        emphasis="Utilities consumíveis."
        subtitle="Patterns · corner brackets · mask fades · magnetic · highlight · accordion · 3D tilt · scanlines · giant numbers. Tudo via class CSS, zero React heavy."
        tokens="20+"
        next={{ label: "Components", href: "/brandbook/12.0-components" }}
      />

      {/* 01 Patterns — fill entire card */}
      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="flex items-end justify-between gap-4 mb-8 md:mb-12 flex-wrap">
            <div>
              <MetaLabel>[01] / Patterns</MetaLabel>
              <h2 className="mt-3 font-display font-light text-[clamp(1.75rem,4.5vw,3.25rem)] leading-[1.05] tracking-[-0.035em] text-balance max-w-[24ch]">
                Texturas SVG. <span className="font-medium">Hairline detail.</span>
              </h2>
            </div>
            <MetaLabel>4 patterns</MetaLabel>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {PATTERNS.map((p) => (
              <div key={p.name} className="bg-background border border-border flex flex-col">
                <div className={`${p.className} aspect-square w-full`} />
                <div className="p-4 border-t border-border">
                  <code className="font-mono text-[10px] opacity-80">.{p.name}</code>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 02 Corner brackets */}
      <section className="border-b border-border bg-muted">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="flex items-end justify-between gap-4 mb-8 md:mb-12 flex-wrap">
            <div>
              <MetaLabel>[02] / Corner brackets · HUD frames</MetaLabel>
              <h2 className="mt-3 font-display font-light text-[clamp(1.75rem,4.5vw,3.25rem)] leading-[1.05] tracking-[-0.035em] text-balance max-w-[24ch]">
                Scope reticle. <span className="font-medium">4 cantos · 1 SVG.</span>
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <CornerBrackets className="bg-background border border-border min-h-[180px] flex items-center justify-center">
              <code className="font-mono text-[10px]">CornerBrackets</code>
            </CornerBrackets>
            <div className="hud-frame bg-background border border-border min-h-[180px] flex items-center justify-center">
              <code className="font-mono text-[10px]">.hud-frame (TL+BR)</code>
            </div>
            <div className="hud-frame-full bg-background border border-border min-h-[180px] flex items-center justify-center">
              <code className="font-mono text-[10px]">.hud-frame-full</code>
            </div>
            <div className="frame-tech bg-foreground text-background min-h-[180px] flex items-center justify-center p-6">
              <code className="font-mono text-[10px]">.frame-tech (clipped poly)</code>
            </div>
            <div className="frame-tech-lg bg-foreground text-background min-h-[180px] flex items-center justify-center p-6">
              <code className="font-mono text-[10px]">.frame-tech-lg</code>
            </div>
            <div className="frame-notch bg-foreground text-background min-h-[180px] flex items-center justify-center p-6">
              <code className="font-mono text-[10px]">.frame-notch</code>
            </div>
          </div>
        </Container>
      </section>

      {/* 03 Mask fades */}
      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="flex items-end justify-between gap-4 mb-8 md:mb-12 flex-wrap">
            <div>
              <MetaLabel>[03] / Mask fades · 6 directions</MetaLabel>
              <h2 className="mt-3 font-display font-light text-[clamp(1.75rem,4.5vw,3.25rem)] leading-[1.05] tracking-[-0.035em] text-balance max-w-[24ch]">
                Bordas que dissolvem. <span className="font-medium">CSS mask-image.</span>
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {(["t", "b", "l", "r", "x", "y"] as const).map((d) => (
              <div key={d} className="bg-background border border-border flex flex-col">
                <div className={`mask-fade-${d} pattern-grid aspect-square w-full bg-foreground/15`} />
                <div className="p-3 border-t border-border">
                  <code className="font-mono text-[10px]">.mask-fade-{d}</code>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 04 Interactive utilities */}
      <section className="border-b border-border bg-muted">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="flex items-end justify-between gap-4 mb-8 md:mb-12 flex-wrap">
            <div>
              <MetaLabel>[04] / Interactive utilities</MetaLabel>
              <h2 className="mt-3 font-display font-light text-[clamp(1.75rem,4.5vw,3.25rem)] leading-[1.05] tracking-[-0.035em] text-balance max-w-[24ch]">
                Hover. Click. <span className="font-medium italic">Sente.</span>
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-background border border-border p-6 md:p-8 flex flex-col gap-5 min-h-[200px]">
              <div>
                <MetaLabel>btn-magnetic</MetaLabel>
                <p className="mt-2 font-sans text-sm opacity-65">Compress 0.95 + bg fill scale 1.4 on hover.</p>
              </div>
              <MagneticDemo />
            </div>
            <div className="bg-background border border-border p-6 md:p-8 flex flex-col gap-5 min-h-[200px]">
              <div>
                <MetaLabel>text-highlight</MetaLabel>
                <p className="mt-2 font-sans text-sm opacity-65">Marker sweep 0% → 100% horizontal.</p>
              </div>
              <HighlightDemo />
            </div>
            <div className="bg-background border border-border p-6 md:p-8 flex flex-col gap-5 min-h-[260px]">
              <div>
                <MetaLabel>tilt-card</MetaLabel>
                <p className="mt-2 font-sans text-sm opacity-65">Perspective 800px + JS rotateX/Y on mouse.</p>
              </div>
              <TiltDemo />
            </div>
            <div className="bg-background border border-border p-6 md:p-8 flex flex-col gap-5 min-h-[260px]">
              <div>
                <MetaLabel>acc-item · auto-progress</MetaLabel>
                <p className="mt-2 font-sans text-sm opacity-65">Progress bar fills `--progress-dur` then collapses.</p>
              </div>
              <AccordionDemo />
            </div>
          </div>
        </Container>
      </section>

      {/* 05 Decorative atoms */}
      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="flex items-end justify-between gap-4 mb-8 md:mb-12 flex-wrap">
            <div>
              <MetaLabel>[05] / Decorative atoms</MetaLabel>
              <h2 className="mt-3 font-display font-light text-[clamp(1.75rem,4.5vw,3.25rem)] leading-[1.05] tracking-[-0.035em] text-balance max-w-[24ch]">
                Detalhes que assinam.
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div className="bg-background border border-border p-6 min-h-[180px] flex flex-col justify-between gap-4">
              <MetaLabel>scanlines</MetaLabel>
              <div className="scanlines bg-foreground/10 aspect-video w-full" />
              <code className="font-mono text-[10px] opacity-60">.scanlines</code>
            </div>
            <div className="bg-background border border-border p-6 min-h-[180px] flex flex-col justify-between gap-4">
              <MetaLabel>divider-tech</MetaLabel>
              <div className="flex flex-col gap-3 my-auto">
                <div className="divider-tech" />
                <div className="divider-tech" />
                <div className="divider-tech" />
              </div>
              <code className="font-mono text-[10px] opacity-60">.divider-tech</code>
            </div>
            <div className="bg-background border border-border p-6 min-h-[180px] flex flex-col items-center justify-center gap-4">
              <div className="flex items-center gap-3">
                <span>SP</span>
                <span className="divider-diag" style={{ height: 24 }} />
                <span>3</span>
                <span className="divider-diag" style={{ height: 24 }} />
                <span>+15k</span>
              </div>
              <code className="font-mono text-[10px] opacity-60 mt-auto">.divider-diag (15°)</code>
            </div>
            <div className="bg-background border border-border p-6 min-h-[180px] flex flex-col items-center justify-center gap-3">
              <div className="crosshair-deco" />
              <code className="font-mono text-[10px] opacity-60 mt-auto">.crosshair-deco</code>
            </div>
          </div>
        </Container>
      </section>

      {/* 06 Shader as wallpaper — full bleed */}
      <section className="border-b border-border relative overflow-hidden">
        <div className="relative w-full h-[480px] md:h-[600px] bg-background">
          <ShaderCanvas fragmentShader={SHADERS["bone-glow"].source} inline />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-4">
            <div className="is-dif text-foreground">
              <MetaLabel>[06] / Shader wallpaper</MetaLabel>
              <h2 className="mt-3 font-display font-light text-[clamp(3.25rem,6vw,5rem)] leading-[0.95] tracking-[-0.04em] max-w-[18ch] mx-auto">
                Click anywhere. <span className="font-medium italic">Watch the ripple.</span>
              </h2>
            </div>
          </div>
        </div>
      </section>

      <NextSectionAuto current="11.0" />
      <Footer />
    </main>
  );
}
