"use client";

import { useState } from "react";
import { Container } from "@/components/brand/container";
import { MetaLabel } from "@/components/brand/meta";
import { Nav } from "@/components/brand/nav";
import { Footer } from "@/components/brand/footer";
import { NextSectionAuto } from "@/components/brand/next-section-auto";
import { PageHeader } from "@/components/brand/page-header";

type Size = "sm" | "md" | "lg";
type Variant = "primary" | "secondary" | "ghost" | "magnetic";

export default function Playground() {
  const [label, setLabel] = useState("EXECUTAR");
  const [variant, setVariant] = useState<Variant>("primary");
  const [size, setSize] = useState<Size>("md");
  const [disabled, setDisabled] = useState(false);

  const sizeClasses: Record<Size, string> = {
    sm: "px-4 py-2 text-[10px]",
    md: "px-6 py-3 text-[11px]",
    lg: "px-10 py-5 text-[13px]",
  };
  const variantClasses: Record<Variant, string> = {
    primary: "bg-foreground text-background hover:bg-background hover:text-foreground border-foreground",
    secondary: "bg-background text-foreground border-foreground hover:bg-foreground hover:text-background",
    ghost: "bg-transparent text-foreground border-transparent hover:border-foreground",
    magnetic: "bg-foreground text-background border-foreground magnet",
  };

  return (
    <main className="min-h-screen flex flex-col overflow-x-hidden">
      <Nav />
      <PageHeader
        section="Playground"
        number="P.0"
        title="Teste ao vivo."
        emphasis="Componentes sob controle."
        subtitle="Ambiente interativo pra validar componentes antes de colar em produção. Mexe nos props, vê o resultado, copia o código."
        tokens="live · client"
      />

      {/* BUTTON PLAYGROUND */}
      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <MetaLabel>[01] / Button Playground</MetaLabel>
          <h2 className="mt-4 font-display font-light text-[clamp(1.75rem,4.5vw,3.25rem)] leading-[0.95] tracking-[-0.04em] mb-10 md:mb-14 max-w-[22ch]">
            Props ao vivo. <span className="font-medium italic">Preview sincronizado.</span>
          </h2>

          <div className="grid lg:grid-cols-[1fr,1.5fr] gap-px bg-border border border-border">
            {/* CONTROLS */}
            <div className="bg-background p-8 md:p-10 space-y-8">
              <div className="space-y-3">
                <label className="block font-mono text-[10px] tracking-[0.3em] opacity-60">
                  LABEL
                </label>
                <input
                  type="text"
                  value={label}
                  onChange={(e) => setLabel(e.target.value.slice(0, 24))}
                  className="w-full px-4 py-3 border border-border bg-transparent font-sans text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:border-foreground"
                />
              </div>

              <div className="space-y-3">
                <label className="block font-mono text-[10px] tracking-[0.3em] opacity-60">
                  VARIANT
                </label>
                <div className="grid grid-cols-2 gap-px bg-border border border-border">
                  {(["primary", "secondary", "ghost", "magnetic"] as Variant[]).map((v) => (
                    <button
                      key={v}
                      onClick={() => setVariant(v)}
                      className={`px-3 py-3 font-mono text-[10px] tracking-[0.2em] uppercase transition-colors ${
                        variant === v
                          ? "bg-foreground text-background"
                          : "bg-background hover:bg-card"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="block font-mono text-[10px] tracking-[0.3em] opacity-60">
                  SIZE
                </label>
                <div className="grid grid-cols-3 gap-px bg-border border border-border">
                  {(["sm", "md", "lg"] as Size[]).map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`px-3 py-3 font-mono text-[10px] tracking-[0.2em] uppercase transition-colors ${
                        size === s ? "bg-foreground text-background" : "bg-background hover:bg-card"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={disabled}
                    onChange={(e) => setDisabled(e.target.checked)}
                    className="w-4 h-4 accent-foreground"
                  />
                  <span className="font-mono text-[10px] tracking-[0.3em] opacity-80">
                    DISABLED
                  </span>
                </label>
              </div>
            </div>

            {/* PREVIEW + CODE */}
            <div className="bg-card flex flex-col">
              <div className="flex-1 flex items-center justify-center min-h-[240px] p-8 md:p-12 relative">
                <div className="absolute top-4 left-4 font-mono text-[10px] tracking-[0.3em] opacity-50">
                  PREVIEW
                </div>
                <button
                  disabled={disabled}
                  className={`border font-mono tracking-[0.25em] transition-colors ${sizeClasses[size]} ${variantClasses[variant]} ${
                    disabled ? "opacity-40 cursor-not-allowed" : ""
                  }`}
                >
                  {label}
                </button>
              </div>
              <pre className="border-t border-border bg-background p-6 md:p-8 font-mono text-xs md:text-sm leading-relaxed overflow-x-auto">
{`<button
  className="border font-mono tracking-[0.25em]
    ${sizeClasses[size]}
    ${variantClasses[variant].split(" ").slice(0, 3).join(" ")}"
  ${disabled ? "disabled" : ""}
>
  ${label}
</button>`}
              </pre>
            </div>
          </div>
        </Container>
      </section>

      {/* TYPOGRAPHY PLAYGROUND */}
      <section className="border-b border-border bg-card">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <MetaLabel>[02] / Typography Playground</MetaLabel>
          <h2 className="mt-4 font-display font-light text-[clamp(1.75rem,4.5vw,3.25rem)] leading-[0.95] tracking-[-0.04em] mb-10 md:mb-14 max-w-[24ch]">
            Escala testável. <span className="font-medium italic">Clique pra mudar.</span>
          </h2>
          <TypePlayground />
        </Container>
      </section>

      {/* SURFACE PLAYGROUND */}
      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <MetaLabel>[03] / Surface Playground</MetaLabel>
          <h2 className="mt-4 font-display font-light text-[clamp(1.75rem,4.5vw,3.25rem)] leading-[0.95] tracking-[-0.04em] mb-10 md:mb-14 max-w-[24ch]">
            Elevation. <span className="font-medium italic">Borders. Glass.</span>
          </h2>
          <SurfacePlayground />
        </Container>
      </section>

      <NextSectionAuto current="P.0" />
      <Footer />
    </main>
  );
}

function TypePlayground() {
  const [font, setFont] = useState<"display" | "sans" | "mono">("display");
  const [weight, setWeight] = useState<"light" | "normal" | "medium">("light");
  const [size, setSize] = useState(96);

  const fontClass = { display: "font-display", sans: "font-sans", mono: "font-mono" }[font];
  const weightClass = { light: "font-light", normal: "font-normal", medium: "font-medium" }[weight];

  return (
    <div className="grid lg:grid-cols-[1fr,1.5fr] gap-px bg-border border border-border">
      <div className="bg-background p-8 md:p-10 space-y-8">
        <div className="space-y-3">
          <label className="block font-mono text-[10px] tracking-[0.3em] opacity-60">FAMILY</label>
          <div className="grid grid-cols-3 gap-px bg-border border border-border">
            {(["display", "sans", "mono"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFont(f)}
                className={`px-3 py-3 font-mono text-[10px] tracking-[0.2em] uppercase transition-colors ${
                  font === f ? "bg-foreground text-background" : "bg-background hover:bg-card"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <label className="block font-mono text-[10px] tracking-[0.3em] opacity-60">WEIGHT</label>
          <div className="grid grid-cols-3 gap-px bg-border border border-border">
            {(["light", "normal", "medium"] as const).map((w) => (
              <button
                key={w}
                onClick={() => setWeight(w)}
                className={`px-3 py-3 font-mono text-[10px] tracking-[0.2em] uppercase transition-colors ${
                  weight === w ? "bg-foreground text-background" : "bg-background hover:bg-card"
                }`}
              >
                {w}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <label className="block font-mono text-[10px] tracking-[0.3em] opacity-60">
            SIZE · {size}PX
          </label>
          <input
            type="range"
            min={11}
            max={220}
            step={1}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="w-full accent-foreground"
          />
          <div className="flex justify-between font-mono text-[9px] tracking-[0.25em] opacity-50">
            <span>11</span>
            <span>96</span>
            <span>220</span>
          </div>
        </div>
        {size >= 32 && size <= 48 && (
          <div className="font-mono text-[10px] tracking-[0.25em] p-3 border border-foreground bg-card">
            ⚠ FAIXA PROIBIDA · rule [05]
          </div>
        )}
      </div>
      <div className="bg-card flex items-center justify-center p-8 min-h-[280px] relative overflow-hidden">
        <span
          className={`${fontClass} ${weightClass} leading-[0.95] tracking-[-0.04em]`}
          style={{ fontSize: `${size}px` }}
        >
          Aa <span className="italic">0</span>
        </span>
        <div className="absolute bottom-4 left-4 font-mono text-[10px] tracking-[0.3em] opacity-50">
          {font.toUpperCase()} · {weight.toUpperCase()} · {size}PX
        </div>
      </div>
    </div>
  );
}

function SurfacePlayground() {
  const [border, setBorder] = useState(true);
  const [shadow, setShadow] = useState(false);
  const [glass, setGlass] = useState(false);
  const [radius, setRadius] = useState(0);

  return (
    <div className="grid lg:grid-cols-[1fr,1.5fr] gap-px bg-border border border-border">
      <div className="bg-background p-8 md:p-10 space-y-6">
        <label className="flex items-center gap-3 cursor-pointer select-none">
          <input type="checkbox" checked={border} onChange={(e) => setBorder(e.target.checked)} className="w-4 h-4 accent-foreground" />
          <span className="font-mono text-[10px] tracking-[0.3em] opacity-80">BORDER</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer select-none">
          <input type="checkbox" checked={shadow} onChange={(e) => setShadow(e.target.checked)} className="w-4 h-4 accent-foreground" />
          <span className="font-mono text-[10px] tracking-[0.3em] opacity-80">SHADOW</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer select-none">
          <input type="checkbox" checked={glass} onChange={(e) => setGlass(e.target.checked)} className="w-4 h-4 accent-foreground" />
          <span className="font-mono text-[10px] tracking-[0.3em] opacity-80">GLASS</span>
        </label>
        <div className="space-y-2">
          <label className="block font-mono text-[10px] tracking-[0.3em] opacity-60">
            RADIUS · {radius}PX
          </label>
          <input
            type="range"
            min={0}
            max={24}
            step={1}
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="w-full accent-foreground"
          />
        </div>
      </div>
      <div className="bg-card flex items-center justify-center p-8 min-h-[280px]">
        <div
          className={`w-64 h-40 ${border ? "border border-foreground" : ""} ${shadow ? "shadow-2xl" : ""} ${glass ? "glass-pane backdrop-blur-md" : "bg-background"} flex items-center justify-center transition-all`}
          style={{ borderRadius: `${radius}px` }}
        >
          <span className="font-mono text-[11px] tracking-[0.3em] opacity-60">SURFACE</span>
        </div>
      </div>
    </div>
  );
}
