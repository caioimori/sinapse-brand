import type { Metadata } from "next";
import { Container } from "@/components/brand/container";
import { MetaLabel } from "@/components/brand/meta";
import { Nav } from "@/components/brand/nav";
import { Footer } from "@/components/brand/footer";
import { NextSectionAuto } from "@/components/brand/next-section-auto";
import { PageHeader } from "@/components/brand/page-header";

export const metadata: Metadata = {
  title: "Typography — SINAPSE Foundations",
  description: "Sistema tipográfico SINAPSE: Sora (display), Inter (sans), JetBrains Mono (mono). Escala modular, pesos controlados.",
};

const FAMILIES = [
  {
    role: "DISPLAY",
    name: "Sora",
    var: "--font-display",
    weights: ["100", "200", "300", "400", "500", "600", "700", "800"],
    usage: "H1-H4 · Titles · Hero · Editorial statements",
    note: "Geometric premium. Letter-spacing trabalhado entre -0.02 e -0.05em. Pesos light (300) e medium (500) dominam.",
    stack: '"Sora", "Inter", system-ui, sans-serif',
  },
  {
    role: "SANS",
    name: "Inter",
    var: "--font-sans",
    weights: ["400", "500", "600"],
    usage: "Body · UI · Paragraphs · Forms · Tables",
    note: "Neutro, legível, baseline reliable. Size 13-18px. Weight 400 default, 500 para labels.",
    stack: '"Inter", system-ui, sans-serif',
  },
  {
    role: "MONO",
    name: "JetBrains Mono",
    var: "--font-mono",
    weights: ["400", "500"],
    usage: "Meta labels · Code · HUD · Nav · Technical",
    note: "Caps + letter-spacing [0.25-0.3em]. Size 10-12px. Trackng wide pra feeling técnico.",
    stack: '"JetBrains Mono", "Geist Mono", monospace',
  },
];

const SCALE = [
  { label: "DISPLAY", size: "clamp(3.5rem, 9vw, 8rem)", sizePx: "56 → 128px", weight: 300, text: "Uma marca. Uma lei.", line: "0.92", track: "-0.045em" },
  { label: "H1", size: "clamp(3.25rem, 5.5vw, 4.5rem)", sizePx: "52 → 72px", weight: 300, text: "Minimalismo como arma.", line: "0.95", track: "-0.04em" },
  { label: "H2", size: "clamp(3.25rem, 4.5vw, 3.75rem)", sizePx: "52 → 60px", weight: 300, text: "Um sistema construído pra escala.", line: "1", track: "-0.035em" },
  { label: "H3", size: "clamp(1.5rem, 3.5vw, 1.875rem)", sizePx: "24 → 30px", weight: 400, text: "Arquitetando IA corporativa.", line: "1.1", track: "-0.03em" },
  { label: "H4", size: "1.5rem", sizePx: "24px", weight: 500, text: "Brandbook · Estratégia · Voz", line: "1.2", track: "-0.02em" },
  { label: "BODY LG", size: "1.125rem", sizePx: "18px", weight: 400, text: "A fonte da verdade visual, verbal e estrutural da SINAPSE. Brandbook, design system e showcase — um só lugar, uma só lei.", line: "1.6", track: "-0.005em" },
  { label: "BODY", size: "1rem", sizePx: "16px", weight: 400, text: "Preto e branco absoluto. Tipografia carrega peso. Motion e patterns potencializam o vazio. Nada acidental.", line: "1.6", track: "0" },
  { label: "BODY SM", size: "0.875rem", sizePx: "14px", weight: 400, text: "Cores funcionais como erro e sucesso ficam fora do brand — reservadas para status de sistema.", line: "1.55", track: "0" },
  { label: "META", size: "0.625rem", sizePx: "10px", weight: 500, text: "[01] / SYSTEM OVERVIEW · 04 PILARES", line: "1.4", track: "0.3em" },
];

const ALPHABETS = [
  { label: "LOWERCASE", text: "abcdefghijklmnopqrstuvwxyz" },
  { label: "UPPERCASE", text: "ABCDEFGHIJKLMNOPQRSTUVWXYZ" },
  { label: "NUMERALS", text: "0123456789" },
  { label: "GLYPHS", text: "— / · → ← ↓ ↑ @ # % & * + [ ] { } ( )" },
];

