/**
 * 12 Page templates como SVG mockups inline.
 * Cada um mostra a estrutura tipo wireframe denso.
 */

/**
 * Biblioteca Forense — recursos derivados da análise de ~30 repos reais.
 * Adicionado em: refactor/brandbook-forensics-integration
 * Fonte: templates/boas-praticas-interfaces.md + templates/catalogo/ + templates/starters/ + templates/biblioteca/
 */
export const FORENSICS_RESOURCES = [
  {
    id: "F.01",
    kind: "doc",
    name: "Boas Práticas de Interfaces",
    desc: "Doc-mestre: princípios gerais, anti-padrões por arquétipo, checklist pré-entrega. Derivado de ~30 repos reais.",
    path: "templates/boas-praticas-interfaces.md",
    badge: "DOC",
  },
  {
    id: "F.02",
    kind: "tokens",
    name: "tokens.json Canônico (DTCG)",
    desc: "Fonte da verdade machine-readable. Paleta B&W bone/vanta, tipografia fluida, motion, radius, identity layer.",
    path: "tokens.json",
    badge: "JSON",
  },
  {
    id: "F.03",
    kind: "archetype",
    name: "Dashboard / SaaS App",
    desc: "AppShell 240px + Topbar 56px + MetricCard sem dead-zone + StatusPill data-driven + multi-brand [data-brand].",
    path: "templates/catalogo/saas-app/tokens.json",
    badge: "ARQUÉTIPO",
  },
  {
    id: "F.04",
    kind: "archetype",
    name: "Site Institucional",
    desc: "Atomic design, route-groups, SEO/GEO first-class, SectionTitle clamp(), buttonStyles.ts como fonte única.",
    path: "templates/catalogo/design-system/tokens.json",
    badge: "ARQUÉTIPO",
  },
  {
    id: "F.05",
    kind: "archetype",
    name: "Landing Page",
    desc: "14 blocos lp-* modulares, nav scroll-spy, CtaPill variant, PlanCard invertido, FAQ zero-JS <details>.",
    path: "templates/catalogo/landing-page/tokens.json",
    badge: "ARQUÉTIPO",
  },
  {
    id: "F.06",
    kind: "archetype",
    name: "E-commerce (storefront + admin)",
    desc: "PLP/PDP/cart/busca/conta/admin, tokenização 2 camadas re-skinável, SEO/GEO, swatches por gradiente.",
    path: "templates/catalogo/ecommerce/tokens.json",
    badge: "ARQUÉTIPO",
  },
  {
    id: "F.07",
    kind: "archetype",
    name: "Link-bio Mobile",
    desc: "Coluna única max-w-[430px], banner full-bleed grayscale, LinkButton componente, lead-tracking UTM+n8n.",
    path: "templates/catalogo/link-bio/tokens.json",
    badge: "ARQUÉTIPO",
  },
  {
    id: "F.08",
    kind: "archetype",
    name: "Proposta / Deck Interativo",
    desc: "DS local ~12 tokens, tipografia 100% clamp(), reveal.js disableLayout, kit: pricing-card, flow-canvas, stat/kpi.",
    path: "templates/catalogo/proposta/tokens.json",
    badge: "ARQUÉTIPO",
  },
  {
    id: "F.09",
    kind: "archetype",
    name: "Guia / Documentação B&W",
    desc: "HTML single-file, tokens :root inline, grain SVG inline, crosshair, Sora/Inter/JetBrains, hero assimétrico.",
    path: "templates/catalogo/guia/tokens.json",
    badge: "ARQUÉTIPO",
  },
  {
    id: "F.10",
    kind: "archetype",
    name: "Canvas / Diagrama Interativo",
    desc: "Render NODES[]/EDGES[], pan translate3d, zoom focal, fitToScreen por bbox real, minimap sincronizado.",
    path: "templates/catalogo/canvas/tokens.json",
    badge: "ARQUÉTIPO",
  },
] as const;

