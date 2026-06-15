import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { Container } from "@/components/ui/container";
import { PLANS } from "@/lib/content";
import { cn } from "@/lib/cn";

export function LpPricing() {
  return (
    <section id="pricing" className="py-24">
      <Container>
        <SectionHeader eyebrow="Planos" title="Escolha seu plano" />
        <div className="mt-12 grid gap-px bg-[var(--border)] overflow-hidden rounded-[var(--radius-xl)] sm:grid-cols-3">
          {PLANS.map((p) => (
            <div
              key={p.name}
              className={cn(
                "flex flex-col p-8",
                p.popular ? "bg-foreground text-background" : "bg-card"
              )}
            >
              {p.popular && (
                <span className="eyebrow" style={{ color: "rgba(10,10,10,0.5)" }}>
                  Mais popular
                </span>
              )}
              <h3
                className="mt-2 font-display font-light"
                style={{ fontSize: "var(--text-h3)" }}
              >
                {p.name}
              </h3>
              <p
                className="mt-4 font-display font-light tabular-nums"
                style={{ fontSize: "clamp(3rem, 5vw, 4rem)" }}
              >
                {p.price}
              </p>
              <ul className="mt-6 flex-1 space-y-3 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <Check size={16} className="mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                variant={p.popular ? "outline" : "cta"}
                className="mt-8 w-full"
              >
                Assinar
              </Button>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
