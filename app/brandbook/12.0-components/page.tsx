import type { Metadata } from "next";
import { Container } from "@/components/brand/container";
import { Nav } from "@/components/brand/nav";
import { Footer } from "@/components/brand/footer";
import { NextSectionAuto } from "@/components/brand/next-section-auto";
import { PageHeader } from "@/components/brand/page-header";
import { MetaLabel } from "@/components/brand/meta";
import {
  ButtonShowcase,
  CardShowcase,
  FormShowcase,
  FeedbackShowcase,
} from "./components-demos";

export const metadata: Metadata = {
  title: "12.0 Components — SINAPSE Brand",
  description: "Library shadcn-compatible: buttons · cards · forms · feedback · states.",
};

export default function Components() {
  return (
    <main className="min-h-screen flex flex-col overflow-x-hidden">
      <Nav />
      <PageHeader
        section="Design System · Components"
        number="12.0"
        title="Os blocos de construção."
        emphasis="shadcn-compatible."
        subtitle="Buttons · cards · forms · feedback · states · tables. Cada componente consome semantic tokens — troca de tema funciona out-of-box."
        tokens="6 categorias"
        next={{ label: "Shaders", href: "/brandbook/13.0-shaders" }}
      />

      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="flex items-end justify-between gap-4 mb-8 md:mb-12 flex-wrap">
            <div>
              <MetaLabel>[12.1] / Buttons</MetaLabel>
              <h2 className="mt-3 font-display font-light text-[clamp(1.75rem,4.5vw,3.25rem)] leading-[1.05] tracking-[-0.035em]">
                Buttons. <span className="font-medium">6 variants.</span>
              </h2>
            </div>
          </div>
          <ButtonShowcase />
        </Container>
      </section>

      <section className="border-b border-border bg-muted">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="flex items-end justify-between gap-4 mb-8 md:mb-12 flex-wrap">
            <div>
              <MetaLabel>[12.2] / Cards</MetaLabel>
              <h2 className="mt-3 font-display font-light text-[clamp(1.75rem,4.5vw,3.25rem)] leading-[1.05] tracking-[-0.035em]">
                Cards. <span className="font-medium">6 patterns.</span>
              </h2>
            </div>
          </div>
          <CardShowcase />
        </Container>
      </section>

      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="flex items-end justify-between gap-4 mb-8 md:mb-12 flex-wrap">
            <div>
              <MetaLabel>[12.3] / Forms</MetaLabel>
              <h2 className="mt-3 font-display font-light text-[clamp(1.75rem,4.5vw,3.25rem)] leading-[1.05] tracking-[-0.035em]">
                Forms. <span className="font-medium">Accessible defaults.</span>
              </h2>
            </div>
          </div>
          <FormShowcase />
        </Container>
      </section>

      <section className="border-b border-border bg-muted">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="flex items-end justify-between gap-4 mb-8 md:mb-12 flex-wrap">
            <div>
              <MetaLabel>[12.4] / Feedback · States</MetaLabel>
              <h2 className="mt-3 font-display font-light text-[clamp(1.75rem,4.5vw,3.25rem)] leading-[1.05] tracking-[-0.035em]">
                Toasts · alerts · skeletons · empty.
              </h2>
            </div>
          </div>
          <FeedbackShowcase />
        </Container>
      </section>

      <NextSectionAuto current="12.0" />
      <Footer />
    </main>
  );
}
