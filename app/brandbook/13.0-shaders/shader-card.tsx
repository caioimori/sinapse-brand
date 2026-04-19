"use client";

import Link from "next/link";
import { ShaderCanvas } from "@/components/brand/shader-canvas";

interface Props {
  id: string;
  name: string;
  source: string;
  desc: string;
  theme: string;
  slug: string;
}

export function ShaderCard({ id, name, source, desc, theme, slug }: Props) {
  return (
    <div className="bg-background relative flex flex-col min-h-[420px] group/shader">
      {/* Live shader preview — fills entire card top */}
      <div className="relative w-full aspect-[16/10] overflow-hidden border-b border-border bg-muted">
        <ShaderCanvas fragmentShader={source} inline />
        <div className="absolute top-3 left-3 z-10 font-mono text-[10px] tracking-[0.3em] mix-blend-difference text-white">
          {id}
        </div>
        <div className="absolute top-3 right-3 z-10 font-mono text-[10px] tracking-[0.3em] mix-blend-difference text-white flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-white rounded-full auto-blink" />
          LIVE
        </div>
      </div>

      <div className="flex flex-col gap-4 p-6 md:p-7 flex-1">
        <div>
          <div className="font-mono text-[10px] tracking-[0.22em] opacity-50 uppercase mb-2">// {theme}</div>
          <div className="font-display font-medium text-xl md:text-2xl tracking-tight leading-none">{name}</div>
          <p className="mt-3 font-sans text-sm opacity-65 leading-relaxed">{desc}</p>
        </div>
        <Link
          href={`/brandbook/13.0-shaders/${slug}`}
          className="link-cs font-mono text-[11px] tracking-[0.25em] opacity-70 hover:opacity-100 inline-flex items-center gap-2 mt-auto"
        >
          OPEN FULL-SCREEN →
        </Link>
      </div>
    </div>
  );
}
