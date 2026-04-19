"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { LOGO } from "./logo";

/**
 * ThemeLogo — auto-swap entre versão Vanta (escura) e Bone (clara)
 * baseado em data-theme do <html>.
 *
 * REGRA DE CONTRASTE (Guidelines 0.0):
 *  - bg Bone (light) → logo Vanta (escura) ✓
 *  - bg Vanta (dark) → logo Bone (clara) ✓
 */

type Variant = "lockup" | "wordmark" | "symbol";

interface Props {
  variant?: Variant;
  className?: string;
  width?: number;
  height?: number;
  alt?: string;
  priority?: boolean;
  /**
   * Force theme — para pages com bg fixo independente do tema global.
   * "vanta" = bg dark → usa logo Bone (clara)
   * "bone" = bg light → usa logo Vanta (escura)
   */
  forceBg?: "vanta" | "bone";
}

const SRC: Record<Variant, { vanta: string; bone: string }> = {
  lockup: { vanta: LOGO.lockup, bone: LOGO.lockupBone },
  wordmark: { vanta: LOGO.wordmark, bone: LOGO.wordmarkBone },
  symbol: { vanta: LOGO.symbol, bone: LOGO.symbolBone },
};

export function ThemeLogo({ variant = "lockup", className, width = 140, height = 22, alt = "SINAPSE", priority, forceBg }: Props) {
  const [theme, setTheme] = useState<"bone" | "vanta">("bone");

  useEffect(() => {
    if (forceBg) return;
    const stored = (document.documentElement.dataset.theme as "bone" | "vanta" | undefined) ?? "bone";
    setTheme(stored);
    const obs = new MutationObserver(() => {
      setTheme((document.documentElement.dataset.theme as "bone" | "vanta") ?? "bone");
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, [forceBg]);

  const bg = forceBg ?? theme;
  // bg light → logo dark (vanta) · bg dark → logo light (bone)
  const src = bg === "vanta" ? SRC[variant].bone : SRC[variant].vanta;

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={className}
    />
  );
}
