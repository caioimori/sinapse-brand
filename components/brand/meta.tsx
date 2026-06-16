import { cn } from "@/lib/utils";

export function MetaLabel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("font-mono text-[10px] tracking-[0.3em] opacity-50 uppercase", className)}>
      {children}
    </div>
  );
}

export function Chip({
  children,
  dot = true,
  className = "",
}: {
  children: React.ReactNode;
  dot?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 bg-background/70 backdrop-blur-sm border border-border px-3 py-1.5",
        className,
      )}
    >
      {dot && <span className="w-1 h-1 bg-foreground rounded-full" />}
      <span className="font-mono text-[10px] tracking-[0.3em] opacity-60 uppercase">{children}</span>
    </div>
  );
}

export function SectionHeader({
  meta,
  title,
  emphasis,
  desc,
  aside,
}: {
  meta: string;
  title: string;
  emphasis?: string;
  desc?: string;
  aside?: React.ReactNode;
}) {
  return (
    <div className="flex items-end justify-between gap-6 flex-wrap">
      <div className="w-full max-w-[48ch]">
        <MetaLabel>{meta}</MetaLabel>
        <h2 className="mt-4 font-display font-light text-[clamp(1.75rem,4.5vw,3.25rem)] leading-[1] tracking-[-0.035em] max-w-[22ch] text-balance">
          {title}{" "}
          {emphasis && <span className="font-medium italic">{emphasis}</span>}
        </h2>
        {desc && <p className="mt-5 font-sans text-base md:text-lg leading-relaxed opacity-60 max-w-[52ch]">{desc}</p>}
      </div>
      {aside}
    </div>
  );
}
