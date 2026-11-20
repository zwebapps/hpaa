"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { AircraftMagnifier } from "./AircraftMagnifier";
import { expandAircraftSlides } from "@/lib/aircraftImageSlides";
import { THUMB_SIZES } from "@/lib/imageSizes";

export function AircraftGallery({
  images,
  altBase,
  alts,
}: {
  images: string[];
  altBase: string;
  /** Optional per-image alt text (same order as `images`). */
  alts?: string[];
}) {
  const safeImages = useMemo(() => images.filter(Boolean), [images]);
  const slides = useMemo(() => expandAircraftSlides(safeImages), [safeImages]);
  const [active, setActive] = useState(0);
  const thumbsRef = useRef<HTMLDivElement | null>(null);

  if (slides.length === 0) return null;
  const current = slides[active]!;
  // Per-image alts only line up when every image is its own slide (3+ images).
  const altFor = (idx: number) =>
    alts && slides.length === safeImages.length ? (alts[idx] ?? altBase) : altBase;

  return (
    <div className="ac-gallery">
      <div className="ac-gallery-main">
        <AircraftMagnifier src={current.src} alt={altFor(active)} variant={current.variant} />
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
                aria-label={`Show image ${idx + 1}: ${altFor(idx)}`}
                aria-pressed={idx === active}
                style={{ position: "relative" }}
              >
                <Image
                  fill
                  src={slide.src}
                  alt=""
                  className={`ac-thumb-img ac-thumb-img--v${slide.variant}`}
                  sizes={THUMB_SIZES}
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
