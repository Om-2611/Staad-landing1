"use client";

import React, { useRef, useEffect } from "react";

/** Inline Noise overlay (no external imports). */
interface NoiseProps {
  patternRefreshInterval?: number;
  patternAlpha?: number; // 0–255
  className?: string;
}

const Noise: React.FC<NoiseProps> = ({
  patternRefreshInterval = 2,
  patternAlpha = 15,
  className = "",
}) => {
  const grainRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = grainRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let frame = 0;
    let animationId = 0;
    const canvasSize = 1024;

    canvas.width = canvasSize;
    canvas.height = canvasSize;

    // One buffer, refilled in place. Allocating a fresh 4MB ImageData every
    // draw is what makes a naive grain loop thrash the GC.
    const imageData = ctx.createImageData(canvasSize, canvasSize);
    const data = imageData.data;

    const drawGrain = () => {
      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255;
        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
        data[i + 3] = patternAlpha;
      }
      ctx.putImageData(imageData, 0, 0);
    };

    const loop = () => {
      if (frame % patternRefreshInterval === 0) drawGrain();
      frame++;
      animationId = window.requestAnimationFrame(loop);
    };

    const stop = () => {
      if (animationId) {
        window.cancelAnimationFrame(animationId);
        animationId = 0;
      }
    };

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const start = () => {
      if (reducedMotion || animationId) return;
      animationId = window.requestAnimationFrame(loop);
    };

    drawGrain();
    start();

    // Regenerating a megapixel of noise ~30x a second is not worth doing while
    // the band is scrolled off screen.
    const visibility = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { rootMargin: "200px" },
    );
    visibility.observe(canvas);

    return () => {
      stop();
      visibility.disconnect();
    };
  }, [patternRefreshInterval, patternAlpha]);

  return (
    <canvas
      ref={grainRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{ imageRendering: "pixelated" }}
    />
  );
};

/** Horizontal placement of the radial spotlight. */
const ALIGNMENT = {
  left: "0%",
  center: "50%",
  right: "100%",
} as const;

interface BackgroundNoiseProps {
  /** Where the spotlight sits horizontally. */
  align?: keyof typeof ALIGNMENT;
  /** Spotlight colour. Defaults to the original orange. */
  color?: string;
  /** Spotlight radius. */
  size?: string;
  /**
   * "fixed" pins the background to the viewport; "contained" fills the nearest
   * positioned ancestor, so it can back a single band of a page.
   */
  position?: "fixed" | "contained";
  /** Base fill behind the spotlight. */
  baseClassName?: string;
  patternRefreshInterval?: number;
  patternAlpha?: number;
}

/** Gradient + Noise (applied to one of our previous dark radial variants). */
export default function Component({
  align = "center",
  color = "#f97316",
  size = "560px",
  position = "fixed",
  baseClassName = "bg-slate-950",
  patternRefreshInterval = 2,
  patternAlpha = 18,
}: BackgroundNoiseProps = {}) {
  return (
    <div
      className={`${
        position === "fixed" ? "fixed inset-0 -z-10" : "absolute inset-0"
      } overflow-hidden ${baseClassName}`}
    >
      {/* Radial spotlight */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle ${size} at ${ALIGNMENT[align]} 200px, ${color}, transparent)`,
        }}
      />
      {/* Grain overlay */}
      <Noise
        patternRefreshInterval={patternRefreshInterval}
        patternAlpha={patternAlpha}
      />
    </div>
  );
}

export { Noise };
