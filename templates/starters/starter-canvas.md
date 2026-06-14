# starter-canvas (diagrama / fluxo interativo)

> Engine pan/zoom/minimap/fitToScreen (~250 linhas) + edge router bezier auto-roteado + node card data-driven por estado + `NODES`/`EDGES`/`CLUSTERS` em config. UM `:root` de tokens (fim da divergência entre arquivos), coordenadas relativas/auto-layout em vez de px na mão.
>
> **Base forense:** `soier__modulo-fluxo-2027` (referência — engine vanilla) + `soier__central-plastica` (React Flow + dagre) + `soier__orquestrador-sp3`.
> **Correções aplicadas vs. fonte:** UM `:root` de tokens (a fonte tinha 2 arquivos com `:root` duplicado e DIVERGENTE — `--success #059669` vs `#00E96B`); coordenadas via auto-layout (dagre) em vez de 36 nodes com px na mão; README gerado contra o código real.

---

## 1. Stack exata e versões

| Variante A (vanilla — entregável cliente) | |
|---|---|
| HTML5 + CSS + JS vanilla | engine ~250 linhas, zero deps |
| Fontes | Sora · Inter · JetBrains Mono (CDN) |
| Deploy | Vercel estático (`vercel.json` com `X-Robots-Tag noindex`) |

| Variante B (React — app) | Versão |
|---|---|
| `next` | `16.2.x` |
| `react` / `react-dom` | `19.2.x` |
| `@xyflow/react` (React Flow) | `12.x` |
| `dagre` | `0.8.x` (auto-layout) |
| `tailwindcss` + `@tailwindcss/postcss` | `4.1.x` |
| `@sinapse/brand-tokens` | `1.0.0` |

Use **A** para fluxograma confidencial de cliente (deploy trivial, sem supply chain); **B** quando o canvas vive dentro de um app autenticado.

---

## 2. Estrutura de pastas (variante B)

```
starter-canvas/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx              # <FlowCanvas data={diagram} />
├── components/
│   ├── flow-canvas.tsx       # React Flow + dagre auto-layout
│   ├── node-card.tsx         # variantes por estado
│   └── edge-router.ts        # bezier por geometria de portas
├── data/
│   └── diagram.ts            # NODES / EDGES / CLUSTERS
└── package.json
```

(variante A: `index.html` + `engine.js` + `data.js` + `vercel.json`)

---

## 3. Dependências (`package.json` relevante — variante B)

```json
{
  "name": "starter-canvas",
  "scripts": { "dev": "next dev --turbopack", "build": "next build" },
  "dependencies": {
    "next": "16.2.0",
    "react": "19.2.0",
    "react-dom": "19.2.0",
    "@sinapse/brand-tokens": "workspace:*",
    "@xyflow/react": "^12.3.0",
    "dagre": "^0.8.5"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.1.0",
    "tailwindcss": "^4.1.0",
    "@types/dagre": "^0.7.52",
    "typescript": "^5.7.0"
  }
}
```

---

## 4. Arquivos-base essenciais (snippets reais)

### 4.1 `data/diagram.ts` (data-driven — UM source, sem coords na mão)

```ts
export type NodeState = "ok" | "active" | "warn" | "pending";
export interface DiagramNode { id: string; label: string; sub?: string; state: NodeState; cluster?: string; }
export interface DiagramEdge { from: string; to: string; }
export interface Cluster { id: string; label: string; }

export const diagram: { nodes: DiagramNode[]; edges: DiagramEdge[]; clusters: Cluster[] } = {
  clusters: [{ id: "topo", label: "Topo de funil" }, { id: "conv", label: "Conversão" }],
  nodes: [
    { id: "ad",    label: "Anúncio",    state: "active",  cluster: "topo" },
    { id: "lp",    label: "Landing",    state: "ok",      cluster: "topo" },
    { id: "lead",  label: "Lead",       state: "pending", cluster: "conv" },
    { id: "venda", label: "Venda",      state: "warn",    cluster: "conv" },
  ],
  edges: [
    { from: "ad", to: "lp" }, { from: "lp", to: "lead" }, { from: "lead", to: "venda" },
  ],
};
```

### 4.2 `components/flow-canvas.tsx` (React Flow + dagre auto-layout)