export type ForensicsResource = typeof FORENSICS_RESOURCES[number];

export const PAGE_TEMPLATES = [
  { id: "15.1", name: "Hero · Centered SaaS", aspect: "16/10", kind: "hero-centered" },
  { id: "15.2", name: "Hero · Split asymmetric", aspect: "16/10", kind: "hero-split" },
  { id: "15.3", name: "Bento Dashboard 4-col", aspect: "16/10", kind: "bento" },
  { id: "15.4", name: "Pricing 3-tier", aspect: "16/10", kind: "pricing" },
  { id: "15.5", name: "Features alternating", aspect: "16/10", kind: "features" },
  { id: "15.6", name: "Testimonials grid", aspect: "16/10", kind: "testimonials" },
  { id: "15.7", name: "Long-form editorial", aspect: "16/10", kind: "editorial" },
  { id: "15.8", name: "Landing comercial agência", aspect: "16/10", kind: "agency" },
  { id: "15.9", name: "Case study deep-dive", aspect: "16/10", kind: "case" },
  { id: "15.10", name: "Auto-fit Cards Grid", aspect: "16/10", kind: "autofit" },
  { id: "15.11", name: "Sales page longa", aspect: "16/10", kind: "sales" },
  { id: "15.12", name: "Course/Mentoria LP", aspect: "16/10", kind: "course" },
];

