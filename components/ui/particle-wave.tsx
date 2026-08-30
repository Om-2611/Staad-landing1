"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";

interface ParticleWaveProps {
  className?: string;
  /**
   * "auto" reads `dark` off <html>. Pass an explicit theme when the component
   * sits inside a locally-scoped palette rather than a global dark class.
   */
  theme?: "dark" | "light" | "auto";
  /** Render the particles over the parent's own background instead of clearing to a solid colour. */
  transparent?: boolean;
  /** Multiplier on the wave's rate of travel. 1 is the original speed. */
  speed?: number;
}

const ParticleWave: React.FC<ParticleWaveProps> = ({
  className = "",
  theme = "auto",
  transparent = false,
  speed = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    particles: THREE.Points;
    particleMaterial: THREE.ShaderMaterial;
    animationId: number | null;
  } | null>(null);

  // Read the props off a ref so the animation loop always sees current values
  // without re-initialising the (expensive) scene.
  const optionsRef = useRef({ theme, transparent, speed });

  useEffect(() => {
    optionsRef.current = { theme, transparent, speed };
  }, [theme, transparent, speed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const getCurrentTheme = () => {
      const { theme } = optionsRef.current;
      if (theme !== "auto") return theme;
      return document.documentElement.classList.contains("dark")
        ? "dark"
        : "light";
    };

    const getBackgroundColor = (theme: string) =>
      theme === "dark"
        ? new THREE.Color(0x000000) // Black background for dark theme
        : new THREE.Color(0xffffff); // White background for light theme

    const getParticleColor = (theme: string) =>
      theme === "dark"
        ? new THREE.Vector3(1.0, 1.0, 1.0) // White particles for dark theme
        : new THREE.Vector3(0.0, 0.0, 0.0); // Black particles for light theme

    const particleVertex = `
      attribute float scale;
      uniform float uTime;
      uniform float uSize;
      void main() {
        vec3 p = position;
        float s = scale;
        p.y += (sin(p.x + uTime) * 0.5) + (cos(p.y + uTime) * 0.1) * 2.0;
        p.x += (sin(p.y + uTime) * 0.5);
        s += (sin(p.x + uTime) * 0.5) + (cos(p.y + uTime) * 0.1) * 2.0;
        vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
        gl_PointSize = s * uSize * (1.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const particleFragment = `
      uniform vec3 uColor;
      void main() {
        gl_FragColor = vec4(uColor, 0.5);
      }
    `;

    // The canvas is sized from its own box rather than the viewport, so the
    // wave can back a section of a page as well as a full screen.
    const measure = () => ({
      width: canvas.clientWidth || window.innerWidth,
      height: canvas.clientHeight || window.innerHeight,
    });

    const { width, height } = measure();

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.01, 1000);
    camera.position.set(0, 6, 5);

    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: transparent,
    });
    // Cap the pixel ratio: at 40k points a 3x ratio buys nothing visible and
    // costs a lot of fill rate.
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height, false);

    const initialTheme = getCurrentTheme();
    if (transparent) {
      renderer.setClearAlpha(0);
    } else {
      renderer.setClearColor(getBackgroundColor(initialTheme));
    }

    // Particles. Narrow screens get a quarter of the points over a matching
    // wider gap: the field covers the same world-space area, but a phone GPU
    // isn't asked to draw 40k of them.
    const compact = window.innerWidth < 768;
    // The coarser mobile field reads as slower at the same uTime step, so it
    // travels 10% faster to match the feel of the desktop wave.
    const speedScale = compact ? 1.1 : 1;
    const gap = compact ? 0.6 : 0.3;
    const amountX = compact ? 100 : 200;
    const amountY = compact ? 100 : 200;
    const particleNum = amountX * amountY;
    const particlePositions = new Float32Array(particleNum * 3);
    const particleScales = new Float32Array(particleNum);

    let i = 0;
    let j = 0;
    for (let ix = 0; ix < amountX; ix++) {
      for (let iy = 0; iy < amountY; iy++) {
        particlePositions[i] = ix * gap - (amountX * gap) / 2;
        particlePositions[i + 1] = 0;
        particlePositions[i + 2] = iy * gap - (amountX * gap) / 2;
        particleScales[j] = 1;
        i += 3;
        j++;
      }
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3),
    );
    particleGeometry.setAttribute(
      "scale",
      new THREE.BufferAttribute(particleScales, 1),
    );

    const particleMaterial = new THREE.ShaderMaterial({
      transparent: true,
      vertexShader: particleVertex,
      fragmentShader: particleFragment,
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: compact ? 34.0 : 15.0 },
        uColor: { value: getParticleColor(initialTheme) },
      },
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    sceneRef.current = {
      scene,
      camera,
      renderer,
      particles,
      particleMaterial,
      animationId: null,
    };

    const renderFrame = () => {
      const currentTheme = getCurrentTheme();
      particleMaterial.uniforms.uColor.value = getParticleColor(currentTheme);
      if (!optionsRef.current.transparent) {
        renderer.setClearColor(getBackgroundColor(currentTheme));
      }
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    };

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const animate = () => {
      particleMaterial.uniforms.uTime.value +=
        0.05 * optionsRef.current.speed * speedScale;
      renderFrame();
      if (sceneRef.current) {
        sceneRef.current.animationId = requestAnimationFrame(animate);
      }
    };

    const stop = () => {
      if (sceneRef.current?.animationId) {
        cancelAnimationFrame(sceneRef.current.animationId);
        sceneRef.current.animationId = null;
      }
    };

    const start = () => {
      if (reducedMotion || !sceneRef.current || sceneRef.current.animationId) {
        return;
      }
      sceneRef.current.animationId = requestAnimationFrame(animate);
    };

    renderFrame();
    start();

    // Only burn frames while the canvas is actually on screen.
    const visibility = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { rootMargin: "200px" },
    );
    visibility.observe(canvas);

    const resizeObserver = new ResizeObserver(() => {
      const { width, height } = measure();
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      renderFrame();
    });
    resizeObserver.observe(canvas);

    return () => {
      stop();
      visibility.disconnect();
      resizeObserver.disconnect();

      scene.remove(particles);
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
      sceneRef.current = null;
    };
    // The scene is built once; live prop changes are read through optionsRef.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <canvas ref={canvasRef} className={`block ${className}`} />;
};

export { ParticleWave };
