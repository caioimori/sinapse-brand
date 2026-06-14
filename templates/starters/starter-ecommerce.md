# starter-ecommerce (storefront + admin)

> Esqueleto completo de loja (home / PLP / PDP / cart drawer / busca / conta / admin) + tokenização 2 camadas (primitivo + alias re-skinável) + ProductCard com swatches por gradiente + mega-menu acessível + módulo SEO/GEO (jsonld/sitemap/robots/llms.txt).
>
> **Base forense:** `soier__sayuri-store` (referência — arquitetura completa) + `soier__sayuri-ecommerce` (Hydrogen, 2 camadas de token).
> **Correção CRÍTICA vs. fonte:** a identidade era CLONE 1:1 declarado da Pandora (risco de marca/legal) + CSS monolito 3-5k linhas + `#000` puro. Aqui: **reusa a ARQUITETURA, descarta a camada visual** — paleta neutra premium default, cliente troca o alias. Sem `pandora.css`, sem `#000`.

---

## 1. Stack exata e versões

| Pacote | Versão | Papel |
|---|---|---|
| `next` | `16.2.x` | App Router, RSC |
| `react` / `react-dom` | `19.2.x` | |
| `tailwindcss` + `@tailwindcss/postcss` | `4.1.x` | CSS-first |
| `@sinapse/brand-tokens` | `1.0.0` | base (camada primitivo) |
| `@supabase/ssr` + `@supabase/supabase-js` | `0.6.x` / `2.x` | catálogo/conta/admin |
| `@tanstack/react-query` | `5.x` | cache de carrinho/busca |
| `class-variance-authority` | `0.7.x` | variants |
| `lucide-react` | `0.4xx` | ícones |
| `zod` | `4.x` | |

> Alternativa headless: trocar Supabase por **Shopify Hydrogen 2026.4** + React Router 7 (de `sayuri-ecommerce`). Mesma arquitetura de rotas/tokens.

---

## 2. Estrutura de pastas

```
starter-ecommerce/
├── app/
│   ├── globals.css            # @import tokens + alias --shop-*
│   ├── layout.tsx
│   ├── page.tsx               # home (hero split + trust bar)
│   ├── (shop)/
│   │   ├── c/[slug]/page.tsx   # PLP
│   │   ├── p/[slug]/page.tsx   # PDP
│   │   ├── busca/page.tsx
│   │   └── conta/page.tsx
│   ├── admin/
│   │   └── produtos/page.tsx   # CRUD
│   ├── robots.ts
│   ├── sitemap.ts
│   └── llms.txt/route.ts
├── components/
│   ├── shop/
│   │   ├── product-card.tsx    # swatches gradiente
│   │   ├── cart-drawer.tsx
│   │   ├── mega-menu.tsx       # <details> acessível
│   │   ├── trust-bar.tsx
│   │   └── hero-split.tsx
│   └── ui/{button,container}.tsx
├── lib/
│   ├── seo.ts                  # jsonld helper
│   ├── catalog.ts              # tipos Product/Variant
│   └── supabase/{client,server}.ts
└── package.json
```

---

## 3. Dependências (`package.json` relevante)

```json
{
  "name": "starter-ecommerce",
  "scripts": { "dev": "next dev --turbopack", "build": "next build" },
  "dependencies": {
    "next": "16.2.0",
    "react": "19.2.0",
    "react-dom": "19.2.0",
    "@sinapse/brand-tokens": "workspace:*",
    "@supabase/ssr": "^0.6.1",
    "@supabase/supabase-js": "^2.47.0",
    "@tanstack/react-query": "^5.62.0",
    "class-variance-authority": "^0.7.1",
    "lucide-react": "^0.469.0",
    "zod": "^4.0.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.1.0",
    "tailwindcss": "^4.1.0",
    "typescript": "^5.7.0"
  }
}
```

---

## 4. Arquivos-base essenciais (snippets reais)

### 4.1 `app/globals.css` (2 camadas — primitivo + alias re-skinável)

```css
@import "@sinapse/brand-tokens";   /* camada primitiva: grayscale + semânticos */

/* CAMADA ALIAS de marca — cliente troca SÓ isto pra re-skin.
   Default: neutro premium. Sem #000 puro, sem clone de terceiro. */
:root {
  --shop-bg:        var(--background);
  --shop-surface:   var(--card);
  --shop-text:      var(--foreground);
  --shop-accent:    var(--foreground);   /* loja B&W default; cliente sobrescreve */
  --shop-price:     var(--foreground);
  --shop-radius:    var(--radius-xl);
  --shop-container: var(--container-default);
}

/* exemplo de override por cliente (NUNCA toca a camada primitiva) */
[data-brand="sayuri"] {
  --shop-accent: #C4B37B;   /* alias gold real — não rosa-clone */
}
```

### 4.2 `lib/catalog.ts` (tipos data-driven)

```ts
export interface Variant { id: string; label: string; swatch: string /* gradiente CSS */; }
export interface Product {
  slug: string; name: string; price: number; image: string; variants: Variant[];
}
export const formatBRL = (n: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(n);
```

