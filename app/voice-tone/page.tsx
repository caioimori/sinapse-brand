import type { Metadata } from "next";
import { Container } from "@/components/brand/container";
import { Nav } from "@/components/brand/nav";
import { Footer } from "@/components/brand/footer";
import { NextSectionAuto } from "@/components/brand/next-section-auto";
import { PageHeader } from "@/components/brand/page-header";
import { MetaLabel } from "@/components/brand/meta";
import { CornerBrackets } from "@/components/brand/corner-brackets";

export const metadata: Metadata = {
  title: "Voice & Tone — SINAPSE Brand",
  description: "Vocabulário real · 5 dimensões bipolares · vozes do produto vs fundador.",
};

const DIMENSIONS = [
  { left: "Formal", right: "Informal", value: 35, desc: "Mais informal, mas técnico. Coloquial sem ser jovial." },
  { left: "Sério", right: "Divertido", value: 22, desc: "Sério com ironia ocasional. Humor sutil em metáforas (\"menos que um almoço\")." },
  { left: "Técnico", right: "Acessível", value: 55, desc: "Técnico quando preciso. Acessível por default — não desce a guru." },
  { left: "Distante", right: "Próximo", value: 78, desc: "Próximo, cúmplice. Fala com dono de negócio, não com curioso." },
  { left: "Arrogante", right: "Humilde", value: 70, desc: "Confiante sem superioridade. Crítica ao mercado é direta, não snob." },
];

const ALLOW = [
  "Operação", "Em produção", "Trincheira", "Escalar", "Sistema", "Squad",
  "Framework", "Casos reais", "Ruído vs sinal", "Construir",
  "Substituir processos", "CAIOaaS", "Donos verificados", "Direto", "Silêncio",
];

const BLOCK = [
  "Disruptivo", "Inovador", "Game-changer", "Revolucionário", "Sinergia",
  "Synergy", "Empoderar", "Substituir pessoas", "Transformação mágica",
  "Guru", "Promessa furada", "Perfil fake", "Influencer", "Atalho", "Hack",
];

const FRASES_MATRIZ = [
  { f: "Sem teoria solta. Sem guru. Sem palco.", uso: "Anti-positioning · destacar contra mercado de IA" },
  { f: "Construído por quem opera IA em produção todo dia.", uso: "Credibilidade · footer · about" },
  { f: "O que funcionou, o que não funcionou e por quê.", uso: "Forum content promise · cases" },
  { f: "Pergunte de tarde, leia respostas à noite.", uso: "Mecânica do forum · vida real" },
  { f: "Quem mais ajuda sobe. Quem mais aprende fica.", uso: "Gamificação · meritocracia comunidade" },
  { f: "Por menos que um almoço, por mais do que você imagina.", uso: "Pricing · ironia financeira" },
  { f: "Escale sem aumentar a folha.", uso: "Hero principal · proposta resumida" },
  { f: "A IA não é o herói. O sistema é.", uso: "Doutrina · brandbook" },
];

