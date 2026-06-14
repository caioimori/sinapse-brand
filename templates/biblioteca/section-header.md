# SectionHeader + Eyebrow + Container

## Propósito
Trio repetido inline em **todos** os repos de LP/site — deve ser o **primeiro componente extraído**. `Eyebrow` mono (`//prefix` ou `[colchetes]`) + `H2` fluido `clamp()` que pula a dead-zone + descrição. `Container` com 3 variants fluidos (narrow/default/wide) — nunca `max-w-7xl`.

## Props / API
```ts
type EyebrowProps = { children: React.ReactNode; prefix?: '//' | '[]' | 'none'; className?: string };
type SectionHeaderProps = { eyebrow?: string; title: React.ReactNode; description?: string; align?: 'left' | 'center'; className?: string };
type ContainerProps = { children: React.ReactNode; size?: 'narrow' | 'default' | 'wide'; className?: string };
```

## Variantes
| Container size | max-w | uso |
|----------------|-------|-----|
| `narrow` | `max-w-[860px]` | texto longo, FAQ |
| `default` | `max-w-[1280px]` | LP padrão |
| `wide` | `max-w-screen-2xl` | dashboard full-bleed |

## Snippet de referência (Container + Eyebrow extraídos de sinapse-crm)
```tsx
import { cn } from '@/lib/cn';

export function Container({ children, size = 'default', className }: ContainerProps) {
  const sizes = {
    narrow:  'max-w-[860px]',
    default: 'max-w-[1280px]',
    wide:    'max-w-screen-2xl',
  };
  return (
    <div className={cn('mx-auto w-full px-[clamp(1.5rem,4vw,5rem)]', sizes[size], className)}>
      {children}
    </div>
  );
}
```

```css
/* Eyebrow — sistema NYO `//` mono ALL CAPS (sinapse-crm globals.css) */
.eyebrow {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  opacity: 0.5;
}
```

```tsx
export function Eyebrow({ children, prefix = '//', className }: EyebrowProps) {
  const mark = prefix === 'none' ? '' : prefix === '[]' ? '' : '//';
  return (
    <span className={cn('font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-muted)]', className)}>
      {prefix === '[]' ? <>[ {children} ]</> : <>{mark}{children}</>}
    </span>
  );
}
```

### SectionHeader (consolidado — escala fluida anti-dead-zone)
```tsx
export function SectionHeader({ eyebrow, title, description, align = 'center', className }: SectionHeaderProps) {
  return (
    <div className={cn('mb-14 sm:mb-16', align === 'center' ? 'text-center mx-auto max-w-2xl' : 'text-left', className)}>
      {eyebrow && <Eyebrow className="mb-3 block">{eyebrow}</Eyebrow>}
      {/* H2 fluido que SALTA a dead-zone: 28→40px direto, sem parar em 36px fixo */}
      <h2 className="font-display font-light tracking-[-0.02em] text-balance text-[clamp(1.75rem,4vw,2.5rem)]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-[var(--color-muted)] leading-relaxed text-[clamp(0.9375rem,1.2vw,1.0625rem)]">
          {description}
        </p>
      )}
    </div>
  );
}
```

## Aparece em
`caio__sinapse-brand` (PageHeader + MetaLabel), `soier__vascularte-site` (SectionTitle com clamp — modelo a copiar), `soier__smart-plastica-sp` (CtaPill + header repetido 4×), `soier__colegio-modulo` (escala anti-dead-zone), `soier__snps` (`.kicker [bracketed]`).

## Dívidas a corrigir antes de promover
- O anti-pattern #1: o H2 de seção cai em `text-4xl` (36px) na maioria — usar `clamp(1.75rem,4vw,2.5rem)` que **salta** a faixa por construção (modelo colegio-modulo).
- Sempre `text-balance` em headline.
- Eyebrow/título/descrição estão hoje copiados inline em smart-plastica, vascularte, snps — extrair como 1º componente da lib.
