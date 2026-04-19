"use client";

import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";

/**
 * ShaderCanvas — base WebGL2 canvas com uniforms padrão SINAPSE.
 *
 * Modes:
 *  - default (no inline): fixed inset-0 -z-10 (wallpaper full-screen)
 *  - inline: absolute inset-0 (preenche 100% do parent — parent precisa position:relative)
 *
 * Uniforms expostos:
 *   uniform float uTime;
 *   uniform vec2  uMouse;
 *   uniform vec2  uResolution;
 *   uniform float uClickTime;
 *   uniform vec2  uClickPos;
 *   uniform float uTheme;  // 0=bone, 1=vanta
 */

interface Props {
  fragmentShader: string;
  className?: string;
  inline?: boolean;
}

const VERT_SHADER = `#version 300 es
in vec2 position;
out vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

export function ShaderCanvas({ fragmentShader, className, inline = false }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const canvas = ref.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer: Renderer;
    try {
      renderer = new Renderer({
        canvas,
        dpr: Math.min(window.devicePixelRatio, 2),
        alpha: true,
        antialias: false,
      });
    } catch {
      return; // WebGL2 unavailable
    }
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: VERT_SHADER,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: [0.5, 0.5] },
        uResolution: { value: [1, 1] },
        uClickTime: { value: -1000 },
        uClickPos: { value: [0.5, 0.5] },
        uTheme: { value: document.documentElement.dataset.theme === "vanta" ? 1 : 0 },
      },
    });
    const mesh = new Mesh(gl, { geometry, program });

    const sizeTarget = inline ? canvas.parentElement ?? canvas : null;

    function resize() {
      let w: number, h: number;
      if (inline && sizeTarget) {
        const rect = sizeTarget.getBoundingClientRect();
        w = Math.max(1, rect.width);
        h = Math.max(1, rect.height);
      } else {
        w = window.innerWidth;
        h = window.innerHeight;
      }
      renderer.setSize(w, h);
      program.uniforms.uResolution.value = [w, h];
    }
    resize();

    let resizeObs: ResizeObserver | null = null;
    if (inline && sizeTarget) {
      resizeObs = new ResizeObserver(() => resize());
      resizeObs.observe(sizeTarget);
    } else {
      window.addEventListener("resize", resize);
    }

    const mouseTarget: HTMLElement | Window = inline && sizeTarget ? (sizeTarget as HTMLElement) : window;

    function onMouse(ev: Event) {
      const e = ev as MouseEvent;
      if (inline && sizeTarget) {
        const rect = (sizeTarget as HTMLElement).getBoundingClientRect();
        program.uniforms.uMouse.value = [
          (e.clientX - rect.left) / rect.width,
          1 - (e.clientY - rect.top) / rect.height,
        ];
      } else {
        program.uniforms.uMouse.value = [e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight];
      }
    }
    function onClick(ev: Event) {
      const e = ev as MouseEvent;
      program.uniforms.uClickTime.value = performance.now() * 0.001;
      if (inline && sizeTarget) {
        const rect = (sizeTarget as HTMLElement).getBoundingClientRect();
        program.uniforms.uClickPos.value = [
          (e.clientX - rect.left) / rect.width,
          1 - (e.clientY - rect.top) / rect.height,
        ];
      } else {
        program.uniforms.uClickPos.value = [e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight];
      }
    }
    mouseTarget.addEventListener("mousemove", onMouse, { passive: true });
    mouseTarget.addEventListener("click", onClick, { passive: true });

    const obs = new MutationObserver(() => {
      program.uniforms.uTheme.value = document.documentElement.dataset.theme === "vanta" ? 1 : 0;
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    let raf = 0;
    function loop(t: number) {
      if (reduce) {
        program.uniforms.uTime.value = 0;
        renderer.render({ scene: mesh });
        return;
      }
      program.uniforms.uTime.value = t * 0.001;
      renderer.render({ scene: mesh });
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      resizeObs?.disconnect();
      if (!inline) window.removeEventListener("resize", resize);
      mouseTarget.removeEventListener("mousemove", onMouse);
      mouseTarget.removeEventListener("click", onClick);
      obs.disconnect();
    };
  }, [fragmentShader, inline]);

  return (
    <canvas
      ref={ref}
      className={
        className ??
        (inline
          ? "absolute inset-0 w-full h-full block"
          : "fixed inset-0 -z-10 w-full h-full pointer-events-none")
      }
      aria-hidden
    />
  );
}
