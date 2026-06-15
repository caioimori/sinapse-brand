export default function LoginPage() {
  return (
    <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-card p-8">
      <p className="eyebrow">Acesso</p>
      <h1
        className="mt-3 font-display font-light"
        style={{ fontSize: "var(--text-h2)", lineHeight: 1.05 }}
      >
        Entrar
      </h1>

      <form className="mt-8 flex flex-col gap-4" action="#" method="POST">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="email"
            className="font-mono text-[var(--text-meta)] uppercase tracking-wider text-[var(--muted-fg)]"
          >
            E-mail
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            className="h-10 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--input)] px-3 text-sm text-foreground placeholder:text-[var(--muted-fg)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
            placeholder="voce@exemplo.com"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="password"
            className="font-mono text-[var(--text-meta)] uppercase tracking-wider text-[var(--muted-fg)]"
          >
            Senha
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            className="h-10 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--input)] px-3 text-sm text-foreground placeholder:text-[var(--muted-fg)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          className="mt-2 h-10 w-full rounded-[var(--radius-lg)] bg-foreground font-medium text-background transition-opacity hover:opacity-90 active:scale-[0.98]"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
