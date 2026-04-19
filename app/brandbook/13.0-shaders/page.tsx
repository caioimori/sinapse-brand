import type { Metadata } from "next";
import { Container } from "@/components/brand/container";
import { Nav } from "@/components/brand/nav";
import { Footer } from "@/components/brand/footer";
import { NextSectionAuto } from "@/components/brand/next-section-auto";
import { PageHeader } from "@/components/brand/page-header";
import { MetaLabel } from "@/components/brand/meta";
import { CornerBrackets } from "@/components/brand/corner-brackets";
import { ShaderCard } from "./shader-card";
import { SHADERS } from "@/components/brand/shaders";

export const metadata: Metadata = {
  title: "13.0 Shaders — SINAPSE Brand",
  description: "6 shader wallpapers WebGL2 interativos B&W radical · auto-loop infinite.",
};

const SHADER_CARDS = [
  { key: "vanta-storm" as const, desc: "Atmospheric noir. Clouds rolling continuamente. Mouse cria distortion sutil." },
  { key: "bone-glow" as const, desc: "Gradient breathing infinite. Mouse acompanha glow. Click dispara sonar pulse." },
  { key: "neural-network" as const, desc: "AI agent graph. 6 nodes oscilando + mouse node atrai conexões." },
  { key: "data-stream" as const, desc: "CRM data flow. 60 streams verticais constantes. Mouse pausa coluna." },
  { key: "marker-sweep" as const, desc: "Copy highlight motion. 12 linhas com sweep horizontal looping." },
  { key: "hud-radar-scan" as const, desc: "Precision targeting. Radar sweep 360° + 5 pings randômicos." },
];

export default function Shaders() {
  return (
    <main className="min-h-screen flex flex-col overflow-x-hidden">
      <Nav />
      <PageHeader
        section="Design System · Shaders"
        number="13.0"
        title="Wallpapers vivos."
        emphasis="6 fragment shaders · auto-loop."
        subtitle="Cada shader narra um aspecto SINAPSE — atmosfera · glow · agentes IA · CRM stream · copy highlight · radar HUD. Tudo WebGL2 · responsivo a mouse/click · zero accent cromático."
        tokens="6"
      />

      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="flex items-end justify-between gap-4 mb-10 md:mb-14 flex-wrap">
            <div>
              <MetaLabel>[01] / Live Gallery</MetaLabel>
              <h2 className="mt-3 font-display font-light text-[clamp(2rem,5vw,4rem)] leading-[1] tracking-[-0.035em]">
                6 wallpapers. <span className="font-medium">Live · auto-loop · responsive.</span>
              </h2>
            </div>
            <MetaLabel>WebGL2 · OGL ~5KB</MetaLabel>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border rounded-2xl shadow-apple-md overflow-hidden">
            {SHADER_CARDS.map((c) => {
              const s = SHADERS[c.key];
              return (
                <ShaderCard
                  key={c.key}
                  id={s.id}
                  name={s.name}
                  source={s.source}
                  desc={c.desc}
                  theme={s.theme}
                  slug={c.key}
                />
              );
            })}
          </div>
        </Container>
      </section>

      <section className="border-b border-border pattern-grid">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <CornerBrackets className="block bg-background border border-border p-8 md:p-12 rounded-xl">
            <div className="grid md:grid-cols-[1fr,2fr] gap-10 md:gap-16 items-start">
              <div>
                <MetaLabel>[02] / Architecture</MetaLabel>
                <h2 className="mt-4 font-display font-light text-[clamp(2rem,5vw,4rem)] leading-[1] tracking-[-0.035em]">
                  Aplique em <span className="font-medium italic">qualquer page.</span>
                </h2>
              </div>
              <div className="flex flex-col gap-6">
                <p className="font-sans text-base md:text-lg opacity-65 leading-relaxed">
                  Importe <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">ShaderCanvas</code> + um shader. Vira wallpaper fixed inset-0 -z-10 automaticamente.
                </p>
                <pre className="bg-muted/50 border border-border p-5 font-mono text-[12px] leading-[1.7] overflow-x-auto rounded-lg">
{`import { ShaderCanvas } from "@/components/brand/shader-canvas";
import { SHADERS } from "@/components/brand/shaders";

<ShaderCanvas fragmentShader={SHADERS["vanta-storm"].source} />`}
                </pre>
                <ul className="font-mono text-[11px] tracking-[0.18em] opacity-65 space-y-2">
                  <li>// auto-loop infinite (sem hover/click pra mover)</li>
                  <li>// honors prefers-reduced-motion</li>
                  <li>// theme-aware via [data-theme] (auto-switch palette)</li>
                  <li>// pointer-events: none (não bloqueia UI)</li>
                  <li>// graceful fail se WebGL2 indisponível</li>
                </ul>
              </div>
            </div>
          </CornerBrackets>
        </Container>
      </section>

      <NextSectionAuto current="13.0" />
      <Footer />
    </main>
  );
}
