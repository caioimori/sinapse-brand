import type { Metadata } from "next";
import { Container } from "@/components/brand/container";
import { Nav } from "@/components/brand/nav";
import { Footer } from "@/components/brand/footer";
import { NextSectionAuto } from "@/components/brand/next-section-auto";
import { PageHeader } from "@/components/brand/page-header";
import { MetaLabel } from "@/components/brand/meta";
import { CornerBrackets } from "@/components/brand/corner-brackets";

export const metadata: Metadata = {
  title: "SEO — SINAPSE Visual",
  description: "Meta · Open Graph · Twitter cards · structured data.",
};

export default function SEO() {
  return (
    <main className="min-h-screen flex flex-col overflow-x-hidden">
      <Nav />
      <PageHeader
        section="Visual · SEO"
        number="V.S"
        title="Pacote SEO completo."
        emphasis="Meta · OG · JSON-LD."
        subtitle="Meta tags · Open Graph · Twitter cards · structured data JSON-LD · sitemap.xml · robots.txt · canonical URLs."
        tokens="6 templates"
      />

      {/* OG preview */}
      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <SectionHeading n="01" l="Open Graph preview" />
          <div className="grid md:grid-cols-2 gap-6">
            {/* OG card */}
            <CornerBrackets className="bg-background border border-border overflow-hidden">
              <div className="aspect-[1200/630] bg-foreground text-background p-8 md:p-12 flex flex-col justify-between">
                <MetaLabel>// SINAPSE.CLUB</MetaLabel>
                <div>
                  <h3 className="font-display font-light text-3xl md:text-5xl tracking-tight leading-[0.95] max-w-[14ch]">
                    Escale sem aumentar a folha.
                  </h3>
                  <p className="mt-4 font-sans text-sm md:text-base opacity-70 max-w-md">
                    Hub de soluções IA que executam 24/7 — sem contratar mais gente.
                  </p>
                </div>
              </div>
              <div className="p-4 border-t border-border">
                <code className="font-mono text-[10px] opacity-70">og-image.png · 1200×630 · {"<"}300 KB</code>
              </div>
            </CornerBrackets>

            {/* Twitter card */}
            <CornerBrackets className="bg-background border border-border overflow-hidden">
              <div className="aspect-[2/1] bg-card border-b border-border p-6 md:p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="font-mono text-[10px] tracking-[0.25em] opacity-50 mb-3">// TWITTER:CARD = SUMMARY_LARGE_IMAGE</div>
                  <h3 className="font-display font-light text-2xl md:text-3xl tracking-tight">SINAPSE</h3>
                  <p className="mt-2 font-sans text-sm opacity-65 max-w-xs mx-auto">Source of truth visual</p>
                </div>
              </div>
              <div className="p-4">
                <code className="font-mono text-[10px] opacity-70">twitter:card / image — same OG asset</code>
              </div>
            </CornerBrackets>
          </div>
        </Container>
      </section>

      {/* Meta tags template */}
      <section className="border-b border-border bg-muted">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <SectionHeading n="02" l="Meta tags template" />
          <pre className="bg-background border border-border p-6 font-mono text-[12px] leading-[1.7] overflow-x-auto rounded-lg">
{`<meta name="description" content="..." />
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:image" content="https://sinapse.club/og-image.png" />
<meta property="og:type" content="website" />
<meta property="og:url" content="..." />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="..." />
<meta name="twitter:description" content="..." />
<link rel="canonical" href="..." />`}
          </pre>
        </Container>
      </section>

      {/* JSON-LD */}
      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <SectionHeading n="03" l="Structured data · JSON-LD" />
          <pre className="bg-card border border-border p-6 font-mono text-[12px] leading-[1.7] overflow-x-auto rounded-lg">
{`<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "SINAPSE",
  "url": "https://sinapse.club",
  "logo": "https://sinapse.club/brand/logo/vanta/sinapse-symbol.svg",
  "sameAs": [
    "https://instagram.com/sinapse.club",
    "https://linkedin.com/company/sinapse"
  ]
}
</script>`}
          </pre>
        </Container>
      </section>

      <NextSectionAuto current="V.S" />
      <Footer />
    </main>
  );
}

function SectionHeading({ n, l }: { n: string; l: string }) {
  return (
    <div className="mb-8 md:mb-10">
      <MetaLabel>[{n}] / {l}</MetaLabel>
    </div>
  );
}