export default function VoiceTone() {
  return (
    <main className="min-h-screen flex flex-col overflow-x-hidden">
      <Nav />
      <PageHeader
        section="Voice & Tone"
        number="0.3"
        title="Como a marca fala."
        emphasis="Pragmatista. Anti-guru. Cúmplice."
        subtitle="Vocabulário real extraído da operação SINAPSE · 5 dimensões bipolares · allow/block · 8 frases-matriz · voz do produto vs fundador."
        tokens="5 + 14 + 8"
      />

      {/* Posicionamento de voz */}
      <section className="border-b border-border bg-card">
        <Container size="narrow" className="py-12 sm:py-16 md:py-20 lg:py-24">
          <MetaLabel>[01] / Posicionamento de voz</MetaLabel>
          <h2 className="mt-3 font-display font-light text-[clamp(3.25rem,5vw,4rem)] leading-[1.05] tracking-[-0.035em] max-w-[28ch] text-balance">
            <span className="auto-highlight">Pragmatista desencantada</span> com mercado de IA.
          </h2>
          <div className="mt-6 space-y-4 font-sans text-base md:text-lg opacity-80 leading-relaxed">
            <p>SINAPSE não fala como guru. Não promete transformação mágica. Não vende atalho.</p>
            <p>Fala como <strong className="font-semibold">cúmplice de quem opera</strong> — quem já tentou, quem viu o que funciona e o que não funciona, quem opera IA em produção todo dia.</p>
            <p>Posição: <em className="opacity-70">nós vs. ruído do mercado</em>.</p>
          </div>
        </Container>
      </section>

      {/* 5 dimensões */}
      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <SectionHeading n="02" l="5 dimensões bipolares" />
          <div className="space-y-4">
            {DIMENSIONS.map((d) => (
              <div key={d.left} className="bg-background border border-border p-6 rounded-xl">
                <div className="flex items-center justify-between gap-4 font-mono text-[11px] tracking-[0.22em] uppercase opacity-70">
                  <span>{d.left}</span>
                  <span>{d.right}</span>
                </div>
                <div className="mt-3 h-1.5 bg-muted rounded-full relative overflow-hidden">
                  <div className="absolute inset-y-0 left-0 bg-foreground" style={{ width: `${d.value}%` }} />
                  <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-foreground rounded-full border-2 border-background" style={{ left: `calc(${d.value}% - 6px)` }} />
                </div>
                <p className="mt-3 font-sans text-sm opacity-65 leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Allow / Block */}
      <section className="border-b border-border bg-muted">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <SectionHeading n="03" l="Vocabulário · Allow / Block (extraído real)" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border rounded-xl overflow-hidden">
            <div className="bg-background p-6 md:p-8">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-6 h-6 rounded-full bg-foreground text-background flex items-center justify-center font-mono text-[12px]">✓</span>
                <MetaLabel>// ALLOW · usar ativamente</MetaLabel>
              </div>
              <ul className="flex flex-wrap gap-2">
                {ALLOW.map((w) => (
                  <li key={w} className="font-mono text-[11px] tracking-[0.18em] uppercase border border-border px-3 py-1.5 rounded-md bg-card">
                    {w}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-background p-6 md:p-8">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-6 h-6 rounded-full border border-foreground flex items-center justify-center font-mono text-[12px]">✕</span>
                <MetaLabel>// BLOCK · banir sempre</MetaLabel>
              </div>
              <ul className="flex flex-wrap gap-2">
                {BLOCK.map((w) => (
                  <li key={w} className="font-mono text-[11px] tracking-[0.18em] uppercase border border-border px-3 py-1.5 rounded-md opacity-50 line-through">
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Frases-matriz */}
      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <SectionHeading n="04" l="Frases-matriz · uso real" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-border border border-border rounded-xl overflow-hidden">
            {FRASES_MATRIZ.map((f, i) => (
              <div key={i} className="bg-background p-6 md:p-8 flex flex-col gap-3 min-h-[180px]">
                <MetaLabel>0{(i + 1).toString().padStart(2, "0").slice(-2)} · frase</MetaLabel>
                <blockquote className="font-display font-light text-xl md:text-2xl leading-[1.2] tracking-[-0.025em]">
                  &ldquo;{f.f}&rdquo;
                </blockquote>
                <p className="font-mono text-[10px] tracking-[0.22em] opacity-60 uppercase mt-auto">USO · {f.uso}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Duas vozes */}
      <section className="border-b border-border bg-muted">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <SectionHeading n="05" l="Duas vozes operam em paralelo" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <CornerBrackets className="bg-background border border-border p-6 md:p-8 min-h-[280px] flex flex-col gap-4">
              <MetaLabel>// VOZ DO PRODUTO</MetaLabel>
              <h3 className="font-display text-2xl tracking-tight">SINAPSE</h3>
              <p className="font-sans text-base opacity-75 italic leading-relaxed">
                &ldquo;Forum 24/7 pra dono de negócio que opera IA em produção. Casos reais, sem teoria, sem guru.&rdquo;
              </p>
              <div className="mt-auto">
                <div className="font-mono text-[10px] tracking-[0.22em] opacity-60 uppercase">3ª pessoa · institucional · técnico</div>
                <div className="font-mono text-[10px] tracking-[0.22em] opacity-50 uppercase mt-1">Atrai. Retém. Entrega.</div>
              </div>
            </CornerBrackets>
            <CornerBrackets className="bg-background border border-border p-6 md:p-8 min-h-[280px] flex flex-col gap-4">
              <MetaLabel>// VOZ DOS FUNDADORES</MetaLabel>
              <h3 className="font-display text-2xl tracking-tight">@caioimori · Soier</h3>
              <p className="font-sans text-base opacity-75 italic leading-relaxed">
                &ldquo;Cansei de ver gente boa empilhando demanda operacional. Cansei de ver guru sem prática vendendo o que ninguém entrega. SINAPSE existe pra essa dor.&rdquo;
              </p>
              <div className="mt-auto">
                <div className="font-mono text-[10px] tracking-[0.22em] opacity-60 uppercase">1ª pessoa · pessoal · provocativo</div>
                <div className="font-mono text-[10px] tracking-[0.22em] opacity-50 uppercase mt-1">Caio atrai. SINAPSE retém.</div>
              </div>
            </CornerBrackets>
          </div>
        </Container>
      </section>

      <NextSectionAuto current="0.3" />
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
