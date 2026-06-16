import type { Metadata } from "next";
import { Container } from "@/components/brand/container";
import { MetaLabel } from "@/components/brand/meta";
import { Nav } from "@/components/brand/nav";
import { Footer } from "@/components/brand/footer";
import { NextSectionAuto } from "@/components/brand/next-section-auto";
import { PageHeader } from "@/components/brand/page-header";

export const metadata: Metadata = {
  title: "Accessibility — SINAPSE Brand",
  description: "WCAG 2.2 AA. Contraste, foco, motion reduzido, navegação por teclado.",
};

const CONTRAST_PAIRS = [
  { fg: "#F5F5F0", bg: "#0A0A0A", label: "Bone on Vanta", ratio: "18.51", grade: "AAA" },
  { fg: "#0A0A0A", bg: "#F5F5F0", label: "Vanta on Bone", ratio: "18.51", grade: "AAA" },
  { fg: "#8A8A82", bg: "#0A0A0A", label: "Gray 500 on Vanta", ratio: "6.94", grade: "AA" },
  { fg: "#8A8A82", bg: "#F5F5F0", label: "Gray 500 on Bone", ratio: "2.67", grade: "FAIL" },
  { fg: "#4A4A45", bg: "#F5F5F0", label: "Gray 700 on Bone", ratio: "8.32", grade: "AAA" },
  { fg: "#0A0A0A", bg: "#E8E8E0", label: "Vanta on Card", ratio: "15.87", grade: "AAA" },
];

const CHECKLIST = [
  { n: "01", title: "Contraste ≥ 4.5:1", note: "Texto normal. AAA para texto importante (7:1). Ferramenta: WebAIM Contrast Checker." },
  { n: "02", title: "Foco visível sempre", note: "Ring 2px #F5F5F0 + offset 2px. Nunca outline:none sem alternativa." },
  { n: "03", title: "Tab order lógico", note: "Segue fluxo visual. tabindex=0 só onde necessário. Skip links no topo." },
  { n: "04", title: "prefers-reduced-motion", note: "Desliga animation/transition não-essencial. Motion é estético, nunca bloqueante." },
  { n: "05", title: "Alt em toda imagem", note: "Descritivo ou alt=\"\" se decorativo. Logos: alt=\"SINAPSE\"." },
  { n: "06", title: "Semântica HTML correta", note: "<button> pra ações, <a> pra navegação. <h1> único por página, hierarquia sem pulos." },
  { n: "07", title: "ARIA quando necessário", note: "aria-label em botão icon-only, aria-current em nav active, aria-live em toast." },
  { n: "08", title: "Forms labeled", note: "<label for> ou aria-label. Erros com aria-describedby. Required com aria-required." },
  { n: "09", title: "Zoom até 200%", note: "Layout não quebra. Texto reflow, sem scroll horizontal forçado." },
  { n: "10", title: "Touch target ≥ 44px", note: "Mobile/tablet. Hit area mínima, mesmo que visual seja menor." },
];

const MOTION_RULES = [
  { token: "Essential", desc: "Feedback de ação (click, submit, navigation). MANTIDO com prefers-reduced-motion." },
  { token: "Decorative", desc: "Grain shift, parallax, reveal on scroll, marquee. DESLIGADO com prefers-reduced-motion." },
  { token: "Transform", desc: "Usar transform/opacity (GPU). Nunca animar width/height/top/left." },
  { token: "Duration", desc: "50-250ms UI. 400-800ms reveal. Nunca > 1s sem user control." },
];

