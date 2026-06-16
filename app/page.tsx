import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/brand/container";
import { MetaLabel } from "@/components/brand/meta";
import { Nav } from "@/components/brand/nav";
import { ThemeLogo } from "@/components/brand/theme-logo";
import { Footer } from "@/components/brand/footer";

const TICKER = [
  "BRAND SOURCE OF TRUTH",
  "UMA MARCA · UMA LEI",
  "BONE EDITION V0.2",
  "MINIMALISMO COMO ARMA",
  "13 STEPS GRAY · ZERO ACCENT",
  "BUILT IN SILENCE",
];

const PILARES = [
  { n: "01", title: "BRANDBOOK", sub: "Estratégia · Voz · Arquétipo", href: "/brandbook/0.0-guidelines" },
  { n: "02", title: "FOUNDATIONS", sub: "Tokens · Cores · Tipografia", href: "/brandbook/2.0-foundations" },
  { n: "03", title: "DESIGN SYSTEM", sub: "Componentes · Patterns · Motion", href: "/brandbook/11.0-effects" },
  { n: "04", title: "SHOWCASE", sub: "Editorial · Prova de Uso", href: "/brandbook/0.0-guidelines" },
];

const STATS = [
  { n: "04", label: "Pilares" },
  { n: "13", label: "Steps Gray" },
  { n: "02", label: "Edições" },
  { n: "100%", label: "Token Coverage" },
];

