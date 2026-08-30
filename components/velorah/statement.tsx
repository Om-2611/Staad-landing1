import Link from "next/link";

import { HlsVideo } from "./hls-video";

const STATEMENT_HLS =
  "https://stream.mux.com/9njY8qDfS02Uvbll018C8CK39p5EksK7mn02DDC1zYvppI.m3u8";

const STATS = [
  { value: "15+", label: "Therapy modules" },
  { value: "HIPAA", label: "Ready security" },
  { value: "5 min", label: "Setup time" },
  { value: "Free", label: "To start" },
];

export function Statement() {
  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-6">
      <HlsVideo src={STATEMENT_HLS} />

      <div className="relative z-10 flex max-w-5xl flex-col items-center text-center">
        <p className="mb-6 text-xs uppercase tracking-[0.3em] text-muted-foreground sm:text-sm">
          AI-Assisted Practice
        </p>

        <h2 className="text-4xl leading-[1.05] tracking-[-1.5px] text-foreground [font-family:var(--font-velorah-serif)] sm:text-6xl md:text-7xl">
          Care reimagined.
          <br />
          Practice driven.
        </h2>

        <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          One workspace for real-time therapeutic modules, secure video, and
          clinical notes. Monitor every session, automate summaries, and let
          Staad&apos;s AI copilot learn how you practice.
        </p>

        <div className="mt-14 grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-12">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-light text-foreground [font-family:var(--font-velorah-serif)] sm:text-4xl">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground sm:text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <Link
          href="/modules"
          className="liquid-glass mt-12 rounded-full px-10 py-4 text-sm text-foreground transition-transform hover:scale-[1.03]"
        >
          Explore the Modules
        </Link>
      </div>
    </section>
  );
}
