import type { Metadata } from "next";
import { Container } from "@/components/brand/container";
import { MetaLabel } from "@/components/brand/meta";
import { Nav } from "@/components/brand/nav";
import { Footer } from "@/components/brand/footer";
import { NextSectionAuto } from "@/components/brand/next-section-auto";
import { PageHeader } from "@/components/brand/page-header";

export const metadata: Metadata = {
  title: "Spacing & Radius — SINAPSE Foundations",
  description: "14-step numeric spacing scale + 5 named tokens + radius restritivos. Ritmo espacial do SINAPSE.",
};

const SPACING = [
  { n: "0",  px: 0,   use: "zero" },
  { n: "1",  px: 4,   use: "micro · icon padding" },
  { n: "2",  px: 8,   use: "inline gaps" },
  { n: "3",  px: 12,  use: "tight clusters" },
  { n: "4",  px: 16,  use: "components base" },
  { n: "5",  px: 20,  use: "card padding" },
  { n: "6",  px: 24,  use: "form gaps" },
  { n: "7",  px: 32,  use: "section rhythm" },
  { n: "8",  px: 48,  use: "section padding" },
  { n: "9",  px: 64,  use: "grid gaps" },
  { n: "10", px: 80,  use: "layout margins" },
  { n: "11", px: 96,  use: "page padding lg" },
  { n: "12", px: 128, use: "editorial hero" },
  { n: "13", px: 180, use: "editorial statement" },
];

const NAMED = [
  { token: "--spacing-xs", px: 8,  alias: "space-2" },
  { token: "--spacing-sm", px: 16, alias: "space-4" },
  { token: "--spacing-md", px: 32, alias: "space-7" },
  { token: "--spacing-lg", px: 48, alias: "space-8" },
  { token: "--spacing-xl", px: 64, alias: "space-9" },
];

const RADIUS = [
  { n: "none", px: "0",    note: "Botões primários, frames editoriais" },
  { n: "sm",   px: "2px",  note: "Chips pequenos, dots indicators" },
  { n: "base", px: "4px",  note: "Default — inputs, cards pequenos" },
  { n: "md",   px: "6px",  note: "Cards médios, dialogs compactos" },
  { n: "lg",   px: "8px",  note: "Cards largos, modals" },
  { n: "xl",   px: "12px", note: "Hero cards, destaque raro" },
  { n: "full", px: "9999px", note: "Avatars, pills, status indicators" },
];

const LAYER = [
  { token: "--layer-base", z: "0", use: "Fluxo normal" },
  { token: "--layer-elevated", z: "1", use: "Cards com elevação" },
  { token: "--layer-sticky", z: "10", use: "Sticky headers locais" },
  { token: "--layer-nav", z: "100", use: "Nav global fixa" },
  { token: "--layer-dropdown", z: "200", use: "Dropdowns, tooltips, popovers" },
  { token: "--layer-overlay", z: "300", use: "Backdrop, dim" },
  { token: "--layer-modal", z: "400", use: "Modals, dialogs, drawers" },
  { token: "--layer-toast", z: "500", use: "Toasts, snackbars" },
];

const BP = [
  { token: "--bp-mobile", px: "< 640px",  use: "Mobile portrait" },
  { token: "--bp-sm",     px: "640px+",   use: "Mobile landscape" },
  { token: "--bp-md",     px: "768px+",   use: "Tablet" },
  { token: "--bp-lg",     px: "1024px+",  use: "Desktop" },
  { token: "--bp-xl",     px: "1280px+",  use: "Large desktop" },
  { token: "--bp-2xl",    px: "1536px+",  use: "Ultra-wide" },
];

