/**
 * Centralized logo asset paths.
 * Server-component-safe (no "use client" boundary).
 *
 * Usage:
 *   import { LOGO } from "@/components/brand/logo";
 *   <Image src={LOGO.lockup} ... />
 */

export const LOGO = {
  // Vanta logos = dark glyph, use on Bone (light) backgrounds
  wordmark: "/brand/logo/vanta/sinapse-wordmark.svg",
  lockup: "/brand/logo/vanta/sinapse-lockup.svg",
  symbol: "/brand/logo/vanta/sinapse-symbol.svg",
  // Bone logos = light glyph, use on Vanta (dark) backgrounds
  wordmarkBone: "/brand/logo/bone/sinapse-wordmark.svg",
  lockupBone: "/brand/logo/bone/sinapse-lockup.svg",
  symbolBone: "/brand/logo/bone/sinapse-symbol.svg",
  // OFICIAL — lockup símbolo + SNPS (asset vetorial oficial, viewBox 489.2×113.46).
  // Regra de marca: ESTE é o logo oficial. dark glyph p/ bg light, white glyph p/ bg dark.
  snpsLockup: "/brand/logo/vanta/snps-lockup.svg",      // dark → bg Bone (light)
  snpsLockupBone: "/brand/logo/bone/snps-lockup.svg",   // white → bg Vanta (dark)
} as const;

// Aspecto do lockup oficial SNPS: 489.2 × 113.46 ≈ 4.312 : 1
export const SNPS_LOCKUP_RATIO = 489.2 / 113.46;
