import type { Metadata } from "next";

import { ParticleWave } from "@/components/ui/particle-wave";
import CardSwap, { Card } from "@/components/velorah/card-swap";
import { ModuleGallery } from "@/components/velorah/module-gallery";
import { ModuleMotif } from "@/components/velorah/module-motif";
import { PageShell } from "@/components/velorah/page-shell";
import {
  CtaBand,
  PageHeader,
  Section,
  StatRow,
} from "@/components/velorah/page-sections";
import { GET_STARTED_URL } from "@/lib/site";

const MODULES_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4";

export const metadata: Metadata = {
  title: "Modules — Staad",
  description:
    "A growing library of interactive therapy activities, organised by the conditions they support.",
};

/**
 * Mirrors the gallery list in `module-gallery.tsx` — same module names, same
 * condition against each one, so a module added to one belongs in the other.
 *
 * `tint` is an unbracketed RGB triple, used at low alpha for the card's corner
 * wash. It only distinguishes one condition from the next; the page stays
 * essentially monochrome.
 */
const CATEGORIES: {
  icon: string;
  name: string;
  tint: string;
  modules: { name: string; body: string }[];
}[] = [
  {
    icon: "⚡",
    name: "ADHD",
    tint: "251, 191, 36",
    modules: [
      {
        name: "Virtual Maze",
        body: "Real-time maze navigation for sustained attention, planning and impulse control.",
      },
      {
        name: "N-Back Challenge",
        body: "Working-memory task where the client matches each item to the one N steps back.",
      },
      {
        name: "Simon Says",
        body: "Sequence recall and impulse control — follow the pattern, hold back on the wrong cue.",
      },
    ],
  },
  {
    icon: "📚",
    name: "SLD",
    tint: "56, 189, 248",
    modules: [
      {
        name: "Word Building",
        body: "Phonics-first word construction activity for dyslexia.",
      },
      {
        name: "Whack-A-Mole Math",
        body: "Fast-paced arithmetic game that builds numerical fluency.",
      },
      {
        name: "Bubble Splash",
        body: "Calming focus task where the client pops bubbles in time with breath cues.",
      },
      {
        name: "Pixel Art Coding",
        body: "Grid-based sequencing activity that builds step-by-step instruction skills.",
      },
    ],
  },
  {
    icon: "💙",
    name: "Anxiety & Depression",
    tint: "129, 140, 248",
    modules: [
      {
        name: "Worry Vault",
        body: "Worry externalisation tool — the client sets a worry down and locks it away.",
      },
      {
        name: "Emotional Charades",
        body: "Non-verbal emotion expression game.",
      },
      {
        name: "Grounding Challenge",
        body: "Sensory grounding exercise for bringing attention back to the present moment.",
      },
    ],
  },
  {
    icon: "🧩",
    name: "Intellectual Disability",
    tint: "52, 211, 153",
    modules: [
      {
        name: "Virtual Shop",
        body: "Functional life-skills activity — client shops, makes change.",
      },
      {
        name: "Drag Drop Sorting",
        body: "Categorisation activity where the client sorts objects.",
      },
    ],
  },
  {
    icon: "🌿",
    name: "General Therapy",
    tint: "45, 212, 191",
    modules: [
      {
        name: "Emotion Wheel",
        body: "Emotion identification activity that widens the client's feelings vocabulary.",
      },
      {
        name: "Thought Challenger",
        body: "CBT reframing activity — test an unhelpful thought against the evidence.",
      },
      {
        name: "Defusion River",
        body: "ACT defusion exercise — let thoughts float past instead of holding on to them.",
      },
      {
        name: "Micro Quest Board",
        body: "Behavioural activation board that breaks goals into small, doable quests.",
      },
      {
        name: "Facts vs Feelings",
        body: "Sorting activity that separates what is factual from what is felt.",
      },
    ],
  },
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
            { value: "17", label: "Live modules" },
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
          lede="Seventeen interactive activities. Click the top card to bring up the next one."
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
                    {/* A wash in the condition's colour, kept faint enough that
                        the deck still reads as black. */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0"
                      style={{
                        background: `radial-gradient(120% 100% at 100% 0%, rgba(${category.tint}, 0.16), transparent 62%)`,
                      }}
                    />

                    {/* Line drawing of the activity, sized past the card edge so
                        it reads as texture rather than a pasted-on icon. */}
                    <ModuleMotif
                      name={module.name}
                      className="pointer-events-none absolute -bottom-8 -right-8 h-64 w-64 text-white/[0.07]"
                    />

                    <article className="relative flex h-full flex-col justify-center p-12">
                      <p className="mb-4 text-xs uppercase tracking-[0.3em] text-white/60">
                        <span aria-hidden="true" className="mr-2">
                          {category.icon}
                        </span>
                        {category.name}
                      </p>
                      <h3 className="mb-4 text-4xl leading-[1.05] tracking-[-1px] text-white [font-family:var(--font-velorah-serif)]">
                        {module.name}
                      </h3>
                      <p className="max-w-sm text-base leading-relaxed text-white/70">
                        {module.body}
                      </p>
                    </article>

                    {/* Faded in by card-swap.css on the front card only, since
                        that is the only one a click advances. */}
                    <span className="card-next-hint pointer-events-none absolute bottom-8 right-10 text-[11px] uppercase tracking-[0.2em] text-white/45">
                      Click for next
                      <span aria-hidden="true" className="ml-2">
                        →
                      </span>
                    </span>
                  </Card>
                )),
              )}
            </CardSwap>
          </div>
        </Section>
      </div>

      <Section
        eyebrow="02 · Gallery"
        title="Inside the modules."
        lede="Drag through the deck, or pick a card to bring it to the front."
      >
        <ModuleGallery />
      </Section>

      <CtaBand
        title="Explore the modules"
        body="Every module is built for a specific condition, and appears on both screens the moment a therapist launches it."
        primary={{ label: "Get Started", href: GET_STARTED_URL }}
        secondary={{ label: "See the platform", href: "/platform" }}
      />
    </PageShell>
  );
}
