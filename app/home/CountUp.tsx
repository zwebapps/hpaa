"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts a figure like "20+" up from 0 when it scrolls into view, like an
 * instrument needle settling. The final text is server-rendered, so crawlers,
 * no-JS visitors and reduced-motion visitors always see the real value.
 */
export function CountUp({ value, durationMs = 1400 }: { value: string; durationMs?: number }) {
  const match = value.match(/^(\D*)(\d+)(.*)$/);
  const target = match ? Number(match[2]) : null;
  const [shown, setShown] = useState(value);
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || target === null || !match) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Start from 0 only if the figure is still below the fold, so nobody sees it jump back.
    if (el.getBoundingClientRect().top > window.innerHeight) {
      setShown(`${match[1]}0${match[3]}`);
    }

    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / durationMs);
          const eased = 1 - Math.pow(1 - t, 3);
          setShown(`${match[1]}${Math.round(target * eased)}${match[3]}`);
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `match` is derived from `value`
  }, [value, target, durationMs]);

  return (
    <span ref={ref} aria-label={value}>
      <span aria-hidden="true">{shown}</span>
    </span>
  );
}
