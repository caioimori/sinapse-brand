import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/brand/container";
import { Nav } from "@/components/brand/nav";
import { Footer } from "@/components/brand/footer";
import { NextSectionAuto } from "@/components/brand/next-section-auto";
import { PageHeader } from "@/components/brand/page-header";
import { MetaLabel } from "@/components/brand/meta";
import { CornerBrackets } from "@/components/brand/corner-brackets";
import { LOGO } from "@/components/brand/logo";
import { ThemeLogo } from "@/components/brand/theme-logo";

export const metadata: Metadata = {
  title: "3.0 Logo — SINAPSE Brand",
  description: "Sistema de logo: 3 marcas, 2 edições. Wordmark · Lockup · Symbol em Vanta + Bone.",
};

const VARIANTS = [
  { name: "Wordmark", desc: "Texto puro, sem símbolo. Para situações estreitas/horizontais.", vanta: LOGO.wordmark, bone: LOGO.wordmarkBone, ar: "5/1" },
  { name: "Lockup", desc: "Símbolo + texto combinados. Uso primário.", vanta: LOGO.lockup, bone: LOGO.lockupBone, ar: "5/1" },
  { name: "Symbol", desc: "Símbolo isolado. Avatar, favicon, badge.", vanta: LOGO.symbol, bone: LOGO.symbolBone, ar: "1/1" },
];

const SUBMARKS = [
  { name: "SINAPSE AI", lockup: "/brand/logo/vanta/sinapse-ai-lockup.svg", wordmark: "/brand/logo/vanta/sinapse-ai-wordmark.svg" },
  { name: "SINAPSE CLUB", lockup: "/brand/logo/vanta/sinapse-club-lockup.svg", wordmark: "/brand/logo/vanta/sinapse-club-wordmark.svg" },
];

const RULES = [
  { ok: true, label: "Use cores aprovadas", desc: "Vanta sobre Bone · Bone sobre Vanta. Sem desvios cromáticos." },
  { ok: true, label: "Mantenha clear space", desc: "Mínimo: altura do símbolo em todos os lados." },
  { ok: true, label: "Use SVG sempre", desc: "Nunca raster. Símbolo é vetorial nativo." },
  { ok: false, label: "Não rotacione", desc: "Logo nunca tilta, gira ou inclina. Horizontal sempre." },
  { ok: false, label: "Não distorça", desc: "Mantenha aspect ratio. Sem stretch/squish." },
  { ok: false, label: "Não recolore arbitrário", desc: "Apenas Vanta ou Bone. Sem outline ou fill custom." },
];

