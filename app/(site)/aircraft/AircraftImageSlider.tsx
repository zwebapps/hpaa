"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { expandAircraftSlides } from "@/lib/aircraftImageSlides";
import { AIRCRAFT_SLIDER_SIZES } from "@/lib/imageSizes";

/** Time each photo stays up while the pointer rests on the card. */
const HOVER_AUTOPLAY_MS = 1800;

export function AircraftImageSlider({
  images,
  altBase,
}: {
  images: string[];
  altBase: string;
}) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const slides = useMemo(() => expandAircraftSlides(images), [images]);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const count = slides.length;
  const prev = () => setActive((i) => (i - 1 + count) % count);
  const next = useCallback(() => setActive((i) => (i + 1) % count), [count]);

  // Hover autoplay: only for a real mouse (not touch) and never when the visitor
  // prefers reduced motion. It stops as soon as the pointer leaves the card.
  useEffect(() => {
    const card = rootRef.current?.closest(".aircraft-panel") ?? rootRef.current;
    if (!card || count < 2) return;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const start = () => {
      if (canHover.matches && !reduced.matches) setPlaying(true);
    };
    const stop = () => setPlaying(false);

    card.addEventListener("pointerenter", start);
    card.addEventListener("pointerleave", stop);
    return () => {
      card.removeEventListener("pointerenter", start);
      card.removeEventListener("pointerleave", stop);
    };
  }, [count]);

  useEffect(() => {
    if (!playing) return;
    // Advance once right away so the hover feels responsive, then keep cycling.
    const first = window.setTimeout(next, 450);
    const timer = window.setInterval(next, HOVER_AUTOPLAY_MS);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(timer);
    };
  }, [playing, next]);

  if (count === 0) return null;

  const slide = slides[active];

  return (
    <div
      ref={rootRef}
      className={`ac-img-slider${playing ? " is-playing" : ""}`}
      aria-label={`${altBase} image slider`}
    >
      <Image
        key={`${slide.src}-${slide.variant}-${active}`}
        fill
        src={slide.src}
        alt={`${altBase} — view ${active + 1} of ${count}`}
        className={`ac-img-slider-img ac-img-slider-img--v${slide.variant}`}
        sizes={AIRCRAFT_SLIDER_SIZES}
        loading="lazy"
      />

      <div className="ac-img-slider-controls" aria-hidden="false">
        <button type="button" className="ac-img-slider-arrow" onClick={prev} aria-label="Previous image">
          ‹
        </button>
        <div className="ac-img-slider-dots" aria-label="Choose image">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={`ac-img-slider-dot ${idx === active ? "active" : ""}`}
              onClick={() => setActive(idx)}
              aria-label={`Go to image ${idx + 1}`}
              aria-current={idx === active}
            />
          ))}
        </div>
        <button type="button" className="ac-img-slider-arrow" onClick={next} aria-label="Next image">
          ›
        </button>
      </div>
    </div>
  );
}
