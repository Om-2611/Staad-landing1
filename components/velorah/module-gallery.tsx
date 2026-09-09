"use client";

import DepthCarousel from "./depth-carousel";

/**
 * Images shown in the modules-page carousel — the module screens from the
 * "STAAD - Modules" Drive folder, re-encoded to WebP in `public/gallery/`.
 *
 * To add more: drop files into `public/gallery/` and list them here. Paths are
 * relative to `public`, so `public/gallery/foo.webp` is `/gallery/foo.webp`.
 * Kept at module scope in the carousel's own {image, alt} shape so the array
 * identity is stable across renders — a fresh array each render would defeat
 * the memo inside DepthCarousel and re-bind its listeners every time.
 * Any count works; the carousel loops. `alt` is the accessible label for each
 * slide and is what screen readers announce.
 *
 * Ordering matters: the carousel steps through this list in sequence, so the
 * categories are interleaved rather than grouped — that way consecutive slides
 * differ instead of forming a run of near-identical screens.
 */
const GALLERY_IMAGES = [
  { image: "/gallery/adhd-virtual-maze.webp", alt: "Virtual Maze — ADHD" },
  { image: "/gallery/sld-word-building.webp", alt: "Word Building — SLD" },
  { image: "/gallery/anxiety-worry-vault.webp", alt: "Worry Vault — anxiety and depression" },
  { image: "/gallery/id-virtual-shop.webp", alt: "Virtual Shop — intellectual disability" },
  { image: "/gallery/general-emotional-wheel.webp", alt: "Emotion Wheel — general therapy" },

  { image: "/gallery/adhd-n-back-challenge.webp", alt: "N-Back Challenge — ADHD" },
  { image: "/gallery/sld-whack-a-mole.webp", alt: "Whack-A-Mole Math — SLD" },
  { image: "/gallery/anxiety-emotional-charades.webp", alt: "Emotional Charades — anxiety and depression" },
  { image: "/gallery/id-drag-and-drop-sorting.webp", alt: "Drag Drop Sorting — intellectual disability" },
  { image: "/gallery/general-thought-challenger.webp", alt: "Thought Challenger — general therapy" },

  { image: "/gallery/adhd-simon-says.webp", alt: "Simon Says — ADHD" },
  { image: "/gallery/sld-bubble-splash.webp", alt: "Bubble Splash — SLD" },
  { image: "/gallery/anxiety-grounding-challenge.webp", alt: "Grounding Challenge — anxiety and depression" },
  { image: "/gallery/general-defusion-river.webp", alt: "Defusion River — general therapy" },
  { image: "/gallery/sld-pixel-art-coding.webp", alt: "Pixel Art Coding — SLD" },

  { image: "/gallery/general-micro-quest-board.webp", alt: "Micro Quest Board — general therapy" },
  { image: "/gallery/general-facts-vs-feelings.webp", alt: "Facts vs Feelings — general therapy" },
  { image: "/gallery/general-artwork.webp", alt: "Staad module artwork" },
];

export function ModuleGallery() {
  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-3xl border border-border sm:h-[480px] lg:h-[540px]">
      <DepthCarousel
        items={GALLERY_IMAGES}
        depth={220}
        spread={90}
        tilt={22}
        tiltDirection="right"
        perspective={1400}
        visibleCards={4}
        falloff={0.2}
        blur={6}
        autoplay={false}
        loop
        cardWidth={520}
        cardHeight={293}
        radius={18}
        tint="#05060a"
        duration={700}
        ease="power3.out"
        autoplayDelay={3200}
        showControls
        showIndicators
      />
    </div>
  );
}
