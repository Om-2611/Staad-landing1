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

const CONTACTS = [
  { name: "Om Kumar Gupta", phone: "+91-8789418998" },
  { name: "Ananya Dixit", phone: "+91-8889978781" },
];

export function Footer() {
  return (
    <footer
      id="contact"
      className="mx-auto max-w-7xl scroll-mt-24 border-t border-border bg-[hsl(0,0%,0%)] px-6 py-16 md:px-12"
    >
      <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-3">
        <h2 className="text-2xl leading-tight text-foreground [font-family:var(--font-velorah-serif)] sm:text-3xl">
          Therapy that
          <br />
          moves with you.
        </h2>

        <nav className="flex flex-col items-start gap-3">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div>
          <p className="mb-4 text-sm text-muted-foreground">
            Hyderabad, India.
            <br />
            Reach either founder directly.
          </p>
          <ul className="space-y-3">
            {CONTACTS.map((contact) => (
              <li key={contact.name}>
                <a
                  href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}
                  className="text-foreground transition-colors hover:text-white/70"
                >
                  {contact.phone}
                </a>
                <span className="ml-3 text-xs text-muted-foreground">
                  {contact.name}
                </span>
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
