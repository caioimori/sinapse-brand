# Input + Label + Form field

## Propósito
Campo de formulário base. `Input` (h-11, surface bg, border por opacity, focus → border foreground) + `Label` mono uppercase. Compõe `FormField` (label + input + erro). Usado em login, onboarding, lead forms, admin CRUD.

## Props / API
```ts
type InputProps = React.InputHTMLAttributes<HTMLInputElement>;
type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;
type FormFieldProps = { label: string; error?: string; children: React.ReactNode };
```

## Snippet de referência (extraído de sinapse-crm)
```tsx
import { forwardRef } from 'react';
import { cn } from '@/lib/cn';

export const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, type = 'text', ...rest }, ref) {
    return (
      <input ref={ref} type={type}
        className={cn(
          'w-full h-11 px-3.5 bg-[var(--color-surface)] border border-[var(--color-border)]',
          'rounded-[var(--radius-md)] font-sans text-[14px] text-[var(--color-foreground)]',
          'placeholder:text-[var(--color-muted)]',
          'transition-[border-color,background] duration-[var(--dur-base)] ease-[var(--ease-apple)]',
          'hover:border-[var(--color-border-strong)]',
          'focus-visible:outline-none focus-visible:border-[var(--color-foreground)] focus-visible:bg-[var(--color-surface-2)]',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          className,
        )}
        {...rest} />
    );
  },
);

export function Label({ className, children, ...rest }: LabelProps) {
  return (
    <label className={cn('block font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-foreground)] opacity-70', className)} {...rest}>
      {children}
    </label>
  );
}

export function FormField({ label, error, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>
      {children}
      {error && <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--destructive)]">{error}</span>}
    </div>
  );
}
```

## Variantes
| Variante | uso |
|----------|-----|
| `Input` default | text/email/password |
| textarea | aplicar mesmas classes em `<textarea>` com `h-auto py-3` |
| com rhf + zod | lead forms (vascularte/fdconcept usam react-hook-form + zod) |

## Aparece em
`caio__sinapse-crm` (Input + Label), `caio__sinapse-club`, `soier__colegio-modulo`, `soier__vascularte-site` (ContactForm rhf+zod), `soier__sayuri-store` (admin CRUD).

## Dívidas a corrigir antes de promover
- Usar tokens, não `border-white/10` hardcoded (header.tsx do astro-saas quebrava no light).
- Padronizar erro como `--destructive` (não red-500 cru do login astro-saas).
