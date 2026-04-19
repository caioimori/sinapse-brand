import type { Metadata } from "next";
import { Container } from "@/components/brand/container";
import { Nav } from "@/components/brand/nav";
import { Footer } from "@/components/brand/footer";
import { NextSectionAuto } from "@/components/brand/next-section-auto";
import { PageHeader } from "@/components/brand/page-header";
import { MetaLabel } from "@/components/brand/meta";

export const metadata: Metadata = {
  title: "Navigation — SINAPSE Visual",
  description: "Navbar · sidebar · breadcrumbs · pagination · tabs · footer 4-col.",
};

export default function Navigation() {
  return (
    <main className="min-h-screen flex flex-col overflow-x-hidden">
      <Nav />
      <PageHeader
        section="Visual · Navigation"
        number="V.N"
        title="Padrões de navegação."
        emphasis="6 patterns demonstrados."
        subtitle="Breadcrumbs · tabs · pagination · sidebar pinning · navbar mega menu · footer 4-col. Cada pattern em uso real no próprio brand."
        tokens="6 patterns"
      />

      {/* Breadcrumbs */}
      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <SectionHeading n="01" l="Breadcrumbs" />
          <nav className="bg-background border border-border p-5 flex items-center gap-2 font-mono text-xs tracking-wide flex-wrap rounded-lg">
            <a href="/" className="opacity-60 hover:opacity-100 link-cs">Home</a>
            <span className="opacity-40">/</span>
            <a href="#" className="opacity-60 hover:opacity-100 link-cs">Visual</a>
            <span className="opacity-40">/</span>
            <a href="#" className="opacity-60 hover:opacity-100 link-cs">Navigation</a>
            <span className="opacity-40">/</span>
            <span className="opacity-100">Patterns</span>
          </nav>
        </Container>
      </section>

      {/* Tabs */}
      <section className="border-b border-border bg-muted">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <SectionHeading n="02" l="Tabs" />
          <div className="bg-background border border-border rounded-lg overflow-hidden">
            <div role="tablist" className="flex border-b border-border overflow-x-auto">
              {["Geral", "Tokens", "Components", "Motion", "Shaders"].map((t, i) => (
                <button
                  key={t}
                  role="tab"
                  aria-selected={i === 0}
                  className={`px-5 py-3.5 font-mono text-[11px] tracking-[0.22em] uppercase whitespace-nowrap border-b-2 ${i === 0 ? "border-foreground opacity-100" : "border-transparent opacity-60 hover:opacity-100"}`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div role="tabpanel" className="p-6 md:p-8">
              <p className="font-sans text-base opacity-70">Conteúdo da aba ativa. Trocar tab → swap content fade 250ms.</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Pagination */}
      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <SectionHeading n="03" l="Pagination" />
          <nav className="flex items-center justify-center gap-1">
            <button className="w-10 h-10 border border-border rounded-lg font-mono text-[11px] flex items-center justify-center hover:bg-muted">‹</button>
            {[1, 2, 3, 4, 5].map((p) => (
              <button key={p} className={`w-10 h-10 border rounded-lg font-mono text-[11px] flex items-center justify-center ${p === 2 ? "bg-foreground text-background border-foreground" : "border-border hover:bg-muted"}`}>
                {p}
              </button>
            ))}
            <span className="px-2 opacity-40">…</span>
            <button className="w-10 h-10 border border-border rounded-lg font-mono text-[11px] flex items-center justify-center hover:bg-muted">12</button>
            <button className="w-10 h-10 border border-border rounded-lg font-mono text-[11px] flex items-center justify-center hover:bg-muted">›</button>
          </nav>
        </Container>
      </section>

      {/* Sidebar pin */}
      <section className="border-b border-border bg-muted">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <SectionHeading n="04" l="Sidebar pin · sections nav" />
          <div className="grid md:grid-cols-[220px,1fr] gap-0 bg-background border border-border min-h-[360px] rounded-lg overflow-hidden">
            <aside className="md:border-r border-border p-5">
              <MetaLabel>// SECTIONS</MetaLabel>
              <ul className="mt-4 space-y-1.5">
                {["01 Manifesto", "02 Propósito", "03 Arquétipo", "04 Posicionamento", "05 BrandScript"].map((s, i) => (
                  <li key={s}>
                    <a className={`block py-1.5 font-sans text-sm cursor-pointer ${i === 1 ? "text-foreground" : "opacity-65 hover:opacity-100"}`}>
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
            <div className="p-6 md:p-8">
              <h3 className="font-display text-2xl tracking-tight">Conteúdo da section ativa</h3>
              <p className="mt-3 font-sans text-sm opacity-70">Sidebar fica sticky no scroll. Section ativa highlight.</p>
            </div>
          </div>
        </Container>
      </section>

      <NextSectionAuto current="V.N" />
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
