"use client";

import { useState } from "react";
import { CornerBrackets } from "@/components/brand/corner-brackets";

export function ButtonShowcase() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      <DemoCard label="Primary">
        <button type="button" className="bg-foreground text-background font-mono text-[11px] tracking-[0.25em] px-6 py-4 hover:opacity-90 transition-opacity">
          PRIMARY ACTION
        </button>
      </DemoCard>
      <DemoCard label="Outline">
        <button type="button" className="border border-foreground font-mono text-[11px] tracking-[0.25em] px-6 py-4 hover:bg-foreground hover:text-background transition-colors">
          OUTLINE
        </button>
      </DemoCard>
      <DemoCard label="Ghost">
        <button type="button" className="font-mono text-[11px] tracking-[0.25em] px-6 py-4 opacity-70 hover:opacity-100 transition-opacity">
          GHOST
        </button>
      </DemoCard>
      <DemoCard label="Magnetic">
        <button type="button" className="btn-magnetic border border-foreground font-mono text-[11px] tracking-[0.25em] px-6 py-4">
          HOVER ME
        </button>
      </DemoCard>
      <DemoCard label="Underscore CTA">
        <button type="button" className="cta-underscore font-mono text-[11px] tracking-[0.25em] px-6 py-4 border border-foreground">
          START
        </button>
      </DemoCard>
      <DemoCard label="Icon + label">
        <button type="button" className="group/btn font-mono text-[11px] tracking-[0.25em] px-6 py-4 border border-foreground inline-flex items-center gap-3">
          NEXT
          <span className="inline-block transition-transform duration-base ease-smooth group-hover/btn:translate-x-1">→</span>
        </button>
      </DemoCard>
    </div>
  );
}

export function CardShowcase() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      <article className="bg-background border border-border p-6 md:p-8 min-h-[260px] flex flex-col gap-4">
        <div className="font-mono text-[10px] tracking-[0.22em] opacity-50 uppercase">// FLAT CARD</div>
        <h3 className="font-display text-xl md:text-2xl tracking-tight">Card básico</h3>
        <p className="font-sans text-sm opacity-65 leading-relaxed flex-1">
          Container padrão. Bg-background + border hairline. Use em listas, grids editorial.
        </p>
        <div className="font-mono text-[10px] opacity-50 mt-auto">.bg-background .border</div>
      </article>

      <CornerBrackets className="bg-card border border-border p-6 md:p-8 min-h-[260px] flex flex-col gap-4">
        <div className="font-mono text-[10px] tracking-[0.22em] opacity-50 uppercase">// BRACKETED CARD</div>
        <h3 className="font-display text-xl md:text-2xl tracking-tight">Com brackets</h3>
        <p className="font-sans text-sm opacity-65 leading-relaxed flex-1">
          Para destaque editorial ou emphasis. Adiciona scope reticle nos cantos.
        </p>
        <div className="font-mono text-[10px] opacity-50 mt-auto">{`<CornerBrackets>`}</div>
      </CornerBrackets>

      <article className="bg-foreground text-background p-6 md:p-8 min-h-[260px] flex flex-col gap-4">
        <div className="font-mono text-[10px] tracking-[0.22em] opacity-60 uppercase">// INVERTED CARD</div>
        <h3 className="font-display text-xl md:text-2xl tracking-tight">Inverted</h3>
        <p className="font-sans text-sm opacity-70 leading-relaxed flex-1">
          Para CTAs principais e callouts. Bg foreground + text background.
        </p>
        <div className="font-mono text-[10px] opacity-50 mt-auto">.bg-foreground .text-background</div>
      </article>

      <article className="bg-background border border-border min-h-[260px] flex flex-col overflow-hidden">
        <div className="pattern-dots aspect-[16/10] w-full bg-card" />
        <div className="p-6 flex flex-col gap-3 flex-1">
          <div className="font-mono text-[10px] tracking-[0.22em] opacity-50 uppercase">// MEDIA CARD</div>
          <h3 className="font-display text-lg md:text-xl tracking-tight">Com media</h3>
          <p className="font-sans text-sm opacity-65 leading-relaxed mt-auto">
            Aspect-ratio fixo no topo. Conteúdo abaixo.
          </p>
        </div>
      </article>

      <article className="hud-frame-full bg-background p-6 md:p-8 min-h-[260px] flex flex-col gap-4">
        <div className="font-mono text-[10px] tracking-[0.22em] opacity-50 uppercase">// HUD CARD</div>
        <h3 className="font-display text-xl md:text-2xl tracking-tight">HUD frame</h3>
        <p className="font-sans text-sm opacity-65 leading-relaxed flex-1">
          Brackets opostos (TR + BL). Sutil. Para callouts de sistema.
        </p>
        <div className="font-mono text-[10px] opacity-50 mt-auto">.hud-frame-full</div>
      </article>

      <article className="frame-notch bg-foreground text-background p-6 md:p-8 min-h-[260px] flex flex-col gap-4">
        <div className="font-mono text-[10px] tracking-[0.22em] opacity-60 uppercase">// NOTCH CARD</div>
        <h3 className="font-display text-xl md:text-2xl tracking-tight">Notched</h3>
        <p className="font-sans text-sm opacity-70 leading-relaxed flex-1">
          Clipped polygon. Para badges, decks, headers de section.
        </p>
        <div className="font-mono text-[10px] opacity-50 mt-auto">.frame-notch</div>
      </article>
    </div>
  );
}

