import { NextSection } from "./next-section";

/**
 * NextSectionAuto — derives next route from current decimal slug.
 * Mantém ordem de leitura linear sequencial — última page loopa pra primeira.
 */

const ROUTES: { slug: string; n: string; label: string; href: string; hint: string }[] = [
  // BRANDBOOK
  { slug: "home",  n: "0.0",  label: "Guidelines",      href: "/brandbook/0.0-guidelines",   hint: "12 princípios não-negociáveis. Esta página vence todas." },
  { slug: "0.0",   n: "1.0",  label: "Movimento",       href: "/brandbook/1.0-movimento",    hint: "Manifesto · arquétipo · persona-mentor · big idea." },
  { slug: "1.0",   n: "2.0",  label: "Foundations",     href: "/brandbook/2.0-foundations",  hint: "Os primitivos do sistema — 6 camadas de tokens." },

  // FOUNDATIONS
  { slug: "2.0",   n: "2.1",  label: "Typography",      href: "/brandbook/2.1-typography",   hint: "Sora · Inter · JetBrains Mono. Escala modular." },
  { slug: "2.1",   n: "2.2",  label: "Color",           href: "/brandbook/2.2-color",        hint: "13 steps de gray. Zero accent cromático." },
  { slug: "2.2",   n: "2.3",  label: "Spacing",         href: "/brandbook/2.3-spacing",      hint: "14 steps numéricos + 5 named. Categorias de uso." },
  { slug: "2.3",   n: "2.4",  label: "Surfaces",        href: "/brandbook/2.4-surfaces",     hint: "Cards · elevations · borders · radii · backdrop-blur." },
  { slug: "2.4",   n: "2.5",  label: "Motion Tokens",   href: "/brandbook/2.5-motion-tokens",hint: "3 easings · 5 durações · keyframes ao vivo." },
  { slug: "2.5",   n: "2.6",  label: "Semantic",        href: "/brandbook/2.6-semantic",     hint: "11 aliases mapeados pro shadcn/ui." },
  { slug: "2.6",   n: "3.0",  label: "Logo",            href: "/brandbook/3.0-logo",         hint: "3 formas · 2 edições · sub-marks AI/CLUB." },

  // BRAND ASSETS
  { slug: "3.0",   n: "4.0",  label: "Icons",           href: "/brandbook/4.0-icons",        hint: "Sistema iconográfico stroke 2px · 4 sizes." },
  { slug: "4.0",   n: "5.0",  label: "Moodboard",       href: "/brandbook/5.0-moodboard",    hint: "Texture wall · vibe references · cinematic still." },
  { slug: "5.0",   n: "6.0",  label: "Estratégia",      href: "/brandbook/6.0-estrategia",   hint: "11 sections do brandbook estratégico profundo." },

  // DESIGN SYSTEM
  { slug: "6.0",   n: "11.0", label: "Effects",         href: "/brandbook/11.0-effects",     hint: "Library completa: patterns · brackets · masks · interactions." },
  { slug: "11.0",  n: "12.0", label: "Components",      href: "/brandbook/12.0-components",  hint: "Buttons · cards · forms · feedback. shadcn-compatible." },
  { slug: "12.0",  n: "13.0", label: "Shaders",         href: "/brandbook/13.0-shaders",     hint: "6 wallpapers WebGL2 interativos B&W radical." },
  { slug: "13.0",  n: "V.B",  label: "Business Anim.",  href: "/visual/animations",          hint: "8 SVG animations narrando AI · CRM · paid · stack · copy." },
  { slug: "V.B",   n: "14.0", label: "Motion",          href: "/brandbook/14.0-motion",      hint: "Vocabulário de movimento nomeado. 6 animations live." },
  { slug: "14.0",  n: "15.0", label: "Templates",       href: "/brandbook/15.0-templates",   hint: "12 page shells + 12 carrosséis IG." },

  // SHOWCASE
  { slug: "15.0",  n: "16.0", label: "Showcase",        href: "/brandbook/16.0-showcase",    hint: "Cases reais — landing · carrosséis · decks." },
  { slug: "16.0",  n: "16.5", label: "Editorial",       href: "/editorial",                  hint: "Brand story long-read. 5 capítulos · single column." },

  // VISUAL CONTEXT
  { slug: "16.5",  n: "V.0",  label: "Page Sections",   href: "/visual/page-sections",       hint: "Hero · stats · features · testimonial · pricing · CTA." },
  { slug: "V.0",   n: "V.1",  label: "Color Context",   href: "/visual/color-context",       hint: "B&W em situação real — hierarquia, cards, forms, CTA." },
  { slug: "V.1",   n: "V.2",  label: "Type Context",    href: "/visual/typography-context",  hint: "Hero · long-form · pull quote · UI · captions." },
  { slug: "V.2",   n: "V.3",  label: "Layout & Grid",   href: "/visual/layout-grid",         hint: "12-col · bento · auto-fit · editorial · asymmetric." },
  { slug: "V.3",   n: "V.4",  label: "Imagery",         href: "/visual/imagery",             hint: "Direção fotográfica · texturas · do/don't." },
  { slug: "V.4",   n: "V.5",  label: "Iconography",     href: "/visual/iconography",         hint: "Lucide + custom glyphs · 4 sizes · contexts." },
  { slug: "V.5",   n: "V.6",  label: "Visual Assets",   href: "/visual/assets",              hint: "Brand pack · logos · tokens · slides · fontes." },
  { slug: "V.6",   n: "V.P",  label: "Patterns",        href: "/visual/patterns",            hint: "6 patterns SVG densos · variants e uso." },
  { slug: "V.P",   n: "V.N",  label: "Navigation",      href: "/visual/navigation",          hint: "Breadcrumbs · tabs · pagination · sidebar." },
  { slug: "V.N",   n: "V.L",  label: "LP Sections",     href: "/visual/lp-sections",         hint: "Social proof · features · FAQ · stats · CTA." },
  { slug: "V.L",   n: "V.A",  label: "Advanced",        href: "/visual/advanced",            hint: "Stepper · cmd palette · toggle · popover." },
  { slug: "V.A",   n: "V.S",  label: "SEO",             href: "/visual/seo",                 hint: "Meta · OG · Twitter · JSON-LD · sitemap." },

  // EXTRAS
  { slug: "V.S",   n: "0.1",  label: "Pitch",           href: "/pitch",                      hint: "Brand pitch deck · 9 slides 16:9." },
  { slug: "0.1",   n: "0.2",  label: "Workspace",       href: "/workspace",                  hint: "Brand pack · downloads · templates." },
  { slug: "0.2",   n: "0.3",  label: "Voice & Tone",    href: "/voice-tone",                 hint: "5 dimensões · vocabulário allow/block · 2 vozes." },
  { slug: "0.3",   n: "—",    label: "Token Export",    href: "/brandbook/token-export",     hint: "CSS vars + Tailwind preset + Copy. Drop-in shadcn." },

  // LOOP — token-export volta pra Guidelines
  { slug: "token-export", n: "0.0", label: "Guidelines (volta ao início)", href: "/brandbook/0.0-guidelines", hint: "Loop fecha. Reler é parte do método." },
];

export function NextSectionAuto({ current }: { current: string }) {
  const idx = ROUTES.findIndex((r) => r.slug === current);
  if (idx < 0) {
    const fallback = ROUTES[0];
    return <NextSection number={fallback.n} label={fallback.label} href={fallback.href} hint={fallback.hint} />;
  }
  // ultima route já aponta de volta pra Guidelines
  const next = idx >= ROUTES.length - 1 ? ROUTES[ROUTES.length - 1] : ROUTES[idx + 1];
  return <NextSection number={next.n} label={next.label} href={next.href} hint={next.hint} />;
}
