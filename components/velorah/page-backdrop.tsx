"use client";

import * as React from "react";

/**
 * Background video for an interior page header, responsive in two modes.
 *
 * On md and up the whole frame is shown: the video spans the full page width
 * at its natural aspect ratio and the section takes whatever height that
 * needs. Video and content share one grid cell, so the section grows to the
 * taller of the two and the header is never clipped.
 *
 * On narrow screens a full-width 16:9 frame is only a couple hundred pixels
 * tall — far shorter than the stacked header text — which would leave the
 * video as a strip above a block of dead black. There the video is taken out
 * of flow and cropped to cover the whole header instead, like the home hero.
 */
export function PageBackdrop({
  videoSrc,
  posterSrc,
  children,
}: {
  videoSrc: string;
  posterSrc?: string;
  children: React.ReactNode;
}) {
  const [videoFailed, setVideoFailed] = React.useState(false);

  return (
    <section className="relative grid overflow-hidden">
      <div className="absolute inset-0 md:relative md:inset-auto md:col-start-1 md:row-start-1 md:self-start">
        {videoFailed ? (
          <div
            aria-hidden="true"
            className="h-full w-full bg-gradient-to-b from-muted via-background to-background bg-cover bg-center md:aspect-video md:h-auto"
            style={
              posterSrc ? { backgroundImage: `url(${posterSrc})` } : undefined
            }
          />
        ) : (
          <video
            className="block h-full w-full object-cover md:h-auto md:object-fill"
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
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[45%] bg-gradient-to-t from-black via-black/60 to-transparent"
      />

      <div className="relative z-10 col-start-1 row-start-1">{children}</div>
    </section>
  );
}
