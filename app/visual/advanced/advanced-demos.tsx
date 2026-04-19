"use client";

import { useState } from "react";

export function StepperDemo() {
  const [step, setStep] = useState(2);
  const steps = ["Diagnóstico", "Setup", "Onboarding", "Operação"];
  return (
    <div className="bg-background border border-border p-6 md:p-8">
      <div className="flex items-center gap-2">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <button
              type="button"
              onClick={() => setStep(i)}
              className={`w-9 h-9 rounded-full border flex items-center justify-center font-mono text-[11px] shrink-0 transition-colors duration-base ease-smooth ${i <= step ? "bg-foreground text-background border-foreground" : "border-border opacity-50"}`}
            >
              {i + 1}
            </button>
            <span className={`font-mono text-[10px] tracking-[0.22em] uppercase whitespace-nowrap ${i === step ? "opacity-100" : "opacity-50"}`}>
              {s}
            </span>
            {i < steps.length - 1 && <div className={`flex-1 h-px ${i < step ? "bg-foreground" : "bg-border"}`} />}
          </div>
        ))}
      </div>
    </div>
  );
}

export function CommandPaletteDemo() {
  const [q, setQ] = useState("");
  const items = ["Foundations · 2.0", "Typography · 2.1", "Color · 2.2", "Logo · 3.0", "Shaders · 13.0"].filter((i) =>
    i.toLowerCase().includes(q.toLowerCase()),
  );
  return (
    <div className="bg-background border border-border rounded-xl shadow-2xl shadow-black/10 max-w-md w-full overflow-hidden">
      <div className="border-b border-border p-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="// search sections..."
          className="w-full bg-transparent font-mono text-sm focus:outline-none"
        />
      </div>
      <ul className="max-h-60 overflow-y-auto">
        {items.length === 0 && (
          <li className="px-4 py-3 font-mono text-[11px] opacity-50">Nada encontrado</li>
        )}
        {items.map((i) => (
          <li key={i}>
            <button type="button" className="w-full text-left px-4 py-3 font-mono text-[11px] tracking-wide hover:bg-muted transition-colors duration-base ease-smooth flex items-center justify-between">
              <span>{i}</span>
              <span className="opacity-40">↵</span>
            </button>
          </li>
        ))}
      </ul>
      <div className="border-t border-border p-2 flex items-center justify-between font-mono text-[10px] tracking-[0.22em] opacity-50 uppercase">
        <span>↑↓ navigate</span>
        <span>esc close</span>
      </div>
    </div>
  );
}

export function ToggleGroupDemo() {
  const [val, setVal] = useState("week");
  return (
    <div className="inline-flex border border-border rounded-lg p-1 bg-background">
      {[
        { v: "day", l: "Dia" },
        { v: "week", l: "Semana" },
        { v: "month", l: "Mês" },
      ].map((o) => (
        <button
          key={o.v}
          type="button"
          onClick={() => setVal(o.v)}
          className={`px-4 py-2 font-mono text-[11px] tracking-[0.22em] uppercase rounded-md transition-colors duration-base ease-smooth ${val === o.v ? "bg-foreground text-background" : "opacity-65 hover:opacity-100"}`}
        >
          {o.l}
        </button>
      ))}
    </div>
  );
}
