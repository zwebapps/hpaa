"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { AircraftMagnifier } from "./AircraftMagnifier";
import { expandAircraftSlides } from "@/lib/aircraftImageSlides";

export function AircraftGallery({
  images,
  altBase,
}: {
  images: string[];
  altBase: string;
}) {
  const safeImages = useMemo(() => images.filter(Boolean), [images]);
  const slides = useMemo(() => expandAircraftSlides(safeImages), [safeImages]);
  const [active, setActive] = useState(0);
  const thumbsRef = useRef<HTMLDivElement | null>(null);

  if (slides.length === 0) return null;
  const current = slides[active]!;

  return (
    <div className="ac-gallery">
      <div className="ac-gallery-main">
        <AircraftMagnifier src={current.src} alt={altBase} variant={current.variant} />
      </div>

      {slides.length > 1 ? (
        <div className="ac-gallery-thumbs-wrap" aria-label="Aircraft image thumbnails">
          <button
            type="button"
            className="ac-thumbs-arrow"
            aria-label="Scroll thumbnails left"
            onClick={() => thumbsRef.current?.scrollBy({ left: -220, behavior: "smooth" })}
          >
            ‹
          </button>

          <div
            ref={thumbsRef}
            className="ac-gallery-thumbs"
            aria-label="Aircraft image thumbnails"
          >
            {slides.map((slide, idx) => (
              <button
                key={idx}
                type="button"
                className={`ac-thumb ${idx === active ? "active" : ""}`}
                onClick={() => setActive(idx)}
                aria-label={`Select image ${idx + 1}`}
                style={{ position: "relative" }}
              >
                <Image
                  fill
                  src={slide.src}
                  alt={`${altBase} thumbnail ${idx + 1}`}
                  className={`ac-thumb-img ac-thumb-img--v${slide.variant}`}
                  sizes="84px"
                  loading="lazy"
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            className="ac-thumbs-arrow"
            aria-label="Scroll thumbnails right"
            onClick={() => thumbsRef.current?.scrollBy({ left: 220, behavior: "smooth" })}
          >
            ›
          </button>
        </div>
      ) : null}
    </div>
  );
}
