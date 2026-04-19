import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/brand/container";
import { MetaLabel } from "@/components/brand/meta";
import { Nav } from "@/components/brand/nav";
import { LOGO } from "@/components/brand/logo";
import { Footer } from "@/components/brand/footer";
import { NextSectionAuto } from "@/components/brand/next-section-auto";
import { PageHeader } from "@/components/brand/page-header";

export const metadata: Metadata = {
  title: "Guidelines — SINAPSE Brand",
  description: "Princípios não-negociáveis do sistema SINAPSE. Esta página vale sobre qualquer outra.",
};

const PRINCIPLES = [
  { n: "01", title: "Paleta B&W absoluta", note: "Nenhuma cor cromática na brand. Zero accent. Error/success existem só como estado de sistema." },
  { n: "02", title: "Preto absoluto proibido", note: "Mínimo #0A0A0A (Vanta). #000 (void) só para overlays e vazios literais." },
  { n: "03", title: "Grain SVG sempre ativo", note: "Overlay global 5% opacity. Quebra o digital plano. Nunca desligue." },
  { n: "04", title: "Tipografia carrega peso", note: "Sora display · Inter sans · JetBrains mono. Máximo 2 pesos por tela." },
  { n: "05", title: "Tamanhos extremos", note: "11-14px ou 60-180px. Evite o range médio 32-48px de SaaS genérico." },
  { n: "06", title: "Assimetria obrigatória", note: "Zero layout centrado simétrico. Sempre deslocar, quebrar coluna." },
  { n: "07", title: "Motion reversível", note: "Tudo que entra, sai igual no scroll reverso. Senão parece bug." },
  { n: "08", title: "Prefers-reduced-motion", note: "Desliga tudo não-essencial. Acessibilidade não negociável." },
  { n: "09", title: "Semantic sobre primitive", note: "Componentes nunca consomem primitives diretos. Sempre via --background, --foreground, etc." },
  { n: "10", title: "Menos componentes, mais lei", note: "Doutrina Vignelli. 20 componentes bem feitos > 200 medianos." },
  { n: "11", title: "Grain · crosshair · frame", note: "Camadas visuais sutis em tudo. Minimalismo ativado por micro-detalhe." },
  { n: "12", title: "Se parece padrão, refaz", note: "Nunca aceite o visual genérico. Diferenciação é default, não exceção." },
];

const CONTRAST = [
  { bg: "#F5F5F0", fg: "#0A0A0A", logo: LOGO.symbol, label: "BONE BG", note: "Logo VANTA (escura)" },
  { bg: "#0A0A0A", fg: "#F5F5F0", logo: "/brand/logo/bone/sinapse-symbol.svg", label: "VANTA BG", note: "Logo BONE (clara)" },
];

const TYPE_SPECIMENS = [
  {
    family: "Sora",
    role: "Display",
    use: "Headlines, hero, números monumentais",
    sample: "Aa",
    className: "font-display font-light",
    meta: "300 · 400 · 500",
  },
  {
    family: "Inter",
    role: "Sans",
    use: "Corpo de texto, UI, parágrafos",
    sample: "Aa",
    className: "font-sans font-normal",
    meta: "400 · 500",
  },
  {
    family: "JetBrains Mono",
    role: "Mono",
    use: "Tokens, código, meta-labels, dados",
    sample: "{ }",
    className: "font-mono",
    meta: "400 · tracking ampliado",
  },
];

