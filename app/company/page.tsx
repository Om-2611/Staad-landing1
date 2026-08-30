import type { Metadata } from "next";
import Image from "next/image";

import { PageShell } from "@/components/velorah/page-shell";
import { PageHeader, Section } from "@/components/velorah/page-sections";

const COMPANY_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4";

export const metadata: Metadata = {
  title: "Company — Staad",
  description:
    "The founders behind Staad, and the institutions and clinicians it is built with.",
};

const FOUNDERS = [
  {
    name: "Om Kumar Gupta",
    role: "Co-founder",
    image: "/founders/om-kumar-gupta.jpg",
    body: "Specialises in AI development for real-world impact, and leads the engineering behind Staad's real-time session platform.",
  },
  {
    name: "Ananya Dixit",
    role: "Co-founder",
    image: "/founders/ananya-dixit.jpg",
    body: "Electronics & Communication Engineering student researching technology's role in accessible mental health, and shapes Staad's clinical direction.",
  },
];

type Collaborator = {
  name: string;
  role: string;
  body: string;
  /** Omitted where no asset has been supplied yet — a monogram stands in. */
  logo?: string;
};

const COLLABORATORS: Collaborator[] = [
  {
    name: "HIIC",
    role: "HITAM Innovation & Incubation Center",
    body: "Staad's incubator — the programme supporting the platform's early build and its route to practitioners.",
    logo: "/partners/hiic.jpg",
  },
  {
    name: "HITAM",
    role: "Hyderabad Institute of Technology and Management",
    body: "The institution Staad grew out of, and its base in Hyderabad.",
    logo: "/partners/hitam.jpg",
  },
  {
    name: "Skillworld Foundation",
    role: "Partner organisation",
    body: "Working with Staad to bring structured, interactive therapy sessions to the people they support.",
  },
  {
    name: "Dr. Sangita Sharad",
    role: "Clinical advisor",
    body: "Guides the clinical design of Staad's therapeutic modules and how they are used in session.",
  },
];

/** Initials fallback for a collaborator with no supplied logo or portrait. */
function Monogram({ name }: { name: string }) {
  const initials = name
    .replace(/^Dr\.?\s+/i, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("");

  return (
    <div
      aria-hidden="true"
      className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-border text-2xl text-muted-foreground [font-family:var(--font-velorah-serif)]"
    >
      {initials}
    </div>
  );
}

export default function CompanyPage() {
  return (
    <PageShell
      heroVideoSrc={COMPANY_VIDEO}
      header={
        <PageHeader
          align="center"
          className="pb-32 pt-24 md:pb-48 md:pt-32"
          eyebrow="Company"
          title={
            <>
              The people
              <br />
              behind Staad.
            </>
          }
          lede="Staad is built in Hyderabad, India, alongside the institutions and clinicians who use it."
        />
      }
    >
      <Section eyebrow="Founders" title="Built by two people.">
        <div className="grid gap-4 md:grid-cols-2">
          {FOUNDERS.map((founder) => (
            <article
              key={founder.name}
              className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-8 transition-colors hover:border-white/25 sm:flex-row sm:items-start"
            >
              <Image
                src={founder.image}
                alt={`Portrait of ${founder.name}`}
                width={800}
                height={800}
                sizes="160px"
                className="h-36 w-36 shrink-0 rounded-2xl object-cover"
              />
              <div>
                <h3 className="text-xl tracking-[-0.5px] text-foreground [font-family:var(--font-velorah-serif)] sm:text-2xl">
                  {founder.name}
                </h3>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {founder.role}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {founder.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="collaborations"
        eyebrow="Collaborations"
        title="Built with people who know the work."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {COLLABORATORS.map((collaborator) => (
            <article
              key={collaborator.name}
              className="flex h-full flex-col gap-6 rounded-2xl border border-border bg-card p-8 transition-colors hover:border-white/25"
            >
              {collaborator.logo ? (
                // The supplied logos are artwork on white, so they get a white
                // tile rather than being dropped straight onto the black page.
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white p-3">
                  <Image
                    src={collaborator.logo}
                    alt={`${collaborator.name} logo`}
                    width={200}
                    height={200}
                    sizes="80px"
                    className="h-full w-full object-contain"
                  />
                </div>
              ) : (
                <Monogram name={collaborator.name} />
              )}

              <div>
                <h3 className="text-xl tracking-[-0.5px] text-foreground [font-family:var(--font-velorah-serif)]">
                  {collaborator.name}
                </h3>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {collaborator.role}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {collaborator.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </PageShell>
  );
}
