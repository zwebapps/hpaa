"use client";

import { useMemo, useState } from "react";

export function AircraftImageSlider({
  images,
  altBase,
}: {
  images: string[];
  altBase: string;
}) {
  const [active, setActive] = useState(0);
  const safeImages = useMemo(() => images.filter(Boolean), [images]);

  if (safeImages.length === 0) return null;

  const prev = () => setActive((i) => (i - 1 + safeImages.length) % safeImages.length);
  const next = () => setActive((i) => (i + 1) % safeImages.length);

  return (
    <div className="ac-img-slider" aria-label={`${altBase} image slider`}>
      <img
        src={safeImages[active]}
        alt={`${altBase} ${active + 1}`}
        className="ac-img-slider-img"
      />

      <div className="ac-img-slider-controls" aria-hidden="false">
        <button type="button" className="ac-img-slider-arrow" onClick={prev} aria-label="Previous image">
          ‹
        </button>
        <div className="ac-img-slider-dots" aria-label="Choose image">
          {safeImages.map((_, idx) => (
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