export default function Logo() {
  return (
    <main className="min-h-screen flex flex-col overflow-x-hidden">
      <Nav />
      <PageHeader
        section="Brandbook · Logo"
        number="3.0"
        title="O sistema de marca."
        emphasis="3 formas · 2 edições."
        subtitle="A SINAPSE opera com uma marca-mãe e duas sub-marcas (AI · CLUB), todas no mesmo sistema visual. Wordmark, Lockup e Symbol em Vanta e Bone."
        tokens="3 + 2"
        next={{ label: "Icons", href: "/brandbook/4.0-icons" }}
      />

      {/* 01 — Primary lockup massive */}
      <section className="border-b border-border bg-card">
        <Container className="py-16 sm:py-20 md:py-28 lg:py-36">
          <div className="flex items-end justify-between gap-4 mb-10 md:mb-14 flex-wrap">
            <div>
              <MetaLabel>[01] / Primary lockup</MetaLabel>
              <h2 className="mt-3 font-display font-light text-[clamp(1.5rem,4vw,3rem)] leading-[1.05] tracking-[-0.035em]">
                A marca em escala. <span className="font-medium italic">Vanta sobre Bone.</span>
              </h2>
            </div>
          </div>
          <CornerBrackets className="bg-background border border-border flex items-center justify-center min-h-[280px] md:min-h-[400px] p-12">
            <ThemeLogo variant="lockup" alt="SINAPSE" width={800} height={120} priority className="w-full max-w-2xl h-auto" />
          </CornerBrackets>
        </Container>
      </section>

      {/* 02 — 3 variants in 2 editions */}
      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="flex items-end justify-between gap-4 mb-8 md:mb-12 flex-wrap">
            <div>
              <MetaLabel>[02] / Variants × Editions</MetaLabel>
              <h2 className="mt-3 font-display font-light text-[clamp(1.5rem,4vw,3rem)] leading-[1.05] tracking-[-0.035em] max-w-[24ch]">
                Três formas. <span className="font-medium">Duas edições.</span>
              </h2>
            </div>
            <MetaLabel>6 assets</MetaLabel>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-border border border-border">
            {VARIANTS.map((v) => (
              <div key={v.name} className="bg-background flex flex-col">
                <div className="p-6 border-b border-border">
                  <MetaLabel>{v.name}</MetaLabel>
                  <p className="mt-2 font-sans text-sm opacity-65 leading-relaxed">{v.desc}</p>
                </div>
                <div className="grid grid-cols-2">
                  <div className="bg-[#F5F5F0] p-8 md:p-10 flex items-center justify-center" style={{ aspectRatio: v.ar }}>
                    <Image src={v.vanta} alt={`${v.name} on Bone`} width={300} height={120} className="max-w-full h-auto" />
                  </div>
                  <div className="bg-[#0A0A0A] p-8 md:p-10 flex items-center justify-center" style={{ aspectRatio: v.ar }}>
                    <Image src={v.bone} alt={`${v.name} on Vanta`} width={300} height={120} className="max-w-full h-auto" />
                  </div>
                </div>
                <div className="grid grid-cols-2 border-t border-border">
                  <div className="p-3 font-mono text-[10px] tracking-[0.22em] opacity-60 uppercase border-r border-border">on bone</div>
                  <div className="p-3 font-mono text-[10px] tracking-[0.22em] opacity-60 uppercase">on vanta</div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 03 — Sub-marks */}
      <section className="border-b border-border bg-muted">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="flex items-end justify-between gap-4 mb-8 md:mb-12 flex-wrap">
            <div>
              <MetaLabel>[03] / Sub-marks</MetaLabel>
              <h2 className="mt-3 font-display font-light text-[clamp(1.5rem,4vw,3rem)] leading-[1.05] tracking-[-0.035em] max-w-[24ch]">
                AI · CLUB. <span className="font-medium">Mesma DNA, novo sufixo.</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {SUBMARKS.map((s) => (
              <CornerBrackets key={s.name} className="block bg-background border border-border min-h-[260px]">
                <div className="p-6 border-b border-border">
                  <MetaLabel>{s.name}</MetaLabel>
                </div>
                <div className="bg-[#F5F5F0] p-12 md:p-16 flex items-center justify-center min-h-[180px]">
                  <Image src={s.lockup} alt={s.name} width={400} height={80} className="max-w-full h-auto" />
                </div>
              </CornerBrackets>
            ))}
          </div>
        </Container>
      </section>

      {/* 04 — Clear space + sizing */}
      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="flex items-end justify-between gap-4 mb-8 md:mb-12 flex-wrap">
            <div>
              <MetaLabel>[04] / Clear space</MetaLabel>
              <h2 className="mt-3 font-display font-light text-[clamp(1.5rem,4vw,3rem)] leading-[1.05] tracking-[-0.035em] max-w-[24ch]">
                Respiração. <span className="font-medium">A altura do símbolo em todos os lados.</span>
              </h2>
            </div>
          </div>

          <div className="bg-card border border-border p-8 md:p-16 relative overflow-hidden">
            <div className="relative max-w-md mx-auto">
              {/* Top guide */}
              <div className="absolute -top-12 left-0 right-0 flex items-center gap-2 opacity-50">
                <div className="flex-1 h-px bg-foreground" />
                <span className="font-mono text-[10px] tracking-[0.22em]">1×</span>
                <div className="flex-1 h-px bg-foreground" />
              </div>
              {/* Left guide */}
              <div className="absolute -left-12 top-0 bottom-0 flex flex-col items-center gap-2 opacity-50">
                <div className="flex-1 w-px bg-foreground" />
                <span className="font-mono text-[10px] tracking-[0.22em] [writing-mode:vertical-rl]">1×</span>
                <div className="flex-1 w-px bg-foreground" />
              </div>
              {/* Right guide */}
              <div className="absolute -right-12 top-0 bottom-0 flex flex-col items-center gap-2 opacity-50">
                <div className="flex-1 w-px bg-foreground" />
                <span className="font-mono text-[10px] tracking-[0.22em] [writing-mode:vertical-rl]">1×</span>
                <div className="flex-1 w-px bg-foreground" />
              </div>
              {/* Bottom guide */}
              <div className="absolute -bottom-12 left-0 right-0 flex items-center gap-2 opacity-50">
                <div className="flex-1 h-px bg-foreground" />
                <span className="font-mono text-[10px] tracking-[0.22em]">1×</span>
                <div className="flex-1 h-px bg-foreground" />
              </div>
              <ThemeLogo variant="lockup" alt="SINAPSE" width={400} height={60} className="w-full h-auto" />
            </div>
          </div>
        </Container>
      </section>

      {/* 05 — Usage rules */}
      <section className="border-b border-border bg-muted">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="flex items-end justify-between gap-4 mb-8 md:mb-12 flex-wrap">
            <div>
              <MetaLabel>[05] / Usage rules</MetaLabel>
              <h2 className="mt-3 font-display font-light text-[clamp(1.5rem,4vw,3rem)] leading-[1.05] tracking-[-0.035em] max-w-[24ch]">
                Faça. <span className="font-medium italic">Não faça.</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {RULES.map((r) => (
              <div key={r.label} className="bg-background p-6 md:p-7 flex flex-col gap-3 min-h-[160px]">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[12px] ${r.ok ? "bg-foreground text-background" : "border border-foreground"}`}
                  >
                    {r.ok ? "✓" : "✕"}
                  </span>
                  <MetaLabel>{r.ok ? "DO" : "DON'T"}</MetaLabel>
                </div>
                <div className="font-display font-medium text-lg md:text-xl tracking-tight leading-tight">{r.label}</div>
                <p className="font-sans text-sm opacity-65 leading-relaxed mt-auto">{r.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <NextSectionAuto current="3.0" />
      <Footer />
    </main>
  );
}
