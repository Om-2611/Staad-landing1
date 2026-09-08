"use client";

import DomeGallery from "./dome-gallery";

/**
 * Images shown on the modules-page dome — the module screens from the
 * "STAAD - Modules" Drive folder, re-encoded to WebP in `public/gallery/`.
 *
 * To add more: drop files into `public/gallery/` and list them here. Paths are
 * relative to `public`, so `public/gallery/foo.webp` is `/gallery/foo.webp`.
 * The dome tiles the list until all 170 slots are filled, so any count works.
 * `alt` is the accessible label for each tile.
 *
 * Ordering matters: the dome walks this list in sequence across the sphere, so
 * the categories are interleaved rather than grouped — that way neighbouring
 * tiles differ instead of forming a block of near-identical screens.
 */
const GALLERY_IMAGES = [
  { src: "/gallery/adhd-virtual-maze.webp", alt: "Virtual Maze — ADHD" },
  { src: "/gallery/sld-word-building.webp", alt: "Word Building — SLD" },
  { src: "/gallery/anxiety-worry-vault.webp", alt: "Worry Vault — anxiety and depression" },
  { src: "/gallery/id-virtual-shop.webp", alt: "Virtual Shop — intellectual disability" },
  { src: "/gallery/general-emotional-wheel.webp", alt: "Emotion Wheel — general therapy" },

  { src: "/gallery/adhd-n-back-challenge.webp", alt: "N-Back Challenge — ADHD" },
  { src: "/gallery/sld-whack-a-mole.webp", alt: "Whack-A-Mole Math — SLD" },
  { src: "/gallery/anxiety-emotional-charades.webp", alt: "Emotional Charades — anxiety and depression" },
  { src: "/gallery/id-drag-and-drop-sorting.webp", alt: "Drag Drop Sorting — intellectual disability" },
  { src: "/gallery/general-thought-challenger.webp", alt: "Thought Challenger — general therapy" },

  { src: "/gallery/adhd-simon-says.webp", alt: "Simon Says — ADHD" },
  { src: "/gallery/sld-bubble-splash.webp", alt: "Bubble Splash — SLD" },
  { src: "/gallery/anxiety-grounding-challenge.webp", alt: "Grounding Challenge — anxiety and depression" },
  { src: "/gallery/general-defusion-river.webp", alt: "Defusion River — general therapy" },
  { src: "/gallery/sld-pixel-art-coding.webp", alt: "Pixel Art Coding — SLD" },

  { src: "/gallery/general-micro-quest-board.webp", alt: "Micro Quest Board — general therapy" },
  { src: "/gallery/general-facts-vs-feelings.webp", alt: "Facts vs Feelings — general therapy" },
  { src: "/gallery/general-artwork.webp", alt: "Staad module artwork" },

  { src: "/gallery/bg-virtual-shop.webp", alt: "Virtual Shop backdrop" },
  { src: "/gallery/bg-word-building.webp", alt: "Word Building backdrop" },
  { src: "/gallery/bg-whack-a-mole.webp", alt: "Whack-A-Mole backdrop" },
  { src: "/gallery/bg-bubble-splash.webp", alt: "Bubble Splash backdrop" },
  { src: "/gallery/bg-defusion-river.webp", alt: "Defusion River backdrop" },
  { src: "/gallery/bg-drag-and-drop-sorting.webp", alt: "Drag Drop Sorting backdrop" },
  { src: "/gallery/bg-pixel-art-coding.webp", alt: "Pixel Art Coding backdrop" },
  { src: "/gallery/bg-worry-vault.webp", alt: "Worry Vault backdrop" },
  { src: "/gallery/bg-worry-balloon-popping.webp", alt: "Worry Balloon Popping backdrop" },
];

export function ModuleGallery() {
  return (
    <div className="relative h-[520px] w-full overflow-hidden rounded-3xl border border-border sm:h-[620px] lg:h-[700px]">
      <DomeGallery
        images={GALLERY_IMAGES}
        fit={0.8}
        minRadius={600}
        maxVerticalRotationDeg={0}
        segments={34}
        dragDampening={2}
        overlayBlurColor="#000000"
        grayscale={false}
      />

      {/*
        Ambient colour wash over the dome. `screen` only ever lightens, so it
        tints the black surround and the darker parts of each tile without
        flattening the artwork. pointer-events-none keeps drag/click working.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 mix-blend-screen"
        style={{
          background:
            "radial-gradient(60% 55% at 18% 22%, rgba(56,189,248,0.30) 0%, rgba(56,189,248,0) 70%)," +
            "radial-gradient(55% 50% at 84% 30%, rgba(217,70,239,0.26) 0%, rgba(217,70,239,0) 70%)," +
            "radial-gradient(65% 55% at 50% 100%, rgba(251,146,60,0.22) 0%, rgba(251,146,60,0) 70%)",
        }}
      />
    </div>
  );
}