export function PageTemplatePreview({ kind }: { kind: string }) {
  const stroke = "currentColor";
  const fillLight = "currentColor";
  switch (kind) {
    case "hero-centered":
      return (
        <svg viewBox="0 0 200 125" className="w-full h-full" aria-hidden>
          {/* nav */}
          <rect x="10" y="10" width="180" height="6" fill="none" stroke={stroke} strokeOpacity="0.3" />
          <rect x="14" y="12" width="14" height="2" fill={fillLight} fillOpacity="0.6" />
          <rect x="160" y="12" width="26" height="2" fill={fillLight} fillOpacity="0.4" />
          {/* hero centered */}
          <rect x="40" y="32" width="120" height="6" fill={fillLight} fillOpacity="0.7" />
          <rect x="50" y="42" width="100" height="3" fill={fillLight} fillOpacity="0.4" />
          <rect x="60" y="48" width="80" height="3" fill={fillLight} fillOpacity="0.4" />
          {/* CTA */}
          <rect x="80" y="58" width="40" height="6" fill={fillLight} fillOpacity="0.85" />
          {/* features 3 cards */}
          {[0, 1, 2].map((i) => (
            <rect key={i} x={20 + i * 56} y="78" width="48" height="38" fill={fillLight} fillOpacity="0.08" stroke={stroke} strokeOpacity="0.3" />
          ))}
        </svg>
      );
    case "hero-split":
      return (
        <svg viewBox="0 0 200 125" className="w-full h-full" aria-hidden>
          <rect x="10" y="10" width="180" height="6" fill="none" stroke={stroke} strokeOpacity="0.3" />
          <rect x="10" y="22" width="90" height="80" fill={fillLight} fillOpacity="0.06" stroke={stroke} strokeOpacity="0.3" />
          <rect x="14" y="32" width="60" height="4" fill={fillLight} fillOpacity="0.7" />
          <rect x="14" y="40" width="80" height="4" fill={fillLight} fillOpacity="0.7" />
          <rect x="14" y="50" width="50" height="2" fill={fillLight} fillOpacity="0.4" />
          <rect x="14" y="55" width="65" height="2" fill={fillLight} fillOpacity="0.4" />
          <rect x="14" y="78" width="30" height="6" fill={fillLight} fillOpacity="0.85" />
          {/* right image */}
          <rect x="105" y="22" width="85" height="80" fill={fillLight} fillOpacity="0.18" stroke={stroke} strokeOpacity="0.3" />
        </svg>
      );
    case "bento":
      return (
        <svg viewBox="0 0 200 125" className="w-full h-full" aria-hidden>
          <rect x="10" y="10" width="180" height="6" fill="none" stroke={stroke} strokeOpacity="0.3" />
          {/* bento 4-col 3-row */}
          <rect x="10" y="22" width="90" height="60" fill={fillLight} fillOpacity="0.7" />
          <rect x="105" y="22" width="40" height="28" fill={fillLight} fillOpacity="0.15" stroke={stroke} strokeOpacity="0.3" />
          <rect x="150" y="22" width="40" height="28" fill={fillLight} fillOpacity="0.15" stroke={stroke} strokeOpacity="0.3" />
          <rect x="105" y="55" width="85" height="27" fill={fillLight} fillOpacity="0.15" stroke={stroke} strokeOpacity="0.3" />
          <rect x="10" y="87" width="58" height="28" fill={fillLight} fillOpacity="0.15" stroke={stroke} strokeOpacity="0.3" />
          <rect x="73" y="87" width="58" height="28" fill={fillLight} fillOpacity="0.15" stroke={stroke} strokeOpacity="0.3" />
          <rect x="136" y="87" width="54" height="28" fill={fillLight} fillOpacity="0.15" stroke={stroke} strokeOpacity="0.3" />
        </svg>
      );
    case "pricing":
      return (
        <svg viewBox="0 0 200 125" className="w-full h-full" aria-hidden>
          <rect x="10" y="10" width="180" height="6" fill="none" stroke={stroke} strokeOpacity="0.3" />
          <rect x="60" y="22" width="80" height="4" fill={fillLight} fillOpacity="0.7" />
          {/* 3 tiers */}
          {[
            { x: 14, h: 86, featured: false },
            { x: 72, h: 95, featured: true },
            { x: 130, h: 86, featured: false },
          ].map((t, i) => (
            <g key={i}>
              <rect x={t.x} y={i === 1 ? 28 : 32} width="56" height={t.h} fill={t.featured ? fillLight : "none"} fillOpacity={t.featured ? 0.8 : 0} stroke={stroke} strokeOpacity="0.4" />
              <rect x={t.x + 6} y={(i === 1 ? 28 : 32) + 6} width="20" height="3" fill={t.featured ? "var(--background)" : fillLight} fillOpacity={t.featured ? 1 : 0.6} />
              <rect x={t.x + 6} y={(i === 1 ? 28 : 32) + 14} width="36" height="6" fill={t.featured ? "var(--background)" : fillLight} fillOpacity={t.featured ? 1 : 0.7} />
              {[0, 1, 2, 3].map((j) => (
                <rect key={j} x={t.x + 6} y={(i === 1 ? 28 : 32) + 30 + j * 8} width="40" height="2" fill={t.featured ? "var(--background)" : fillLight} fillOpacity={t.featured ? 0.7 : 0.4} />
              ))}
            </g>
          ))}
        </svg>
      );
    case "features":
      return (
        <svg viewBox="0 0 200 125" className="w-full h-full" aria-hidden>
          <rect x="10" y="10" width="180" height="6" fill="none" stroke={stroke} strokeOpacity="0.3" />
          {/* Row 1: text left, image right */}
          <rect x="14" y="22" width="42" height="3" fill={fillLight} fillOpacity="0.7" />
          <rect x="14" y="28" width="80" height="2" fill={fillLight} fillOpacity="0.4" />
          <rect x="14" y="33" width="70" height="2" fill={fillLight} fillOpacity="0.4" />
          <rect x="100" y="20" width="86" height="40" fill={fillLight} fillOpacity="0.18" stroke={stroke} strokeOpacity="0.3" />
          {/* Row 2: image left, text right */}
          <rect x="14" y="68" width="86" height="40" fill={fillLight} fillOpacity="0.18" stroke={stroke} strokeOpacity="0.3" />
          <rect x="105" y="68" width="42" height="3" fill={fillLight} fillOpacity="0.7" />
          <rect x="105" y="74" width="80" height="2" fill={fillLight} fillOpacity="0.4" />
          <rect x="105" y="79" width="60" height="2" fill={fillLight} fillOpacity="0.4" />
        </svg>
      );
    case "testimonials":
      return (
        <svg viewBox="0 0 200 125" className="w-full h-full" aria-hidden>
          <rect x="10" y="10" width="180" height="6" fill="none" stroke={stroke} strokeOpacity="0.3" />
          <rect x="60" y="22" width="80" height="4" fill={fillLight} fillOpacity="0.7" />
          {/* 6 cards 3x2 */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <g key={i}>
              <rect x={14 + (i % 3) * 60} y={36 + Math.floor(i / 3) * 42} width="56" height="38" fill={fillLight} fillOpacity="0.08" stroke={stroke} strokeOpacity="0.3" />
              <circle cx={20 + (i % 3) * 60} cy={42 + Math.floor(i / 3) * 42} r="3" fill={fillLight} fillOpacity="0.6" />
              <rect x={28 + (i % 3) * 60} y={40 + Math.floor(i / 3) * 42} width="20" height="2" fill={fillLight} fillOpacity="0.5" />
              <rect x={18 + (i % 3) * 60} y={50 + Math.floor(i / 3) * 42} width="48" height="1.5" fill={fillLight} fillOpacity="0.3" />
              <rect x={18 + (i % 3) * 60} y={55 + Math.floor(i / 3) * 42} width="38" height="1.5" fill={fillLight} fillOpacity="0.3" />
              <rect x={18 + (i % 3) * 60} y={60 + Math.floor(i / 3) * 42} width="44" height="1.5" fill={fillLight} fillOpacity="0.3" />
            </g>
          ))}
        </svg>
      );
    case "editorial":
      return (
        <svg viewBox="0 0 200 125" className="w-full h-full" aria-hidden>
          <rect x="10" y="10" width="180" height="6" fill="none" stroke={stroke} strokeOpacity="0.3" />
          {/* center column long-form */}
          <rect x="50" y="22" width="100" height="6" fill={fillLight} fillOpacity="0.7" />
          <rect x="50" y="32" width="80" height="2" fill={fillLight} fillOpacity="0.4" />
          {/* paragraphs */}
          {[40, 46, 52, 58, 64, 70, 76, 82, 88, 94, 100, 106].map((y, i) => (
            <rect key={y} x="50" y={y} width={i % 4 === 3 ? 60 : 100} height="1.2" fill={fillLight} fillOpacity="0.3" />
          ))}
        </svg>
      );
    case "agency":
      return (
        <svg viewBox="0 0 200 125" className="w-full h-full" aria-hidden>
          <rect x="10" y="10" width="180" height="6" fill="none" stroke={stroke} strokeOpacity="0.3" />
          {/* hero massive */}
          <rect x="14" y="22" width="120" height="10" fill={fillLight} fillOpacity="0.85" />
          <rect x="14" y="36" width="100" height="4" fill={fillLight} fillOpacity="0.5" />
          <rect x="14" y="44" width="30" height="6" fill={fillLight} fillOpacity="0.85" />
          {/* logos bar */}
          <rect x="14" y="58" width="172" height="10" fill={fillLight} fillOpacity="0.06" stroke={stroke} strokeOpacity="0.3" />
          {[20, 50, 80, 110, 140].map((x) => (
            <rect key={x} x={x} y="61" width="22" height="4" fill={fillLight} fillOpacity="0.4" />
          ))}
          {/* services 4 cards */}
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={14 + i * 44} y="76" width="40" height="40" fill={fillLight} fillOpacity="0.12" stroke={stroke} strokeOpacity="0.3" />
          ))}
        </svg>
      );
    case "case":
      return (
        <svg viewBox="0 0 200 125" className="w-full h-full" aria-hidden>
          <rect x="10" y="10" width="180" height="6" fill="none" stroke={stroke} strokeOpacity="0.3" />
          {/* big hero img */}
          <rect x="10" y="22" width="180" height="40" fill={fillLight} fillOpacity="0.18" stroke={stroke} strokeOpacity="0.3" />
          {/* problem/solution 2col */}
          <rect x="14" y="68" width="86" height="3" fill={fillLight} fillOpacity="0.7" />
          {[74, 80, 86, 92, 98].map((y) => (
            <rect key={y} x="14" y={y} width="80" height="2" fill={fillLight} fillOpacity="0.35" />
          ))}
          <rect x="106" y="68" width="86" height="3" fill={fillLight} fillOpacity="0.7" />
          {[74, 80, 86, 92, 98].map((y) => (
            <rect key={y} x="106" y={y} width="80" height="2" fill={fillLight} fillOpacity="0.35" />
          ))}
        </svg>
      );
    case "autofit":
      return (
        <svg viewBox="0 0 200 125" className="w-full h-full" aria-hidden>
          <rect x="10" y="10" width="180" height="6" fill="none" stroke={stroke} strokeOpacity="0.3" />
          <rect x="14" y="22" width="60" height="4" fill={fillLight} fillOpacity="0.7" />
          {Array.from({ length: 12 }).map((_, i) => (
            <rect key={i} x={14 + (i % 4) * 44} y={32 + Math.floor(i / 4) * 28} width="40" height="24" fill={fillLight} fillOpacity="0.1" stroke={stroke} strokeOpacity="0.3" />
          ))}
        </svg>
      );
    case "sales":
      return (
        <svg viewBox="0 0 200 125" className="w-full h-full" aria-hidden>
          <rect x="10" y="10" width="180" height="6" fill="none" stroke={stroke} strokeOpacity="0.3" />
          {/* multiple sections stacked */}
          <rect x="14" y="20" width="120" height="6" fill={fillLight} fillOpacity="0.85" />
          <rect x="14" y="28" width="60" height="6" fill={fillLight} fillOpacity="0.85" />
          <rect x="14" y="38" width="40" height="5" fill={fillLight} fillOpacity="0.85" />
          {/* video block */}
          <rect x="14" y="50" width="172" height="32" fill={fillLight} fillOpacity="0.18" stroke={stroke} strokeOpacity="0.3" />
          {/* checklist */}
          {[88, 94, 100, 106, 112].map((y) => (
            <g key={y}>
              <circle cx="20" cy={y} r="1.5" fill={fillLight} fillOpacity="0.7" />
              <rect x="26" y={y - 1} width={130 - (y % 30)} height="1.5" fill={fillLight} fillOpacity="0.4" />
            </g>
          ))}
        </svg>
      );
    case "course":
      return (
        <svg viewBox="0 0 200 125" className="w-full h-full" aria-hidden>
          <rect x="10" y="10" width="180" height="6" fill="none" stroke={stroke} strokeOpacity="0.3" />
          {/* big course title */}
          <rect x="14" y="22" width="140" height="8" fill={fillLight} fillOpacity="0.85" />
          <rect x="14" y="33" width="80" height="3" fill={fillLight} fillOpacity="0.5" />
          {/* curriculum list */}
          <rect x="14" y="48" width="100" height="3" fill={fillLight} fillOpacity="0.7" />
          {[56, 64, 72, 80, 88, 96, 104, 112].map((y, i) => (
            <g key={y}>
              <rect x="14" y={y} width="6" height="3" fill={fillLight} fillOpacity="0.6" />
              <rect x="24" y={y} width={100 + (i % 3) * 10} height="2.5" fill={fillLight} fillOpacity="0.35" />
            </g>
          ))}
          {/* CTA right */}
          <rect x="155" y="48" width="32" height="65" fill={fillLight} fillOpacity="0.18" stroke={stroke} strokeOpacity="0.3" />
        </svg>
      );
    default:
      return null;
  }
}
