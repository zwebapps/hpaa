"use client";

import { useMemo, useRef, useState } from "react";
import { AircraftMagnifier } from "./AircraftMagnifier";

export function AircraftGallery({
  images,
  altBase,
}: {
  images: string[];
  altBase: string;
}) {
  const safeImages = useMemo(() => images.filter(Boolean), [images]);
  const [active, setActive] = useState(0);
  const thumbsRef = useRef<HTMLDivElement | null>(null);

  if (safeImages.length === 0) return null;
  const activeImg = safeImages[active]!;

  return (
    <div className="ac-gallery">
      <div className="ac-gallery-main">
        <AircraftMagnifier src={activeImg} alt={altBase} />
      </div>

      {safeImages.length > 1 ? (
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
            {safeImages.map((img, idx) => (
              <button
                key={img}
                type="button"
                className={`ac-thumb ${idx === active ? "active" : ""}`}
                onClick={() => setActive(idx)}
                aria-label={`Select image ${idx + 1}`}
              >
                <img src={img} alt={`${altBase} thumbnail ${idx + 1}`} />
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

