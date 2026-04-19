import type { Metadata } from "next";
import { Container } from "@/components/brand/container";
import { Nav } from "@/components/brand/nav";
import { Footer } from "@/components/brand/footer";
import { NextSectionAuto } from "@/components/brand/next-section-auto";
import { PageHeader } from "@/components/brand/page-header";
import { MetaLabel } from "@/components/brand/meta";
import { CornerBrackets } from "@/components/brand/corner-brackets";

export const metadata: Metadata = {
  title: "15.0 Templates · Carrosséis IG — SINAPSE Brand",
  description: "12 carrosséis Instagram em format 4:5 — 10 slides cada.",
};

const CARROSSEIS = [
  { id: "C.01", name: "Hook + Lista", desc: "Cover provocativo + 8 itens + CTA", category: "Educational" },
  { id: "C.02", name: "Antes vs Depois", desc: "Comparativo 2-col em cada slide", category: "Case study" },
  { id: "C.03", name: "Tutorial Step-by-step", desc: "10 passos numerados · screenshots", category: "Tutorial" },
  { id: "C.04", name: "Mito vs Verdade", desc: "Desmistificar conceitos do mercado", category: "Authority" },
  { id: "C.05", name: "Manifesto Quote", desc: "Frase impactante + desenvolvimento", category: "Brand" },
  { id: "C.06", name: "Dados & Insights", desc: "Cards com stats + interpretação", category: "Data" },
  { id: "C.07", name: "Behind the Scenes", desc: "Foto + bullet point processo", category: "Story" },
  { id: "C.08", name: "Transformação Cliente", desc: "Caso real · problema → solução → resultado", category: "Case study" },
  { id: "C.09", name: "Toolkit · Stack", desc: "10 ferramentas com função explicada", category: "Tutorial" },
  { id: "C.10", name: "Provocação + CTA", desc: "Hook polêmico → argumentação → convite", category: "Sales" },
  { id: "C.11", name: "Lista Vertical Numerada", desc: "10 itens → 1 por slide", category: "Educational" },
  { id: "C.12", name: "Quote + Aprofundamento", desc: "Citação famosa + análise SINAPSE", category: "Brand" },
];

export default function CarrosseisPage() {
  return (
    <main className="min-h-screen flex flex-col overflow-x-hidden">
      <Nav />
      <PageHeader
        section="Design System · Carrosséis IG"
        number="15.0.C"
        title="12 carrosséis Instagram."
        emphasis="10 slides cada · format 4:5."
        subtitle="Templates de carrossel pra Instagram em format 1080×1350. Cada um com 10 slides — cover, desenvolvimento, CTA. Cards mostrando estrutura completa."
        tokens="12 templates · 120 slides"
      />

      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {CARROSSEIS.map((c) => (
              <CornerBrackets key={c.id} className="bg-background border border-border overflow-hidden flex flex-col group/car">
                {/* 10 mini slides preview */}
                <div className="bg-card border-b border-border p-4 flex items-end gap-1 aspect-[16/10]">
                  {Array.from({ length: 10 }).map((_, i) => {
                    const isCover = i === 0;
                    const isCTA = i === 9;
                    return (
                      <div
                        key={i}
                        className={`flex-1 border border-border flex flex-col justify-between p-1 ${isCover ? "bg-foreground" : isCTA ? "bg-foreground/40" : "bg-background"}`}
                        style={{ aspectRatio: "4/5" }}
                      >
                        <div className={`font-mono text-[6px] tracking-widest ${isCover || isCTA ? "text-background opacity-60" : "opacity-30"}`}>
                          {String(i + 1).padStart(2, "0")}
                        </div>
                        {isCover && (
                          <div className="space-y-0.5">
                            <div className="h-px bg-background/60 w-full" />
                            <div className="h-px bg-background/60 w-2/3" />
                          </div>
                        )}
                        {!isCover && !isCTA && (
                          <div className="space-y-0.5">
                            <div className="h-px bg-foreground/40 w-full" />
                            <div className="h-px bg-foreground/40 w-3/4" />
                          </div>
                        )}
                        {isCTA && (
                          <div className="text-[5px] text-background opacity-80 font-mono leading-tight">
                            CTA
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="p-5 flex flex-col gap-3 flex-1">
                  <div className="flex items-baseline justify-between gap-3 flex-wrap">
                    <MetaLabel>{c.id}</MetaLabel>
                    <span className="font-mono text-[10px] tracking-[0.18em] opacity-50">{c.category}</span>
                  </div>
                  <h3 className="font-display text-lg md:text-xl tracking-tight">{c.name}</h3>
                  <p className="font-sans text-sm opacity-65 leading-relaxed">{c.desc}</p>
                  <button className="link-cs mt-auto self-start font-mono text-[10px] tracking-[0.22em] opacity-70 hover:opacity-100">
                    USE TEMPLATE →
                  </button>
                </div>
              </CornerBrackets>
            ))}
          </div>
        </Container>
      </section>

      <NextSectionAuto current="15.0" />
      <Footer />
    </main>
  );
}