export default function Spacing() {
  return (
    <main className="min-h-screen flex flex-col overflow-x-hidden">
      <Nav />
      <PageHeader
        section="Foundations · Spacing & Radius"
        number="2.3"
        title="14 steps."
        emphasis="Um ritmo."
        subtitle="Escala numérica de 0 a 180px. 5 tokens nomeados como atalhos semânticos. Raios restritivos anti-SaaS-genérico. Tudo governado por CSS custom properties."
        tokens="14 numeric · 5 named · 7 radius"
        prev={{ label: "Color", href: "/brandbook/2.2-color" }}
        next={{ label: "Logo", href: "/brandbook/3.0-logo" }}
      />

      {/* NUMERIC SCALE */}
      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="flex items-end justify-between gap-4 mb-10 md:mb-14 flex-wrap">
            <div>
              <MetaLabel>[01] / Numeric Scale · 14 Steps</MetaLabel>
              <h2 className="mt-4 font-display font-light text-[clamp(1.75rem,4.5vw,3.25rem)] leading-[1] tracking-[-0.035em]">
                De 0 a 180. <span className="font-medium italic">Sem linear.</span>
              </h2>
              <p className="mt-5 font-sans text-base opacity-60 max-w-[52ch] leading-relaxed">
                Escala numérica, não t-shirt sizing. Cada step tem intenção de uso. Base 4px até 16px, depois saltos expressivos.
              </p>
            </div>
            <MetaLabel>14 Tokens</MetaLabel>
          </div>

          <div className="border border-border">
            {SPACING.map((s, i) => (
              <div
                key={s.n}
                className={`flex items-center gap-5 md:gap-8 px-4 md:px-6 py-3 md:py-4 ${i < SPACING.length - 1 ? "border-b border-border" : ""} hover:bg-card transition-colors`}
              >
                <div className="font-mono text-[11px] tracking-[0.25em] opacity-60 w-14 shrink-0">space-{s.n}</div>
                <div className="font-mono text-xs opacity-55 w-14 shrink-0">{s.px}px</div>
                <div className="flex-1 min-w-0 flex items-center">
                  <div className="h-4 md:h-5 bg-foreground" style={{ width: `${Math.min(s.px * 2, 600)}px`, maxWidth: "100%" }} />
                </div>
                <div className="hidden md:block font-sans text-sm opacity-55 w-48 shrink-0 text-right truncate">{s.use}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* NAMED */}
      <section className="border-b border-border pattern-dots">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="flex items-end justify-between gap-4 mb-10 flex-wrap">
            <div>
              <MetaLabel>[02] / Named Tokens</MetaLabel>
              <h2 className="mt-4 font-display font-light text-[clamp(1.75rem,4.5vw,3.25rem)] leading-[1] tracking-[-0.035em]">
                5 atalhos <span className="font-medium italic">semânticos.</span>
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-px bg-border border border-border">
            {NAMED.map((n) => (
              <div key={n.token} className="bg-background p-6 md:p-8">
                <div className="font-mono text-[11px] tracking-[0.25em] opacity-60 mb-4">{n.token}</div>
                <div className="h-px bg-foreground mb-4" style={{ width: `${n.px}px`, maxWidth: "100%" }} />
                <div className="font-display font-medium text-2xl md:text-3xl tracking-tight leading-none">{n.px}px</div>
                <div className="mt-2 font-mono text-[10px] tracking-[0.25em] opacity-40">{n.alias}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* RADIUS */}
      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="flex items-end justify-between gap-4 mb-10 md:mb-14 flex-wrap">
            <div>
              <MetaLabel>[03] / Radius Scale</MetaLabel>
              <h2 className="mt-4 font-display font-light text-[clamp(1.75rem,4.5vw,3.25rem)] leading-[1] tracking-[-0.035em]">
                Raios restritivos. <span className="font-medium italic">Anti-genérico.</span>
              </h2>
              <p className="mt-5 font-sans text-base opacity-60 max-w-[52ch] leading-relaxed">
                Default 4px. SaaS genérico usa 12-16px — SINAPSE evita isso. Raios grandes só em elementos circulares.
              </p>
            </div>
            <MetaLabel>7 Tokens</MetaLabel>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-px bg-border border border-border">
            {RADIUS.map((r) => (
              <div key={r.n} className="bg-background p-5 md:p-6 flex flex-col gap-4">
                <div
                  className="aspect-square bg-foreground/90 w-full"
                  style={{ borderRadius: r.px }}
                />
                <div>
                  <div className="font-mono text-[11px] tracking-[0.2em] opacity-60">rounded-{r.n}</div>
                  <div className="mt-1 font-display font-medium text-lg tracking-tight">{r.px}</div>
                  <p className="mt-2 font-sans text-xs opacity-50 leading-relaxed">{r.note}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* LAYER */}
      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="flex items-end justify-between gap-4 mb-10 md:mb-14 flex-wrap">
            <div>
              <MetaLabel>[04] / Z-Index Stack</MetaLabel>
              <h2 className="mt-4 font-display font-light text-[clamp(1.75rem,4.5vw,3.25rem)] leading-[1] tracking-[-0.035em]">
                8 camadas. <span className="font-medium italic">Zero colisão.</span>
              </h2>
            </div>
          </div>
          <div className="border border-border">
            {LAYER.map((l, i) => (
              <div key={l.token} className={`flex items-center gap-4 md:gap-8 px-4 md:px-6 py-3 md:py-4 ${i < LAYER.length - 1 ? "border-b border-border" : ""}`}>
                <div className="font-mono text-[11px] tracking-[0.25em] opacity-60 w-48 shrink-0 truncate">{l.token}</div>
                <div className="font-display font-medium text-xl tracking-tight w-16 shrink-0">{l.z}</div>
                <div className="font-sans text-sm opacity-55 flex-1 truncate">{l.use}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* BREAKPOINTS */}
      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="flex items-end justify-between gap-4 mb-10 md:mb-14 flex-wrap">
            <div>
              <MetaLabel>[05] / Breakpoints</MetaLabel>
              <h2 className="mt-4 font-display font-light text-[clamp(1.75rem,4.5vw,3.25rem)] leading-[1] tracking-[-0.035em]">
                6 breakpoints. <span className="font-medium italic">Mobile-first.</span>
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-border border border-border">
            {BP.map((b) => (
              <div key={b.token} className="bg-background p-5">
                <div className="font-mono text-[10px] tracking-[0.25em] opacity-60 truncate">{b.token}</div>
                <div className="mt-2 font-display font-medium text-lg tracking-tight">{b.px}</div>
                <div className="mt-1 font-sans text-xs opacity-50">{b.use}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <NextSectionAuto current="2.3" />
      <Footer />
    </main>
  );
}
