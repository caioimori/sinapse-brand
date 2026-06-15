import { Container } from "@/components/ui/container";

export function LpFooter() {
  return (
    <footer className="border-t border-[var(--border)] py-12">
      <Container>
        <div className="flex items-center justify-between">
          <span className="eyebrow">[ SNPS ]</span>
          <p
            className="text-[var(--muted-fg)]"
            style={{ fontSize: "var(--text-meta)" }}
          >
            © {new Date().getFullYear()} SINAPSE AI. Todos os direitos reservados.
          </p>
        </div>
      </Container>
    </footer>
  );
}
