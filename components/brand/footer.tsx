import Link from "next/link";
import { Container } from "./container";
import { ThemeLogo } from "./theme-logo";
import { footerColumns } from "@/lib/navigation";

/**
 * Footer — espelho exato Astro Brand Studio.
 * 4 colunas: [BRAND] [DESIGN SYSTEM] [VISUAL] [SHOWCASE]
 * Brand symbol esquerda · navegação 4-col direita · bottom-bar
 */
export function Footer() {
  return (
    <footer className="border-t border-border mt-12 md:mt-16">
      <Container className="py-12 md:py-16 lg:py-20">
        <div className="flex flex-col sm:flex-row gap-10 md:gap-12">
          {/* Brand */}
          <div className="shrink-0">
            <Link href="/" aria-label="Home" className="inline-block">
              <ThemeLogo variant="symbol" width={36} height={26} className="h-[28px] w-auto" />
            </Link>
          </div>

          {/* 4 columns */}
          <nav className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h3 className="font-mono text-[10px] tracking-[0.3em] opacity-50 uppercase mb-4 md:mb-5">
                  {col.title}
                </h3>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={`${col.title}-${link.num}-${link.href}`}>
                      <Link
                        href={link.href}
                        className="group/foot flex items-baseline gap-3 text-sm opacity-75 hover:opacity-100 transition-opacity duration-base ease-smooth"
                      >
                        <span className="font-mono text-[10px] tracking-widest opacity-50 shrink-0 w-8">
                          {link.num}
                        </span>
                        <span className="font-display tracking-tight inline-block transition-transform duration-base ease-smooth group-hover/foot:translate-x-1">
                          {link.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </Container>

      <div className="border-t border-border">
        <Container className="py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[10px] font-mono tracking-[0.22em] opacity-50 uppercase">
          <span>© 2026 SINAPSE — make it shine.</span>
          <span>Florianópolis · BR</span>
        </Container>
      </div>
    </footer>
  );
}
