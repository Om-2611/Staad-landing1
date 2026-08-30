import type { Metadata } from "next";

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

      {CATEGORIES.map((category) => (
        <Section
          key={category.name}
          id={category.name.toLowerCase().replace(/[^a-z]+/g, "-")}
          eyebrow={`${category.index} · ${category.name}`}
          title={
            <>
              <span aria-hidden="true" className="mr-3">
                {category.icon}
              </span>
              {category.name}
            </>
          }
          lede={category.lede}
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {category.modules.map((module) => (
              <article
                key={module.name}
                className="rounded-2xl border border-border bg-card p-8 transition-colors hover:border-white/25"
              >
                <h3 className="mb-3 text-xl tracking-[-0.5px] text-foreground [font-family:var(--font-velorah-serif)]">
                  {module.name}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {module.body}
                </p>
              </article>
            ))}
          </div>
        </Section>
      ))}

      <Section eyebrow="05 · General Therapy" title="In development.">
        <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">
          {IN_DEVELOPMENT.join(" · ")}
        </p>
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
