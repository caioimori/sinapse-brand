# Modal / Dialog

## Propósito
Diálogo modal com **overlay tokenizado** (`--color-overlay`, nunca `bg-black/60` solto — a auditoria achou vários espalhados em club/sayuri/sheets). Painel surface + border + radius-2xl, entrada com scale+fade, fechável por Esc/backdrop, foco preso. Base via `@base-ui/react` ou Radix Dialog.

## Props / API
```ts
type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  footer?: React.ReactNode;
};
```

## Snippet de referência (consolidado — Radix Dialog + tokens)
```tsx
'use client';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@/lib/cn';

const sizes = { sm: 'max-w-md', md: 'max-w-lg', lg: 'max-w-2xl' };

export function Modal({ open, onClose, title, description, size = 'md', children, footer }: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        {/* overlay TOKENIZADO — nunca bg-black/60 hardcoded */}
        <Dialog.Overlay className="fixed inset-0 z-[var(--layer-overlay,300)] bg-[var(--color-overlay)] backdrop-blur-sm data-[state=open]:animate-[fade-in_var(--dur-base)_var(--ease-apple)]" />
        <Dialog.Content
          className={cn(
            'fixed left-1/2 top-1/2 z-[var(--layer-modal,400)] w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2',
            sizes[size],
            'bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-2xl)] shadow-[var(--shadow-lg)]',
            'p-6 data-[state=open]:animate-[scale-in_var(--dur-base)_var(--ease-back)]',
          )}
        >
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              {title && <Dialog.Title className="font-display font-light text-[clamp(1.25rem,2vw,1.5rem)] tracking-[-0.02em]">{title}</Dialog.Title>}
              {description && <Dialog.Description className="mt-1 text-sm text-[var(--color-muted)]">{description}</Dialog.Description>}
            </div>
            <Dialog.Close className="grid size-8 place-items-center rounded-[var(--radius-md)] text-[var(--color-muted)] hover:bg-[var(--color-surface-2)] hover:text-[var(--color-foreground)] transition-colors">
              <X className="size-4" />
            </Dialog.Close>
          </div>

          <div className="text-sm text-[var(--color-foreground)]">{children}</div>

          {footer && <div className="mt-6 flex items-center justify-end gap-2">{footer}</div>}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
```
```css
@keyframes scale-in { from { opacity: 0; transform: translate(-50%,-50%) scale(0.96); } to { opacity: 1; transform: translate(-50%,-50%) scale(1); } }
@keyframes fade-in  { from { opacity: 0; } to { opacity: 1; } }
```

## Variantes
| size | max-w | | tipo | |
|------|-------|---|------|---|
| `sm` | md | | dialog confirmação | |
| `md` | lg | | form/conteúdo | |
| `lg` | 2xl | | paywall, composer | |
| Sheet (mobile) | lateral/bottom | | nav mobile, filtros | |

## Aparece em
`caio__sinapse-club` (paywall-modal, edit-profile, forum-composer — usam `bg-black/60` a tokenizar), `soier__soier-spaces` (Sheet), `soier__central-plastica` (Dialog aprovar/rejeitar), `soier__sayuri-store` (cart drawer).

## Dívidas a corrigir antes de promover
- Criar `--color-overlay` (já existe no crm) e migrar todos `bg-black/10..60` espalhados.
- Z-index via tokens `--layer-overlay/--layer-modal` (já definidos no sinapse-brand).
- Foco preso + Esc — Radix/base-ui resolvem; não rolar à mão.