### 4.3 `components/shop/product-card.tsx` (swatches por gradiente — sem imagem)

```tsx
import Image from "next/image";
import Link from "next/link";
import { formatBRL, type Product } from "@/lib/catalog";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/p/${product.slug}`}
      className="group block rounded-[var(--shop-radius)] border border-[var(--border)] bg-[var(--shop-surface)] overflow-hidden transition-transform duration-[var(--dur-base)] ease-[var(--ease-smooth)] hover:-translate-y-1">
      <div className="relative aspect-[4/5]">
        <Image src={product.image} alt={product.name} fill className="object-cover" sizes="(max-width:768px) 50vw, 25vw" />
      </div>
      <div className="p-4">
        <h3 className="font-display font-light">{product.name}</h3>
        <p className="mt-1 tabular-nums" style={{ color: "var(--shop-price)" }}>{formatBRL(product.price)}</p>
        {/* swatches: cada variante = gradiente CSS, zero asset */}
        <div className="mt-3 flex gap-1.5">
          {product.variants.map((v) => (
            <span key={v.id} title={v.label}
              className="h-4 w-4 rounded-full border border-[var(--border)]"
              style={{ background: v.swatch }} aria-label={v.label} />
          ))}
        </div>
      </div>
    </Link>
  );
}
```

### 4.4 `components/shop/mega-menu.tsx` (`<details>` acessível, zero-JS)

```tsx
export function MegaMenu({ groups }: { groups: { label: string; links: { href: string; label: string }[] }[] }) {
  return (
    <nav className="flex gap-6">
      {groups.map((g) => (
        <details key={g.label} className="group relative">
          <summary className="cursor-pointer list-none font-mono text-[var(--text-meta)] uppercase tracking-wider">
            {g.label}
          </summary>
          <div className="absolute left-0 top-full mt-2 min-w-[200px] rounded-[var(--shop-radius)] border border-[var(--border)] bg-[var(--shop-surface)] p-4 shadow-lg">
            <ul className="space-y-2">
              {g.links.map((l) => <li key={l.href}><a href={l.href} className="text-sm text-[var(--muted-fg)] hover:text-foreground">{l.label}</a></li>)}
            </ul>
          </div>
        </details>
      ))}
    </nav>
  );
}
```

### 4.5 `components/shop/trust-bar.tsx`

```tsx
import { ShieldCheck, Truck, CreditCard, Lock } from "lucide-react";
const ITEMS = [
  { Icon: ShieldCheck, label: "Garantia 30 dias" },
  { Icon: Truck, label: "Frete grátis acima de R$ 199" },
  { Icon: CreditCard, label: "Até 12x sem juros" },
  { Icon: Lock, label: "Pagamento seguro" },
];
export function TrustBar() {
  return (
    <div className="grid grid-cols-2 gap-px border-y border-[var(--border)] bg-[var(--border)] md:grid-cols-4">
      {ITEMS.map(({ Icon, label }) => (
        <div key={label} className="flex items-center gap-3 bg-[var(--shop-bg)] px-5 py-4">
          <Icon size={18} className="shrink-0 text-[var(--muted-fg)]" />
          <span className="text-sm">{label}</span>
        </div>
      ))}
    </div>
  );
}
```

### 4.6 `app/p/[slug]/page.tsx` (PDP exemplo) + `lib/seo.ts`

```ts
// lib/seo.ts — jsonld product helper
import type { Product } from "@/lib/catalog";
export function productJsonLd(p: Product) {
  return {
    "@context": "https://schema.org", "@type": "Product",
    name: p.name, image: p.image,
    offers: { "@type": "Offer", priceCurrency: "BRL", price: p.price, availability: "https://schema.org/InStock" },
  };
}
```
```tsx
// app/(shop)/p/[slug]/page.tsx
import { productJsonLd } from "@/lib/seo";
import { ProductCard } from "@/components/shop/product-card";

export default async function PDP({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = { slug, name: "Brinco Maré", price: 189.9, image: "/p.jpg",
    variants: [{ id: "g", label: "Ouro", swatch: "linear-gradient(135deg,#E8D9A8,#C4B37B)" }] };
  return (
    <div className="mx-auto w-[var(--shop-container)] px-[var(--container-pad)] py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd(product)) }} />
      <ProductCard product={product} />
    </div>
  );
}
```

---

## 5. Comando de scaffold

```bash
pnpm create next-app starter-ecommerce --ts --app --no-tailwind --use-pnpm
cd starter-ecommerce
pnpm add @tailwindcss/postcss tailwindcss @supabase/ssr @supabase/supabase-js \
  @tanstack/react-query class-variance-authority lucide-react zod
# @import tokens + camada alias --shop-* no globals.css
# data-brand="cliente" pra re-skin
pnpm dev
```

---

## 6. Re-skin por cliente

Trocar **só** os tokens `--shop-*` num bloco `[data-brand="cliente"]`. A arquitetura de rotas, ProductCard, SEO e admin permanecem intactos. Nunca clonar identidade de terceiro — partir do neutro premium e construir a marca do cliente.
