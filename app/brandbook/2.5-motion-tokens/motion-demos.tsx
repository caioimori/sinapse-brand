"use client";

import { useEffect, useRef, useState } from "react";

const EASINGS = [
  { name: "smooth", value: "cubic-bezier(0.16, 1, 0.3, 1)", desc: "Default — ease-out-expo luxury" },
  { name: "back", value: "cubic-bezier(0.34, 1.56, 0.64, 1)", desc: "Overshoot — micro-pop tactile" },
  { name: "swift", value: "cubic-bezier(0.4, 0, 0.2, 1)", desc: "Material — snappy data UI" },
];

const DURATIONS = [
  { name: "fast", value: 150 },
  { name: "base", value: 250 },
  { name: "slow", value: 400 },
  { name: "deliberate", value: 600 },
  { name: "cinematic", value: 800 },
];

export function EasingDemo() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick((n) => n + 1), 2200);
    return () => clearInterval(t);
  }, []);
  const on = tick % 2 === 1;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      {EASINGS.map((e) => (
        <div key={e.name} className="bg-background border border-border p-6 md:p-8 flex flex-col gap-5 min-h-[220px]">
          <div>
            <div className="font-mono text-[11px] tracking-[0.22em] uppercase opacity-80">{e.name}</div>
            <div className="font-mono text-[10px] opacity-50 mt-1 break-all">{e.value}</div>
            <p className="font-sans text-sm opacity-65 mt-2">{e.desc}</p>
          </div>
          <div className="relative h-2 bg-muted overflow-hidden mt-auto">
            <div
              className="absolute inset-y-0 w-2 h-full bg-foreground"
              style={{
                transition: `transform 1.4s ${e.value}`,
                transform: on ? "translateX(calc(100% * 1000% / 100 - 8px))" : "translateX(0)",
                width: "8px",
              }}
            />
            <div
              className="absolute inset-y-0 w-2 bg-foreground"
              style={{
                transition: `transform 1.4s ${e.value}`,
                transform: on ? "translateX(calc(var(--track) - 8px))" : "translateX(0)",
                ["--track" as string]: "100%",
                left: 0,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function DurationDemo() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick((n) => n + 1), 1600);
    return () => clearInterval(t);
  }, []);
  const on = tick % 2 === 1;
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
      {DURATIONS.map((d) => (
        <div key={d.name} className="bg-background border border-border p-4 md:p-5 flex flex-col gap-3 min-h-[140px]">
          <div>
            <div className="font-mono text-[10px] tracking-[0.22em] uppercase opacity-80">{d.name}</div>
            <div className="font-mono text-[9px] opacity-50">{d.value}ms</div>
          </div>
          <div className="relative flex-1 flex items-end">
            <div
              className="w-3 h-3 bg-foreground rounded-full"
              style={{
                transition: `transform ${d.value}ms cubic-bezier(0.16,1,0.3,1)`,
                transform: on ? "translateX(calc(100% + 60px))" : "translateX(0)",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function KeyframeDemo() {
  const ref = useRef<HTMLDivElement>(null);
  function play(klass: string) {
    if (!ref.current) return;
    ref.current.classList.remove(klass);
    void ref.current.offsetWidth;
    ref.current.classList.add(klass);
  }
  const items = [
    { label: "fade-up", klass: "animate-fade-up" },
    { label: "fade-in", klass: "animate-fade-in" },
    { label: "draw-line", klass: "animate-draw-line" },
    { label: "ring-pulse", klass: "animate-ring-pulse" },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr,2fr] gap-6">
      <div className="bg-background border border-border p-6 md:p-8 flex flex-col gap-3">
        <div className="font-mono text-[11px] tracking-[0.22em] uppercase opacity-70">Trigger</div>
        {items.map((i) => (
          <button
            key={i.klass}
            type="button"
            onClick={() => play(i.klass)}
            className="btn-magnetic w-full font-mono text-[11px] tracking-[0.22em] px-4 py-3 border border-foreground text-left"
          >
            ▶ {i.label}
          </button>
        ))}
      </div>
      <div className="bg-background border border-border p-6 md:p-8 flex items-center justify-center min-h-[260px]">
        <div ref={ref} className="font-display text-3xl md:text-5xl font-light tracking-tight">
          SINAPSE
        </div>
      </div>
    </div>
  );
}