export default function Typography() {
  return (
    <main className="min-h-screen flex flex-col overflow-x-hidden">
      <Nav />
      <PageHeader
        section="Foundations · Typography"
        number="2.1"
        title="Três famílias."
        emphasis="Uma voz."
        subtitle="Sora carrega peso visual. Inter carrega informação. JetBrains Mono carrega marcação técnica. Cada uma no seu papel — nunca trocam."
        tokens="3 families · 9 pesos · 9 níveis"
        prev={{ label: "Foundations", href: "/brandbook/2.0-foundations" }}
        next={{ label: "Color", href: "/brandbook/2.2-color" }}
      />

      {/* FAMILIES */}
      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <MetaLabel>[01] / Font Families</MetaLabel>
          <h2 className="mt-4 font-display font-light text-[clamp(3.25rem,5vw,4rem)] leading-[1] tracking-[-0.035em] text-balance mb-12 md:mb-16">
            Três papéis. <span className="font-medium italic">Zero sobreposição.</span>
          </h2>

          <div className="space-y-10 md:space-y-16">
            {FAMILIES.map((f) => (
              <div key={f.name} className="border-t border-border pt-8 md:pt-10 grid md:grid-cols-[1fr,2fr] gap-8 md:gap-12">
                <div>
                  <MetaLabel>{f.role}</MetaLabel>
                  <div
                    className="mt-3 font-medium text-5xl md:text-6xl leading-[0.95] tracking-[-0.03em]"
                    style={{ fontFamily: `var(${f.var})` }}
                  >
                    {f.name}
                  </div>
                  <div className="mt-4 font-mono text-[10px] tracking-[0.25em] opacity-50">
                    {f.var}
                  </div>
                  <p className="mt-5 font-sans text-sm opacity-65 leading-relaxed max-w-[48ch]">{f.note}</p>
                  <div className="mt-5 font-mono text-[10px] tracking-[0.2em] opacity-40 break-all">
                    {f.stack}
                  </div>
                </div>
                <div>
                  <MetaLabel>WEIGHTS</MetaLabel>
                  <div className="mt-4 flex flex-wrap gap-5 md:gap-7">
                    {f.weights.map((w) => (
                      <div key={w} className="border border-border px-5 py-4 flex-1 min-w-[120px]">
                        <div className="font-mono text-[9px] tracking-[0.25em] opacity-50 mb-2">{w}</div>
                        <div style={{ fontFamily: `var(${f.var})`, fontWeight: Number(w) }} className="text-2xl md:text-3xl tracking-tight leading-none">
                          Aa
                        </div>
                      </div>
                    ))}
                  </div>
                  <MetaLabel className="mt-8">USAGE</MetaLabel>
                  <p className="mt-3 font-mono text-xs md:text-sm opacity-65 tracking-wide">{f.usage}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* SCALE */}
      <section className="border-b border-border pattern-dots">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <MetaLabel>[02] / Type Scale</MetaLabel>
          <h2 className="mt-4 font-display font-light text-[clamp(3.25rem,5vw,4rem)] leading-[1] tracking-[-0.035em] text-balance mb-12 md:mb-16">
            Nove níveis. <span className="font-medium italic">Hierarquia clara.</span>
          </h2>

          <div className="border-t border-border">
            {SCALE.map((s) => (
              <div key={s.label} className="border-b border-border py-6 md:py-10 grid md:grid-cols-[160px,1fr] gap-4 md:gap-10">
                <div className="flex flex-col gap-2 shrink-0">
                  <MetaLabel>{s.label}</MetaLabel>
                  <div className="font-mono text-[10px] tracking-[0.2em] opacity-50">{s.sizePx}</div>
                  <div className="font-mono text-[10px] tracking-[0.2em] opacity-40">weight {s.weight}</div>
                  <div className="font-mono text-[10px] tracking-[0.2em] opacity-40">track {s.track}</div>
                </div>
                <p
                  className={s.label.startsWith("BODY") || s.label === "META" ? "font-sans opacity-85" : "font-display"}
                  style={{
                    fontSize: s.size,
                    fontWeight: s.weight,
                    lineHeight: s.line,
                    letterSpacing: s.track,
                    fontFamily: s.label === "META" ? "var(--font-mono)" : undefined,
                    textTransform: s.label === "META" ? "uppercase" : undefined,
                  }}
                >
                  {s.text}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ALPHABET */}
      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <MetaLabel>[03] / Alphabet · Sora</MetaLabel>
          <h2 className="mt-4 font-display font-light text-[clamp(3.25rem,5vw,4rem)] leading-[1] tracking-[-0.035em] text-balance mb-12">
            Cada letra. <span className="font-medium italic">Cada glifo.</span>
          </h2>

          <div className="border-t border-border">
            {ALPHABETS.map((a) => (
              <div key={a.label} className="border-b border-border py-5 md:py-7 grid md:grid-cols-[160px,1fr] gap-4 md:gap-10">
                <MetaLabel>{a.label}</MetaLabel>
                <p className="font-display font-light text-2xl md:text-4xl lg:text-5xl leading-[1.2] tracking-tight break-all">
                  {a.text}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* RULES */}
      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <MetaLabel>[04] / Rules</MetaLabel>
          <h2 className="mt-4 font-display font-light text-[clamp(3.25rem,5vw,4rem)] leading-[1] tracking-[-0.035em] text-balance mb-12">
            Non-negotiable.
          </h2>

          <div className="grid md:grid-cols-2 gap-px bg-border border border-border">
            {[
              ["Máximo 2 pesos tipográficos por tela", "Light + Medium ou Regular + Medium. Nunca misture 3 pesos visíveis simultaneamente."],
              ["Hero sempre em Sora light ou medium", "Nunca bold. Nunca weight 700+ em display. Restrição como virtude."],
              ["Mono tem tracking 0.25-0.3em", "Meta labels, nav items, códigos. Sempre uppercase. Sempre wide."],
              ["Body em Inter regular 400", "Leading 1.55-1.65. Size 15-18px. Max-width de texto ~65-75ch."],
              ["Tamanhos extremos ou nada", "14px ou 64px+. Evite o range 32-48px médio de SaaS genérico."],
              ["Italic é raro e proposital", "Usar italic só pra emphasis narrativo (ex: \"sem aumentar\"). Nunca para quote ou citation padrão."],
            ].map(([rule, note]) => (
              <div key={rule} className="bg-background p-6 md:p-10">
                <div className="font-display font-medium text-lg md:text-xl tracking-tight leading-tight mb-3">{rule}</div>
                <p className="font-sans text-sm opacity-60 leading-relaxed">{note}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <NextSectionAuto current="2.1" />
      <Footer />
    </main>
  );
}
