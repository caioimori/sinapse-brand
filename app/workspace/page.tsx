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
  { I: Folder, label: "Brand Pack completo", size: "12 MB", desc: "Logos + tokens + slides + docs em ZIP" },
  { I: FileImage, label: "Logos SVG", size: "84 KB", desc: "Vanta + Bone · 3 variants" },
  { I: Palette, label: "Tokens JSON", size: "8 KB", desc: "Style Dictionary format" },
  { I: Type, label: "Fontes locais", size: "5 MB", desc: "Sora · Inter · JetBrains Mono" },
  { I: Code, label: "Código boilerplate", size: "—", desc: "Next.js + Tailwind + shadcn" },
  { I: Download, label: "Slides templates", size: "3 MB", desc: "Keynote · PPTX · Figma" },
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
              <a key={k.label} href="#" className="group/kit block">
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
