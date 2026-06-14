# AppShell (Sidebar + Topbar + Cmd+K)

## Propósito
Casca de qualquer app autenticado: Sidebar 240-248px colapsável + Topbar 56px (h-14) sticky com breadcrumb + Cmd+K + signout + main scrollável com pattern de fundo. Mobile via Sheet.

## Props / API
```ts
type AppShellProps = {
  org?: { name: string; plan: string };
  member?: { name: string; role_slug: string };
  preview?: boolean;
  topbarTitle?: string;
  topbarBreadcrumb?: string[];
  topbarRight?: ReactNode;
  signOutAction?: () => void;
  children: ReactNode;
};
```
Sidebar nav é role-based, `active` via `usePathname()`. Estado colapsado persiste (`useSyncExternalStore` + localStorage — padrão de central-plastica).

## Snippet de referência (extraído de sinapse-crm)

### AppShell (composição)
```tsx
export function AppShell({ org, member, preview, topbarTitle, topbarBreadcrumb, topbarRight, signOutAction, children }: AppShellProps) {
  return (
    <div className="min-h-dvh flex bg-[var(--color-background)]">
      <Sidebar org={org} member={member} />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar title={topbarTitle} breadcrumb={topbarBreadcrumb} preview={preview} right={topbarRight} signOutAction={signOutAction} />
        <main className="flex-1 overflow-x-hidden relative">
          <div className="absolute inset-0 pattern-grid opacity-50 pointer-events-none" />
          <div className="relative z-10">{children}</div>
        </main>
      </div>
    </div>
  );
}
```

### Sidebar (248px, sticky, nav com active)
```tsx
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/cn';

export function Sidebar({ org, member }) {
  const pathname = usePathname();
  return (
    <aside className="hidden lg:flex w-[248px] flex-col border-r border-[var(--color-border)] bg-[var(--color-background)] sticky top-0 h-dvh z-20">
      <div className="h-14 px-4 flex items-center border-b border-[var(--color-border)]">
        <Link href="/dashboard"><Logo /></Link>
      </div>
      {/* workspace switcher (org.name + org.plan mono) … */}
      <nav className="px-3 mt-5 flex flex-col gap-0.5">
        <NavSectionLabel>Operação</NavSectionLabel>
        {PRIMARY_NAV.map((item) => <NavLink key={item.href} item={item} active={pathname === item.href} />)}
      </nav>
      {/* footer perfil mt-auto … */}
    </aside>
  );
}

function NavLink({ item, active }) {
  return (
    <Link href={item.href} className={cn(
      'group h-9 px-3 flex items-center gap-3 rounded-[var(--radius-md)] transition-colors',
      active
        ? 'bg-[var(--color-surface)] text-[var(--color-foreground)]'
        : 'text-[var(--color-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-foreground)]',
    )}>
      <span className="text-base leading-none w-4 text-center" aria-hidden>{item.icon}</span>
      <span className="font-sans text-[13px] flex-1">{item.label}</span>
      {item.shortcut && (
        <span className="font-mono text-[10px] tracking-[0.1em] opacity-0 group-hover:opacity-50 transition-opacity hidden xl:inline">{item.shortcut}</span>
      )}
    </Link>
  );
}
```

### Topbar (h-14, breadcrumb + Cmd+K + signout)
```tsx
export function Topbar({ title, breadcrumb, preview, right, signOutAction }: TopbarProps) {
  return (
    <header className="h-14 border-b border-[var(--color-border)] bg-[var(--color-background)] sticky top-0 z-10 flex items-center px-6 gap-6">
      <div className="flex items-center gap-2 min-w-0 flex-1">
        {breadcrumb?.map((crumb, i) => (
          <span key={i} className="flex items-center gap-2 min-w-0">
            <span className="font-mono text-[12px] text-[var(--color-muted)] truncate">{crumb}</span>
            {i < breadcrumb.length - 1 && <span className="font-mono text-xs text-[var(--color-muted)] opacity-50">/</span>}
          </span>
        ))}
        {title && !breadcrumb && <h2 className="font-sans text-[14px] font-medium truncate">{title}</h2>}
      </div>

      {/* Cmd+K */}
      <button type="button" className="hidden md:flex items-center gap-2 h-8 px-3 min-w-[280px] max-w-[360px] bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-border-strong)] rounded-[var(--radius-md)] transition-colors text-left">
        <span className="font-mono text-[12px] opacity-50">⌕</span>
        <span className="font-sans text-[12px] text-[var(--color-muted)] flex-1">Buscar tudo</span>
        <kbd className="font-mono text-[10px] tabular-nums px-1.5 py-0.5 rounded-[var(--radius-sm)] bg-[var(--color-surface-3)] border border-[var(--color-border)] tracking-[0.1em]">⌘K</kbd>
      </button>

      <div className="flex items-center gap-2">
        {preview && <span className="…border-dashed…"><span className="status-dot" />preview</span>}
        {right}
        {signOutAction && (
          <form action={signOutAction}>
            <button type="submit" className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors px-2">sair</button>
          </form>
        )}
      </div>
    </header>
  );
}
```

## Variantes / dimensões
| Slot | Tamanho | Colapsado |
|------|---------|-----------|
| Sidebar | `w-[248px]` | 64-68px (só ícones) |
| Topbar | `h-14` (56px) | — |
| Mobile | Sheet/Sidebar fora do fluxo | overlay |

## Aparece em
`caio__sinapse-crm` (referência), `caio__astro-saas-dev`, `soier__central-plastica` (colapsável persistido + command palette + multi-brand), `soier__soier-spaces` (Sheet mobile), `soier__orquestrador-sp3` (3 colunas colapsáveis).

## Dívidas a corrigir antes de promover
- Ícones unicode (◇◎◫) frágeis cross-font → **adotar lucide** como sistema único.
- Garantir ThemeProvider montado (astro-saas tinha `.dark` morto sem provider).
- Persistência de colapso: padronizar `useSyncExternalStore` + localStorage (central-plastica é o melhor modelo).
