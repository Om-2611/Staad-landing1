import type { ReactNode } from "react";

/**
 * A large, very faint line drawing behind each module card — a hint at what the
 * activity is, without the noise of a real screenshot.
 *
 * Every motif is stroked in `currentColor` on a 0 0 100 100 canvas, so the
 * caller sets size and opacity with text colour utilities and nothing needs to
 * know about fills.
 */
const MOTIFS: Record<string, ReactNode> = {
  // ADHD
  "Virtual Maze": (
    <>
      <path d="M14 14h72v72H14z" />
      <path d="M14 38h48M38 38v26M38 64h48M62 14v12M62 64v22M86 50H62" />
    </>
  ),
  "N-Back Challenge": (
    <>
      <rect x="12" y="46" width="22" height="22" rx="4" />
      <rect x="39" y="46" width="22" height="22" rx="4" />
      <rect x="66" y="46" width="22" height="22" rx="4" />
      <path d="M77 42c0-14-12-22-27-22S23 28 23 42" />
      <path d="M17 36l6 7 7-6" />
    </>
  ),
  "Simon Says": (
    <>
      <circle cx="50" cy="50" r="34" />
      <path d="M50 16v68M16 50h68" />
    </>
  ),

  // SLD
  "Word Building": (
    <>
      <rect x="12" y="54" width="24" height="24" rx="4" />
      <rect x="38" y="54" width="24" height="24" rx="4" />
      <rect x="64" y="28" width="24" height="24" rx="4" />
      <path d="M76 52v10" strokeDasharray="4 4" />
    </>
  ),
  "Whack-A-Mole Math": (
    <>
      <circle cx="32" cy="34" r="12" />
      <circle cx="68" cy="34" r="12" />
      <circle cx="32" cy="70" r="12" />
      <circle cx="68" cy="70" r="12" />
      <path d="M26 34h12M32 28v12" />
      <path d="M62 70h12" />
    </>
  ),
  "Bubble Splash": (
    <>
      <circle cx="36" cy="60" r="20" />
      <circle cx="66" cy="38" r="13" />
      <circle cx="72" cy="72" r="8" />
      <circle cx="44" cy="26" r="6" />
    </>
  ),
  "Pixel Art Coding": (
    <>
      <path d="M20 20h60v60H20z" />
      <path d="M35 20v60M50 20v60M65 20v60M20 35h60M20 50h60M20 65h60" />
      <rect x="35" y="35" width="15" height="15" fill="currentColor" stroke="none" />
      <rect x="50" y="50" width="15" height="15" fill="currentColor" stroke="none" />
      <rect x="20" y="65" width="15" height="15" fill="currentColor" stroke="none" />
    </>
  ),

  // Anxiety & Depression
  "Worry Vault": (
    <>
      <rect x="16" y="20" width="68" height="60" rx="8" />
      <circle cx="50" cy="50" r="16" />
      <path d="M50 30v8M50 62v8M30 50h8M62 50h8" />
    </>
  ),
  "Emotional Charades": (
    <>
      <circle cx="38" cy="42" r="21" />
      <circle cx="64" cy="60" r="21" />
      <path d="M31 46c4 4 10 4 14 0" />
      <path d="M57 58c4 4 10 4 14 0" />
    </>
  ),
  "Grounding Challenge": (
    <>
      <circle cx="50" cy="50" r="7" fill="currentColor" stroke="none" />
      <circle cx="50" cy="50" r="18" />
      <circle cx="50" cy="50" r="30" />
      <circle cx="50" cy="50" r="42" />
    </>
  ),

  // Intellectual Disability
  "Virtual Shop": (
    <>
      <path d="M18 38h64l-8 44H26z" />
      <path d="M36 38a14 14 0 0 1 28 0" />
      <path d="M40 54v14M60 54v14" />
    </>
  ),
  "Drag Drop Sorting": (
    <>
      <rect x="12" y="56" width="32" height="28" rx="4" />
      <rect x="56" y="56" width="32" height="28" rx="4" />
      <circle cx="28" cy="28" r="11" />
      <rect x="61" y="17" width="22" height="22" rx="3" />
      <path d="M28 41v9M72 41v9" strokeDasharray="4 4" />
    </>
  ),

  // General Therapy
  "Emotion Wheel": (
    <>
      <circle cx="50" cy="50" r="34" />
      <circle cx="50" cy="50" r="12" />
      <path d="M50 16v22M50 62v22M16 50h22M62 50h22M26 26l16 16M74 26L58 42M26 74l16-16M74 74L58 58" />
    </>
  ),
  "Thought Challenger": (
    <>
      <path d="M32 26h36a15 15 0 0 1 0 30H48L33 68V56h-1a15 15 0 0 1 0-30z" />
      <path d="M44 36a6 6 0 1 1 6 7v3" />
      <circle cx="50" cy="52" r="2.5" fill="currentColor" stroke="none" />
    </>
  ),
  "Defusion River": (
    <>
      <path d="M8 44c14-10 26 10 42 0s28-10 42 0" />
      <path d="M8 60c14-10 26 10 42 0s28-10 42 0" />
      <path d="M8 76c14-10 26 10 42 0s28-10 42 0" />
      <ellipse cx="58" cy="26" rx="11" ry="5.5" transform="rotate(-22 58 26)" />
    </>
  ),
  "Micro Quest Board": (
    <>
      <rect x="14" y="22" width="15" height="15" rx="3" />
      <path d="M18 29l4 4 6-8" />
      <rect x="14" y="45" width="15" height="15" rx="3" />
      <rect x="14" y="68" width="15" height="15" rx="3" />
      <path d="M38 30h48M38 53h48M38 76h32" />
    </>
  ),
  "Facts vs Feelings": (
    <>
      <path d="M50 12v76" strokeDasharray="6 5" />
      <rect x="16" y="38" width="24" height="24" rx="3" />
      <circle cx="72" cy="50" r="14" />
    </>
  ),
};

/** Concentric rings — used if a module has no motif of its own yet. */
const FALLBACK: ReactNode = (
  <>
    <circle cx="50" cy="50" r="16" />
    <circle cx="50" cy="50" r="30" />
  </>
);

export function ModuleMotif({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {MOTIFS[name] ?? FALLBACK}
    </svg>
  );
}
