# starter-linkbio (mobile + tracking)

> Coluna única `max-w-[430px]` mobile-first, header com banner/vídeo full-bleed + logo circular sobreposto, LinkButton **EXTRAÍDO** (não copy-paste 6x), data file tipado (profile/socials/cards), ícones SVG `currentColor`, lead-tracking (UTM capture + webhook n8n).
>
> **Base forense:** `soier__eusoier-link-bio` (referência) + `soier__allegra-elevate-site`.
> **Correções aplicadas vs. fonte:** tokens reconciliados com render (fim do drift token vs `bg-[#...]` inline 6x); fontes que **realmente carregam** (via `next/font`, não `var()` órfã); LinkButton extraído como componente recebendo props; cards via `.map()` sobre o data file.

---

## 1. Stack exata e versões

| Pacote | Versão | Papel |
|---|---|---|
| `next` | `16.2.x` | App Router |
| `react` / `react-dom` | `19.2.x` | |
| `tailwindcss` + `@tailwindcss/postcss` | `4.1.x` | CSS-first |
| `@sinapse/brand-tokens` | `1.0.0` | base (vanta ou bone) |
| `clsx` + `tailwind-merge` | `2.x` | `cn()` |
| `lucide-react` | `0.4xx` | ícones (ou SVG próprios) |

---

## 2. Estrutura de pastas

```
starter-linkbio/
├── app/
│   ├── globals.css
│   ├── layout.tsx            # next/font REAL + metadata derivada do data file
│   └── page.tsx              # coluna 430px
├── components/
│   ├── link-card.tsx         # EXTRAÍDO — recebe {image,label,href,bg}
│   ├── profile-header.tsx
│   └── brand-icons.tsx       # SVG currentColor
├── lib/
│   ├── cn.ts
│   ├── content.ts            # profile + socials + cards tipados
│   └── tracking.ts           # UTM capture + webhook n8n
└── package.json
```

---

## 3. Dependências (`package.json` relevante)

```json
{
  "name": "starter-linkbio",
  "scripts": { "dev": "next dev --turbopack", "build": "next build" },
  "dependencies": {
    "next": "16.2.0",
    "react": "19.2.0",
    "react-dom": "19.2.0",
    "@sinapse/brand-tokens": "workspace:*",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.6.0",
    "lucide-react": "^0.469.0"
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

### 4.1 `lib/content.ts` (data file tipado — re-skin por creator)

```ts
export interface Social { id: string; label: string; href: string; }
export interface LinkCardItem { id: string; label: string; href: string; image: string; bg?: string; }

export const profile = {
  name: "Matheus Soier",
  bio: "Sócio SINAPSE · IA aplicada a negócios",
  avatar: "/avatar.jpg",
  cover: "/cover.mp4",           // vídeo ou imagem full-bleed
  verified: true,
};

export const socials: Social[] = [
  { id: "ig", label: "Instagram", href: "https://instagram.com/eusoier" },
  { id: "yt", label: "YouTube",   href: "https://youtube.com/@eusoier" },
];

export const cards: LinkCardItem[] = [
  { id: "site",  label: "Acesso ao site",  href: "https://sinapse.club", image: "/c1.jpg" },
  { id: "curso", label: "Mentoria",         href: "https://sinapse.club/mentoria", image: "/c2.jpg" },
];
```

### 4.2 `app/layout.tsx` (fonts que REALMENTE carregam + metadata do data file)

```tsx
import { Inter, JetBrains_Mono } from "next/font/google";
import { profile } from "@/lib/content";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400"], variable: "--font-jetbrains", display: "swap" });

