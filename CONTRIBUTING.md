# Contribuindo com a SINAPSE Brand Source of Truth

> Esse repo é a **fonte da verdade** da marca SINAPSE. Tudo que sai do ecossistema (LP, slide, carrossel, app, cliente) referencia daqui.
>
> Mantido por **Caio Imori** e **Matheus Soier** — sócios, ambos admins, ambos com liberdade total.

---

## Princípio Zero: Confiança

Não tem hierarquia interna. Caio e Soier alimentam o brandbook livremente — princípios, tokens, componentes, templates, showcase. Ambos podem propor, mergear e publicar.

A trava da `main` (PR + 1 review) existe como **rede de segurança técnica** (CI roda, conflito é detectado), não como burocracia. Em decisão urgente, qualquer admin pode bypass.

A única regra: **comunicar antes de mexer em princípio fundador** — não pra pedir permissão, pra alinhar contexto. Princípio mudado sem heads up vira dívida de cultura.

---

## Setup local (primeira vez)

```bash
git clone https://github.com/caioimori/sinapse-brand.git
cd sinapse-brand
npm install
cp .env.example .env  # preenche keys próprias
npm run dev
```

Identificação automática (faz uma vez):
```bash
git config --global user.name "Seu Nome"   # "Caio Imori" ou "Matheus Soier"
git config --global user.email "seu@email"
```

Com isso, o Claude Code detecta quem é e cria branch certa (`caio/...` ou `soier/...`) automaticamente.

---

## Workflow (todo PR)

```
1. Criar branch        → caio/<tipo>/<desc> ou soier/<tipo>/<desc>
2. Fazer mudança       → respeitando os 12 princípios
3. Citar regra no PR   → "[rule 05] hero em 120px, fora da dead-zone"
4. Abrir PR            → CI roda lint + typecheck + test
5. Review (opcional)   → outro sócio aprova OU admin bypassa se urgente
6. Merge               → squash, branch deletada
```

Tipos de branch: `feat`, `fix`, `refactor`, `docs`, `chore`, `content`, `style`.

---

## Como adicionar/editar coisas

### 1. Novo princípio (ou editar um existente)

**Onde:** `app/brandbook/0.0-guidelines/page.tsx` → array `PRINCIPLES`

**Como:**
```typescript
{ n: "13", title: "Novo princípio", note: "Descrição curta. Por quê é não-negociável." }
```

**Heads up sugerido (não obrigatório):** mandar mensagem pro outro antes — princípio é constituição, vale alinhar racional.

**Validação:** o princípio precisa ser **não-negociável**, **acionável** e **testável** (dá pra olhar uma peça e dizer "viola/cumpre").

---

### 2. Novo token (foundation)

**Onde:**
- Token CSS → `app/globals.css` (variáveis `--*`)
- Tailwind mapping → `tailwind.config.ts`
- Documentação visual → `app/brandbook/2.0-foundations/page.tsx`

**Naming:**
- Primitive: `--vanta`, `--bone` (cor base)
- Semantic: `--background`, `--foreground`, `--border` (uso)
- Componentes consomem **semantic**, nunca primitive (rule 09).

**PR cita:** `feat(tokens): add --surface-overlay [rule 09]`

---

### 3. Novo componente brand

**Onde:** `components/brand/<nome>.tsx`

**Convenções:**
- Server Component por padrão (Next 15 RSC)
- `"use client"` só se precisa de estado/efeito
- Tokens via classes Tailwind semânticas (`bg-background`, `text-foreground`)
- Sem cor cromática (rule 01)
- Sem `max-w-7xl` — usar `Container` existente
- Tipografia fora da dead-zone 32-48px (rule 05)

**Documentar:** adicionar showcase em `app/brandbook/12.0-components/page.tsx`

**PR cita:** `feat(components): add <Quote> component [rule 06, 09]`

---

### 4. Novo template (carrossel, pitch, LP)

**Onde:** `app/brandbook/15.0-templates/<categoria>/`

Exemplo: carrossel novo → `app/brandbook/15.0-templates/carrosseis/<slug>/page.tsx`

**Obrigatório:** seguir os 12 princípios. Template é peça pronta pra clonar — se viola, propaga erro.

**PR cita:** `content(templates): add carrossel-tese-2026 [rule 05, 06, 11]`

---

### 5. Novo showcase (caso aplicado)

**Onde:** `app/brandbook/16.0-showcase/page.tsx`

**Pra que:** mostrar o brandbook **em uso real** — LP de cliente, slide de pitch, post de marca.

**PR cita:** `content(showcase): add MindLoop hero application`

---

### 6. Conteúdo editorial (textos, manifesto, posicionamento)

**Onde:**
- Manifesto/posicionamento → `app/brandbook/1.0-movimento/page.tsx`
- Estratégia → `app/brandbook/6.0-estrategia/page.tsx`
- Voz e tom → `app/voice-tone/page.tsx`
- MDX complementar → `content/brandbook/`

**PR cita:** `content(estrategia): refine secao 4 - propostas`

---

## Anti-patterns (PR rejeitado se aparecer)

| Erro | Regra violada |
|---|---|
| Cor cromática (azul, verde, roxo) | rule 01 |
| `bg-black` ou `#000` puro | rule 02 |
| Tipografia entre 32-48px | rule 05 |
| Hero centrado simétrico | rule 06 |
| `max-w-7xl` em container principal | rule 06 / generic |
| Componente consumindo primitive direto | rule 09 |
| shadcn default sem customização | rule 12 |
| Animação que não tem reverso | rule 07 |
| Falta de `prefers-reduced-motion` | rule 08 |

---

## Ferramentas embutidas

- **CI** (`.github/workflows/ci.yml`) — lint + typecheck + test em todo PR
- **CODEOWNERS** — sugere revisor automático
- **Claude Code rules** (`.claude/rules/`) — agentes do repo seguem padrão SINAPSE
- **DS Resolver** — Claude detecta esse repo e aplica os 12 princípios em qualquer geração

---

## Governança

- **Principios e tokens**: ambos podem mexer, recomendado heads up
- **Componentes e templates**: livre, PR comum
- **Showcase e conteúdo editorial**: livre, sem trava
- **Stack técnica** (Next, Tailwind, deps): qualquer um pode propor, PR explica trade-off
- **Decisão urgente**: admin bypass é válido — depois manda mensagem pro outro pra ficar ciente

---

*SINAPSE · A IA não é o herói. O sistema é.*
