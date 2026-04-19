import Link from "next/link";
import { Container } from "./container";
import { Nav } from "./nav";
import { Footer } from "./footer";
import { NextSectionAuto } from "./next-section-auto";
import { PageHeader } from "./page-header";
import { CornerBrackets } from "./corner-brackets";
import { MetaLabel } from "./meta";

interface Props {
  number: string;
  section: string;
  title: string;
  subtitle?: string;
  /** when route is built, this becomes the real URL */
  next?: { label: string; href: string };
  status?: "stub" | "in-progress";
  preview?: string[];
}

export function PageStub({ number, section, title, subtitle, next, status = "stub", preview }: Props) {
  const slug = number;
  return (
    <main className="min-h-screen flex flex-col overflow-x-hidden">
      <Nav />
      <PageHeader section={section} number={number} title={title} subtitle={subtitle ?? ""} next={next} />

      <section className="border-b border-border pattern-grid">
        <Container className="py-24 md:py-32">
          <CornerBrackets className="block bg-background border border-border p-10 md:p-16">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-2 h-2 bg-foreground rounded-full animate-pulse" />
              <span className="eyebrow">
                {status === "stub" ? "//SECTION SCAFFOLDED" : "//IN PROGRESS"}
              </span>
            </div>

            <h2 className="font-display font-light text-[clamp(2rem,6vw,5rem)] leading-[0.95] tracking-[-0.04em] max-w-4xl">
              {title}{" "}
              <span className="opacity-40">— em construção.</span>
            </h2>

            <p className="mt-8 font-sans text-base md:text-lg opacity-65 leading-relaxed max-w-2xl">
              Esta seção faz parte da arquitetura decimal SINAPSE (mirror aiox squad).
              O scaffolding está pronto · navegação ativa · conteúdo visual em iteração futura.
            </p>

            {preview && preview.length > 0 && (
              <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-px bg-border border border-border">
                {preview.map((p) => (
                  <div key={p} className="bg-background p-4 md:p-5 font-mono text-[11px] tracking-[0.18em] opacity-65">
                    {p}
                  </div>
                ))}
              </div>
            )}

            <div className="mt-12 flex items-center gap-6 flex-wrap">
              <Link
                href="/brandbook/2.0-foundations"
                className="btn-magnetic inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.25em] px-6 py-4 border border-foreground"
              >
                ← FOUNDATIONS
              </Link>
              <Link
                href="/"
                className="link-cs font-mono text-[11px] tracking-[0.25em] opacity-65 hover:opacity-100"
              >
                HOME
              </Link>
              {next && (
                <Link
                  href={next.href}
                  className="link-cs font-mono text-[11px] tracking-[0.25em] opacity-65 hover:opacity-100 ml-auto"
                >
                  NEXT: {next.label} →
                </Link>
              )}
            </div>
          </CornerBrackets>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            <Stat label="Section" value={number} />
            <Stat label="Status" value={status === "stub" ? "scaffold" : "active"} />
            <Stat label="Pillar" value={section.split(" ")[0]} />
            <Stat label="Theme" value="B&W radical" />
          </div>
        </Container>
      </section>

      <NextSectionAuto current={slug} />
      <Footer />
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border p-4">
      <MetaLabel>{label}</MetaLabel>
      <div className="mt-2 font-display font-medium text-xl md:text-2xl tracking-tight">{value}</div>
    </div>
  );
}