```tsx
"use client";
import { useMemo } from "react";
import { ReactFlow, Background, MiniMap, Controls, type Node, type Edge } from "@xyflow/react";
import dagre from "dagre";
import "@xyflow/react/dist/style.css";
import { NodeCard } from "./node-card";
import { diagram } from "@/data/diagram";

const nodeTypes = { card: NodeCard };

function layout(nodes: Node[], edges: Edge[]) {
  const g = new dagre.graphlib.Graph();
  g.setGraph({ rankdir: "LR", ranksep: 80, nodesep: 40 });
  g.setDefaultEdgeLabel(() => ({}));
  nodes.forEach((n) => g.setNode(n.id, { width: 180, height: 80 }));
  edges.forEach((e) => g.setEdge(e.source, e.target));
  dagre.layout(g);
  return nodes.map((n) => {
    const { x, y } = g.node(n.id);
    return { ...n, position: { x: x - 90, y: y - 40 } };   // auto, não px na mão
  });
}

export function FlowCanvas() {
  const { nodes, edges } = useMemo(() => {
    const rawNodes: Node[] = diagram.nodes.map((n) => ({ id: n.id, type: "card", position: { x: 0, y: 0 }, data: n }));
    const rawEdges: Edge[] = diagram.edges.map((e) => ({ id: `${e.from}-${e.to}`, source: e.from, target: e.to, type: "smoothstep" }));
    return { nodes: layout(rawNodes, rawEdges), edges: rawEdges };
  }, []);

  return (
    <div className="h-screen w-screen bg-background">
      <ReactFlow defaultNodes={nodes} defaultEdges={edges} nodeTypes={nodeTypes}
                 fitView onlyRenderVisibleElements proOptions={{ hideAttribution: true }}>
        <Background color="var(--subtle)" gap={64} />
        <MiniMap nodeColor={() => "var(--border-strong)"} maskColor="var(--subtle)" />
        <Controls />
      </ReactFlow>
    </div>
  );
}
```

### 4.3 `components/node-card.tsx` (variantes por estado — border-left por intensidade)

```tsx
import { Handle, Position } from "@xyflow/react";
import type { DiagramNode } from "@/data/diagram";

const STATE_OPACITY: Record<DiagramNode["state"], string> = {
  active:  "0.95", ok: "0.70", warn: "0.85", pending: "0.45",
};

export function NodeCard({ data }: { data: DiagramNode }) {
  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-card px-4 py-3 min-w-[160px]"
         style={{ borderLeft: `2px solid rgba(245,245,240,${STATE_OPACITY[data.state]})` }}>
      <Handle type="target" position={Position.Left} className="!bg-[var(--border-strong)]" />
      <p className="font-display font-light">{data.label}</p>
      {data.sub && <p className="mt-0.5 font-mono text-[var(--text-meta)] text-[var(--muted-fg)]">{data.sub}</p>}
      <Handle type="source" position={Position.Right} className="!bg-[var(--border-strong)]" />
    </div>
  );
}
```

### 4.4 `app/page.tsx`

```tsx
import { FlowCanvas } from "@/components/flow-canvas";
export default function Page() { return <FlowCanvas />; }
```

### 4.5 Variante A — `engine.js` (núcleo pan/zoom focal vanilla, ~excerto)

```js
// engine de canvas reutilizável: pan (translate3d) + zoom focal no cursor + fitToScreen
const state = { x: 0, y: 0, scale: 1 };
const stage = document.getElementById("stage");

function apply() {
  stage.style.transform = `translate3d(${state.x}px, ${state.y}px, 0) scale(${state.scale})`;
}

canvas.addEventListener("wheel", (e) => {
  e.preventDefault();
  const rect = canvas.getBoundingClientRect();
  const cx = e.clientX - rect.left, cy = e.clientY - rect.top;
  const delta = -e.deltaY * 0.0015;
  const next = Math.min(2.5, Math.max(0.1, state.scale * (1 + delta)));  // clamp
  // zoom focal: mantém o ponto sob o cursor fixo
  state.x = cx - (cx - state.x) * (next / state.scale);
  state.y = cy - (cy - state.y) * (next / state.scale);
  state.scale = next; apply();
}, { passive: false });

function fitToScreen() {
  const bbox = stage.getBBox();   // bbox real dos nodes
  const pad = 64;
  const sx = (canvas.clientWidth - pad * 2) / bbox.width;
  const sy = (canvas.clientHeight - pad * 2) / bbox.height;
  state.scale = Math.min(sx, sy, 1);
  state.x = pad - bbox.x * state.scale;
  state.y = pad - bbox.y * state.scale;
  apply();
}
```

---

## 5. Comando de scaffold

```bash
# Variante B (React Flow)
pnpm create next-app starter-canvas --ts --app --no-tailwind --use-pnpm
cd starter-canvas
pnpm add @tailwindcss/postcss tailwindcss @xyflow/react dagre
pnpm add -D @types/dagre
# @import tokens; preencher data/diagram.ts
pnpm dev

# Variante A (vanilla): index.html + engine.js + data.js + vercel.json (X-Robots-Tag noindex)
```

---

## 6. Para novo diagrama de cliente

Editar **só** `data/diagram.ts` (nodes/edges/clusters com estados). O dagre auto-posiciona — zero coordenada na mão. Tokens vivem em UM lugar (`@sinapse/brand-tokens`). Para entregável confidencial use a variante A com `noindex`.