export function FormShowcase() {
  const [v, setV] = useState("");
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
      <DemoCard label="Input · Text">
        <div className="w-full flex flex-col gap-2">
          <label className="font-mono text-[10px] tracking-[0.22em] opacity-60 uppercase">Email</label>
          <input
            type="email"
            placeholder="caio@sinapse.club"
            value={v}
            onChange={(e) => setV(e.target.value)}
            className="bg-background border border-input px-4 py-3 font-sans text-sm focus:outline-none focus:border-foreground focus:ring-1 focus:ring-ring transition-colors"
          />
        </div>
      </DemoCard>
      <DemoCard label="Textarea">
        <div className="w-full flex flex-col gap-2">
          <label className="font-mono text-[10px] tracking-[0.22em] opacity-60 uppercase">Mensagem</label>
          <textarea
            rows={3}
            placeholder="Escreva aqui..."
            className="bg-background border border-input px-4 py-3 font-sans text-sm focus:outline-none focus:border-foreground focus:ring-1 focus:ring-ring resize-none transition-colors"
          />
        </div>
      </DemoCard>
      <DemoCard label="Select">
        <div className="w-full flex flex-col gap-2">
          <label className="font-mono text-[10px] tracking-[0.22em] opacity-60 uppercase">Plano</label>
          <select className="bg-background border border-input px-4 py-3 font-sans text-sm focus:outline-none focus:border-foreground focus:ring-1 focus:ring-ring transition-colors">
            <option>Starter</option>
            <option>Pro</option>
            <option>Enterprise</option>
          </select>
        </div>
      </DemoCard>
      <DemoCard label="Checkbox">
        <div className="w-full flex items-start gap-3">
          <input type="checkbox" id="ck" defaultChecked className="mt-1 w-4 h-4 accent-foreground" />
          <label htmlFor="ck" className="font-sans text-sm leading-relaxed">
            Aceito os <span className="link-cs cursor-pointer">termos de uso</span> e a política de privacidade.
          </label>
        </div>
      </DemoCard>
    </div>
  );
}

export function FeedbackShowcase() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      <div className="bg-background border-l-2 border-foreground p-4 md:p-5">
        <div className="font-mono text-[10px] tracking-[0.22em] opacity-60 uppercase">// INFO</div>
        <p className="mt-2 font-sans text-sm leading-relaxed">Esse alerta carrega contexto. Use bord-l-2 + foreground.</p>
      </div>
      <div className="bg-background border-l-2 border-success p-4 md:p-5">
        <div className="font-mono text-[10px] tracking-[0.22em] opacity-60 uppercase text-success">// SUCCESS</div>
        <p className="mt-2 font-sans text-sm leading-relaxed">Operação concluída. Cor funcional FORA do brand.</p>
      </div>
      <div className="bg-background border-l-2 border-destructive p-4 md:p-5">
        <div className="font-mono text-[10px] tracking-[0.22em] opacity-60 uppercase text-destructive">// ERROR</div>
        <p className="mt-2 font-sans text-sm leading-relaxed">Algo quebrou. Use destructive token, sempre como state.</p>
      </div>
      <div className="border border-border p-4 md:p-5 bg-card flex items-center gap-3">
        <div className="skeleton h-10 w-10" />
        <div className="flex-1 flex flex-col gap-2">
          <div className="skeleton h-3 w-3/4" />
          <div className="skeleton h-3 w-1/2" />
        </div>
      </div>
      <div className="bg-foreground text-background p-4 md:p-5 flex items-center gap-3">
        <span className="w-2 h-2 bg-background rounded-full animate-pulse" />
        <div className="flex-1">
          <div className="font-mono text-[10px] tracking-[0.22em] opacity-70 uppercase">// TOAST</div>
          <p className="font-sans text-sm">Mensagem salva.</p>
        </div>
        <button type="button" className="font-mono text-[10px] opacity-70 hover:opacity-100">✕</button>
      </div>
      <div className="border border-border p-6 flex flex-col items-center justify-center text-center gap-3 bg-card min-h-[140px]">
        <div className="font-mono text-[12px] opacity-30 text-3xl">∅</div>
        <div className="font-display text-base">Nada por aqui ainda.</div>
        <div className="font-sans text-xs opacity-60">Empty state pattern.</div>
      </div>
    </div>
  );
}

function DemoCard({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="bg-background border border-border p-6 md:p-8 min-h-[180px] flex flex-col gap-5">
      <div>
        <div className="font-mono text-[10px] tracking-[0.22em] opacity-50 uppercase">// {label}</div>
      </div>
      <div className="flex-1 flex items-center justify-center w-full">{children}</div>
    </div>
  );
}
