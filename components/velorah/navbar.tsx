"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { APP_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

import { Wordmark } from "./primitives";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Platform", href: "/platform" },
  { label: "Modules", href: "/modules" },
  { label: "Company", href: "/company" },
];

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      {open ? (
        <>
          <line x1="5" y1="5" x2="19" y2="19" />
          <line x1="19" y1="5" x2="5" y2="19" />
        </>
      ) : (
        <>
          <line x1="3" y1="7" x2="21" y2="7" />
          <line x1="3" y1="17" x2="21" y2="17" />
        </>
      )}
    </svg>
  );
}

/**
 * The navbar renders in two contexts: floating over the home hero video
 * ("overlay"), and pinned to the top of an interior page over a flat black
 * background ("solid"), where it needs its own hairline separator.
 *
 * Below md the links collapse into a toggled panel.
 */
export function Navbar({
  variant = "overlay",
}: {
  variant?: "overlay" | "solid";
}) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav
      className={cn(
        "relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-8",
        variant === "solid" && "border-b border-border",
      )}
    >
      <Link href="/" aria-label="Staad home">
        <Wordmark className="text-3xl" />
      </Link>

      <div className="hidden items-center gap-10 text-sm md:flex">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            aria-current={isActive(link.href) ? "page" : undefined}
            className={cn(
              "transition-colors hover:text-white",
              isActive(link.href) ? "text-white" : "text-white/60",
            )}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <a
        href={APP_URL}
        className="liquid-glass hidden rounded-full px-6 py-2.5 text-sm text-foreground transition-transform hover:scale-[1.03] md:inline-block"
      >
        Get Started
      </a>

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Close menu" : "Open menu"}
        className="liquid-glass rounded-full p-3 text-foreground md:hidden"
      >
        <MenuIcon open={open} />
      </button>

      <div
        id="mobile-nav"
        hidden={!open}
        className="absolute inset-x-6 top-full z-20 mt-3 rounded-2xl border border-border bg-black/90 p-2 backdrop-blur-xl md:hidden"
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            onClick={() => setOpen(false)}
            aria-current={isActive(link.href) ? "page" : undefined}
            className={cn(
              "block rounded-xl px-4 py-3 text-base transition-colors",
              isActive(link.href)
                ? "bg-white/10 text-white"
                : "text-white/70 hover:bg-white/5 hover:text-white",
            )}
          >
            {link.label}
          </Link>
        ))}

        <a
          href={APP_URL}
          onClick={() => setOpen(false)}
          className="liquid-glass mt-2 block rounded-xl px-4 py-3 text-center text-base text-foreground"
        >
          Get Started
        </a>
      </div>
    </nav>
  );
}
