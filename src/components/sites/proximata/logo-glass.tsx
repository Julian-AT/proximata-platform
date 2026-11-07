"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { loadHeightmap } from "./logo-glass-heightmap";
import { LOGO_GLASS_FRAGMENT, LOGO_GLASS_VERTEX } from "./logo-glass-shader";

type Rgba = [number, number, number, number];

const GREEN: Rgba = [69 / 255, 255 / 255, 134 / 255, 1];

// Uniform values from the source instance; only seed and speed differ
// between the hero and footer wordmarks.
const BASE_UNIFORMS: Record<string, number | Rgba> = {
  u_ambient: 0,
  u_bend: 0.65,
  u_brightness: 0.7,
  u_bumpDist: 10,
  u_bumpStrength: 0.7,
  u_colorA: [0, 0, 0, 1],
  u_colorB: GREEN,
  u_colorBack: [0, 0, 0, 0],
  u_colorHighlight: [1, 1, 1, 1],
  u_colorShadow: [51 / 255, 51 / 255, 51 / 255, 1],
  u_contour: 0.05,
  u_contrast: 3,
  u_direction: 0,
  u_dispersion: 0,
  u_falloff: 2,
  u_ior: 0.5,
  u_lacunarity: 1.7,
  u_lightAngle: 200,
  u_motionMode: 0,
  u_noise: 0,
  u_octaves: 3,
  u_persistence: 0.65,
  u_saturation: 1,
  u_scale: 0.2,
  u_shapeContour: 0.7,
  u_warp: 0.5,
  u_warpDepth: 2,
};

const WORDMARK_SVG = "/sites/confer/images/brand/first-ai-summit.svg";

function compile(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("Failed to create shader");
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`Logo glass shader failed to compile: ${log}`);
  }
  return shader;
}

function createProgram(gl: WebGL2RenderingContext) {
  const program = gl.createProgram();
  const vertex = compile(gl, gl.VERTEX_SHADER, LOGO_GLASS_VERTEX);
  const fragment = compile(gl, gl.FRAGMENT_SHADER, LOGO_GLASS_FRAGMENT);
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(`Logo glass program failed to link: ${gl.getProgramInfoLog(program)}`);
  }
  return program;
}

function bindQuad(gl: WebGL2RenderingContext, program: WebGLProgram) {
  const attributes: [string, number[]][] = [
    ["a_position", [-1, -1, 1, -1, -1, 1, 1, 1]],
    ["a_texCoord", [0, 0, 1, 0, 0, 1, 1, 1]],
  ];
  for (const [name, values] of attributes) {
    const location = gl.getAttribLocation(program, name);
    if (location < 0) continue;
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(values), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(location);
    gl.vertexAttribPointer(location, 2, gl.FLOAT, false, 0, 0);
  }
}

type LogoGlassProps = {
  /** Static render shown until the shader draws (and if WebGL2 is missing). */
  fallbackSrc: string;
  seed?: number;
  speed?: number;
  className?: string;
  label?: string;
};

/**
 * "First AI Summit" wordmark rendered with Framer's Logo Glass shader:
 * a heightmap of the SVG drives liquid-metal noise inside the letters.
 */
export function LogoGlass({
  fallbackSrc,
  seed = 55,
  speed = 0.3,
  className,
  label = "First AI Summit",
}: LogoGlassProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl2", {
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
    });
    if (!gl) return;

    let disposed = false;
    let frame = 0;
    let visible = false;
    let program: WebGLProgram | null = null;
    let locations: Record<string, WebGLUniformLocation | null> = {};
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.round(canvas.clientWidth * ratio));
      const height = Math.max(1, Math.round(canvas.clientHeight * ratio));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      gl.viewport(0, 0, width, height);
      return ratio;
    };

    const draw = (now: number) => {
      if (!program || disposed) return;
      const ratio = resize();
      gl.useProgram(program);
      gl.uniform1f(locations.u_time, (now - start) / 1000);
      gl.uniform2f(locations.u_resolution, canvas.width, canvas.height);
      gl.uniform1f(locations.u_pixelRatio, ratio);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const loop = (now: number) => {
      draw(now);
      if (visible && !reducedMotion) frame = requestAnimationFrame(loop);
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(frame);
      if (visible && program) frame = requestAnimationFrame(loop);
    });
    observer.observe(canvas);

    loadHeightmap(WORDMARK_SVG)
      .then((heightmap) => {
        if (disposed || !heightmap) return;
        program = createProgram(gl);
        gl.useProgram(program);
        bindQuad(gl, program);

        const names = [
          ...Object.keys(BASE_UNIFORMS),
          "u_seed",
          "u_speed",
          "u_time",
          "u_resolution",
          "u_pixelRatio",
          "u_deltaTime",
          "u_image_heightmap",
        ];
        locations = Object.fromEntries(
          names.map((name) => [name, gl.getUniformLocation(program as WebGLProgram, name)]),
        );
        for (const [name, value] of Object.entries(BASE_UNIFORMS)) {
          if (Array.isArray(value)) gl.uniform4fv(locations[name], value);
          else gl.uniform1f(locations[name], value);
        }
        gl.uniform1f(locations.u_seed, seed);
        gl.uniform1f(locations.u_speed, speed);
        gl.uniform1f(locations.u_deltaTime, 1 / 60);

        const texture = gl.createTexture();
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, heightmap);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.uniform1i(locations.u_image_heightmap, 0);

        draw(performance.now());
        setReady(true);
        if (visible && !reducedMotion) frame = requestAnimationFrame(loop);
      })
      .catch((error: unknown) => {
        // Keep the static fallback image if the shader can't run.
        console.warn(error);
      });

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      if (program) gl.deleteProgram(program);
    };
  }, [seed, speed]);

  return (
    <div className={cn("relative", className)} role="img" aria-label={label}>
      <canvas ref={canvasRef} className="absolute inset-0 block size-full" aria-hidden="true" />
      {/* eslint-disable-next-line @next/next/no-img-element -- static stand-in that fades once WebGL draws */}
      <img
        src={fallbackSrc}
        alt=""
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 size-full object-contain transition-opacity duration-200 ease-in-out",
          ready ? "opacity-0" : "opacity-100",
        )}
      />
    </div>
  );
}
