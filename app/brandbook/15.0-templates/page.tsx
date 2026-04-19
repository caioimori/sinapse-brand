import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/brand/container";
import { Nav } from "@/components/brand/nav";
import { Footer } from "@/components/brand/footer";
import { NextSectionAuto } from "@/components/brand/next-section-auto";
import { PageHeader } from "@/components/brand/page-header";
import { MetaLabel } from "@/components/brand/meta";
import { CornerBrackets } from "@/components/brand/corner-brackets";
import { PAGE_TEMPLATES, PageTemplatePreview } from "./page-templates";

export const metadata: Metadata = {
  title: "15.0 Templates — SINAPSE Brand",
  description: "12 page shells + 12 carrosséis IG. Cards/grid mostrando estrutura.",
};

export default function Templates() {
  return (
    <main className="min-h-screen flex flex-col overflow-x-hidden">
      <Nav />
      <PageHeader
        section="Design System · Templates"
        number="15.0"
        title="Library de templates."
        emphasis="12 pages · 12 carrosséis."
        subtitle="Page shells copy-paste · carrosséis Instagram. Cada template em formato wireframe denso pra entender estrutura na hora."
        tokens="24 templates"
      />

      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="flex items-end justify-between gap-4 mb-8 md:mb-12 flex-wrap">
            <div>
              <MetaLabel>[01] / HTML Pages · 12 templates</MetaLabel>
              <h2 className="mt-3 font-display font-light text-[clamp(1.75rem,4.5vw,3.5rem)] leading-[1] tracking-[-0.035em]">
                Estrutura na hora. <span className="font-medium">Copy. Adapt. Use.</span>
              </h2>
            </div>
            <Link href="/brandbook/15.0-templates/carrosseis" className="link-cs font-mono text-[11px] tracking-[0.25em] opacity-65 hover:opacity-100">
              CARROSSÉIS IG →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
            {PAGE_TEMPLATES.map((t) => (
              <CornerBrackets key={t.id} className="bg-background border border-border overflow-hidden flex flex-col group/tpl">
                <div className="bg-card aspect-[16/10] border-b border-border flex items-center justify-center p-3 relative overflow-hidden">
                  <PageTemplatePreview kind={t.kind} />
                  <div className="absolute top-2 right-2 font-mono text-[9px] tracking-[0.22em] opacity-50">{t.id}</div>
                </div>
                <div className="p-4 md:p-5 flex flex-col gap-2 flex-1">
                  <MetaLabel>{t.kind.replace(/-/g, " ").toUpperCase()}</MetaLabel>
                  <h3 className="font-display text-base md:text-lg tracking-tight">{t.name}</h3>
                  <button className="link-cs mt-auto self-start font-mono text-[10px] tracking-[0.22em] opacity-70 hover:opacity-100">
                    USE TEMPLATE →
                  </button>
                </div>
              </CornerBrackets>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-border bg-muted">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <CornerBrackets className="block bg-background border border-border p-8 md:p-12 rounded-xl">
            <div className="grid md:grid-cols-[2fr,1fr] gap-8 items-center">
              <div>
                <MetaLabel>// SUB-LIBRARY</MetaLabel>
                <h2 className="mt-3 font-display font-light text-[clamp(1.5rem,4vw,3rem)] leading-[1.05] tracking-[-0.035em] max-w-[24ch]">
                  12 templates de carrossel Instagram.
                </h2>
                <p className="mt-4 font-sans text-base opacity-65 max-w-xl">
                  Cards/grid mostrando 10 slides cada · format 4:5 · cover + desenvolvimento + CTA.
                </p>
              </div>
              <Link
                href="/brandbook/15.0-templates/carrosseis"
                className="btn-magnetic inline-flex items-center justify-center gap-3 font-mono text-[11px] tracking-[0.25em] px-6 py-4 border border-foreground self-end justify-self-start md:justify-self-end"
              >
                EXPLORAR →
              </Link>
            </div>
          </CornerBrackets>
        </Container>
      </section>

      <NextSectionAuto current="15.0" />
      <Footer />
    </main>
  );
}
