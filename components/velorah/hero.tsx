"use client";

import * as React from "react";

import { APP_URL } from "@/lib/site";

import { Navbar } from "./navbar";

const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4";

export function Hero({
  videoSrc = HERO_VIDEO,
  posterSrc,
}: {
  videoSrc?: string;
  posterSrc?: string;
}) {
  const [videoFailed, setVideoFailed] = React.useState(false);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {videoFailed ? (
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 bg-gradient-to-b from-muted via-background to-background bg-cover bg-center"
          style={
            posterSrc ? { backgroundImage: `url(${posterSrc})` } : undefined
          }
        />
      ) : (
        <video
          className="absolute inset-0 z-0 h-full w-full object-cover"
          src={videoSrc}
          poster={posterSrc}
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          tabIndex={-1}
          onError={() => setVideoFailed(true)}
        />
      )}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 z-[1] h-[40%] bg-gradient-to-t from-black via-black/60 to-transparent"
      />

      <Navbar />

      <div className="relative z-10 flex flex-col items-center justify-center px-6 pb-40 pt-[28px] text-center">
        <h1 className="animate-fade-rise max-w-7xl text-5xl font-normal leading-[0.95] tracking-[-2.46px] text-foreground [font-family:var(--font-velorah-serif)] sm:text-7xl md:text-8xl">
          Therapy that <em className="not-italic text-white">moves</em> with{" "}
          <em className="not-italic text-white">you.</em>
        </h1>

        <p className="animate-fade-rise-delay mt-8 max-w-2xl text-base leading-relaxed text-white sm:text-lg">
          An interactive workspace for therapists and clients, with real-time
          modules for anxiety, ADHD, depression, and specific learning
          disabilities. No downloads, no complex setup.
        </p>

        <a
          href={APP_URL}
          className="animate-fade-rise-delay-2 liquid-glass mt-12 cursor-pointer rounded-full px-14 py-5 text-base text-foreground transition-transform hover:scale-[1.03]"
        >
          Get Started
        </a>
      </div>
    </section>
  );
}
