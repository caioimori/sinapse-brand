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
} as const;
