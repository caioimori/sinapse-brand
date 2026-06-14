# DESIGN.md — Guia / Documentacao single-file (B&W SINAPSE)

> Reference: `soier__claude-code-push-guide` — **o unico 100% fiel B&W.**
> Repos: `soier__claude-code-push-guide`, `soier__sinapse-setup-guide`, `caio__caioimori-pages`.
> Herda os tokens canonicos SINAPSE inline. **`sinapse-setup-guide` derrapa pra teal `#00D4AA` — descartado aqui.**

## O que define este arquetipo

HTML estatico single-file, tokens `:root` inline, zero build, deploy GitHub Pages/Vercel trivial. Chassi: frame com bordas verticais + topbar/footer mono + steps numerados (counter CSS) + code-block invertido (`data-lang`) + tag pill com colchetes. Fiel ao brandbook: grain SVG, crosshair CSS-only, Sora/Inter/JetBrains, hero assimetrico clamp, cita `[rule NN]` no codigo.

## Cor — B&W puro, semantico

Nomeacao semantica do guia (alinhada a rule 09):
- `--vanta` `#0A0A0A` (superficie dark / code-block invertido), `--bone` `#F5F5F0` (off-white quente).
- `--rule` `rgba(10,10,10,0.10)` (hairline), `--rule-strong` `0.20`, `--muted` `0.55`.
- **Preto `#0A0A0A` na superficie real (rule 02).** Os tokens mortos do guide original (`--void #000`, `--success #00C853`, `--error #FF3A2D` declarados e nunca usados) foram **removidos** — dead code no `:root`.
- **Sem teal.** O `#00D4AA` do setup-guide e um DS paralelo, nao o default SINAPSE. Banido deste token-set.

### Rationale
Guia e documento — a paleta B&W absoluta da seriedade e foco; o code-block invertido (vanta sobre bone) cria o unico momento de contraste forte da pagina. Inline `:root` mantem o single-file deployavel sem supply chain.

## Tipografia — hero clamp, resto seguro

| Papel | Tamanho | Nota |
|---|---|---|
| Hero | `clamp(4.5rem, 14vw, 11.25rem)` = 72-180px | escapa a dead-zone |
| Step index | 64px Sora | display dos steps numerados |
| H2 secao | 28px | logo abaixo da dead-zone, seguro |
| Tag pill | 11px mono, colchetes `[ ]` | |
| Body | 15px Inter | |

Sora/Inter/JetBrains, max 2 pesos. **No mobile manter o clamp do hero** (o guide original cai pra 64px fixo — downgrade de tecnica evitavel).

## Layout — frame fluido

`frame` = `min(92vw, 1440px)`. Substitui o `max-width: 1280px` hardcoded do guide por largura fluida (a regra de layout pede `max-w-screen-2xl`/clamp, nao largura travada).

## Motion
Fade sutil, easing `smooth`, duration base 250ms. `prefers-reduced-motion` honrado (rule 08).

## Identity layer (fiel ao brandbook)
- Grain SVG inline data-uri (feTurbulence) opacity `.05` + `mix-blend-mode: multiply` (rule 03/11).
- Crosshair CSS-only (rule 11).
- Frame de bordas verticais + topbar/footer mono.
- Steps numerados via counter CSS.
- Tag pill com colchetes via `::before`/`::after`.

## Como reusar
Bloco `:root` de tokens B&W = `tokens.css` inline dos guias. Grain overlay (`body::before` com feTurbulence) = snippet canonico de identity layer. Code-block invertido com `data-lang` label = componente de doc. Step numerado (grid index Sora 64px + body) = esqueleto de qualquer walkthrough. `install-box` copiavel (do setup-guide, descartando o teal) reaproveitavel.
