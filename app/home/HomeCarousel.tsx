"use client";

import { useEffect, useMemo, useState } from "react";

type Slide = {
  id: string;
  imageUrl: string;
  badgeText: string;
  title: { pre: string; emphasis: string };
  description: string;
  primaryCta: { href: string; label: string };
  secondaryCta: { href: string; label: string };
};

const slides: Slide[] = [
  {
    id: "mission",
    imageUrl: "/theme/hpaa9.jpeg",
    badgeText: "Konstanz, Germany · Aviation Specialists",
    title: { pre: "Aircraft Built", emphasis: "Your Mission" },
    description:
      "KUM Services GmbH converts proven civil aircraft into customized platforms—delivering performance, reliability, and value faster than traditional programs.",
    primaryCta: { href: "/#aircraft", label: "Browse Aircraft" },
    secondaryCta: { href: "/#contact", label: "Request a Quote" },
  },
  {
    id: "speed",
    imageUrl: "/theme/hpaa10.jpg",
    badgeText: "Rapid conversion · Worldwide support",
    title: { pre: "Deploy Faster", emphasis: "Operate Sooner" },
    description:
      "Civil-registered platforms can ferry to your location and convert on-site—minimizing approvals, delays, and total time-to-operation.",
    primaryCta: { href: "/#why-us", label: "Why Us" },
    secondaryCta: { href: "/#contact", label: "Talk to Us" },
  },
  {
    id: "capability",
    imageUrl: "/theme/hpaa3.jpg",
    badgeText: "Multi-mission · Proven airframes",
    title: { pre: "Capability First", emphasis: "No Compromises" },
    description:
      "From ISR and surveillance to cargo delivery and counter-UAS—configure the airframe to match mission needs, not the other way around.",
    primaryCta: { href: "/#applications", label: "View Applications" },
    secondaryCta: { href: "/#aircraft", label: "See Platforms" },
  },
] as const;

function clampIndex(idx: number, len: number) {
  return ((idx % len) + len) % len;
}

export function HomeCarousel() {
  const [active, setActive] = useState(0);
  const total = slides.length;
  const slide = useMemo(() => slides[active], [active]);
  const translateVw = active * 100;
  const stripWidthVw = total * 100;

  useEffect(() => {
    const t = window.setInterval(() => setActive((i) => clampIndex(i + 1, total)), 6500);
    return () => window.clearInterval(t);
  }, [total]);

  return (
    <section id="home" className="hero hero--fullbleed" style={{ marginTop: 72 }}>
      <div className="hero-carousel" aria-roledescription="carousel" aria-label="Homepage hero">
        <div className="hero-carousel-track">
          <div
            className="hero-carousel-strip"
            style={{
              // Use viewport units so each slide stays exactly 100vw wide.
              width: `${stripWidthVw}vw`,
              transform: `translate3d(-${translateVw}vw, 0, 0)`,
            }}
          >
            {slides.map((s, i) => (
              <div
                key={s.id}
                className="hero-carousel-slide"
                style={{ backgroundImage: `url('${s.imageUrl}')` }}
                aria-hidden={i === active ? "false" : "true"}
              />
            ))}
          </div>
        </div>

        <div className="hero-scrim" />

        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              <span className="hero-badge-text">{slide.badgeText}</span>
            </div>
            <h1 className="hero-title">
              {slide.title.pre}
              <br />
              <em>{slide.title.emphasis}</em>
            </h1>
            <div className="hero-divider" />
            <p className="hero-sub">{slide.description}</p>
            <div className="hero-actions">
              <a className="btn-gold" href={slide.primaryCta.href}>
                {slide.primaryCta.label}
              </a>
              <a className="btn-ghost" href={slide.secondaryCta.href}>
                {slide.secondaryCta.label}
              </a>
            </div>

            <div className="hero-carousel-controls" aria-label="Carousel controls">
              <button
                type="button"
                className="hero-carousel-arrow"
                onClick={() => setActive((i) => clampIndex(i - 1, total))}
                aria-label="Previous slide"
              >
                ‹
              </button>
              <div className="hero-carousel-dots" role="tablist" aria-label="Carousel dots">
                {slides.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    className={`hero-carousel-dot ${i === active ? "active" : ""}`}
                    onClick={() => setActive(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    aria-current={i === active ? "true" : "false"}
                  />
                ))}
              </div>
              <button
                type="button"
                className="hero-carousel-arrow"
                onClick={() => setActive((i) => clampIndex(i + 1, total))}
                aria-label="Next slide"
              >
                ›
              </button>
            </div>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-val">1–2</div>
              <div className="hero-stat-label">Day Conversion</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-val">417kt</div>
              <div className="hero-stat-label">Top Speed</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-val">5,250km</div>
              <div className="hero-stat-label">Max Range</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

