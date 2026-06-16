import type { Metadata } from "next";
import { Container } from "@/components/brand/container";
import { MetaLabel } from "@/components/brand/meta";
import { Nav } from "@/components/brand/nav";
import { Footer } from "@/components/brand/footer";
import { NextSectionAuto } from "@/components/brand/next-section-auto";
import { PageHeader } from "@/components/brand/page-header";
import { LOGO } from "@/components/brand/logo";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Social Kit — SINAPSE Brand",
  description: "Templates IG · LinkedIn · X · YouTube. B&W absoluto, tipografia monumental.",
};

const FORMATS = [
  { platform: "Instagram Feed", ratio: "1:1", dims: "1080 × 1080", safe: "108px margin" },
  { platform: "Instagram Story", ratio: "9:16", dims: "1080 × 1920", safe: "250px top/bot" },
  { platform: "Instagram Reels Cover", ratio: "9:16", dims: "1080 × 1920", safe: "hero no centro" },
  { platform: "LinkedIn Post", ratio: "1.91:1", dims: "1200 × 627", safe: "120px margin" },
  { platform: "X / Twitter Card", ratio: "16:9", dims: "1200 × 675", safe: "linha central" },
  { platform: "YouTube Thumbnail", ratio: "16:9", dims: "1280 × 720", safe: "borda 80px" },
];

const PRESETS = [
  { name: "QUOTE", desc: "Frase monumental. Tipografia 180px. Assinatura bottom." },
  { name: "ANNOUNCE", desc: "Drop/launch. Meta-label topo + numero + título itálico." },
  { name: "CARROSSEL", desc: "Capa + 5-8 cards. Progressão visual consistente." },
  { name: "DATA", desc: "Métrica grande + contexto. Mono tracking ampliado." },
  { name: "MANIFESTO", desc: "Texto longo alinhado esquerda. Grain ativo." },
  { name: "REEL COVER", desc: "Hook de 3 palavras. Full-bleed no título." },
];

