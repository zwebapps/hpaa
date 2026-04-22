"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { expandAircraftSlides } from "@/lib/aircraftImageSlides";

export function AircraftImageSlider({
  images,
  altBase,
}: {
  images: string[];
  altBase: string;
}) {
  const [active, setActive] = useState(0);
  const slides = useMemo(() => expandAircraftSlides(images), [images]);

  if (slides.length === 0) return null;

  const prev = () => setActive((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setActive((i) => (i + 1) % slides.length);

  const slide = slides[active];

  return (
    <div className="ac-img-slider" aria-label={`${altBase} image slider`}>
      <Image
        fill
        src={slide.src}
        alt={`${altBase} — view ${active + 1} of ${slides.length}`}
        className={`ac-img-slider-img ac-img-slider-img--v${slide.variant}`}
        sizes="100vw"
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
