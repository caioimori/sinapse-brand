import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShaderCanvas } from "@/components/brand/shader-canvas";
import { SHADERS } from "@/components/brand/shaders";
import { Container } from "@/components/brand/container";
import { MetaLabel } from "@/components/brand/meta";

type ShaderSlug = keyof typeof SHADERS;

const slugs = Object.keys(SHADERS) as ShaderSlug[];

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = SHADERS[slug as ShaderSlug];
  if (!s) return { title: "Shader — SINAPSE" };
  return {
    title: `${s.id} ${s.name} — SINAPSE Shaders`,
    description: `Live shader wallpaper ${s.name} — WebGL2 interativo B&W.`,
  };
}

export default async function ShaderPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = SHADERS[slug as ShaderSlug];
  if (!s) return notFound();

  return (
    <main className="min-h-screen flex flex-col overflow-hidden relative">
      {/* Full-screen live shader */}
      <ShaderCanvas fragmentShader={s.source} />

      {/* Overlay UI */}
      <Container className="relative z-10 py-16 md:py-24 flex-1 flex flex-col justify-between min-h-screen">
        <div>
          <MetaLabel>
            <span className="is-dif">[{s.id}] / Shader Wallpaper</span>
          </MetaLabel>
          <h1 className="is-dif mt-5 font-display font-light text-[clamp(3.25rem,8vw,7rem)] leading-[0.92] tracking-[-0.045em] text-foreground max-w-[14ch]">
            {s.name}
          </h1>
        </div>

        <div className="flex items-end justify-between gap-6 flex-wrap mt-12">
          <div className="is-dif font-mono text-[11px] tracking-[0.22em] opacity-80 max-w-[48ch]">
            //MOUSE · CLICK · INTERAÇÃO LIVE — toda interação dispara mudança no shader. Tente clicar em qualquer lugar.
          </div>
          <div className="flex items-center gap-5">
            <Link
              href="/brandbook/13.0-shaders"
              className="is-dif link-cs font-mono text-[11px] tracking-[0.22em] opacity-80 hover:opacity-100"
            >
              ← GALLERY
            </Link>
            <Link
              href="/brandbook/14.0-motion"
              className="is-dif link-cs font-mono text-[11px] tracking-[0.22em] opacity-80 hover:opacity-100"
            >
              MOTION →
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}
