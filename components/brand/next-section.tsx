import Link from "next/link";
import { Container } from "./container";
import { CornerBrackets } from "./corner-brackets";

interface Props {
  number: string;
  label: string;
  href: string;
  hint?: string;
}

/**
 * NextSection — CTA Apple-tier no fim de toda page levando à próxima.
 * Glass + invert hover + spring transition.
 */
export function NextSection({ number, label, href, hint }: Props) {
  return (
    <section className="border-b border-border aurora-bg">
      <Container className="py-12 sm:py-16 md:py-20 lg:py-28 relative z-10">
        <Link
          href={href}
          className="group/next block relative card-lift glass-pane rounded-2xl overflow-hidden"
        >
          <CornerBrackets className="block p-8 md:p-12 lg:p-16 transition-colors duration-base ease-apple group-hover/next:bg-foreground group-hover/next:text-background">
            <div className="grid md:grid-cols-[auto,1fr,auto] gap-6 md:gap-10 items-center">
              <div className="font-mono text-[11px] tracking-[0.25em] opacity-60 uppercase flex items-center gap-3">
                <span className="status-dot" />
                //NEXT [{number}]
              </div>
              <div>
                <div className="font-display font-light text-[clamp(2rem,6vw,4.5rem)] leading-[0.95] tracking-[-0.04em]">
                  {label}{" "}
                  <span className="inline-block transition-transform duration-deliberate ease-apple group-hover/next:translate-x-3">
                    →
                  </span>
                </div>
                {hint && (
                  <p className="mt-3 font-sans text-base md:text-lg opacity-65 max-w-xl leading-relaxed">
                    {hint}
                  </p>
                )}
              </div>
              <div className="font-mono text-[11px] tracking-[0.25em] opacity-50 hidden md:flex items-center gap-2 whitespace-nowrap">
                CONTINUAR
                <span className="auto-cursor opacity-70" />
              </div>
            </div>
          </CornerBrackets>
        </Link>
      </Container>
    </section>
  );
}
