import { Plus } from "lucide-react";
import { Container } from "@/components/ui/container";
import { FAQS } from "@/lib/content";

export function LpFaq() {
  return (
    <section id="faq" className="py-24">
      <Container size="narrow">
        <p className="eyebrow mb-10">FAQ</p>
        {FAQS.map((f) => (
          <details
            key={f.q}
            className="group border-b border-[var(--border)] py-5"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between font-display text-lg font-light">
              {f.q}
              <Plus
                size={18}
                className="shrink-0 transition-transform group-open:rotate-45"
              />
            </summary>
            <p
              className="mt-3 text-[var(--muted-fg)]"
              style={{ fontSize: "var(--text-body)" }}
            >
              {f.a}
            </p>
          </details>
        ))}
      </Container>
    </section>
  );
}
