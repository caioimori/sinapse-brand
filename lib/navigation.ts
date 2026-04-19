// Navigation system — espelho exato Astro Brand Studio
// directLinks (no dropdown) + navigation groups (com dropdown 1 ou 2 colunas)

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
  /** Category header (não é link) */
  category?: boolean;
}

export interface NavGroup {
  title: string;
  href: string;
  items: NavItem[];
  columns?: [NavItem[], NavItem[]];
}

/** Direct nav links (sem dropdown) */
export const directLinks: NavItem[] = [
  { label: "Guidelines", href: "/brandbook/0.0-guidelines" },
  { label: "Movimento", href: "/brandbook/1.0-movimento" },
  { label: "Pitch", href: "/pitch" },
  { label: "Workspace", href: "/workspace" },
];

/** Dropdown nav groups */
export const navigation: NavGroup[] = [
  {
    title: "Brandbook",
    href: "/brandbook/0.0-guidelines",
    items: [
      { label: "Foundations", href: "/brandbook/2.0-foundations" },
      { label: "Logo", href: "/brandbook/3.0-logo" },
      { label: "Icons", href: "/brandbook/4.0-icons" },
      { label: "Moodboard", href: "/brandbook/5.0-moodboard" },
      { label: "Estratégia de Marca", href: "/brandbook/6.0-estrategia" },
    ],
  },
  {
    title: "Design System",
    href: "/brandbook/2.0-foundations",
    items: [],
    columns: [
      // LEFT
      [
        { label: "Tokens", href: "#", category: true },
        { label: "Foundations", href: "/brandbook/2.0-foundations" },
        { label: "Typography", href: "/brandbook/2.1-typography" },
        { label: "Color Tokens", href: "/brandbook/2.2-color" },
        { label: "Spacing & Layout", href: "/brandbook/2.3-spacing" },
        { label: "Surfaces & Borders", href: "/brandbook/2.4-surfaces" },
        { label: "Motion Tokens", href: "/brandbook/2.5-motion-tokens" },
        { label: "Semantic Tokens", href: "/brandbook/2.6-semantic" },
        { label: "Token Export", href: "/brandbook/token-export" },
        { label: "Visual", href: "#", category: true },
        { label: "Effects", href: "/brandbook/11.0-effects" },
        { label: "Patterns", href: "/visual/patterns" },
        { label: "Motion", href: "/brandbook/14.0-motion" },
        { label: "Shaders", href: "/brandbook/13.0-shaders" },
        { label: "Animations", href: "/visual/animations" },
        { label: "Meta", href: "#", category: true },
        { label: "Templates", href: "/brandbook/15.0-templates" },
        { label: "SEO", href: "/visual/seo" },
        { label: "Accessibility", href: "/accessibility" },
        { label: "Playground", href: "/playground" },
      ],
      // RIGHT
      [
        { label: "Input", href: "#", category: true },
        { label: "Buttons", href: "/brandbook/12.0-components#buttons" },
        { label: "Forms", href: "/brandbook/12.0-components#forms" },
        { label: "Feedback", href: "/brandbook/12.0-components#feedback" },
        { label: "States", href: "/brandbook/12.0-components#states" },
        { label: "Data Display", href: "#", category: true },
        { label: "Tables", href: "/brandbook/12.0-components" },
        { label: "Lists", href: "/brandbook/12.0-components" },
        { label: "Charts", href: "/brandbook/12.0-components" },
        { label: "Cards", href: "/brandbook/12.0-components#cards" },
        { label: "Layout", href: "#", category: true },
        { label: "Components", href: "/brandbook/12.0-components" },
        { label: "Navigation", href: "/visual/navigation" },
        { label: "Sections", href: "/visual/page-sections" },
        { label: "LP Sections", href: "/visual/lp-sections" },
        { label: "Advanced", href: "/visual/advanced" },
      ],
    ],
  },
  {
    title: "Showcase",
    href: "/brandbook/16.0-showcase",
    items: [
      { label: "Index", href: "/brandbook/16.0-showcase" },
      { label: "Editorial", href: "/editorial" },
      { label: "Social Kit", href: "/social-kit" },
    ],
  },
];

/** Footer columns — espelho Astro */
export interface FooterLink {
  num: string;
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export const footerColumns: FooterColumn[] = [
  {
    title: "[BRAND]",
    links: [
      { num: "0.0", label: "Guidelines", href: "/brandbook/0.0-guidelines" },
      { num: "1.0", label: "Movimento", href: "/brandbook/1.0-movimento" },
      { num: "2.0", label: "Logo", href: "/brandbook/3.0-logo" },
      { num: "3.0", label: "Voice & Tone", href: "/voice-tone" },
      { num: "4.0", label: "Workspace", href: "/workspace" },
    ],
  },
  {
    title: "[DESIGN SYSTEM]",
    links: [
      { num: "0.0", label: "Foundations", href: "/brandbook/2.0-foundations" },
      { num: "1.0", label: "Components", href: "/brandbook/12.0-components" },
      { num: "2.0", label: "Effects", href: "/brandbook/11.0-effects" },
      { num: "3.0", label: "Motion", href: "/brandbook/14.0-motion" },
      { num: "4.0", label: "Shaders", href: "/brandbook/13.0-shaders" },
      { num: "5.0", label: "Accessibility", href: "/accessibility" },
      { num: "6.0", label: "Playground", href: "/playground" },
    ],
  },
  {
    title: "[VISUAL]",
    links: [
      { num: "0.0", label: "Page Sections", href: "/visual/page-sections" },
      { num: "1.0", label: "Color in Context", href: "/visual/color-context" },
      { num: "2.0", label: "Typography", href: "/visual/typography-context" },
      { num: "3.0", label: "Layout & Grid", href: "/visual/layout-grid" },
      { num: "4.0", label: "Imagery", href: "/visual/imagery" },
      { num: "5.0", label: "Iconography", href: "/visual/iconography" },
      { num: "6.0", label: "Visual Assets", href: "/visual/assets" },
    ],
  },
  {
    title: "[SHOWCASE]",
    links: [
      { num: "0.0", label: "Index", href: "/brandbook/16.0-showcase" },
      { num: "1.0", label: "Pitch", href: "/pitch" },
      { num: "2.0", label: "Workspace", href: "/workspace" },
      { num: "3.0", label: "Estratégia", href: "/brandbook/6.0-estrategia" },
      { num: "4.0", label: "Editorial", href: "/editorial" },
      { num: "5.0", label: "Token Export", href: "/brandbook/token-export" },
      { num: "6.0", label: "Social Kit", href: "/social-kit" },
    ],
  },
];

/** Social links */
export const socialLinks = [
  { label: "Instagram", href: "https://instagram.com/sinapse.club", icon: "instagram" },
  { label: "LinkedIn", href: "https://linkedin.com/company/sinapse", icon: "linkedin" },
  { label: "GitHub", href: "https://github.com/sinapse", icon: "github" },
];
