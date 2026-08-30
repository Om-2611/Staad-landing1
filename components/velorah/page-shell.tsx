import { cn } from "@/lib/utils";

import { inter, instrumentSerif } from "./fonts";
import { Footer } from "./footer";
import { Navbar } from "./navbar";
import { PageBackdrop } from "./page-backdrop";
import { VelorahStyles } from "./styles";

/**
 * Wrapper for every page other than the home hero. It re-establishes the
 * Velorah dark token scope (the tokens live on `.velorah`, not on :root, so
 * each route has to opt in) and frames the content with the shared chrome.
 *
 * Passing `heroVideoSrc` puts the navbar and `header` over a looping video the
 * way the home hero does; otherwise the navbar sits on flat black with a rule
 * under it.
 */
export function PageShell({
  header,
  heroVideoSrc,
  heroPosterSrc,
  children,
}: {
  header?: React.ReactNode;
  heroVideoSrc?: string;
  heroPosterSrc?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "velorah",
        inter.variable,
        instrumentSerif.variable,
        "relative min-h-svh bg-background text-foreground antialiased",
      )}
      style={{
        fontFamily: "var(--font-velorah-sans), ui-sans-serif, sans-serif",
      }}
    >
      <VelorahStyles />

      {heroVideoSrc ? (
        <PageBackdrop videoSrc={heroVideoSrc} posterSrc={heroPosterSrc}>
          <Navbar />
          {header}
        </PageBackdrop>
      ) : (
        <>
          <Navbar variant="solid" />
          {header}
        </>
      )}

      <main>{children}</main>
      <Footer />
    </div>
  );
}
