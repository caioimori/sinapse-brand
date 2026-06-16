import type { Metadata } from "next";
import { Container } from "@/components/brand/container";
import { MetaLabel } from "@/components/brand/meta";
import { Nav } from "@/components/brand/nav";
import { Footer } from "@/components/brand/footer";
import { NextSectionAuto } from "@/components/brand/next-section-auto";
import { PageHeader } from "@/components/brand/page-header";

export const metadata: Metadata = {
  title: "Color — SINAPSE Foundations",
  description: "B&W radical. 13 steps gray primitives + aliases semânticos Bone/Vanta. Zero accent cromático no brand. Cores funcionais isoladas.",
};

const GRAY_SCALE = [
  { n: "00", hex: "#FFFFFF", name: "white" },
  { n: "01", hex: "#FAFAF7", name: "bone-alt" },
  { n: "02", hex: "#F5F5F0", name: "bone" },
  { n: "03", hex: "#EFEFEB", name: "bone-soft" },
  { n: "04", hex: "#EBEBE5", name: "bone-muted" },
  { n: "05", hex: "#D4D4CE", name: "gray-light" },
  { n: "06", hex: "#999992", name: "gray-dim" },
  { n: "07", hex: "#5C5C58", name: "gray-charcoal" },
  { n: "08", hex: "#2E2E2B", name: "carbon" },
  { n: "09", hex: "#1F1F1F", name: "vanta-soft" },
  { n: "10", hex: "#141414", name: "vanta-card" },
  { n: "11", hex: "#0A0A0A", name: "vanta" },
  { n: "12", hex: "#000000", name: "void" },
];

const SEMANTIC_BONE = [
  { token: "--background", hex: "#F5F5F0", note: "Canvas principal · Bone" },
  { token: "--foreground", hex: "#0A0A0A", note: "Texto primário · Vanta" },
  { token: "--primary", hex: "#0A0A0A", note: "Brand primary (texto sobre fundo claro)" },
  { token: "--primary-foreground", hex: "#F5F5F0", note: "Texto em primary buttons" },
  { token: "--card", hex: "#FAFAF7", note: "Cards, panels, surfaces elevadas" },
  { token: "--muted", hex: "#EFEFEB", note: "Backgrounds secundários" },
  { token: "--muted-foreground", hex: "rgba(10,10,10,0.55)", note: "Texto terciário · meta" },
  { token: "--accent", hex: "rgba(10,10,10,0.05)", note: "Hover · subtle highlight" },
  { token: "--border", hex: "rgba(0,0,0,0.1)", note: "Bordas sutis" },
  { token: "--input", hex: "rgba(0,0,0,0.12)", note: "Form inputs border" },
  { token: "--ring", hex: "rgba(0,0,0,0.3)", note: "Focus ring" },
];

const FUNCTIONAL = [
  { token: "--destructive", hex: "#FF3A2D", note: "Error · critical · destructive action only", on: "#FFFFFF" },
  { token: "--success", hex: "#00C853", note: "Success · confirm · complete only", on: "#FFFFFF" },
];

