import type { Metadata } from "next";
import { Container } from "@/components/brand/container";
import { MetaLabel } from "@/components/brand/meta";
import { Nav } from "@/components/brand/nav";
import { Footer } from "@/components/brand/footer";
import { NextSectionAuto } from "@/components/brand/next-section-auto";
import { PageHeader } from "@/components/brand/page-header";
import {
  ArrowRight, ArrowUpRight, Check, X, Plus, Minus, ChevronRight, ChevronDown, ChevronUp,
  Search, Menu, Copy, Download, Upload, Settings, User, Bell, Mail, Link2, Globe,
  Sun, Moon, Grid3x3, Circle, Square, Layers, Code2, Palette, Type, Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Icons — SINAPSE Brand",
  description: "Sistema de iconografia. 4 tamanhos canônicos, stroke 2px, round caps, currentColor. Base Lucide + overrides autorais (em construção).",
};

const SIZES = [
  { px: 16, note: "Inline, tight spaces" },
  { px: 24, note: "Default · UI · nav" },
  { px: 32, note: "Cards, emphasis" },
  { px: 48, note: "Hero, feature" },
];

const RULES = [
  "Stroke 2px em todos os tamanhos — consistência visual através da escala",
  "Round caps + round joins — stroke-linecap: round; stroke-linejoin: round",
  "viewBox 24×24 canônico — escala para cima ou para baixo do 24 como base",
  "Stroke-only, no fills — fill: none · outline-based",
  "currentColor — herda cor do parent text color",
  "Minimum touch target 44×44px — padding quando icon <24px em áreas clicáveis",
];

const ICON_GRID = [
  { I: ArrowRight, n: "arrow-right" },
  { I: ArrowUpRight, n: "arrow-up-right" },
  { I: Check, n: "check" },
  { I: X, n: "close" },
  { I: Plus, n: "plus" },
  { I: Minus, n: "minus" },
  { I: ChevronRight, n: "chevron-right" },
  { I: ChevronDown, n: "chevron-down" },
  { I: ChevronUp, n: "chevron-up" },
  { I: Search, n: "search" },
  { I: Menu, n: "menu" },
  { I: Copy, n: "copy" },
  { I: Download, n: "download" },
  { I: Upload, n: "upload" },
  { I: Settings, n: "settings" },
  { I: User, n: "user" },
  { I: Bell, n: "bell" },
  { I: Mail, n: "mail" },
  { I: Link2, n: "link" },
  { I: Globe, n: "globe" },
  { I: Sun, n: "sun" },
  { I: Moon, n: "moon" },
  { I: Grid3x3, n: "grid" },
  { I: Circle, n: "circle" },
  { I: Square, n: "square" },
  { I: Layers, n: "layers" },
  { I: Code2, n: "code" },
  { I: Palette, n: "palette" },
  { I: Type, n: "type" },
  { I: Zap, n: "zap" },
];

export default function Icons() {
  return (
    <main className="min-h-screen flex flex-col overflow-x-hidden">
      <Nav />
      <PageHeader
        section="Brandbook · Icons"
        number="4.0"
        title="30 glyphs."
        emphasis="Uma regra."
        subtitle="Sistema baseado em Lucide. Stroke 2px, round caps, 24px viewBox, currentColor. Biblioteca autoral SINAPSE virá em sobrescritas incrementais — por agora Lucide cobre 100% da UI."
        tokens="30 base · 4 sizes · 6 rules"
        prev={{ label: "Logo", href: "/brandbook/3.0-logo" }}
        next={{ label: "Moodboard", href: "/brandbook/0.0-guidelines" }}
      />

      {/* SIZES */}
      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="flex items-end justify-between gap-4 mb-10 md:mb-14 flex-wrap">
            <div>
              <MetaLabel>[01] / Sizes</MetaLabel>
              <h2 className="mt-4 font-display font-light text-[clamp(3.25rem,5vw,4rem)] leading-[1] tracking-[-0.035em] text-balance">
                4 tamanhos <span className="font-medium italic">canônicos.</span>
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border">
            {SIZES.map((s) => (
              <div key={s.px} className="bg-background p-8 md:p-10 flex flex-col items-center">
                <div className="flex-1 flex items-center justify-center min-h-[80px]">
                  <ArrowRight size={s.px} strokeWidth={2} />
                </div>
                <div className="mt-4 text-center">
                  <div className="font-display font-medium text-lg tracking-tight">{s.px}PX</div>
                  <div className="mt-1 font-mono text-[10px] tracking-[0.25em] opacity-50">{s.note}</div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* GRID */}
      <section className="border-b border-border pattern-dots">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="flex items-end justify-between gap-4 mb-10 md:mb-14 flex-wrap">
            <div>
              <MetaLabel>[02] / Grid · 24px</MetaLabel>
              <h2 className="mt-4 font-display font-light text-[clamp(3.25rem,5vw,4rem)] leading-[1] tracking-[-0.035em] text-balance">
                Biblioteca <span className="font-medium italic">base.</span>
              </h2>
            </div>
            <MetaLabel>30 glyphs</MetaLabel>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-px bg-border border border-border">
            {ICON_GRID.map(({ I, n }) => (
              <div key={n} className="bg-background aspect-square flex flex-col items-center justify-center gap-3 hover:bg-card transition-colors group p-2">
                <I size={22} strokeWidth={2} className="opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="font-mono text-[9px] tracking-[0.15em] opacity-40 group-hover:opacity-70 transition-opacity truncate w-full text-center">
                  {n}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* RULES */}
      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="flex items-end justify-between gap-4 mb-10 md:mb-14 flex-wrap">
            <div>
              <MetaLabel>[03] / Rules</MetaLabel>
              <h2 className="mt-4 font-display font-light text-[clamp(3.25rem,5vw,4rem)] leading-[1] tracking-[-0.035em] text-balance">
                6 regras.
              </h2>
            </div>
          </div>
          <div className="border border-border">
            {RULES.map((r, i) => (
              <div key={i} className={`flex items-start gap-5 px-5 md:px-6 py-4 md:py-5 ${i < RULES.length - 1 ? "border-b border-border" : ""}`}>
                <span className="font-mono text-[10px] tracking-[0.3em] opacity-40 pt-1 shrink-0 w-8">{String(i + 1).padStart(2, "0")}</span>
                <p className="font-sans text-sm md:text-base opacity-75 leading-relaxed">{r}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <NextSectionAuto current="4.0" />
      <Footer />
    </main>
  );
}
