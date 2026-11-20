"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { expandAircraftSlides } from "@/lib/aircraftImageSlides";

/** How long each photo stays up while the gallery plays. */
const SLIDE_MS = 4500;
const STAGE_SIZES = "(max-width: 900px) 92vw, 55vw";

/**
 * Detail-page gallery: crossfading stage with a slow Ken Burns drift, a filmstrip
 * of rounded thumbnails with a progress bar, captions, and a fullscreen lightbox.
 *
 * Autoplay (WCAG 2.2.2): visible pause/play button; pauses on hover, on keyboard
 * focus, while off-screen, while the tab is hidden and while the lightbox is
 * open; never starts on its own when the visitor prefers reduced motion.
 */
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
  const count = slides.length;

  const [active, setActive] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const stripRef = useRef<HTMLDivElement | null>(null);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const swipeStart = useRef<number | null>(null);

  const altFor = useCallback(
    (idx: number) =>
      alts && count === safeImages.length ? (alts[idx] ?? altBase) : `${altBase}, view ${idx + 1} of ${count}`,
    [alts, altBase, count, safeImages.length],
  );

  const go = useCallback((idx: number) => setActive(((idx % count) + count) % count), [count]);
  const next = useCallback(() => setActive((i) => (i + 1) % count), [count]);
  const prev = useCallback(() => setActive((i) => (i - 1 + count) % count), [count]);

  // Environment signals: reduced motion, on-screen, tab visibility.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReducedMotion(mq.matches);
    syncMotion();
    mq.addEventListener("change", syncMotion);

    const syncTab = () => setTabVisible(document.visibilityState === "visible");
    syncTab();
    document.addEventListener("visibilitychange", syncTab);

    let io: IntersectionObserver | null = null;
    if (rootRef.current) {
      io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { threshold: 0.35 });
      io.observe(rootRef.current);
    }
    return () => {
      mq.removeEventListener("change", syncMotion);
      document.removeEventListener("visibilitychange", syncTab);
      io?.disconnect();
    };
  }, []);

  const playing =
    count > 1 && !userPaused && !reducedMotion && !hovered && !focused && onScreen && tabVisible && !lightboxOpen;

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(next, SLIDE_MS);
    return () => window.clearTimeout(timer);
  }, [playing, active, next]);

  // Keep the active thumbnail in view inside the filmstrip (without scrolling the page).
  useEffect(() => {
    const strip = stripRef.current;
    const thumb = strip?.children[active] as HTMLElement | undefined;
    if (!strip || !thumb) return;
    const left = thumb.offsetLeft - strip.clientWidth / 2 + thumb.clientWidth / 2;
    strip.scrollTo({ left, behavior: reducedMotion ? "auto" : "smooth" });
  }, [active, reducedMotion]);

  const openLightbox = () => {
    dialogRef.current?.showModal();
    setLightboxOpen(true);
  };
  const closeLightbox = () => dialogRef.current?.close();

  const onSwipeStart = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") swipeStart.current = e.clientX;
  };
  const onSwipeEnd = (e: React.PointerEvent) => {
    if (swipeStart.current === null) return;
    const dx = e.clientX - swipeStart.current;
    swipeStart.current = null;
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
  };

  if (count === 0) return null;

  return (
    <div
      ref={rootRef}
      className={`acg${playing ? " is-playing" : ""}`}
      style={{ "--acg-slide-ms": `${SLIDE_MS}ms` } as React.CSSProperties}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={(e) => setFocused(e.target.matches(":focus-visible"))}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") next();
        if (e.key === "ArrowLeft") prev();
      }}
    >
      <div
        className="acg-stage"
        role="group"
        aria-roledescription="carousel"
        aria-label={`${altBase} photo gallery`}
        onPointerDown={onSwipeStart}
        onPointerUp={onSwipeEnd}
      >
        {slides.map((slide, idx) => (
          <div
            key={`${slide.src}-${idx}`}
            className={`acg-slide${idx === active ? " is-active" : ""}`}
            aria-hidden={idx !== active}
          >
            <div className="acg-kenburns">
              <Image
                fill
                src={slide.src}
                alt={altFor(idx)}
                className={`acg-img acg-img--v${slide.variant}`}
                sizes={STAGE_SIZES}
                priority={idx === 0}
                loading={idx === 0 ? undefined : "lazy"}
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          className="acg-expand-hit"
          onClick={openLightbox}
          aria-label={`Open photo ${active + 1} full screen`}
        />

        <div className="acg-topbar" aria-hidden="true">
          <span className="acg-counter">
            {String(active + 1).padStart(2, "0")} <span>/ {String(count).padStart(2, "0")}</span>
          </span>
        </div>

        <div className="acg-bottombar">
          <p className="acg-caption" aria-live={playing ? "off" : "polite"}>
            {altFor(active)}
          </p>
          {count > 1 ? (
            <div className="acg-controls">
              <button type="button" className="acg-btn" onClick={prev} aria-label="Previous photo">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>
              </button>
              <button
                type="button"
                className="acg-btn acg-btn--play"
                onClick={() => setUserPaused((p) => !p)}
                aria-pressed={!userPaused}
                aria-label={userPaused || reducedMotion ? "Play slideshow" : "Pause slideshow"}
              >
                {userPaused || reducedMotion ? (
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" className="acg-fill" /></svg>
                ) : (
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14M16 5v14" /></svg>
                )}
              </button>
              <button type="button" className="acg-btn" onClick={next} aria-label="Next photo">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
              </button>
              <button type="button" className="acg-btn" onClick={openLightbox} aria-label="View full screen">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" /></svg>
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {count > 1 ? (
        <div ref={stripRef} className="acg-strip" aria-label="Choose a photo">
          {slides.map((slide, idx) => (
            <button
              key={`${slide.src}-thumb-${idx}`}
              type="button"
              className={`acg-thumb${idx === active ? " is-active" : ""}`}
              onClick={() => go(idx)}
              aria-label={`Show photo ${idx + 1}: ${altFor(idx)}`}
              aria-current={idx === active}
            >
              <Image
                fill
                src={slide.src}
                alt=""
                className={`acg-img acg-img--v${slide.variant}`}
                sizes="120px"
                loading="lazy"
              />
              {idx === active ? <span key={`p-${active}`} className="acg-progress" aria-hidden="true" /> : null}
            </button>
          ))}
        </div>
      ) : null}

      <dialog
        ref={dialogRef}
        className="acg-lightbox"
        aria-label={`${altBase} photos, full screen`}
        onClose={() => setLightboxOpen(false)}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeLightbox();
        }}
        onPointerDown={onSwipeStart}
        onPointerUp={onSwipeEnd}
      >
        {lightboxOpen ? (
          <figure className="acg-lightbox-figure">
            <div className="acg-lightbox-img">
              <Image
                key={`lb-${active}`}
                fill
                src={slides[active]!.src}
                alt={altFor(active)}
                sizes="100vw"
                className="acg-lightbox-photo"
              />
            </div>
            <figcaption>
              <span className="acg-counter">
                {String(active + 1).padStart(2, "0")} <span>/ {String(count).padStart(2, "0")}</span>
              </span>
              {altFor(active)}
            </figcaption>
          </figure>
        ) : null}
        <button type="button" className="acg-btn acg-lightbox-close" onClick={closeLightbox} aria-label="Close full screen">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
        {count > 1 ? (
          <>
            <button type="button" className="acg-btn acg-lightbox-prev" onClick={prev} aria-label="Previous photo">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>
            </button>
            <button type="button" className="acg-btn acg-lightbox-next" onClick={next} aria-label="Next photo">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
            </button>
          </>
        ) : null}
      </dialog>
    </div>
  );
}
