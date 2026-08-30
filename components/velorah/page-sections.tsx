import Link from "next/link";

import { cn } from "@/lib/utils";

/** Serif page title block, echoing the scale and tracking of the home hero. */
export function PageHeader({
  eyebrow,
  title,
  lede,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: string;
  align?: "left" | "center" | "right";
  className?: string;
}) {
  // The title and lede are width-capped, so shifting them off the left edge
  // means moving those boxes as well as setting the text alignment inside them.
  const box =
    align === "center" ? "mx-auto" : align === "right" ? "ml-auto" : undefined;

  return (
    <header
      className={cn(
        "mx-auto max-w-7xl px-6 pb-16 pt-20 md:px-12 md:pb-24 md:pt-28",
        align === "center" && "text-center",
        align === "right" && "text-right",
        className,
      )}
    >
      <p className="animate-fade-rise mb-6 text-xs uppercase tracking-[0.3em] text-muted-foreground sm:text-sm">
        {eyebrow}
      </p>
      <h1
        className={cn(
          "animate-fade-rise max-w-4xl text-5xl leading-[0.95] tracking-[-2px] text-foreground [font-family:var(--font-velorah-serif)] sm:text-7xl",
          box,
        )}
      >
        {title}
      </h1>
      {lede ? (
        <p
          className={cn(
            "animate-fade-rise-delay mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg",
            box,
          )}
        >
          {lede}
        </p>
      ) : null}
    </header>
  );
}

export function Section({
  id,
  eyebrow,
  title,
  lede,
  children,
  className,
}: {
  id?: string;
  eyebrow?: string;
  title?: React.ReactNode;
  lede?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "mx-auto max-w-7xl scroll-mt-24 px-6 py-16 md:px-12 md:py-24",
        className,
      )}
    >
      {eyebrow ? (
        <p className="mb-5 text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {eyebrow}
        </p>
      ) : null}
      {title ? (
        <h2 className="mx-auto max-w-3xl text-center text-3xl leading-[1.05] tracking-[-1px] text-foreground [font-family:var(--font-velorah-serif)] sm:text-5xl">
          {title}
        </h2>
      ) : null}
      {lede ? (
        <p className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-muted-foreground">
          {lede}
        </p>
      ) : null}
      <div className={cn(title || lede || eyebrow ? "mt-12" : undefined)}>
        {children}
      </div>
    </section>
  );
}

/** Numbered / iconed content card used across the interior pages. */
export function Card({
  index,
  icon,
  title,
  body,
  footer,
  className,
}: {
  index?: string;
  icon?: string;
  title: string;
  body: string;
  footer?: React.ReactNode;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-2xl border border-border bg-card p-8 transition-colors hover:border-white/25",
        className,
      )}
    >
      <div className="mb-6 flex items-center gap-3">
        {icon ? (
          <span aria-hidden="true" className="text-2xl leading-none">
            {icon}
          </span>
        ) : null}
        {index ? (
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {index}
          </span>
        ) : null}
      </div>
      <h3 className="mb-3 text-xl tracking-[-0.5px] text-foreground [font-family:var(--font-velorah-serif)] sm:text-2xl">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
      {footer ? <div className="mt-6">{footer}</div> : null}
    </article>
  );
}

export function CardGrid({
  children,
  columns = 3,
}: {
  children: React.ReactNode;
  columns?: 2 | 3;
}) {
  return (
    <div
      className={cn(
        "grid gap-4",
        columns === 2 ? "md:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3",
      )}
    >
      {children}
    </div>
  );
}

export function StatRow({
  stats,
}: {
  stats: { value: string; label: string }[];
}) {
  return (
    <div className="grid grid-cols-1 gap-8 border-y border-border py-12 sm:grid-cols-3">
      {stats.map((stat) => (
        <div key={stat.label}>
          <div className="text-4xl font-light text-foreground [font-family:var(--font-velorah-serif)] sm:text-5xl">
            {stat.value}
          </div>
          <div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}

/** Closing call-to-action band shared by the interior pages. */
export function CtaBand({
  title,
  body,
  primary,
  secondary,
}: {
  title: React.ReactNode;
  body: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-24 md:px-12">
      <div className="flex flex-col items-center rounded-2xl border border-border bg-card px-8 py-20 text-center">
        <h2 className="max-w-2xl text-4xl leading-[1] tracking-[-1.5px] text-foreground [font-family:var(--font-velorah-serif)] sm:text-6xl">
          {title}
        </h2>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
          {body}
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href={primary.href}
            className="liquid-glass rounded-full px-10 py-4 text-sm text-foreground transition-transform hover:scale-[1.03]"
          >
            {primary.label}
          </Link>
          {secondary ? (
            <Link
              href={secondary.href}
              className="rounded-full border border-border px-10 py-4 text-sm text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
            >
              {secondary.label}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
