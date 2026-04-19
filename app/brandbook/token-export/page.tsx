import type { Metadata } from "next";
import { Container } from "@/components/brand/container";
import { MetaLabel } from "@/components/brand/meta";
import { Nav } from "@/components/brand/nav";
import { Footer } from "@/components/brand/footer";
import { NextSectionAuto } from "@/components/brand/next-section-auto";
import { PageHeader } from "@/components/brand/page-header";
import { CopyButton } from "@/components/brand/copy-button";

export const metadata: Metadata = {
  title: "Token Export — SINAPSE Brand",
  description: "CSS vars prontas pra colar. Bone + Vanta editions. Compatível Tailwind v3/v4 + shadcn/ui + Next.js.",
};

const BONE_CSS = `/* SINAPSE Brand — Bone Edition (Light) */
/* Cole em globals.css (Tailwind + shadcn/ui friendly) */

@layer base {
  :root {
    /* Palette — Semantic */
    --background: #F5F5F0;
    --foreground: #0A0A0A;
    --primary: #0A0A0A;
    --primary-foreground: #F5F5F0;
    --card: #FAFAF7;
    --card-foreground: #0A0A0A;
    --popover: #FAFAF7;
    --popover-foreground: #0A0A0A;
    --secondary: #EBEBE5;
    --secondary-foreground: #0A0A0A;
    --muted: #EFEFEB;
    --muted-foreground: rgba(10, 10, 10, 0.55);
    --accent: rgba(10, 10, 10, 0.05);
    --accent-foreground: #0A0A0A;
    --border: rgba(0, 0, 0, 0.1);
    --input: rgba(0, 0, 0, 0.12);
    --ring: rgba(0, 0, 0, 0.3);

    /* Functional (fora do brand) */
    --destructive: #FF3A2D;
    --destructive-foreground: #FFFFFF;
    --success: #00C853;
    --success-foreground: #FFFFFF;

    /* Radius */
    --radius: 0.25rem;

    /* Typography */
    --font-display: "Sora", "Inter", system-ui, sans-serif;
    --font-sans: "Inter", system-ui, sans-serif;
    --font-mono: "JetBrains Mono", "Geist Mono", monospace;

    /* Motion */
    --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
    --ease-smooth: cubic-bezier(0.25, 0.1, 0.25, 1);
    --ease-decel: cubic-bezier(0, 0, 0.2, 1);

    /* Durations */
    --dur-fast: 150ms;
    --dur-base: 250ms;
    --dur-slow: 400ms;
    --dur-deliberate: 600ms;

    /* Z-index Stack */
    --layer-base: 0;
    --layer-elevated: 1;
    --layer-sticky: 10;
    --layer-nav: 100;
    --layer-dropdown: 200;
    --layer-overlay: 300;
    --layer-modal: 400;
    --layer-toast: 500;
  }
}`;

const VANTA_CSS = `/* SINAPSE Brand — Vanta Edition (Dark) */
/* Aplique via data-theme="vanta" no <html> ou use como :root */

[data-theme="vanta"] {
  --background: #0A0A0A;
  --foreground: #F5F5F0;
  --primary: #F5F5F0;
  --primary-foreground: #0A0A0A;
  --card: #141414;
  --card-foreground: #F5F5F0;
  --popover: #141414;
  --popover-foreground: #F5F5F0;
  --secondary: #1F1F1F;
  --secondary-foreground: #F5F5F0;
  --muted: #1A1A1A;
  --muted-foreground: rgba(245, 245, 240, 0.45);
  --accent: rgba(245, 245, 240, 0.08);
  --accent-foreground: #F5F5F0;
  --border: rgba(255, 255, 255, 0.1);
  --input: rgba(255, 255, 255, 0.14);
  --ring: rgba(255, 255, 255, 0.3);

  /* Functional, radius, typography, motion e layers: mesmos da Bone */
}`;

const TAILWIND_PRESET = `// tailwind.config.ts — SINAPSE preset
import type { Config } from "tailwindcss";

export const sinapseConfig: Partial<Config> = {
  darkMode: ["class", '[data-theme="vanta"]'],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        accent: "var(--accent)",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        destructive: "var(--destructive)",
        success: "var(--success)",
      },
      fontFamily: {
        display: "var(--font-display)",
        sans: "var(--font-sans)",
        mono: "var(--font-mono)",
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
      },
    },
  },
};`;

const INSTRUCTIONS = [
  { n: "01", step: "Escolha a edição", desc: "Bone (light default) ou Vanta (dark opcional). 90% das LPs SINAPSE usam Bone." },
  { n: "02", step: "Copie o CSS", desc: "Clique no botão Copy do bloco desejado. Todas as vars vão pro clipboard." },
  { n: "03", step: "Cole em globals.css", desc: "No arquivo de CSS global do seu projeto Next.js / React / Vite, dentro de @layer base." },
  { n: "04", step: "Importe as fontes", desc: "Use next/font/google ou link Google Fonts: Sora (100-800) + Inter + JetBrains Mono." },
  { n: "05", step: "(Opcional) Tailwind preset", desc: "Estenda seu tailwind.config com o preset abaixo. Ganha classes tipo bg-primary e font-display." },
];

