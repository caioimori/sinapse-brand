import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function LpHero() {
  return (
    <section
      id="hero"
      className="pattern-grid relative flex min-h-screen items-center pt-14"
    >
      <Container>
        {/* layout assimétrico: texto à esquerda, espaço à direita */}
        <div style={{ maxWidth: "56ch" }}>
          <p className="eyebrow reveal-delay-1" data-reveal>
            Plataforma
          </p>
          {/* H1 display 60-176px — bem acima da dead-zone */}
          <h1
            className="mt-4 font-display font-light tracking-[-0.035em] text-balance"
            style={{ fontSize: "var(--text-display)", lineHeight: 0.92 }}
            data-reveal
          >
            Orquestre
            <br />
            <em className="not-italic text-[var(--muted-fg)]">agentes</em>
          </h1>
          <p
            className="mt-8 text-[var(--muted-fg)]"
            style={{ fontSize: "var(--text-body)", maxWidth: "38ch" }}
            data-reveal
          >
            SINAPSE é o meta-framework que transforma prompts em squads de IA
            especializados, do planejamento à entrega.
          </p>
          <div className="mt-10 flex gap-4" data-reveal>
            <Button variant="cta">Começar grátis</Button>
            <Button variant="outline">Ver demo</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