export default function Accessibility() {
  return (
    <main className="min-h-screen flex flex-col overflow-x-hidden">
      <Nav />
      <PageHeader
        section="Accessibility"
        number="A.0"
        title="WCAG 2.2 AA."
        emphasis="Não-negociável."
        subtitle="Acessibilidade é infraestrutura, não camada. Toda decisão visual passa por contraste, foco, teclado, motion e semântica antes de publicar."
        tokens="10 checks · 6 pairs"
      />

      {/* CONTRAST MATRIX */}
      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <MetaLabel>[01] / Contrast Matrix</MetaLabel>
          <h2 className="mt-4 font-display font-light text-[clamp(3.25rem,5vw,4rem)] leading-[0.95] tracking-[-0.04em] mb-10 md:mb-14 max-w-[22ch] text-balance">
            Contraste <span className="font-medium italic">medido.</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {CONTRAST_PAIRS.map((c) => (
              <div
                key={c.label}
                className="relative aspect-[5/3] flex flex-col justify-between p-6"
                style={{ background: c.bg, color: c.fg }}
              >
                <div className="flex items-start justify-between">
                  <div className="font-mono text-[10px] tracking-[0.3em] opacity-70">
                    {c.label.toUpperCase()}
                  </div>
                  <div
                    className="font-mono text-[10px] tracking-[0.2em] px-2 py-1 border"
                    style={{ borderColor: c.fg, opacity: c.grade === "FAIL" ? 1 : 0.8 }}
                  >
                    {c.grade}
                  </div>
                </div>
                <div>
                  <div className="font-display font-light text-3xl md:text-6xl leading-none tracking-tight">
                    {c.ratio}:1
                  </div>
                  <div className="mt-2 font-mono text-[10px] tracking-[0.3em] opacity-60">
                    {c.fg} / {c.bg}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 font-sans text-sm opacity-60 max-w-[42rem] leading-relaxed">
            Mínimo AA (4.5:1 normal, 3:1 large 18pt+). AAA (7:1) para texto crítico. Gray 500 em Bone FAIL — usar Gray 700+ pra texto secundário em fundo claro.
          </p>
        </Container>
      </section>

      {/* FOCUS STATES */}
      <section className="border-b border-border bg-card">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <MetaLabel>[02] / Focus States</MetaLabel>
          <h2 className="mt-4 font-display font-light text-[clamp(3.25rem,5vw,4rem)] leading-[0.95] tracking-[-0.04em] mb-10 md:mb-14 max-w-[22ch] text-balance">
            Foco visível <span className="font-medium italic">em tudo.</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-px bg-border border border-border">
            <div className="bg-background p-8 md:p-10 flex flex-col gap-6">
              <div className="font-mono text-[10px] tracking-[0.3em] opacity-50">BUTTON</div>
              <button className="px-6 py-3 border border-foreground bg-foreground text-background font-mono text-[11px] tracking-[0.25em] focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background hover:bg-background hover:text-foreground transition-colors">
                TRY TAB
              </button>
              <div className="mt-auto font-mono text-[10px] tracking-[0.25em] opacity-50">
                ring-2 · offset-2
              </div>
            </div>
            <div className="bg-background p-8 md:p-10 flex flex-col gap-6">
              <div className="font-mono text-[10px] tracking-[0.3em] opacity-50">INPUT</div>
              <input
                type="text"
                placeholder="focus here"
                className="w-full px-4 py-3 border border-border bg-transparent font-sans text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:border-foreground transition-colors"
              />
              <div className="mt-auto font-mono text-[10px] tracking-[0.25em] opacity-50">
                border → foreground
              </div>
            </div>
            <div className="bg-background p-8 md:p-10 flex flex-col gap-6">
              <div className="font-mono text-[10px] tracking-[0.3em] opacity-50">LINK</div>
              <a
                href="#"
                className="inline-block font-display text-xl tracking-tight underline underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-4 focus-visible:ring-offset-background"
              >
                Link example
              </a>
              <div className="mt-auto font-mono text-[10px] tracking-[0.25em] opacity-50">
                offset-4 · underline
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CHECKLIST */}
      <section className="border-b border-border pattern-dots">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <MetaLabel>[03] / Checklist</MetaLabel>
          <h2 className="mt-4 font-display font-light text-[clamp(3.25rem,5vw,4rem)] leading-[0.95] tracking-[-0.04em] mb-10 md:mb-14 max-w-[24ch]">
            10 checks. <span className="font-medium italic">Antes de push.</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-border border border-border">
            {CHECKLIST.map((c) => (
              <article
                key={c.n}
                className="bg-background p-6 md:p-8 hover:bg-card transition-colors"
              >
                <div className="font-display font-light text-6xl md:text-6xl leading-[0.85] tracking-[-0.05em] opacity-20">
                  {c.n}
                </div>
                <h3 className="mt-4 font-display font-medium text-base md:text-lg tracking-tight leading-tight">
                  {c.title}
                </h3>
                <p className="mt-2 font-sans text-xs opacity-60 leading-relaxed">
                  {c.note}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* MOTION + REDUCED-MOTION */}
      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <MetaLabel>[04] / Motion Governance</MetaLabel>
          <h2 className="mt-4 font-display font-light text-[clamp(3.25rem,5vw,4rem)] leading-[0.95] tracking-[-0.04em] mb-10 md:mb-14 max-w-[24ch]">
            Motion opcional. <span className="font-medium italic">Sempre.</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-px bg-border border border-border">
            {MOTION_RULES.map((r) => (
              <div key={r.token} className="bg-background p-8 md:p-10">
                <div className="font-mono text-[10px] tracking-[0.3em] opacity-50 mb-4">
                  {r.token.toUpperCase()}
                </div>
                <p className="font-sans text-sm md:text-base leading-relaxed opacity-80">
                  {r.desc}
                </p>
              </div>
            ))}
          </div>
          <pre className="mt-10 bg-card border border-border p-6 md:p-8 font-mono text-xs md:text-sm leading-relaxed overflow-x-auto">
{`@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}`}
          </pre>
        </Container>
      </section>

      {/* KEYBOARD NAV */}
      <section className="border-b border-border bg-card">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <MetaLabel>[05] / Keyboard Navigation</MetaLabel>
          <h2 className="mt-4 font-display font-light text-[clamp(3.25rem,5vw,4rem)] leading-[0.95] tracking-[-0.04em] mb-10 md:mb-14 max-w-[24ch]">
            Tudo navegável <span className="font-medium italic">sem mouse.</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-px bg-border border border-border">
            {[
              { key: "Tab", desc: "Avança foco" },
              { key: "Shift+Tab", desc: "Recua foco" },
              { key: "Enter", desc: "Ativa botão/link" },
              { key: "Space", desc: "Ativa botão, toggle checkbox" },
              { key: "Esc", desc: "Fecha modal/dropdown" },
              { key: "Arrows", desc: "Nav em menus, tabs, radios" },
            ].map((k) => (
              <div key={k.key} className="bg-background p-6 md:p-8 flex items-center gap-6">
                <kbd className="font-mono text-xs md:text-sm tracking-[0.15em] px-3 py-2 border border-border bg-card min-w-[80px] text-center">
                  {k.key}
                </kbd>
                <span className="font-sans text-sm md:text-base opacity-80">{k.desc}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <NextSectionAuto current="A.0" />
      <Footer />
    </main>
  );
}
