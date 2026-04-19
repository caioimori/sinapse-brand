import Link from "next/link";
import { Container } from "./container";
import { MetaLabel } from "./meta";

type PrevNext = { label: string; href: string };

export function PageHeader({
  section,
  number,
  title,
  emphasis,
  subtitle,
  tokens,
  prev,
  next,
}: {
  section: string;
  number: string;
  title: string;
  emphasis?: string;
  subtitle?: string;
  tokens?: number | string;
  prev?: PrevNext | null;
  next?: PrevNext | null;
}) {
  return (
    <section className="border-b border-border aurora-bg relative overflow-hidden">
      <div className="absolute inset-0 pattern-grid opacity-50 z-0" />
      <Container className="relative z-10 py-16 md:py-24 lg:py-28">
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="status-dot" />
              <MetaLabel>
                [{number}] / {section}
              </MetaLabel>
            </div>
            <h1 className="mt-5 font-display font-light text-[clamp(2.25rem,6vw,5rem)] leading-[0.92] tracking-[-0.045em] max-w-[16ch]">
              {title}{" "}
              {emphasis && <span className="font-medium italic">{emphasis}</span>}
            </h1>
            {subtitle && (
              <p className="mt-6 font-sans text-base md:text-lg leading-relaxed opacity-65 max-w-xl">
                {subtitle}
              </p>
            )}
          </div>
          {tokens !== undefined && (
            <div className="glass-pane rounded-xl px-5 py-4 text-right shadow-apple-sm">
              <div className="font-mono text-[10px] tracking-[0.3em] opacity-60">TOKENS</div>
              <div className="mt-1 font-display font-light text-2xl leading-none">{tokens}</div>
            </div>
          )}
        </div>

        {(prev || next) && (
          <div className="mt-12 md:mt-16 pt-6 border-t border-border flex items-center justify-between text-[10px] font-mono tracking-[0.25em] opacity-60">
            {prev ? (
              <Link href={prev.href} className="hover:opacity-100 opacity-60 link-reveal">
                ← {prev.label.toUpperCase()}
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link href={next.href} className="hover:opacity-100 opacity-60 link-reveal">
                {next.label.toUpperCase()} →
              </Link>
            ) : (
              <span />
            )}
          </div>
        )}
      </Container>
    </section>
  );
}
