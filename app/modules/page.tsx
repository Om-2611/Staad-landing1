import type { Metadata } from "next";

import { ParticleWave } from "@/components/ui/particle-wave";
import CardSwap, { Card } from "@/components/velorah/card-swap";
import { ModuleGallery } from "@/components/velorah/module-gallery";
import { PageShell } from "@/components/velorah/page-shell";
import {
  CtaBand,
  PageHeader,
  Section,
  StatRow,
} from "@/components/velorah/page-sections";

const MODULES_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4";

export const metadata: Metadata = {
  title: "Modules — Staad",
  description:
    "A growing library of interactive therapy activities, organised by the conditions they support.",
};

const CATEGORIES: {
  index: string;
  icon: string;
  name: string;
  lede: string;
  modules: { name: string; body: string }[];
}[] = [
  {
    index: "01",
    icon: "⚡",
    name: "ADHD",
    lede: "Attention, impulse control and working memory.",
    modules: [
      {
        name: "Virtual Maze",
        body: "Real-time maze navigation for sustained attention, planning and impulse control.",
      },
      {
        name: "Talking Calculator",
        body: "Voice-driven arithmetic combining speech, listening and working memory.",
      },
      {
        name: "Bubble Splash",
        body: "Calming focus task where the client pops bubbles in time with breath cues.",
      },
    ],
  },
  {
    index: "02",
    icon: "📚",
    name: "SLD",
    lede: "Dyslexia, dyscalculia, reading and writing challenges.",
    modules: [
      {
        name: "Digital Sand Tray",
        body: "Virtual sand tray for symbolic expression and self-representation.",
      },
      {
        name: "Whack-A-Mole Math",
        body: "Fast-paced arithmetic game that builds numerical fluency.",
      },
      {
        name: "Word Building",
        body: "Phonics-first word construction activity for dyslexia.",
      },
    ],
  },
  {
    index: "03",
    icon: "💙",
    name: "Anxiety & Depression",
    lede: "Grounding, emotional regulation and cognitive reframing.",
    modules: [
      {
        name: "Box Popping",
        body: "Somatic stress-release activity — client taps to pop boxes on screen.",
      },
      {
        name: "Emotional Charades",
        body: "Non-verbal emotion expression game.",
      },
      { name: "Worry Box", body: "CBT-inspired worry externalisation tool." },
    ],
  },
  {
    index: "04",
    icon: "🧩",
    name: "Intellectual Disability",
    lede: "Life skills, sequencing and functional learning.",
    modules: [
      {
        name: "Drag Drop Sorting",
        body: "Categorisation activity where the client sorts objects.",
      },
      { name: "Story Sequencing", body: "Narrative ordering task." },
      {
        name: "Virtual Shop",
        body: "Functional life-skills activity — client shops, makes change.",
      },
    ],
  },
];

const IN_DEVELOPMENT = [
  "Emotion Wheel",
  "Safe Space Builder",
  "Defusion River",
  "Thought Challenger",
  "Micro Quest Board",
  "Values Card Sort",
  "Urge Surfing",
  "Worry Vault",
  "Facts vs Feelings",
];

export default function ModulesPage() {
  return (
    <PageShell
      heroVideoSrc={MODULES_VIDEO}
      header={
        <PageHeader
          eyebrow="Module library"
          title={
            <>
              A library that grows
              <br />
              with clinical need.
            </>
          }
          lede="Interactive therapy activities, organised by the conditions they support."
        />
      }
    >
      <Section className="relative z-10 -mt-24 pt-0 md:-mt-32 md:pt-0">
        <StatRow
          stats={[
            { value: "12+", label: "Live modules" },
            { value: "5", label: "Conditions supported" },
            { value: "100%", label: "Real-time sync" },
          ]}
        />
      </Section>

      <div className="relative isolate">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          {/*
            Nudged down so the wave sits behind the card deck rather than the
            heading above it — the deck is centred in a 560/680/780px frame that
            starts below the eyebrow, title and lede. Shifted with a transform
            on the canvas rather than in ParticleWave itself, which the platform
            page shares and positions differently.
          */}
          <ParticleWave
            theme="dark"
            transparent
            speed={0.15}
            className="sticky top-0 h-screen w-full translate-y-24 opacity-70 lg:translate-y-32"
          />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-56 bg-gradient-to-b from-black via-black/70 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-56 bg-gradient-to-t from-black via-black/70 to-transparent"
        />

        <Section
          id="modules"
          eyebrow="01 · The library"
          title="Every module in one deck."
          lede="Twelve interactive activities. Click the top card to bring up the next one."
        >
          <div className="card-swap-centered relative mx-auto h-[560px] w-full max-w-5xl sm:h-[680px] lg:h-[780px]">
            <CardSwap
              width={620}
              height={420}
              cardDistance={34}
              verticalDistance={26}
              autoPlay={false}
            >
              {CATEGORIES.flatMap((category) =>
                category.modules.map((module) => (
                  <Card key={`${category.name} · ${module.name}`}>
                    <article className="flex h-full flex-col justify-center p-12">
                      <p className="mb-4 text-xs uppercase tracking-[0.3em] text-white/60">
                        <span aria-hidden="true" className="mr-2">
                          {category.icon}
                        </span>
                        {category.name}
                      </p>
                      <h3 className="mb-4 text-4xl leading-[1.05] tracking-[-1px] text-white [font-family:var(--font-velorah-serif)]">
                        {module.name}
                      </h3>
                      <p className="text-base leading-relaxed text-white/70">
                        {module.body}
                      </p>
                    </article>
                  </Card>
                )),
              )}
            </CardSwap>
          </div>
        </Section>
      </div>

      <Section eyebrow="02 · General Therapy" title="In development.">
        <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">
          {IN_DEVELOPMENT.join(" · ")}
        </p>
      </Section>

      <Section
        eyebrow="03 · Gallery"
        title="Inside the modules."
        lede="Drag to spin the dome, then tap any tile to open it."
      >
        <ModuleGallery />
      </Section>

      <CtaBand
        title="Explore the modules"
        body="Every module is built for a specific condition, and appears on both screens the moment a therapist launches it."
        primary={{ label: "Get Started Free", href: "#contact" }}
        secondary={{ label: "See the platform", href: "/platform" }}
      />
    </PageShell>
  );
}
