"use client";

import { useMemo, useRef, useState, type MouseEvent } from "react";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function AircraftMagnifier({
  src,
  alt,
  zoom = 2.5,
}: {
  src: string;
  alt: string;
  zoom?: number;
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [hover, setHover] = useState(false);
  const [lens, setLens] = useState({ left: 0, top: 0, size: 140, bgPosX: 50, bgPosY: 50 });

  const backgroundSize = useMemo(() => `${zoom * 100}% ${zoom * 100}%`, [zoom]);

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const size = clamp(rect.width * 0.28, 90, 170);

    const left = clamp(x - size / 2, 0, rect.width - size);
    const top = clamp(y - size / 2, 0, rect.height - size);

    const bgPosX = clamp((x / rect.width) * 100, 0, 100);
    const bgPosY = clamp((y / rect.height) * 100, 0, 100);

    setLens({ left, top, size, bgPosX, bgPosY });
  }

  return (
    <div
      className="ac-magnifier-wrap"
      ref={wrapRef}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseMove={onMove}
    >
      <img src={src} alt={alt} className="ac-magnifier-main" />

      {hover ? (
        <div
          className="ac-magnifier-lens"
          style={{
            width: lens.size,
            height: lens.size,
            left: lens.left,
            top: lens.top,
            backgroundImage: `url(${src})`,
            backgroundSize,
            backgroundPosition: `${lens.bgPosX}% ${lens.bgPosY}%`,
          }}
          aria-hidden="true"
        />
      ) : null}
    </div>
  );
}