export default function TokenExport() {
  return (
    <main className="min-h-screen flex flex-col overflow-x-hidden">
      <Nav />
      <PageHeader
        section="Token Export"
        number="2.X"
        title="Copie."
        emphasis="Cole. Use."
        subtitle="CSS custom properties prontas pra qualquer projeto Tailwind, shadcn/ui, Next.js ou React. Compatível v3/v4. Zero dependência, zero config."
        tokens="Bone + Vanta"
        prev={{ label: "Foundations", href: "/brandbook/2.0-foundations" }}
      />

      {/* INSTRUCTIONS */}
      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <MetaLabel>[01] / Instructions</MetaLabel>
          <h2 className="mt-4 font-display font-light text-[clamp(1.75rem,4.5vw,3.5rem)] leading-[1] tracking-[-0.035em] mb-12">
            Em <span className="font-medium italic">5 passos.</span>
          </h2>
          <div className="grid md:grid-cols-5 gap-px bg-border border border-border">
            {INSTRUCTIONS.map((s) => (
              <div key={s.n} className="bg-background p-6 md:p-8">
                <div className="font-mono text-[10px] tracking-[0.3em] opacity-50 mb-4">{s.n}</div>
                <div className="font-display font-medium text-lg tracking-tight mb-3 leading-tight">{s.step}</div>
                <p className="font-sans text-sm opacity-60 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* BONE EDITION */}
      <section className="border-b border-border pattern-dots">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="flex items-end justify-between gap-4 mb-10 flex-wrap">
            <div>
              <MetaLabel>[02] / Bone Edition · Light · Default</MetaLabel>
              <h2 className="mt-4 font-display font-light text-[clamp(1.75rem,4.5vw,3.5rem)] leading-[1] tracking-[-0.035em]">
                Bone <span className="font-medium italic">Edition.</span>
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 border border-border px-3 py-1.5">
                <span className="w-3 h-3 rounded-full border border-border" style={{ background: "#F5F5F0" }} />
                <span className="font-mono text-[10px] tracking-[0.25em] opacity-60">#F5F5F0</span>
              </div>
              <CopyButton text={BONE_CSS} label="COPY CSS" />
            </div>
          </div>

          <pre className="border border-border bg-card p-5 md:p-8 overflow-x-auto font-mono text-[11px] md:text-[12px] leading-[1.65] opacity-85">
            <code>{BONE_CSS}</code>
          </pre>
        </Container>
      </section>

      {/* VANTA EDITION */}
      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="flex items-end justify-between gap-4 mb-10 flex-wrap">
            <div>
              <MetaLabel>[03] / Vanta Edition · Dark · Opt-in</MetaLabel>
              <h2 className="mt-4 font-display font-light text-[clamp(1.75rem,4.5vw,3.5rem)] leading-[1] tracking-[-0.035em]">
                Vanta <span className="font-medium italic">Edition.</span>
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 border border-border px-3 py-1.5">
                <span className="w-3 h-3 rounded-full border border-border" style={{ background: "#0A0A0A" }} />
                <span className="font-mono text-[10px] tracking-[0.25em] opacity-60">#0A0A0A</span>
              </div>
              <CopyButton text={VANTA_CSS} label="COPY CSS" />
            </div>
          </div>

          <pre className="border border-border bg-card p-5 md:p-8 overflow-x-auto font-mono text-[11px] md:text-[12px] leading-[1.65] opacity-85">
            <code>{VANTA_CSS}</code>
          </pre>
        </Container>
      </section>

      {/* TAILWIND PRESET */}
      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="flex items-end justify-between gap-4 mb-10 flex-wrap">
            <div>
              <MetaLabel>[04] / Tailwind Preset</MetaLabel>
              <h2 className="mt-4 font-display font-light text-[clamp(1.75rem,4.5vw,3.5rem)] leading-[1] tracking-[-0.035em]">
                Tailwind <span className="font-medium italic">preset.</span>
              </h2>
              <p className="mt-5 font-sans text-base opacity-60 max-w-xl leading-relaxed">
                Opcional. Adiciona classes como <span className="font-mono text-sm opacity-80">bg-primary</span>,{" "}
                <span className="font-mono text-sm opacity-80">font-display</span> e{" "}
                <span className="font-mono text-sm opacity-80">text-muted-foreground</span> no seu projeto.
              </p>
            </div>
            <CopyButton text={TAILWIND_PRESET} label="COPY PRESET" />
          </div>

          <pre className="border border-border bg-card p-5 md:p-8 overflow-x-auto font-mono text-[11px] md:text-[12px] leading-[1.65] opacity-85">
            <code>{TAILWIND_PRESET}</code>
          </pre>
        </Container>
      </section>

      <NextSectionAuto current="token-export" />
      <Footer />
    </main>
  );
}