const FAQ = [
  { q: "O que é o SINAPSE Brand?", a: "A fonte da verdade única e navegável da marca SINAPSE. Reúne brandbook, design system e showcase em um só lugar — com uma só lei regendo tudo." },
  { q: "O que é a Bone Edition?", a: "A edição light da marca — off-white sobre preto. É o default porque 90% das LPs SINAPSE são light-first. A edição escura (Vanta) existe como opt-in." },
  { q: "Por que preto e branco absoluto?", a: "Restrição como identidade. Eliminar cor do cotidiano força foco em tipografia, espaço, motion e estrutura — onde a personalidade da marca mora." },
  { q: "Quais são os pilares do sistema?", a: "Brandbook (estratégia), Foundations (tokens), Design System (componentes) e Showcase (editorial)." },
  { q: "Posso usar os tokens em outros projetos?", a: "Sim. Abra /brandbook/token-export, copie as CSS vars e cole no index.css do seu projeto Next.js / Tailwind / shadcn-ui. Zero config." },
];

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col overflow-x-hidden">
      <Nav />

      {/* HERO — Apple-tier aurora + glass */}
      <section className="relative overflow-hidden border-b border-border aurora-bg">
        <div className="absolute inset-0 pattern-grid opacity-40 z-0" />
        <div className="absolute top-1/2 right-[-12%] md:right-[-6%] lg:right-[-2%] -translate-y-1/2 w-[560px] md:w-[720px] lg:w-[860px] xl:w-[960px] pointer-events-none select-none z-10">
          <ThemeLogo variant="symbol" alt="" width={960} height={686} priority className="w-full h-auto symbol-hero auto-float" />
        </div>

        <Container className="relative z-20 py-24 md:py-36 lg:py-44">
          <div className="inline-flex items-center gap-3 mb-8 font-mono text-[10px] tracking-[0.28em] opacity-70 uppercase">
            <span className="status-dot" />
            //SINAPSE/BRAND · v0.4 LIVE
          </div>
          <h1 className="font-display font-light text-[clamp(3.25rem,7vw,6rem)] leading-[0.95] tracking-[-0.045em] max-w-[14ch] text-balance reveal reveal-delay-2">
            Uma marca.<br />
            <span className="font-medium">Uma lei.</span>
          </h1>
          <p className="mt-8 max-w-[36rem] font-sans text-base md:text-lg leading-relaxed opacity-70 reveal reveal-delay-3">
            A fonte da verdade visual, verbal e estrutural da SINAPSE — brandbook, design system, shaders, motion e templates num só lugar. Tudo que se constrói no ecossistema sai daqui.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3 reveal reveal-delay-4">
            <Link href="/brandbook/0.0-guidelines" className="btn-apple">
              ABRIR BRANDBOOK
              <span className="inline-block transition-transform duration-base ease-apple group-hover:translate-x-1">→</span>
            </Link>
            <Link href="/brandbook/13.0-shaders" className="btn-apple btn-apple-ghost">
              VER SHADERS
            </Link>
          </div>
        </Container>
      </section>

      {/* MARQUEE */}
      <div className="border-b border-border py-4 overflow-hidden">
        <div className="marquee-track">
          {[...Array(2)].flatMap((_, i) =>
            TICKER.map((item, j) => (
              <div key={`${i}-${j}`} className="flex items-center gap-12 md:gap-16 px-6 md:px-8 font-display font-light text-lg md:text-xl tracking-tight whitespace-nowrap">
                <span>{item}</span>
                <span className="opacity-30 text-sm">◆</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* [01] SYSTEM OVERVIEW */}
      <section id="system" className="border-b border-border">
        <Container className="py-16 md:py-24">
          <MetaLabel>[01] / System Overview</MetaLabel>
          <h2 className="mt-4 font-display font-light text-[clamp(3.25rem,5vw,4rem)] leading-[1] tracking-[-0.035em] max-w-[20ch] text-balance">
            Um sistema construído pra <span className="font-medium italic">escala.</span>
          </h2>
          <p className="mt-5 max-w-[36rem] font-sans text-base leading-relaxed opacity-60">
            Bone Edition. Design tokens, motion, tipografia e cor governados por CSS custom properties.
            Nenhuma decisão solta. Nenhuma cor fora do sistema.
          </p>
          <div className="mt-10 md:mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className="card-apple p-5 md:p-7 breathe"
                style={{ animationDelay: `${i * 0.4}s` }}
              >
                <div className="font-display font-light text-3xl md:text-6xl leading-none tracking-[-0.03em]">{s.n}</div>
                <div className="mt-3 font-mono text-[10px] tracking-[0.25em] opacity-50 uppercase">{s.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* [02] EXPLORE */}
      <section className="border-b border-border pattern-dots">
        <Container className="py-16 md:py-24">
          <div className="flex items-end justify-between gap-4 mb-10 flex-wrap">
            <div>
              <MetaLabel>[02] / Explore</MetaLabel>
              <h2 className="mt-4 font-display font-light text-[clamp(3.25rem,5vw,4rem)] leading-[1] tracking-[-0.035em] text-balance">
                Navegue pelo <span className="font-medium">sistema.</span>
              </h2>
            </div>
            <MetaLabel>04 Pilares</MetaLabel>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {PILARES.map((p) => (
              <Link
                key={p.n}
                href={p.href}
                className="card-apple group/pil px-6 md:px-8 py-6 md:py-8 flex items-center justify-between gap-4 min-h-[96px]"
              >
                <div className="flex items-center gap-5 md:gap-7 min-w-0">
                  <span className="font-mono text-[10px] tracking-[0.3em] opacity-40 shrink-0">{p.n}</span>
                  <div className="min-w-0">
                    <div className="font-display font-medium text-lg md:text-xl tracking-tight leading-tight">{p.title}</div>
                    <div className="mt-1 font-sans text-xs md:text-sm opacity-55 truncate">{p.sub}</div>
                  </div>
                </div>
                <span className="font-mono text-[10px] tracking-[0.3em] opacity-40 group-hover/pil:opacity-100 group-hover/pil:translate-x-1 transition-all duration-base ease-apple shrink-0">→</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* [03] FAQ */}
      <section className="border-b border-border">
        <Container className="py-16 md:py-24">
          <div className="grid md:grid-cols-[1fr,2fr] gap-10 md:gap-16">
            <div className="md:sticky md:top-24 md:self-start">
              <MetaLabel>[03] / FAQ</MetaLabel>
              <h2 className="mt-4 font-display font-light text-[clamp(3.25rem,5vw,4rem)] leading-[1] tracking-[-0.035em] text-balance">
                Perguntas<br /><span className="font-medium italic">frequentes.</span>
              </h2>
              <p className="mt-5 font-sans text-sm md:text-base opacity-55 max-w-[20rem] leading-relaxed">
                Dúvidas sobre o brand system, tokens ou contribuição?
              </p>
            </div>
            <div className="border-t border-border">
              {FAQ.map((item, i) => (
                <details key={i} className="border-b border-border group">
                  <summary className="flex items-start justify-between gap-6 py-5 md:py-6 cursor-pointer list-none">
                    <div className="flex items-start gap-5 min-w-0">
                      <span className="font-mono text-[10px] tracking-[0.3em] opacity-40 pt-1.5 shrink-0 w-6">{String(i + 1).padStart(2, "0")}</span>
                      <span className="font-display font-normal text-base md:text-lg tracking-tight leading-snug">{item.q}</span>
                    </div>
                    <span className="font-mono text-lg opacity-40 group-open:rotate-45 transition-transform shrink-0 select-none">+</span>
                  </summary>
                  <div className="pb-5 md:pb-6 pl-11 pr-6 max-w-[42rem]">
                    <p className="font-sans text-sm md:text-[15px] opacity-65 leading-relaxed">{item.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA — Apple aurora */}
      <section className="border-b border-border aurora-bg relative overflow-hidden">
        <div className="absolute inset-0 pattern-crosshair opacity-50" />
        <Container className="relative z-10 py-16 md:py-24 flex flex-col items-center text-center">
          <ThemeLogo variant="symbol" alt="SINAPSE" width={48} height={34} className="w-10 h-auto opacity-70 mb-6 auto-float" />
          <h2 className="font-display font-light text-[clamp(3.25rem,5vw,4rem)] leading-[1] tracking-[-0.035em] max-w-[18ch] text-balance">
            A marca começa <span className="font-medium italic">no sistema.</span>
          </h2>
          <Link href="/brandbook/0.0-guidelines" className="btn-apple mt-8">
            ABRIR BRANDBOOK
            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
