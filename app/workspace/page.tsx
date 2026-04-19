import type { Metadata } from "next";
import { Container } from "@/components/brand/container";
import { Nav } from "@/components/brand/nav";
import { Footer } from "@/components/brand/footer";
import { NextSectionAuto } from "@/components/brand/next-section-auto";
import { PageHeader } from "@/components/brand/page-header";
import { CornerBrackets } from "@/components/brand/corner-brackets";
import { Download, Folder, FileImage, Type, Code, Palette } from "lucide-react";

export const metadata: Metadata = {
  title: "Workspace — SINAPSE Brand",
  description: "Assets · templates · downloads centrais.",
};

const KITS = [
  { I: FileImage, label: "Logo · Vanta Lockup", size: "SVG", desc: "Versão escura — usar em fundo claro", href: "/brand/logo/vanta/sinapse-lockup.svg" },
  { I: FileImage, label: "Logo · Bone Lockup", size: "SVG", desc: "Versão clara — usar em fundo escuro", href: "/brand/logo/bone/sinapse-lockup.svg" },
  { I: FileImage, label: "Logo · Vanta Symbol", size: "SVG", desc: "Símbolo escuro isolado", href: "/brand/logo/vanta/sinapse-symbol.svg" },
  { I: FileImage, label: "Logo · Bone Symbol", size: "SVG", desc: "Símbolo claro isolado", href: "/brand/logo/bone/sinapse-symbol.svg" },
  { I: FileImage, label: "Logo · Wordmark", size: "SVG", desc: "Typographic wordmark SINAPSE", href: "/brand/logo/vanta/sinapse-wordmark.svg" },
  { I: Palette, label: "Tokens · Export", size: "WEB", desc: "Veja em /brandbook/token-export · JSON · CSS · TS", href: "/brandbook/token-export" },
  { I: Type, label: "Fontes · Google Fonts", size: "EXT", desc: "Sora · Inter · JetBrains Mono — self-hosted via next/font", href: "https://fonts.google.com/?query=sora+inter+jetbrains+mono" },
  { I: Folder, label: "Guidelines · PDF view", size: "WEB", desc: "12 princípios NON-NEGOTIABLE · imprima se quiser", href: "/brandbook/0.0-guidelines" },
  { I: Code, label: "Repo · GitHub", size: "GIT", desc: "git clone https://github.com/caioimori/sinapse-brand.git", href: "https://github.com/caioimori/sinapse-brand" },
  { I: Download, label: "Social Kit", size: "WEB", desc: "Templates IG · LinkedIn · X · YouTube", href: "/social-kit" },
];

export default function Workspace() {
  return (
    <main className="min-h-screen flex flex-col overflow-x-hidden">
      <Nav />
      <PageHeader
        section="Workspace"
        number="0.2"
        title="Assets · templates · downloads."
        emphasis="Tudo num lugar."
        subtitle="Brand pack · logos · tokens · slides · fontes · boilerplate. Pra time interno e parceiros."
        tokens="6 kits"
      />

      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {KITS.map((k) => (
              <a
                key={k.label}
                href={k.href}
                {...(k.href.endsWith(".svg") ? { download: true } : {})}
                {...(k.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group/kit block"
              >
                <CornerBrackets className="bg-background border border-border p-6 md:p-8 flex items-start gap-5 transition-colors duration-base ease-smooth group-hover/kit:bg-foreground group-hover/kit:text-background min-h-[140px]">
                  <div className="shrink-0 w-12 h-12 border border-current rounded-lg flex items-center justify-center">
                    <k.I size={20} strokeWidth={1.6} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-3 flex-wrap">
                      <div className="font-display text-lg md:text-xl tracking-tight">{k.label}</div>
                      <div className="font-mono text-[10px] tracking-[0.22em] opacity-60 uppercase">{k.size}</div>
                    </div>
                    <p className="mt-1 font-sans text-sm opacity-70 leading-relaxed">{k.desc}</p>
                  </div>
                  <Download size={18} strokeWidth={1.6} className="shrink-0 opacity-50 transition-transform duration-base ease-smooth group-hover/kit:translate-x-1 group-hover/kit:opacity-100" />
                </CornerBrackets>
              </a>
            ))}
          </div>
        </Container>
      </section>

      <NextSectionAuto current="0.2" />
      <Footer />
    </main>
  );
}