export default function SocialKit() {
  return (
    <main className="min-h-screen flex flex-col overflow-x-hidden">
      <Nav />
      <PageHeader
        section="Social Kit"
        number="S.0"
        title="Templates de redes."
        emphasis="B&W absoluto."
        subtitle="IG · LinkedIn · X · YouTube. Seis formatos × seis presets = 36 combinações sempre dentro dos 12 princípios. Download direto ou clone na Figma."
        tokens="6 formatos · 6 presets"
      />

      {/* FORMATS GRID */}
      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <MetaLabel>[01] / Formatos</MetaLabel>
          <h2 className="mt-4 font-display font-light text-[clamp(1.75rem,4.5vw,3.25rem)] leading-[0.95] tracking-[-0.04em] mb-10 md:mb-14 max-w-[22ch]">
            Seis plataformas. <span className="font-medium italic">Mesma lei.</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {FORMATS.map((f) => (
              <div key={f.platform} className="bg-background p-6 md:p-8">
                <div className="font-mono text-[10px] tracking-[0.3em] opacity-50 mb-4">
                  {f.ratio}
                </div>
                <h3 className="font-display font-medium text-lg md:text-xl tracking-tight leading-tight">
                  {f.platform}
                </h3>
                <div className="mt-4 pt-4 border-t border-border font-mono text-xs tracking-wide opacity-70">
                  {f.dims}
                </div>
                <div className="mt-2 font-mono text-[10px] tracking-[0.25em] opacity-50">
                  SAFE: {f.safe}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* PREVIEW — IG FEED QUOTE TEMPLATE */}
      <section className="border-b border-border bg-card">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <MetaLabel>[02] / Preview · Quote Post</MetaLabel>
          <h2 className="mt-4 font-display font-light text-[clamp(1.75rem,4.5vw,3.25rem)] leading-[0.95] tracking-[-0.04em] mb-10 md:mb-14 max-w-[24ch]">
            Template ao vivo. <span className="font-medium italic">Feed 1:1.</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-px bg-border border border-border">
            {/* Variante Vanta */}
            <div
              className="relative aspect-square flex flex-col justify-between p-10 md:p-14"
              style={{ background: "#0A0A0A", color: "#F5F5F0" }}
            >
              <div className="flex items-start justify-between">
                <div className="font-mono text-[10px] tracking-[0.3em] opacity-60">
                  SINAPSE · QUOTE 001
                </div>
                <Image
                  src="/brand/logo/bone/sinapse-symbol.svg"
                  alt=""
                  width={40}
                  height={28}
                  className="w-8 h-auto opacity-80"
                />
              </div>
              <div>
                <p className="font-display font-light text-[clamp(1.75rem,4.5vw,3.25rem)] leading-[0.95] tracking-[-0.035em]">
                  A IA não é o herói.{" "}
                  <span className="italic font-medium">O sistema é.</span>
                </p>
              </div>
              <div className="flex items-end justify-between">
                <div className="font-mono text-[10px] tracking-[0.3em] opacity-50">
                  /DOUTRINA SINAPSE
                </div>
                <div className="font-mono text-[10px] tracking-[0.3em] opacity-50">
                  @sinapse.club
                </div>
              </div>
            </div>
            {/* Variante Bone */}
            <div
              className="relative aspect-square flex flex-col justify-between p-10 md:p-14"
              style={{ background: "#F5F5F0", color: "#0A0A0A" }}
            >
              <div className="flex items-start justify-between">
                <div className="font-mono text-[10px] tracking-[0.3em] opacity-60">
                  SINAPSE · ANNOUNCE
                </div>
                <Image
                  src={LOGO.symbol}
                  alt=""
                  width={40}
                  height={28}
                  className="w-8 h-auto opacity-80"
                />
              </div>
              <div>
                <div className="font-display font-light text-[clamp(3.25rem,10vw,7rem)] leading-[0.82] tracking-[-0.05em]">
                  01/12
                </div>
                <p className="mt-4 font-display font-medium text-xl md:text-2xl tracking-tight leading-tight italic">
                  Drop inaugural — brand source of truth.
                </p>
              </div>
              <div className="flex items-end justify-between">
                <div className="font-mono text-[10px] tracking-[0.3em] opacity-50">
                  /EP 001
                </div>
                <div className="font-mono text-[10px] tracking-[0.3em] opacity-50">
                  SWIPE →
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* STORY VERTICAL */}
      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <MetaLabel>[03] / Preview · Story 9:16</MetaLabel>
          <h2 className="mt-4 font-display font-light text-[clamp(1.75rem,4.5vw,3.25rem)] leading-[0.95] tracking-[-0.04em] mb-10 md:mb-14 max-w-[22ch]">
            Vertical. <span className="font-medium italic">Zona segura.</span>
          </h2>
          <div className="flex gap-px bg-border justify-center border border-border py-8 overflow-x-auto">
            <div
              className="relative flex-shrink-0 flex flex-col justify-between p-8"
              style={{
                background: "#0A0A0A",
                color: "#F5F5F0",
                width: "270px",
                height: "480px",
              }}
            >
              <div className="font-mono text-[9px] tracking-[0.3em] opacity-60 text-center pt-6">
                SINAPSE · DROP 01
              </div>
              <div className="text-center">
                <div className="font-display font-light text-6xl leading-[0.85] tracking-[-0.04em]">
                  Leia os<br />
                  <span className="italic font-medium">12.</span>
                </div>
                <p className="mt-6 font-sans text-xs opacity-70 leading-relaxed px-4">
                  Fonte da verdade pública.
                </p>
              </div>
              <div className="font-mono text-[9px] tracking-[0.3em] opacity-60 text-center pb-6">
                ARRASTA PRA CIMA ↑
              </div>
            </div>
          </div>
          <p className="mt-8 font-sans text-sm opacity-60 max-w-[65ch] leading-relaxed">
            Topo e base reservados: nav do IG + reactions. Conteúdo crítico sempre entre os 250px
            seguros. Nunca usar borda total com texto pequeno.
          </p>
        </Container>
      </section>

      {/* PRESETS */}
      <section className="border-b border-border bg-card pattern-dots">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <MetaLabel>[04] / Presets</MetaLabel>
          <h2 className="mt-4 font-display font-light text-[clamp(1.75rem,4.5vw,3.25rem)] leading-[0.95] tracking-[-0.04em] mb-10 md:mb-14 max-w-[24ch]">
            Seis receitas. <span className="font-medium italic">Misturar com formato.</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {PRESETS.map((p, i) => (
              <article key={p.name} className="bg-background p-6 md:p-8">
                <div className="font-display font-light text-6xl md:text-6xl leading-[0.85] tracking-[-0.05em] opacity-20">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-4 font-display font-medium text-lg md:text-xl tracking-tight">
                  {p.name}
                </h3>
                <p className="mt-2 font-sans text-sm opacity-65 leading-relaxed">
                  {p.desc}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* RULES */}
      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <MetaLabel>[05] / Rules</MetaLabel>
          <h2 className="mt-4 font-display font-light text-[clamp(1.75rem,4.5vw,3.25rem)] leading-[0.95] tracking-[-0.04em] mb-10 md:mb-14 max-w-[24ch]">
            Regras fixas. <span className="font-medium italic">Zero exceção.</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-px bg-border border border-border">
            {[
              { t: "Paleta B&W total", d: "Bone #F5F5F0 + Vanta #0A0A0A. Sem gradiente cromático, sem accent, sem foto colorida." },
              { t: "Logo sempre presente", d: "Símbolo 8% da largura, canto sup-dir padrão. Inverte com o fundo." },
              { t: "Typography hierarchy", d: "Display 60-180px pro headline. Mono 10-12px pra meta. Sem meio termo." },
              { t: "Grain overlay", d: "5% opacity em todo template. Exporta embedded no PNG/JPG final." },
              { t: "Safe zones respeitadas", d: "Topo/base reservados a UI nativa da plataforma. Crítico nunca lá." },
              { t: "Alt text sempre", d: "Todo post com descrição textual. Carrossel: 1 alt por card." },
            ].map((r) => (
              <div key={r.t} className="bg-background p-6 md:p-8">
                <h3 className="font-display font-medium text-base md:text-lg tracking-tight">
                  {r.t}
                </h3>
                <p className="mt-2 font-sans text-sm opacity-65 leading-relaxed">{r.d}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <NextSectionAuto current="S.0" />
      <Footer />
    </main>
  );
}
