"use client";

import { useState } from "react";

export function MagneticDemo() {
  return (
    <button type="button" className="btn-magnetic w-full font-mono text-[11px] tracking-[0.25em] px-6 py-5 border border-foreground">
      HOVER ME
    </button>
  );
}

export function HighlightDemo() {
  return (
    <p className="font-display font-light text-2xl md:text-3xl tracking-tight">
      Pass the cursor over{" "}
      <span className="text-highlight">this phrase</span> {" "}to see the marker sweep.
    </p>
  );
}

export function AccordionDemo() {
  const [open, setOpen] = useState<number | null>(0);
  const items = ["Diagnóstico", "Atração", "Conversão", "Escala"];
  return (
    <div className="border border-border divide-y divide-border bg-background">
      {items.map((label, i) => (
        <div key={label} className={`acc-item relative ${open === i ? "is-playing" : ""}`} style={{ ["--progress-dur" as string]: "5s" }}>
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full px-5 py-4 flex items-center gap-4 text-left group/acc"
          >
            <span className="font-mono text-[11px] tracking-[0.22em] opacity-50 w-10 shrink-0">0{i + 1}</span>
            <span className="font-display text-base md:text-lg tracking-tight flex-1">{label}</span>
            <span className={`font-mono text-[12px] opacity-60 transition-transform duration-base ease-smooth ${open === i ? "rotate-180" : ""}`}>▾</span>
          </button>
          {open === i && (
            <div className="px-5 pb-5 font-sans text-sm opacity-65 leading-relaxed -mt-2">
              Conteúdo de {label.toLowerCase()} expandido. Progress bar abaixo enche em 5s.
            </div>
          )}
          <div className="acc-progress" />
        </div>
      ))}
    </div>
  );
}

export function TiltDemo() {
  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const t = e.currentTarget;
    const r = t.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    const inner = t.querySelector<HTMLElement>(".tilt-card-inner");
    if (inner) {
      inner.style.setProperty("--rx", `${(-y * 12).toFixed(2)}deg`);
      inner.style.setProperty("--ry", `${(x * 12).toFixed(2)}deg`);
    }
  }
  function onLeave(e: React.MouseEvent<HTMLDivElement>) {
    const inner = e.currentTarget.querySelector<HTMLElement>(".tilt-card-inner");
    if (inner) {
      inner.style.setProperty("--rx", "0deg");
      inner.style.setProperty("--ry", "0deg");
    }
  }
  return (
    <div className="tilt-card cursor-pointer" onMouseMove={onMove} onMouseLeave={onLeave}>
      <div className="tilt-card-inner bg-foreground text-background p-8 md:p-10 min-h-[200px] flex flex-col justify-between border border-border">
        <div className="font-mono text-[10px] tracking-[0.22em] opacity-70">3D PERSPECTIVE</div>
        <div className="font-display text-2xl md:text-3xl tracking-tight font-medium">Move o mouse →</div>
      </div>
    </div>
  );
}