export default function Color() {
  return (
    <main className="min-h-screen flex flex-col overflow-x-hidden">
      <Nav />
      <PageHeader
        section="Foundations · Color"
        number="2.2"
        title="Preto e branco."
        emphasis="Nada mais."
        subtitle="13 steps de cinza formam o espectro inteiro da marca. Cores cromáticas (error, success) existem como estado funcional — nunca como brand. Restrição como identidade."
        tokens="13 primitives · 11 semantic · 2 functional"
        prev={{ label: "Typography", href: "/brandbook/2.1-typography" }}
        next={{ label: "Spacing", href: "/brandbook/2.3-spacing" }}
      />

      {/* GRAY SCALE PRIMITIVES */}
      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="flex items-end justify-between gap-4 mb-10 md:mb-14 flex-wrap">
            <div>
              <MetaLabel>[01] / Primitives · Gray Scale</MetaLabel>
              <h2 className="mt-4 font-display font-light text-[clamp(1.75rem,4.5vw,3.25rem)] leading-[1] tracking-[-0.035em]">
                13 steps. <span className="font-medium italic">Um espectro.</span>
              </h2>
            </div>
            <MetaLabel>WHITE → VOID</MetaLabel>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 border border-border">
            {GRAY_SCALE.map((g, i, arr) => (
              <div
                key={g.n}
                className={`border-border ${i < arr.length - 1 ? "md:border-r" : ""} ${(i + 1) % 4 !== 0 && i < arr.length - 1 ? "border-r md:border-r" : ""} ${i < arr.length - 4 ? "border-b md:border-b-0" : ""}`}
              >
                <div className="aspect-square" style={{ background: g.hex, borderBottom: "1px solid var(--border)" }} />
                <div className="px-3 md:px-4 py-3 md:py-4">
                  <div className="font-mono text-[9px] tracking-[0.25em] opacity-50">{g.n}</div>
                  <div className="mt-1 font-display font-medium text-sm md:text-base tracking-tight">{g.name}</div>
                  <div className="mt-1 font-mono text-[10px] opacity-55 break-all">{g.hex}</div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* SEMANTIC ALIASES — BONE */}
      <section className="border-b border-border pattern-dots">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="flex items-end justify-between gap-4 mb-10 md:mb-14 flex-wrap">
            <div>
              <MetaLabel>[02] / Semantic Aliases · Bone Edition</MetaLabel>
              <h2 className="mt-4 font-display font-light text-[clamp(1.75rem,4.5vw,3.25rem)] leading-[1] tracking-[-0.035em]">
                Intenção <span className="font-medium italic">sobre valor.</span>
              </h2>
              <p className="mt-5 font-sans text-base opacity-60 max-w-[52ch] leading-relaxed">
                Componentes consomem tokens semânticos, nunca primitives. Isso permite trocar a edição (Bone ↔ Vanta) sem reescrever nada.
              </p>
            </div>
            <MetaLabel>11 Tokens</MetaLabel>
          </div>

          <div className="border border-border">
            {SEMANTIC_BONE.map((s, i) => (
              <div
                key={s.token}
                className={`flex items-center gap-4 md:gap-8 px-4 md:px-6 py-4 md:py-5 ${i < SEMANTIC_BONE.length - 1 ? "border-b border-border" : ""} hover:bg-card transition-colors`}
              >
                <div className="w-10 h-10 md:w-14 md:h-14 border border-border shrink-0" style={{ background: s.hex }} />
                <div className="flex-1 min-w-0 grid md:grid-cols-[280px,180px,1fr] gap-2 md:gap-6 items-center">
                  <div className="font-mono text-xs md:text-sm tracking-wide truncate">{s.token}</div>
                  <div className="font-mono text-[11px] md:text-xs opacity-60 truncate">{s.hex}</div>
                  <div className="font-sans text-xs md:text-sm opacity-55 truncate">{s.note}</div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* FUNCTIONAL COLORS — ISOLATED */}
      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="flex items-end justify-between gap-4 mb-10 md:mb-14 flex-wrap">
            <div>
              <MetaLabel>[03] / Functional · Status Only</MetaLabel>
              <h2 className="mt-4 font-display font-light text-[clamp(1.75rem,4.5vw,3.25rem)] leading-[1] tracking-[-0.035em]">
                Fora do brand. <span className="font-medium italic">Sempre.</span>
              </h2>
              <p className="mt-5 font-sans text-base opacity-60 max-w-[52ch] leading-relaxed">
                Error e success existem como estado de sistema. Nunca aparecem em hero, copy, carrossel, proposta, contrato, LP ou qualquer comunicação da marca.
              </p>
            </div>
            <MetaLabel>02 Tokens</MetaLabel>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-border border border-border">
            {FUNCTIONAL.map((c) => (
              <div key={c.token} className="bg-background p-6 md:p-10">
                <div className="aspect-[16/9] mb-6 flex items-center justify-center" style={{ background: c.hex }}>
                  <span className="font-display font-medium text-3xl md:text-5xl tracking-tight" style={{ color: c.on }}>
                    {c.token.replace("--", "").toUpperCase()}
                  </span>
                </div>
                <div className="grid grid-cols-[1fr,auto] gap-4 items-start">
                  <div>
                    <div className="font-mono text-xs md:text-sm tracking-wide">{c.token}</div>
                    <div className="mt-1 font-mono text-[11px] md:text-xs opacity-55">{c.hex}</div>
                  </div>
                  <div className="border border-border px-3 py-1.5">
                    <div className="font-mono text-[9px] tracking-[0.25em] opacity-50">STATUS</div>
                  </div>
                </div>
                <p className="mt-4 font-sans text-sm opacity-60 leading-relaxed">{c.note}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* RULES */}
      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <MetaLabel>[04] / Color Rules</MetaLabel>
          <h2 className="mt-4 font-display font-light text-[clamp(1.75rem,4.5vw,3.25rem)] leading-[1] tracking-[-0.035em] mb-12">
            Non-negotiable.
          </h2>

          <div className="grid md:grid-cols-3 gap-px bg-border border border-border">
            {[
              ["Zero accent cromático", "Azul, roxo, verde-neon, laranja, gradientes — proibidos no brand. Sem exceção."],
              ["Preto absoluto é raro", "Use Vanta #0A0A0A como default. #000 (void) só para overlays e voids literais."],
              ["Semantic sobre primitive", "Componentes nunca consomem primitives diretos. Sempre via --background, --foreground, --card, etc."],
              ["Contraste mínimo 4.5:1", "Texto sobre fundo respeita WCAG AA. Usar muted-foreground (alpha 0.55) só em meta não-crítico."],
              ["Error/success nunca no brand", "Essas cores existem apenas como estado de sistema. Copy e creative jamais usam vermelho/verde."],
              ["Selection invertido", "Seleção de texto = fg/bg invertido. Identidade visual em detalhe."],
            ].map(([rule, note]) => (
              <div key={rule} className="bg-background p-6 md:p-8">
                <div className="font-display font-medium text-base md:text-lg tracking-tight leading-tight mb-3">{rule}</div>
                <p className="font-sans text-sm opacity-60 leading-relaxed">{note}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <NextSectionAuto current="2.2" />
      <Footer />
    </main>
  );
}
