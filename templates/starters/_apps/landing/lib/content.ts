export const PLANS = [
  {
    name: "Start",
    price: "R$ 97",
    popular: false,
    features: ["Até 3 projetos", "Suporte por e-mail"],
  },
  {
    name: "Pro",
    price: "R$ 297",
    popular: true,
    features: ["Projetos ilimitados", "Suporte prioritário", "Automações"],
  },
  {
    name: "Scale",
    price: "Sob consulta",
    popular: false,
    features: ["SLA dedicado", "Onboarding white-glove"],
  },
] as const;

export const FAQS = [
  {
    q: "Posso cancelar quando quiser?",
    a: "Sim, sem multa e sem fidelidade.",
  },
  {
    q: "Tem período de teste?",
    a: "7 dias de garantia incondicional.",
  },
  {
    q: "Funciona para qualquer stack?",
    a: "Sim. Os starters são Next.js + Tailwind v4, mas os tokens são CSS puro — compatível com Astro, Vite ou HTML estático.",
  },
] as const;