export const metadata = {
  title: `${profile.name} · Links`,
  description: profile.bio,
  openGraph: { title: profile.name, description: profile.bio, images: [profile.avatar] },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" data-theme="vanta" className={`${inter.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

### 4.3 `components/link-card.tsx` (EXTRAÍDO — fim do copy-paste 6x)

```tsx
import Image from "next/image";
import { trackClick } from "@/lib/tracking";
import type { LinkCardItem } from "@/lib/content";

export function LinkCard({ item }: { item: LinkCardItem }) {
  return (
    <a href={item.href} target="_blank" rel="noopener noreferrer"
       onClick={() => trackClick(item.id)}
       className="group block overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-card transition-transform duration-[var(--dur-base)] ease-[var(--ease-smooth)] hover:scale-[1.02]"
       style={item.bg ? { background: item.bg } : undefined}>
      <div className="relative aspect-video">
        <Image src={item.image} alt={item.label} fill className="object-cover" sizes="430px" />
      </div>
      <div className="flex items-center justify-between px-4 py-3">
        <span className="text-sm font-medium">{item.label}</span>
        <span className="font-mono text-[var(--text-meta)] uppercase tracking-wider text-[var(--muted-fg)]">→</span>
      </div>
    </a>
  );
}
```

### 4.4 `components/profile-header.tsx` (banner full-bleed + logo circular)

```tsx
import Image from "next/image";
import { profile } from "@/lib/content";

export function ProfileHeader() {
  return (
    <header className="relative">
      <div className="relative h-44 w-full overflow-hidden">
        {profile.cover.endsWith(".mp4") ? (
          <video src={profile.cover} autoPlay muted loop playsInline aria-hidden
                 className="h-full w-full object-cover grayscale" />
        ) : (
          <Image src={profile.cover} alt="" fill className="object-cover grayscale" sizes="430px" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" aria-hidden />
      </div>
      <div className="relative -mt-12 flex flex-col items-center text-center">
        <div className="relative h-24 w-24 overflow-hidden rounded-full ring-2 ring-foreground">
          <Image src={profile.avatar} alt={profile.name} fill className="object-cover" sizes="96px" priority />
        </div>
        <h1 className="mt-3 font-display text-xl font-light">
          {profile.name}
          {profile.verified && <span className="ml-1 align-middle text-[var(--muted-fg)]">✓</span>}
        </h1>
        <p className="mt-1 max-w-[36ch] text-sm text-[var(--muted-fg)]">{profile.bio}</p>
      </div>
    </header>
  );
}
```

### 4.5 `lib/tracking.ts` (UTM capture + webhook n8n)

```ts
const WEBHOOK = process.env.NEXT_PUBLIC_N8N_WEBHOOK ?? "";

export function captureUTM() {
  if (typeof window === "undefined") return;
  const p = new URLSearchParams(window.location.search);
  ["utm_source", "utm_medium", "utm_campaign", "gclid"].forEach((k) => {
    const v = p.get(k); if (v) sessionStorage.setItem(k, v);
  });
}

export function trackClick(cardId: string) {
  if (!WEBHOOK) return;
  const utm = Object.fromEntries(["utm_source", "utm_medium", "utm_campaign"].map((k) => [k, sessionStorage.getItem(k)]));
  navigator.sendBeacon(WEBHOOK, JSON.stringify({ cardId, utm, ts: Date.now() }));
}
```

### 4.6 `app/page.tsx` (coluna 430px — cards via `.map()`)

```tsx
"use client";
import { useEffect } from "react";
import { ProfileHeader } from "@/components/profile-header";
import { LinkCard } from "@/components/link-card";
import { cards, socials } from "@/lib/content";
import { captureUTM } from "@/lib/tracking";

export default function Page() {
  useEffect(() => { captureUTM(); }, []);
  return (
    <main className="mx-auto min-h-screen max-w-[430px] pb-12">
      <ProfileHeader />
      <div className="mt-6 space-y-3 px-4">
        {cards.map((c) => <LinkCard key={c.id} item={c} />)}
      </div>
      <nav className="mt-6 flex justify-center gap-5 px-4">
        {socials.map((s) => (
          <a key={s.id} href={s.href} aria-label={s.label}
             className="font-mono text-[var(--text-meta)] uppercase tracking-wider text-[var(--muted-fg)] hover:text-foreground">
            {s.label}
          </a>
        ))}
      </nav>
    </main>
  );
}
```

---

## 5. Comando de scaffold

```bash
pnpm create next-app starter-linkbio --ts --app --no-tailwind --use-pnpm
cd starter-linkbio
pnpm add @tailwindcss/postcss tailwindcss clsx tailwind-merge lucide-react
# @import tokens; setar NEXT_PUBLIC_N8N_WEBHOOK no .env.local
# preencher lib/content.ts com o creator
pnpm dev
```

---

## 6. Para novo creator

Editar **só** `lib/content.ts` (profile/socials/cards). Tema via `data-theme`. Tracking plug-and-play via env var. LinkButton é um componente — nunca duplicar markup.
