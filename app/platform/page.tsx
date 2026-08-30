import type { Metadata } from "next";

import { ParticleWave } from "@/components/ui/particle-wave";
import { PageShell } from "@/components/velorah/page-shell";
import {
  Card,
  CardGrid,
  CtaBand,
  PageHeader,
  Section,
  StatRow,
} from "@/components/velorah/page-sections";

const PLATFORM_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4";

export const metadata: Metadata = {
  title: "Platform — Staad",
  description:
    "One platform. Therapist and client. Together in real time. Secure video, 15 therapeutic modules, real-time sync and clinical notes.",
};

const STEPS = [
  {
    index: "01",
    icon: "📅",
    title: "Book a session",
    body: "Therapist sends a unique link. No downloads — the client joins from any browser.",
  },
  {
    index: "02",
    icon: "🎥",
    title: "Connect live",
    body: "Secure HD video puts therapist and client in a private session room, together.",
  },
  {
    index: "03",
    icon: "🧩",
    title: "Launch modules",
    body: "Therapist picks a module and it appears instantly on the client's screen.",
  },
];

const FEATURES = [
  {
    icon: "🎥",
    title: "Secure video sessions",
    body: "End-to-end encrypted HD video powered by LiveKit WebRTC. Your session, your platform.",
  },
  {
    icon: "🧩",
    title: "15 therapeutic modules",
    body: "Each designed for a specific condition and clinical goal.",
  },
  {
    icon: "🔄",
    title: "Real-time sync",
    body: "Both sides interact with the same canvas, live.",
  },
  {
    icon: "📋",
    title: "Session notes",
    body: "Clinical notes per session, with summaries generated automatically.",
  },
  {
    icon: "🔒",
    title: "Role-based access",
    body: "Clients see only what therapists choose to share.",
  },
  {
    icon: "🔌",
    title: "Plug-in modules",
    body: "The library grows as clinical needs grow, without rebuilding the platform.",
  },
];

const CONDITIONS = [
  { icon: "🧠", name: "General Therapy", body: "A wide range of concerns." },
  { icon: "💬", name: "Counselling", body: "Guided, supportive conversations." },
  { icon: "🌿", name: "Anxiety", body: "Grounding and worry management." },
  { icon: "💙", name: "Depression", body: "Mood tracking and reframing." },
  { icon: "📚", name: "SLD", body: "Dyslexia, dyscalculia, reading, writing." },
  { icon: "⚡", name: "ADHD", body: "Attention and working memory." },
];

export default function PlatformPage() {
  return (
    <PageShell
      heroVideoSrc={PLATFORM_VIDEO}
      header={
        <PageHeader
          className="pb-32 pt-24 md:pb-48 md:pt-32"
          eyebrow="The platform"
          title={
            <>
              One platform.
              <br />
              Together in real time.
            </>
          }
          lede="Therapist and client in the same interactive workspace — secure video on one side, therapy modules on the other, synced live."
        />
      }
    >
      <Section id="how-it-works" eyebrow="How it works" title="Three steps to a session.">
        <CardGrid>
          {STEPS.map((step) => (
            <Card key={step.title} {...step} />
          ))}
        </CardGrid>
      </Section>

      <div className="relative isolate">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <ParticleWave
            theme="dark"
            transparent
            speed={0.15}
            className="sticky top-0 h-screen w-full opacity-70"
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
          id="features"
          eyebrow="Features"
          title="Everything a therapist needs. Nothing they don't."
        >
          <CardGrid>
            {FEATURES.map((feature) => (
              <Card
                key={feature.title}
                {...feature}
                className="bg-card/60 backdrop-blur-sm"
              />
            ))}
          </CardGrid>
        </Section>

        <Section
          id="conditions"
          eyebrow="Specialist support"
          title="Built for every mind."
        >
          <ul className="grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
            {CONDITIONS.map((condition) => (
              <li
                key={condition.name}
                className="flex items-baseline gap-3 border-t border-border py-4"
              >
                <span aria-hidden="true">{condition.icon}</span>
                <span className="text-foreground">{condition.name}</span>
                <span className="text-sm text-muted-foreground">
                  {condition.body}
                </span>
              </li>
            ))}
          </ul>
        </Section>

        <Section>
          <StatRow
            stats={[
              { value: "12+", label: "Live modules" },
              { value: "5", label: "Conditions supported" },
              { value: "100%", label: "Real-time sync" },
            ]}
          />
        </Section>
      </div>

      <CtaBand
        title="Start your practice"
        body="Set up in under 5 minutes. No credit card required."
        primary={{ label: "Get Started Free", href: "#contact" }}
        secondary={{ label: "Explore the Modules", href: "/modules" }}
      />
    </PageShell>
  );
}