export default function Guidelines() {
  return (
    <main className="min-h-screen flex flex-col overflow-x-hidden">
      <Nav />
      <PageHeader
        section="Guidelines"
        number="0.0"
        title="12 princípios."
        emphasis="Zero exceção."
        subtitle="Esta página vence qualquer outra. Toda decisão visual, verbal ou estrutural da SINAPSE passa por esses 12 pontos. Se um output viola, é refeito antes de publicar."
        tokens="12 rules · 2 edições"
        next={{ label: "Foundations", href: "/brandbook/2.0-foundations" }}
      />

      {/* MANIFESTO HERO — num monumental + logo */}
      <section className="border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 pattern-crosshair opacity-60 z-0" />
        <Container className="relative z-10 py-20 sm:py-28 md:py-36 lg:py-44">
          <div className="grid md:grid-cols-[1.2fr,1fr] gap-10 md:gap-16 items-end">
            <div>
              <MetaLabel>[00] / Doutrina</MetaLabel>
              <div className="mt-6 font-display font-light text-[clamp(7rem,24vw,22rem)] leading-[0.82] tracking-[-0.06em]">
                12
                <span className="font-medium italic opacity-80">/12</span>
              </div>
              <p className="mt-6 font-mono text-[11px] tracking-[0.3em] opacity-60">
                SOURCE OF TRUTH · VIOLAR = REFAZER
              </p>
            </div>
            <div className="md:justify-self-end flex flex-col gap-8 md:items-end">
              <Image
                src={LOGO.symbol}
                alt="SINAPSE"
                width={260}
                height={185}
                className="w-40 md:w-56 h-auto opacity-90"
              />
              <p className="max-w-sm font-display font-light text-xl md:text-2xl leading-tight tracking-tight md:text-right">
                &ldquo;A IA não é o herói.{" "}
                <span className="italic">O sistema é.</span>&rdquo;
              </p>
              <span className="font-mono text-[10px] tracking-[0.3em] opacity-50">
                — DOUTRINA SINAPSE · v0.2
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* PHILOSOPHY */}
      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="grid md:grid-cols-[1fr,2fr] gap-10 md:gap-20">
            <div className="md:sticky md:top-24 md:self-start">
              <MetaLabel>[01] / Filosofia</MetaLabel>
              <h2 className="mt-4 font-display font-light text-[clamp(2rem,5vw,4rem)] leading-[0.95] tracking-[-0.04em]">
                B&W radical.<br />
                <span className="font-medium italic">Minimalismo ativado.</span>
              </h2>
            </div>
            <div className="space-y-6 text-base md:text-lg opacity-80 leading-relaxed max-w-2xl">
              <p>
                SINAPSE é preto e branco absoluto. Sem exceção. Nenhuma cor
                cromática aparece em brand, hero, copy ou CTA.
              </p>
              <p>
                Cores funcionais — erro vermelho, sucesso verde — existem
                apenas como status de sistema e{" "}
                <em className="opacity-70">nunca</em> como elemento de marca.
              </p>
              <p>
                A personalidade não mora na cor. Mora na{" "}
                <strong className="font-medium">
                  tipografia, espaço, motion e estrutura
                </strong>
                . Restrição como identidade.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 12 PRINCIPLES — numeros monumentais */}
      <section className="border-b border-border pattern-dots">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="flex items-end justify-between gap-4 mb-10 md:mb-14 flex-wrap">
            <div>
              <MetaLabel>[02] / Non-Negotiable</MetaLabel>
              <h2 className="mt-4 font-display font-light text-[clamp(2rem,5vw,4rem)] leading-[0.95] tracking-[-0.04em]">
                12 princípios.{" "}
                <span className="font-medium italic">Zero exceção.</span>
              </h2>
            </div>
            <MetaLabel>12 Rules</MetaLabel>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {PRINCIPLES.map((p) => (
              <article
                key={p.n}
                className="group bg-background p-8 md:p-10 hover:bg-card transition-colors relative overflow-hidden"
              >
                <div className="font-display font-light text-[5rem] md:text-[7rem] leading-[0.85] tracking-[-0.05em] opacity-15 group-hover:opacity-30 transition-opacity">
                  {p.n}
                </div>
                <div className="mt-4 pt-5 border-t border-border/60">
                  <div className="font-mono text-[10px] tracking-[0.3em] opacity-50 mb-3">
                    NON-NEGOTIABLE
                  </div>
                  <h3 className="font-display font-medium text-xl md:text-2xl tracking-tight mb-3 leading-tight">
                    {p.title}
                  </h3>
                  <p className="font-sans text-sm opacity-65 leading-relaxed">
                    {p.note}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* TYPOGRAPHY SPECIMEN — 3 famílias */}
      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="mb-10 md:mb-14">
            <MetaLabel>[03] / Typography Stack</MetaLabel>
            <h2 className="mt-4 font-display font-light text-[clamp(2rem,5vw,4rem)] leading-[0.95] tracking-[-0.04em] max-w-[20ch]">
              Três famílias.{" "}
              <span className="font-medium italic">Uma hierarquia.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-border border border-border">
            {TYPE_SPECIMENS.map((t) => (
              <div key={t.family} className="bg-background p-8 md:p-10 flex flex-col">
                <div className="font-mono text-[10px] tracking-[0.3em] opacity-50">
                  {t.role.toUpperCase()}
                </div>
                <div
                  className={`${t.className} text-[8rem] md:text-[10rem] leading-[0.85] tracking-[-0.05em] my-6`}
                >
                  {t.sample}
                </div>
                <div className="mt-auto pt-6 border-t border-border">
                  <div className="font-display font-medium text-xl tracking-tight">
                    {t.family}
                  </div>
                  <p className="font-sans text-sm opacity-60 mt-1">{t.use}</p>
                  <div className="font-mono text-[10px] tracking-[0.25em] opacity-50 mt-3">
                    {t.meta}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* SCALE EXTREMES — micro vs monumental */}
      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <MetaLabel>[04] / Scale Extremes</MetaLabel>
          <h2 className="mt-4 font-display font-light text-[clamp(2rem,5vw,4rem)] leading-[0.95] tracking-[-0.04em] mb-10 md:mb-14 max-w-[22ch]">
            11px ou 180px.{" "}
            <span className="font-medium italic">Nunca o meio.</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-px bg-border border border-border">
            <div className="bg-background p-10 md:p-14 flex flex-col justify-between min-h-[320px]">
              <div className="font-mono text-[10px] tracking-[0.3em] opacity-50">
                MICRO · 11PX
              </div>
              <div className="space-y-2">
                <div className="font-mono text-[11px] tracking-[0.3em] opacity-80">
                  CAPTION · META · TAG
                </div>
                <div className="font-mono text-[11px] tracking-[0.3em] opacity-60">
                  TRACKING 0.3EM · UPPERCASE
                </div>
                <div className="font-mono text-[11px] tracking-[0.3em] opacity-40">
                  COR OPACA · LEITURA LENTA
                </div>
              </div>
              <p className="font-sans text-sm opacity-60 max-w-xs leading-relaxed">
                Meta-labels, status, data técnico. Sempre mono, sempre
                tracking amplo.
              </p>
            </div>
            <div className="bg-card p-10 md:p-14 flex flex-col justify-between min-h-[320px] relative overflow-hidden">
              <div className="font-mono text-[10px] tracking-[0.3em] opacity-50">
                MONUMENTAL · 180PX
              </div>
              <div className="font-display font-light text-[clamp(6rem,18vw,12rem)] leading-[0.82] tracking-[-0.06em]">
                Aa<span className="font-medium italic">0</span>
              </div>
              <p className="font-sans text-sm opacity-60 max-w-xs leading-relaxed">
                Hero, anchors, números de seção. Peso leve, itálico como
                assinatura.
              </p>
            </div>
          </div>
          <p className="mt-6 font-mono text-[10px] tracking-[0.3em] opacity-50">
            FAIXA PROIBIDA · 32PX – 48PX · SAAS GENÉRICO
          </p>
        </Container>
      </section>

      {/* CONTRAST RULE — logos dramáticos */}
      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <MetaLabel>[05] / Contrast Rule</MetaLabel>
          <h2 className="mt-4 font-display font-light text-[clamp(2rem,5vw,4rem)] leading-[0.95] tracking-[-0.04em] mb-10 md:mb-14 max-w-[24ch]">
            Logo inverte <span className="font-medium italic">com o fundo.</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-px bg-border border border-border">
            {CONTRAST.map((c) => (
              <div
                key={c.label}
                className="relative aspect-[4/3] flex items-center justify-center overflow-hidden"
                style={{ background: c.bg }}
              >
                <Image
                  src={c.logo}
                  alt=""
                  width={480}
                  height={342}
                  className="w-[55%] h-auto"
                />
                <div
                  className="absolute top-5 left-5 font-mono text-[10px] tracking-[0.3em]"
                  style={{ color: c.fg, opacity: 0.7 }}
                >
                  {c.label}
                </div>
                <div
                  className="absolute bottom-5 right-5 font-mono text-[10px] tracking-[0.3em] text-right"
                  style={{ color: c.fg, opacity: 0.5 }}
                >
                  {c.note}
                </div>
                <div
                  className="absolute bottom-5 left-5 font-mono text-[10px] tracking-[0.3em]"
                  style={{ color: c.fg, opacity: 0.4 }}
                >
                  {c.bg}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 font-sans text-sm md:text-base opacity-60 max-w-2xl leading-relaxed">
            Regra vale para tudo: logo, iconografia, patterns, animações. Em
            fundo escuro, aplicar a versão clara. Em fundo claro, aplicar a
            versão escura. Nunca o contrário.
          </p>
        </Container>
      </section>

      {/* FUNCTIONAL ISOLATION */}
      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <MetaLabel>[06] / Functional Isolation</MetaLabel>
          <h2 className="mt-4 font-display font-light text-[clamp(2rem,5vw,4rem)] leading-[0.95] tracking-[-0.04em] mb-10 md:mb-14 max-w-[24ch]">
            Error e success{" "}
            <span className="font-medium italic">nunca no brand.</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-px bg-border border border-border">
            <div className="bg-background p-8 md:p-12">
              <div
                className="h-32 md:h-40 mb-6 flex items-center justify-center border border-border relative overflow-hidden"
                style={{ background: "#FF3A2D" }}
              >
                <span className="font-display font-medium text-2xl md:text-4xl tracking-tight text-white">
                  DESTRUCTIVE
                </span>
              </div>
              <div className="font-mono text-xs md:text-sm tracking-wide mb-2">
                --destructive: #FF3A2D
              </div>
              <p className="font-sans text-sm opacity-60 leading-relaxed">
                Error, critical, ação destrutiva. Nunca em hero, copy,
                carrossel, proposta ou LP.
              </p>
            </div>
            <div className="bg-background p-8 md:p-12">
              <div
                className="h-32 md:h-40 mb-6 flex items-center justify-center border border-border relative overflow-hidden"
                style={{ background: "#00C853" }}
              >
                <span className="font-display font-medium text-2xl md:text-4xl tracking-tight text-white">
                  SUCCESS
                </span>
              </div>
              <div className="font-mono text-xs md:text-sm tracking-wide mb-2">
                --success: #00C853
              </div>
              <p className="font-sans text-sm opacity-60 leading-relaxed">
                Success, confirmação, completo. Nunca em hero, copy,
                carrossel, proposta ou LP.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* SOURCE OF TRUTH USAGE — como usar */}
      <section className="border-b border-border bg-card">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <MetaLabel>[07] / Como usar esta página</MetaLabel>
          <h2 className="mt-4 font-display font-light text-[clamp(2rem,5vw,4rem)] leading-[0.95] tracking-[-0.04em] mb-10 md:mb-14 max-w-[26ch]">
            Source of truth.{" "}
            <span className="font-medium italic">Workflow obrigatório.</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-px bg-border border border-border">
            {[
              {
                step: "01",
                title: "Abra aqui antes de desenhar",
                body: "Qualquer tela, slide, LP ou componente começa lendo esses 12 pontos. Se não passa, não vai pro Figma.",
              },
              {
                step: "02",
                title: "Cite o princípio no brief",
                body: "Toda decisão visual referencia [0X]. Exemplo: 'hero em 180px — rule 05'. Rastreabilidade total.",
              },
              {
                step: "03",
                title: "Refaz se violar",
                body: "Output que quebra uma regra volta pra fila. Sem negociação. Diferenciação é default, não exceção.",
              },
            ].map((s) => (
              <div key={s.step} className="bg-background p-8 md:p-10">
                <div className="font-display font-light text-6xl md:text-7xl leading-[0.85] tracking-[-0.05em] opacity-80">
                  {s.step}
                </div>
                <h3 className="mt-6 font-display font-medium text-xl tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-3 font-sans text-sm opacity-65 leading-relaxed">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* NAV NEXT */}
      <section className="border-b border-border">
        <Container className="py-12 md:py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <MetaLabel>Continue</MetaLabel>
            <div className="mt-2 font-display font-light text-2xl md:text-3xl tracking-tight">
              Foundations{" "}
              <span className="opacity-40">— tokens, cor, tipografia</span>
            </div>
          </div>
          <Link
            href="/brandbook/2.0-foundations"
            className="group font-mono text-[11px] tracking-[0.25em] px-6 py-4 border border-foreground hover:bg-foreground hover:text-background transition-colors magnet"
          >
            ABRIR{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </Container>
      </section>

      <NextSectionAuto current="0.0" />
      <Footer />
    </main>
  );
}
