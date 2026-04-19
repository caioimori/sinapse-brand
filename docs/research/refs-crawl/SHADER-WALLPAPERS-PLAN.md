---
status: capability spec — pronto pra implementar
date: 2026-04-19
purpose: 5 shader wallpapers WebGL2 interativos pro SINAPSE (B&W radical, mouse/click/scroll responsive)
inspiration: Stripe gradient (WebGL2 1392×768) + Off+Brand canvas + Story protocol-canvas + Claude Design "shader_wallpapers.html" example
---

# SHADER WALLPAPERS — Capability Spec

## CONTEXTO

User identificou que Claude tem skill nativa pra criar shader wallpapers interativos (mouse/click responsive). Crawl confirmou que **6/9 refs premium usam WebGL canvases** como "wallpaper signature".

SINAPSE deve absorver essa capability na fonte da verdade — não como skill externa, mas como **rota nativa `/brandbook/13.0-shaders`** + componente reutilizável `<ShaderCanvas />` aplicável em qualquer page.

---

## OS 5 SHADERS (B&W radical, alinhados ao DNA)

### 1. **Vanta Noise Field** — wallpaper noturno
- **Visual:** noise grain animado em Vanta `#0A0A0A`, com regiões mais claras "respirando"
- **Interação:** mouse cria distortion sutil ao redor do cursor (lente/lente d'água)
- **Inspiração:** Stripe gradient mas B&W
- **Performance:** ~60fps em mid-range (3-4 octaves perlin noise)
- **Uso SINAPSE:** hero do `/brandbook` (theme dark)

### 2. **Bone Grid Ripple** — wallpaper diurno
- **Visual:** grid pattern hairline branco sobre Bone `#F5F5F0`
- **Interação:** click dispara ripple circular expandindo, distorcendo grid lines no caminho
- **Inspiração:** clássico ripple shader + nosso `.pattern-grid`
- **Uso SINAPSE:** hero do `/brandbook` (theme light) ou `/foundations`

### 3. **Sora Flow Field** — wallpaper de movimento
- **Visual:** ~500 partículas pequenas (1-2px) fluindo seguindo um flow field 2D
- **Interação:** mouse atrai/repele partículas em raio 200px
- **Inspiração:** flow field navigation (DaniilCodes, Codrops)
- **Performance:** instanced rendering (1 draw call)
- **Uso SINAPSE:** `/brandbook/14.0-motion` (poetry of movement) ou hero principal

### 4. **Ascii Matrix Rain B&W** — wallpaper terminal
- **Visual:** colunas de caracteres `// ● △ ⁂ + ✕ →` caindo verticalmente
- **Interação:** scroll → speed up; mouse hover sobre coluna → pause + brighten
- **Inspiração:** The Matrix + nossos símbolos brand SINAPSE
- **Tech:** texture atlas com glyphs do Geist Mono renderizada em texture
- **Uso SINAPSE:** `/brandbook/4.0-icons` ou hero `/showcase`

### 5. **HUD Crosshair Live** — wallpaper interface
- **Visual:** crosshair central + 4 corner brackets + ring concêntrico que pulsa
- **Interação:** crosshair segue mouse; click expande ring (sonar pulse)
- **Inspiração:** Off+Brand HUD + NYO corner brackets
- **Uso SINAPSE:** `/brandbook/0.0-guidelines` (manifesto militar/sovereign)

---

## ARQUITETURA TÉCNICA

### Stack
```bash
npm i ogl    # WebGL2 wrapper, ~5KB minified — preferido vs Three.js (~150KB)
```

### Estrutura de pastas
```
app/brandbook/13.0-shaders/
├── page.tsx                       # gallery hub das 5
├── [slug]/page.tsx                # full-screen view individual
└── components/
    ├── ShaderCanvas.tsx           # base canvas + uniforms
    ├── ShaderGallery.tsx          # grid 2x3 das 5 thumbs
    ├── shaders/
    │   ├── noise-field.glsl       # #1
    │   ├── grid-ripple.glsl       # #2
    │   ├── flow-field.glsl        # #3
    │   ├── ascii-rain.glsl        # #4
    │   └── hud-crosshair.glsl     # #5
    ├── useMouseUniform.ts         # hook pra mousemove → [x, y] normalizado
    ├── useScrollUniform.ts        # hook pra scroll → [progress 0-1]
    └── useClickPulse.ts           # hook pra click → [time, position] pulse decay
```

### Componente base `ShaderCanvas`

```tsx
// app/brandbook/13.0-shaders/components/ShaderCanvas.tsx
'use client';
import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';

interface Props {
  fragmentShader: string;
  className?: string;
  pause?: boolean;  // pra prefers-reduced-motion
}

export function ShaderCanvas({ fragmentShader, className, pause }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const renderer = new Renderer({ canvas: canvasRef.current, dpr: Math.min(devicePixelRatio, 2), alpha: true });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);

    const geometry = new Triangle(gl);  // single fullscreen triangle (mais perf que quad)

    const program = new Program(gl, {
      vertex: `#version 300 es
        in vec2 position;
        out vec2 vUv;
        void main() {
          vUv = position * 0.5 + 0.5;
          gl_Position = vec4(position, 0.0, 1.0);
        }`,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: [0.5, 0.5] },
        uResolution: { value: [window.innerWidth, window.innerHeight] },
        uClickTime: { value: -1000 },
        uClickPos: { value: [0.5, 0.5] }
      }
    });

    const mesh = new Mesh(gl, { geometry, program });

    function resize() {
      renderer.setSize(window.innerWidth, window.innerHeight);
      program.uniforms.uResolution.value = [window.innerWidth, window.innerHeight];
    }
    window.addEventListener('resize', resize);
    resize();

    function onMouse(e: MouseEvent) {
      program.uniforms.uMouse.value = [
        e.clientX / window.innerWidth,
        1 - e.clientY / window.innerHeight
      ];
    }
    window.addEventListener('mousemove', onMouse);

    function onClick(e: MouseEvent) {
      program.uniforms.uClickTime.value = performance.now() * 0.001;
      program.uniforms.uClickPos.value = [
        e.clientX / window.innerWidth,
        1 - e.clientY / window.innerHeight
      ];
    }
    window.addEventListener('click', onClick);

    let raf = 0;
    function loop(t: number) {
      if (!pause) {
        program.uniforms.uTime.value = t * 0.001;
        renderer.render({ scene: mesh });
      }
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('click', onClick);
    };
  }, [fragmentShader, pause]);

  return <canvas ref={canvasRef} className={className ?? 'fixed inset-0 -z-10 w-full h-full'} />;
}
```

### Uniforms padrão (shared entre os 5)
```glsl
uniform float uTime;          // seconds since mount
uniform vec2 uMouse;          // [0..1, 0..1] (origin bottom-left)
uniform vec2 uResolution;     // [width, height] in px
uniform float uClickTime;     // last click time in seconds (or -1000 if never)
uniform vec2 uClickPos;       // [0..1, 0..1] last click position
```

### Acessibility
- Honrar `prefers-reduced-motion` → renderiza frame estático único + `pause=true`
- Pause shader quando page não está visível (`document.hidden`)

---

## EXEMPLO COMPLETO: SHADER #2 (Bone Grid Ripple)

```glsl
#version 300 es
precision highp float;

uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;
uniform float uClickTime;
uniform vec2 uClickPos;

in vec2 vUv;
out vec4 fragColor;

void main() {
  vec2 uv = vUv;
  vec2 px = uv * uResolution;

  // Distance from last click position (in normalized coords scaled to aspect)
  vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
  vec2 d = (uv - uClickPos) * aspect;
  float dist = length(d);

  // Ripple wave: sine modulated by time-since-click decay
  float t = uTime - uClickTime;
  float wave = sin(dist * 60.0 - t * 8.0) * exp(-t * 1.5) * exp(-dist * 4.0);

  // Distort UV by ripple
  uv += normalize(d) * wave * 0.02;

  // Grid pattern hairline
  vec2 grid = abs(fract(uv * 30.0) - 0.5);
  float line = min(grid.x, grid.y);
  float alpha = 1.0 - smoothstep(0.0, 0.02, line);

  // Bone palette: bg #F5F5F0, line dark Vanta
  vec3 bg = vec3(0.961, 0.961, 0.941);
  vec3 line_color = vec3(0.04);

  vec3 color = mix(bg, line_color, alpha * 0.15);  // hairline subtle

  fragColor = vec4(color, 1.0);
}
```

---

## ROADMAP DE IMPLEMENTAÇÃO

### Fase 1 — Foundation (1.5h)
- `npm i ogl`
- Criar `ShaderCanvas.tsx` base
- Criar rota `/brandbook/13.0-shaders/page.tsx` placeholder
- Adicionar shader #1 (Noise Field) como prova de conceito

### Fase 2 — 5 Shaders (3-4h)
- Shader #1 Noise Field — implementar GLSL completo
- Shader #2 Grid Ripple — exemplo acima já provê base
- Shader #3 Flow Field — instanced particles + flow noise
- Shader #4 Ascii Rain — texture atlas com Geist Mono glyphs
- Shader #5 HUD Crosshair — uniforms mouse + click + ring decay

### Fase 3 — Gallery + UX (1h)
- Grid 2x3 thumbs animados (cada thumb roda mini-shader)
- Click thumb → full-screen view
- Botão "Apply as wallpaper" → copia snippet de uso
- Documentação README.md com:
  - Como aplicar shader em qualquer page SINAPSE
  - Performance budget (target 60fps em mid-range)
  - Como criar novo shader (estrutura + uniforms)

### Fase 4 — Integration (30min)
- Adicionar `<ShaderCanvas>` opcional ao `<PageLayout>` SINAPSE
- 1 prop: `wallpaper="noise-field" | "grid-ripple" | ...`

**Total: ~6-7h.** Cabe entre FASE A e FASE B do plano v2 — alta visibilidade, alto wow, baixo risco (isolado em rota nova).

---

## BENEFÍCIOS

1. **Diferenciação visual extrema** — quase ninguém faz shader B&W radical
2. **Reutilização** — qualquer page SINAPSE adota shader bg via 1 prop
3. **Capability na fonte da verdade** — esquema replicável pra novos shaders
4. **Skill demonstrável** — Caio pode mostrar Claude criando shaders ao vivo em demos
5. **Alinhado com tier-S** — coloca SINAPSE na liga de Stripe/Story/Off+Brand visualmente

## RISCOS

- Performance em mobile: target 30fps mínimo. Fallback: poster image se device fraco
- Acessibility: honrar reduced-motion sempre
- Bundle size: OGL ~5KB, GLSL inline = trivial (~3KB total)

---

## STATUS

📋 Spec completo, pronto pra agendar implementação após sign-off do user na FASE A do plano v2.
