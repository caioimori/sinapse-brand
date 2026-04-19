"use client";

import { useEffect, useRef, useState } from "react";

const VOCAB = [
  {
    name: "Brand Reveal",
    duration: "800ms",
    use: "Hero entrance — single dramatic reveal",
    play: (el: HTMLElement) => {
      el.style.cssText = "opacity:0; transform: translateY(40px); transition: opacity 800ms cubic-bezier(0.16,1,0.3,1), transform 800ms cubic-bezier(0.16,1,0.3,1);";
      requestAnimationFrame(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      });
    },
  },
  {
    name: "Stagger Letters",
    duration: "1.2s",
    use: "Headings · char-by-char (SplitType ready)",
    play: (el: HTMLElement) => {
      const text = el.textContent ?? "";
      el.innerHTML = text
        .split("")
        .map(
          (c, i) =>
            `<span style="display:inline-block; opacity:0; transform:translateY(0.5em); transition: opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 30}ms, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 30}ms;">${c === " " ? "&nbsp;" : c}</span>`,
        )
        .join("");
      requestAnimationFrame(() => {
        el.querySelectorAll<HTMLElement>("span").forEach((s) => {
          s.style.opacity = "1";
          s.style.transform = "translateY(0)";
        });
      });
    },
  },
  {
    name: "Magnetic Pull",
    duration: "475ms",
    use: "CTAs · button hover compress + bg explode",
    play: (el: HTMLElement) => {
      el.classList.add("btn-magnetic");
      el.style.transform = "scale(0.92)";
      setTimeout(() => {
        el.style.transform = "scale(1)";
      }, 200);
    },
  },
  {
    name: "Draw Line",
    duration: "1.2s",
    use: "Section dividers · scaleX from origin",
    play: (el: HTMLElement) => {
      el.style.cssText = "transform: scaleX(0); transform-origin: left; transition: transform 1.2s cubic-bezier(0.16,1,0.3,1);";
      requestAnimationFrame(() => {
        el.style.transform = "scaleX(1)";
      });
    },
  },
  {
    name: "Ring Pulse",
    duration: "2.4s loop",
    use: "Live indicators · attention without distraction",
    play: () => {},
  },
  {
    name: "Fade Up Stagger",
    duration: "0.9s",
    use: "Lists · cards · 6-item stagger",
    play: (el: HTMLElement) => {
      const children = el.children as HTMLCollectionOf<HTMLElement>;
      Array.from(children).forEach((c, i) => {
        c.style.cssText = `opacity:0; transform:translateY(24px); transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 90}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 90}ms;`;
        requestAnimationFrame(() => {
          c.style.opacity = "1";
          c.style.transform = "translateY(0)";
        });
      });
    },
  },
];

export function MotionVocab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
      {VOCAB.map((v) => (
        <MotionDemo key={v.name} item={v} />
      ))}
    </div>
  );
}

function MotionDemo({ item }: { item: typeof VOCAB[number] }) {
  const playRef = useRef<HTMLDivElement>(null);
  const [revealKey, setRevealKey] = useState(0);

  function trigger() {
    setRevealKey((k) => k + 1);
    requestAnimationFrame(() => {
      if (playRef.current) item.play(playRef.current);
    });
  }

  // Auto-play once on mount
  useEffect(() => {
    const t = setTimeout(() => trigger(), 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-background border border-border flex flex-col min-h-[280px]">
      <div className="p-5 md:p-6 border-b border-border flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="font-display text-lg md:text-xl tracking-tight font-medium">{item.name}</div>
          <p className="mt-1 font-sans text-sm opacity-65">{item.use}</p>
        </div>
        <div className="font-mono text-[10px] tracking-[0.22em] opacity-60 shrink-0">{item.duration}</div>
      </div>
      <div className="flex-1 flex items-center justify-center bg-card relative overflow-hidden p-8 min-h-[140px]">
        {item.name === "Ring Pulse" ? (
          <div className="relative w-3 h-3">
            <div className="absolute inset-0 bg-foreground rounded-full" />
            <div className="absolute inset-0 bg-foreground rounded-full animate-ring-pulse" />
            <div className="absolute inset-0 bg-foreground rounded-full animate-ring-pulse" style={{ animationDelay: "1.2s" }} />
          </div>
        ) : item.name === "Fade Up Stagger" ? (
          <div ref={playRef} key={revealKey} className="grid grid-cols-3 gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="w-10 h-10 bg-foreground" />
            ))}
          </div>
        ) : item.name === "Stagger Letters" ? (
          <div ref={playRef} key={revealKey} className="font-display text-2xl md:text-3xl tracking-tight font-medium">
            SINAPSE
          </div>
        ) : item.name === "Draw Line" ? (
          <div ref={playRef} key={revealKey} className="h-px w-3/4 max-w-[260px] bg-foreground" />
        ) : item.name === "Magnetic Pull" ? (
          <div ref={playRef} key={revealKey}>
            <button
              type="button"
              onClick={trigger}
              className="btn-magnetic font-mono text-[11px] tracking-[0.25em] px-6 py-4 border border-foreground"
            >
              HOVER OR CLICK
            </button>
          </div>
        ) : (
          <div ref={playRef} key={revealKey} className="font-display text-2xl md:text-3xl tracking-tight font-medium">
            SINAPSE
          </div>
        )}
      </div>
      <div className="p-3 border-t border-border flex items-center justify-between">
        <code className="font-mono text-[10px] opacity-50">cubic-bezier(0.16,1,0.3,1)</code>
        <button
          type="button"
          onClick={trigger}
          className="font-mono text-[10px] tracking-[0.22em] opacity-60 hover:opacity-100 transition-opacity"
        >
          ↻ REPLAY
        </button>
      </div>
    </div>
  );
}
