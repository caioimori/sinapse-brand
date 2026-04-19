import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/brand/container";
import { Nav } from "@/components/brand/nav";
import { Footer } from "@/components/brand/footer";
import { NextSectionAuto } from "@/components/brand/next-section-auto";
import { PageHeader } from "@/components/brand/page-header";
import { MetaLabel } from "@/components/brand/meta";
import { CornerBrackets } from "@/components/brand/corner-brackets";

export const metadata: Metadata = {
  title: "2.6 Semantic Tokens — SINAPSE Brand",
  description: "Aliases mapeados pro shadcn/ui. Componentes consomem daqui, nunca primitivos.",
};

const SEMANTIC = [
  { token: "--background", value: "Bone #F5F5F0 / Vanta #0A0A0A", use: "App background base" },
  { token: "--foreground", value: "Bone #0A0A0A / Vanta #F5F5F0", use: "Texto principal" },
  { token: "--card", value: "Bone #FAFAF7 / Vanta #141414", use: "Container elevado" },
  { token: "--card-foreground", value: "= --foreground", use: "Texto sobre card" },
  { token: "--muted", value: "Bone #EFEFEB / Vanta #1A1A1A", use: "Subtle background" },
  { token: "--muted-foreground", value: "alpha 0.55", use: "Texto secundário" },
  { token: "--accent", value: "alpha 0.05/0.08", use: "Hover state" },
  { token: "--border", value: "rgba(currentColor, 0.1)", use: "Hairline divider" },
  { token: "--ring", value: "rgba(currentColor, 0.3)", use: "Focus ring" },
  { token: "--destructive", value: "#FF3A2D", use: "Error states (FORA do brand)" },
  { token: "--success", value: "#00C853", use: "Success states (FORA do brand)" },
];

const SHADCN = [
  { shadcn: "Button.default", maps: "bg-primary text-primary-foreground", primaryToken: "--primary" },
  { shadcn: "Button.outline", maps: "border + bg-background", primaryToken: "--border" },
  { shadcn: "Card", maps: "bg-card border", primaryToken: "--card" },
  { shadcn: "Input", maps: "border-input bg-background", primaryToken: "--input" },
  { shadcn: "Dialog", maps: "bg-background border", primaryToken: "--background" },
  { shadcn: "Toast", maps: "bg-card border + ring", primaryToken: "--ring" },
  { shadcn: "Badge.default", maps: "bg-foreground text-background", primaryToken: "--foreground" },
  { shadcn: "Alert.destructive", maps: "border-destructive text-destructive", primaryToken: "--destructive" },
];

function Swatch({ token, value }: { token: string; value: string }) {
  return (
    <div className="flex items-stretch border border-border bg-background">
      <div
        className="w-16 sm:w-20 shrink-0"
        style={{ background: `var(${token.replace("--", "--")})` }}
      />
      <div className="flex-1 p-3 sm:p-4 flex flex-col gap-1 min-w-0">
        <code className="font-mono text-[11px] tracking-tight">{token}</code>
        <code className="font-mono text-[10px] opacity-60 truncate">{value}</code>
      </div>
    </div>
  );
}

export default function Semantic() {
  return (
    <main className="min-h-screen flex flex-col overflow-x-hidden">
      <Nav />
      <PageHeader
        section="Foundations · Semantic"
        number="2.6"
        title="A camada de intenção."
        emphasis="A ponte com shadcn."
        subtitle="Aliases (--background, --foreground, --card) mapeados explicitamente. Componentes consomem daqui — nunca primitivos. Troca de tema funciona porque a camada semântica abstrai."
        tokens="11 tokens · 8 mappings"
        next={{ label: "Logo", href: "/brandbook/3.0-logo" }}
      />

      {/* Tokens grid */}
      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="flex items-end justify-between gap-4 mb-8 md:mb-12 flex-wrap">
            <div>
              <MetaLabel>[01] / Semantic Tokens</MetaLabel>
              <h2 className="mt-3 font-display font-light text-[clamp(1.5rem,4vw,3rem)] leading-[1.05] tracking-[-0.035em] max-w-[24ch]">
                Onze aliases. <span className="font-medium">Auto-switch theme.</span>
              </h2>
            </div>
            <MetaLabel>11 tokens</MetaLabel>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {SEMANTIC.map((s) => (
              <Swatch key={s.token} token={s.token} value={s.value} />
            ))}
          </div>
        </Container>
      </section>

      {/* shadcn mapping */}
      <section className="border-b border-border bg-muted">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="flex items-end justify-between gap-4 mb-8 md:mb-12 flex-wrap">
            <div>
              <MetaLabel>[02] / shadcn/ui mapping</MetaLabel>
              <h2 className="mt-3 font-display font-light text-[clamp(1.5rem,4vw,3rem)] leading-[1.05] tracking-[-0.035em] max-w-[24ch]">
                shadcn → SINAPSE. <span className="font-medium">Drop-in.</span>
              </h2>
            </div>
          </div>
          <div className="bg-background border border-border overflow-x-auto">
            <table className="w-full min-w-[600px] text-left">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="font-mono text-[10px] tracking-[0.22em] uppercase opacity-60 p-4">Component</th>
                  <th className="font-mono text-[10px] tracking-[0.22em] uppercase opacity-60 p-4">Class mapping</th>
                  <th className="font-mono text-[10px] tracking-[0.22em] uppercase opacity-60 p-4">Primary token</th>
                </tr>
              </thead>
              <tbody>
                {SHADCN.map((s) => (
                  <tr key={s.shadcn} className="border-b border-border last:border-0">
                    <td className="p-4 font-mono text-sm">{s.shadcn}</td>
                    <td className="p-4 font-mono text-xs opacity-70">{s.maps}</td>
                    <td className="p-4">
                      <code className="font-mono text-xs bg-muted px-2 py-1">{s.primaryToken}</code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <CornerBrackets className="block bg-background border border-border p-8 md:p-12">
            <div className="grid md:grid-cols-[2fr,1fr] gap-8 items-end">
              <div>
                <MetaLabel>[03] / Quick start</MetaLabel>
                <h2 className="mt-3 font-display font-light text-[clamp(1.5rem,4vw,3rem)] leading-[1.05] tracking-[-0.035em] max-w-[24ch]">
                  Copia. Cola. <span className="font-medium italic">Acabou.</span>
                </h2>
                <p className="mt-5 font-sans text-base opacity-65 max-w-xl leading-relaxed">
                  Token Export traz o `:root` completo + Tailwind preset + mapping shadcn. Drop direto em qualquer Next.js + Tailwind sem config.
                </p>
              </div>
              <Link
                href="/brandbook/token-export"
                className="btn-magnetic font-mono text-[11px] tracking-[0.25em] px-6 py-4 border border-foreground inline-flex items-center gap-3 self-end justify-self-start md:justify-self-end"
              >
                ABRIR EXPORT →
              </Link>
            </div>
          </CornerBrackets>
        </Container>
      </section>

      <NextSectionAuto current="2.6" />
      <Footer />
    </main>
  );
}
