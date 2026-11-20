"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { AircraftImage } from "./aircraftData";

/**
 * A group of figures that open in a large, centred popup (native <dialog>:
 * focus is trapped, Esc closes, focus returns to the clicked photo). Arrow keys,
 * swipe and on-screen buttons move through the group.
 */
export function ZoomableFigures({ images, sizes }: { images: AircraftImage[]; sizes: string }) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const swipeStart = useRef<number | null>(null);
  const count = images.length;

  const show = (idx: number) => {
    setIndex(idx);
    setOpen(true);
    dialogRef.current?.showModal();
  };
  const step = (delta: number) => setIndex((i) => (i + delta + count) % count);
  const close = () => dialogRef.current?.close();
  const current = images[index];

  return (
    <>
      {images.map((img, idx) => (
        <figure key={img.src} className="ac-media-figure">
          <button
            type="button"
            className="ac-zoom-trigger"
            onClick={() => show(idx)}
            aria-label={`Enlarge photo: ${img.alt}`}
          >
            <Image src={img.src} alt={img.alt} width={img.width} height={img.height} sizes={sizes} loading="lazy" />
            <span className="ac-zoom-badge" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="6.5" />
                <path d="M16 16l4 4M11 8.5v5M8.5 11h5" />
              </svg>
            </span>
          </button>
        </figure>
      ))}

      <dialog
        ref={dialogRef}
        className="ac-zoom-dialog"
        aria-label="Enlarged photo"
        onClose={() => setOpen(false)}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        onKeyDown={(e) => {
          if (count < 2) return;
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        onPointerDown={(e) => {
          if (e.pointerType !== "mouse") swipeStart.current = e.clientX;
        }}
        onPointerUp={(e) => {
          if (swipeStart.current === null || count < 2) return;
          const dx = e.clientX - swipeStart.current;
          swipeStart.current = null;
          if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
        }}
      >
        {open && current ? (
          <figure className="ac-zoom-figure">
            <Image
              key={current.src}
              src={current.src}
              alt={current.alt}
              width={current.width}
              height={current.height}
              sizes="(max-width: 900px) 96vw, 80vw"
              className="ac-zoom-img"
            />
            <figcaption>
              {count > 1 ? (
                <span className="acg-counter">
                  {String(index + 1).padStart(2, "0")} <span>/ {String(count).padStart(2, "0")}</span>
                </span>
              ) : null}
              {current.alt}
            </figcaption>
          </figure>
        ) : null}
        <button type="button" className="acg-btn ac-zoom-close" onClick={close} aria-label="Close enlarged photo">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
        {count > 1 ? (
          <>
            <button type="button" className="acg-btn ac-zoom-prev" onClick={() => step(-1)} aria-label="Previous photo">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>
            </button>
            <button type="button" className="acg-btn ac-zoom-next" onClick={() => step(1)} aria-label="Next photo">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
            </button>
          </>
        ) : null}
      </dialog>
    </>
  );
}
