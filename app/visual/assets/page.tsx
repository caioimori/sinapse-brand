import type { Metadata } from "next";
import { Container } from "@/components/brand/container";
import { Nav } from "@/components/brand/nav";
import { Footer } from "@/components/brand/footer";
import { NextSectionAuto } from "@/components/brand/next-section-auto";
import { PageHeader } from "@/components/brand/page-header";
import { MetaLabel } from "@/components/brand/meta";
import { CornerBrackets } from "@/components/brand/corner-brackets";
import { Download, FileText, Image as ImageIcon, Package, Palette, Type } from "lucide-react";

export const metadata: Metadata = {
  title: "Visual Assets — SINAPSE Visual",
  description: "Logo files · brand pack · favicons · OG images · presets.",
};

const ASSETS = [
  { I: Package, label: "Brand Pack", desc: "Logos SVG/PNG/PDF · todas variants · ZIP", size: "12.4 MB", href: "#" },
  { I: ImageIcon, label: "Logo SVG (Vanta)", desc: "Lockup · Wordmark · Symbol em formato vetorial", size: "84 KB", href: "/brand/logo/vanta/" },
  { I: ImageIcon, label: "Logo SVG (Bone)", desc: "Variantes claras pra fundo escuro", size: "84 KB", href: "/brand/logo/bone/" },
  { I: Palette, label: "Tokens JSON", desc: "Design tokens em format Style Dictionary", size: "8 KB", href: "/brandbook/token-export" },
  { I: FileText, label: "Slides Template", desc: "Apresentação base 16:9 · Keynote / PPTX", size: "3.2 MB", href: "#" },
  { I: Type, label: "Fonts ZIP", desc: "Sora · Inter · JetBrains Mono — versões offline", size: "5.1 MB", href: "#" },
];

export default function Assets() {
  return (
    <main className="min-h-screen flex flex-col overflow-x-hidden">
      <Nav />
      <PageHeader
        section="Visual · Assets"
        number="V.6"
        title="Downloads centrais."
        emphasis="Tudo num lugar."
        subtitle="Logos · brand pack · tokens · slides templates · fontes. Click pra download direto."
        tokens="6 packs"
      />

      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {ASSETS.map((a) => (
              <a key={a.label} href={a.href} className="group/asset block">
                <CornerBrackets className="bg-background border border-border p-6 md:p-8 flex items-start gap-5 transition-colors duration-base ease-smooth group-hover/asset:bg-foreground group-hover/asset:text-background min-h-[140px]">
                  <div className="shrink-0 w-12 h-12 border border-current rounded-lg flex items-center justify-center">
                    <a.I size={20} strokeWidth={1.6} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-3 flex-wrap">
                      <div className="font-display text-lg md:text-xl tracking-tight">{a.label}</div>
                      <div className="font-mono text-[10px] tracking-[0.22em] opacity-60 uppercase">{a.size}</div>
                    </div>
                    <p className="mt-1 font-sans text-sm opacity-70 leading-relaxed">{a.desc}</p>
                  </div>
                  <Download size={18} strokeWidth={1.6} className="shrink-0 opacity-50 transition-transform duration-base ease-smooth group-hover/asset:translate-x-1 group-hover/asset:opacity-100" />
                </CornerBrackets>
              </a>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-border bg-muted">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="bg-background border border-border p-8 md:p-12">
            <MetaLabel>// USAGE LICENSE</MetaLabel>
            <h2 className="mt-3 font-display font-light text-[clamp(1.5rem,4vw,2.5rem)] leading-[1.05] tracking-[-0.035em] max-w-[36ch]">
              Uso interno e parceiros.
            </h2>
            <p className="mt-4 font-sans text-base opacity-70 max-w-2xl leading-relaxed">
              Logos e assets SINAPSE só podem ser usados em contexto autorizado. Para co-branding com clientes, solicite via brand@sinapse.club.
            </p>
          </div>
        </Container>
      </section>

      <NextSectionAuto current="V.6" />
      <Footer />
    </main>
  );
}
