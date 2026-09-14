import Image from "next/image";
import Link from "next/link";

import { Wordmark } from "./primitives";

const FOOTER_LINKS = [
  { label: "Platform", href: "/platform" },
  { label: "How it works", href: "/platform#how-it-works" },
  { label: "Modules", href: "/modules" },
  { label: "Conditions", href: "/platform#conditions" },
  { label: "Company", href: "/company" },
  { label: "Collaborations", href: "/company#collaborations" },
];

/**
 * Portraits are the same assets the company page uses. No role line here — the
 * column heading already says "Founders", so repeating "Co-founder" twice would
 * be noise.
 */
const FOUNDERS = [
  {
    name: "Om Kumar Gupta",
    phone: "+91-8789418998",
    image: "/founders/om-kumar-gupta.jpg",
  },
  {
    name: "Ananya Dixit",
    phone: "+91-8889978781",
    image: "/founders/ananya-dixit.jpg",
  },
];

function ColumnLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-5 text-xs uppercase tracking-[0.3em] text-muted-foreground">
      {children}
    </p>
  );
}

export function Footer() {
  return (
    <footer
      id="contact"
      className="mx-auto max-w-7xl scroll-mt-24 border-t border-border bg-[hsl(0,0%,0%)] px-6 py-16 md:px-12"
    >
      <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-3">
        <div>
          <h2 className="text-2xl leading-tight text-foreground [font-family:var(--font-velorah-serif)] sm:text-3xl">
            Therapy that
            <br />
            moves with you.
          </h2>
          <p className="mt-5 text-sm text-muted-foreground">Hyderabad, India.</p>
        </div>

        <nav aria-label="Footer">
          <ColumnLabel>Navigate</ColumnLabel>
          <ul className="flex flex-col items-start gap-3">
            {FOOTER_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <ColumnLabel>Founders</ColumnLabel>
          <ul className="space-y-2">
            {FOUNDERS.map((founder) => (
              <li key={founder.name}>
                {/*
                  The whole row is the call link, so the portrait and name are
                  part of the tap target rather than decoration beside it.
                */}
                <a
                  href={`tel:${founder.phone.replace(/[^+\d]/g, "")}`}
                  className="group -mx-3 flex items-center gap-4 rounded-xl px-3 py-2 transition-colors hover:bg-white/5"
                >
                  <Image
                    src={founder.image}
                    alt=""
                    width={96}
                    height={96}
                    sizes="40px"
                    className="h-10 w-10 shrink-0 rounded-full object-cover ring-1 ring-border transition group-hover:ring-white/30"
                  />
                  <span className="min-w-0">
                    <span className="block text-sm text-foreground">
                      {founder.name}
                    </span>
                    <span className="block text-xs text-muted-foreground transition-colors group-hover:text-foreground">
                      {founder.phone}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground md:flex-row">
        <Link href="/" aria-label="Staad home">
          <Wordmark className="text-xl" />
        </Link>
        <div className="flex items-center gap-6">
          <a href="#" className="transition-colors hover:text-foreground">
            Privacy Policy
          </a>
          <a href="#" className="transition-colors hover:text-foreground">
            Terms &amp; Conditions
          </a>
        </div>
      </div>
    </footer>
  );
}
