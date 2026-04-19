import type { Metadata } from "next";
import { Container } from "@/components/brand/container";
import { Nav } from "@/components/brand/nav";
import { Footer } from "@/components/brand/footer";
import { NextSectionAuto } from "@/components/brand/next-section-auto";
import { PageHeader } from "@/components/brand/page-header";
import { MetaLabel } from "@/components/brand/meta";
import { StepperDemo, CommandPaletteDemo, ToggleGroupDemo } from "./advanced-demos";

export const metadata: Metadata = {
  title: "Advanced — SINAPSE Visual",
  description: "Tabs · accordion · stepper · command palette · combobox · toggle.",
};

export default function Advanced() {
  return (
    <main className="min-h-screen flex flex-col overflow-x-hidden">
      <Nav />
      <PageHeader
        section="Visual · Advanced"
        number="V.A"
        title="Advanced components."
        emphasis="Stepper · Cmd · Toggle · Popover."
        subtitle="Componentes avançados em demo ao vivo. Stepper de processo · Command palette (cmdk-style) · Toggle group · Tooltip · Popover."
        tokens="5 demos"
      />

      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <SectionHeading n="01" l="Stepper · click pra avançar" />
          <StepperDemo />
        </Container>
      </section>

      <section className="border-b border-border bg-muted">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <SectionHeading n="02" l="Command palette" />
          <div className="flex justify-center py-8">
            <CommandPaletteDemo />
          </div>
        </Container>
      </section>

      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <SectionHeading n="03" l="Toggle group" />
          <div className="flex flex-col gap-4">
            <ToggleGroupDemo />
            <p className="font-mono text-[10px] tracking-[0.22em] opacity-50 uppercase">click pra trocar período</p>
          </div>
        </Container>
      </section>

      <section className="border-b border-border bg-muted">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <SectionHeading n="04" l="Tooltip + Popover · hover" />
          <div className="flex items-center gap-6 flex-wrap">
            <button
              type="button"
              title="Tooltip nativo"
              className="bg-background border border-border px-5 py-3 rounded-lg font-mono text-[11px] tracking-[0.22em] hover:bg-muted transition-colors"
            >
              HOVER ME (TITLE)
            </button>
            <div className="relative group/pop">
              <button
                type="button"
                className="bg-background border border-border px-5 py-3 rounded-lg font-mono text-[11px] tracking-[0.22em] hover:bg-muted transition-colors"
              >
                POPOVER ON HOVER
              </button>
              <div className="absolute top-full left-0 mt-2 bg-background border border-border rounded-lg p-4 shadow-lg w-64 opacity-0 invisible group-hover/pop:opacity-100 group-hover/pop:visible transition-all duration-base ease-smooth z-10">
                <MetaLabel>// POPOVER</MetaLabel>
                <p className="mt-2 font-sans text-sm opacity-80">Conteúdo rico aparece aqui no hover ou click.</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <NextSectionAuto current="V.A" />
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
