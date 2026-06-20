"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { LOGO, SNPS_LOCKUP_RATIO } from "./logo";

/**
 * ThemeLogo — auto-swap entre versão Vanta (escura) e Bone (clara)
 * baseado em data-theme do <html>.
 *
 * REGRA DE CONTRASTE (Guidelines 0.0):
 *  - bg Bone (light) → glyph Vanta (escuro) ✓
 *  - bg Vanta (dark) → glyph Bone (claro) ✓
 *
 * REGRA DE MARCA (canon §3): o logo OFICIAL é o lockup vetorial "símbolo + SNPS"
 *  (`snps-lockup.svg`, viewBox 489.2×113.46), NUNCA "SINAPSE" por extenso.
 *  variant "lockup"/"wordmark" = asset oficial SNPS; variant "symbol" = glyph puro.
 */

type Variant = "lockup" | "wordmark" | "symbol";

interface Props {
  variant?: Variant;
  className?: string;
  /** Altura do glyph em px (largura é proporcional). Default 22. */
  width?: number;
  height?: number;
  alt?: string;
  priority?: boolean;
  /**
   * Force theme — para pages com bg fixo independente do tema global.
   * "vanta" = bg dark → glyph Bone (claro)
   * "bone" = bg light → glyph Vanta (escuro)
   */
  forceBg?: "vanta" | "bone";
}

function useThemeBg(forceBg?: "vanta" | "bone") {
  const [theme, setTheme] = useState<"bone" | "vanta">("vanta");
  useEffect(() => {
    if (forceBg) return;
    const stored = (document.documentElement.dataset.theme as "bone" | "vanta" | undefined) ?? "vanta";
    setTheme(stored);
    const obs = new MutationObserver(() => {
      setTheme((document.documentElement.dataset.theme as "bone" | "vanta") ?? "vanta");
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, [forceBg]);
  return forceBg ?? theme;
}

export function ThemeLogo({
  variant = "lockup",
  className,
  width = 140,
  height = 22,
  alt = "SNPS",
  priority,
  forceBg,
}: Props) {
  const bg = useThemeBg(forceBg);
  // bg light → glyph dark (vanta) · bg dark → glyph light (bone)
  const symbolSrc = bg === "vanta" ? LOGO.symbolBone : LOGO.symbol;

  // Símbolo puro (glyph sozinho, sem texto) — usado no footer.
  if (variant === "symbol") {
    return (
      <Image
        src={symbolSrc}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className={className}
      />
    );
  }

  // Lockup / wordmark = LOGO OFICIAL (símbolo + SNPS, asset vetorial). canon §3.
  const lockupSrc = bg === "vanta" ? LOGO.snpsLockupBone : LOGO.snpsLockup;
  const lockupH = height;
  const lockupW = Math.round(lockupH * SNPS_LOCKUP_RATIO);

  return (
    <Image
      src={lockupSrc}
      alt={alt}
      width={lockupW}
      height={lockupH}
      priority={priority}
      className={`w-auto ${className ?? ""}`}
      style={{ height: lockupH }}
      aria-label="SNPS"
    />
  );
}
