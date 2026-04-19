import { redirect } from "next/navigation";

const ALIAS: Record<string, string> = {
  foundations: "/brandbook/2.0-foundations",
  typography: "/brandbook/2.1-typography",
  "color-tokens": "/brandbook/2.2-color",
  color: "/brandbook/2.2-color",
  "spacing-layout": "/brandbook/2.3-spacing",
  spacing: "/brandbook/2.3-spacing",
  "surfaces-borders": "/brandbook/2.4-surfaces",
  surfaces: "/brandbook/2.4-surfaces",
  "motion-tokens": "/brandbook/2.5-motion-tokens",
  "semantic-tokens": "/brandbook/2.6-semantic",
  semantic: "/brandbook/2.6-semantic",
  "token-export": "/brandbook/token-export",
  effects: "/brandbook/11.0-effects",
  components: "/brandbook/12.0-components",
  motion: "/brandbook/14.0-motion",
  shaders: "/brandbook/13.0-shaders",
  templates: "/brandbook/15.0-templates",
  patterns: "/visual/patterns",
  buttons: "/brandbook/12.0-components#buttons",
  cards: "/brandbook/12.0-components#cards",
  forms: "/brandbook/12.0-components#forms",
  feedback: "/brandbook/12.0-components#feedback",
  states: "/brandbook/12.0-components#states",
  tables: "/brandbook/12.0-components",
  lists: "/brandbook/12.0-components",
  charts: "/brandbook/12.0-components",
  navigation: "/visual/navigation",
  sections: "/visual/page-sections",
  "lp-sections": "/visual/lp-sections",
  advanced: "/visual/advanced",
  vfx: "/brandbook/13.0-shaders",
  seo: "/visual/seo",
  accessibility: "/brandbook/0.0-guidelines",
  playground: "/brandbook/13.0-shaders",
  "flow-diagram": "/brandbook/14.0-motion",
};

export default async function DesignSystemAlias({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const target = ALIAS[slug] ?? "/brandbook/2.0-foundations";
  redirect(target);
}

export function generateStaticParams() {
  return Object.keys(ALIAS).map((slug) => ({ slug }));
}
