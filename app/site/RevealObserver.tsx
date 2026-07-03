"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Small delay so above-the-fold reveals don't flash on first paint. */
const REVEAL_DELAY_MS = 150;

export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    let obs: IntersectionObserver | null = null;
    let cancelled = false;
    let onScroll: (() => void) | null = null;

    const observe = () => {
      if (!obs) return;
      document
        .querySelectorAll(".reveal:not(.visible):not([data-visible])")
        .forEach((el) => obs!.observe(el));
    };

    const timer = window.setTimeout(() => {
      if (cancelled) return;

      obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            // Use a data attribute rather than className: React does not render
            // `data-visible`, so mutating it never causes a hydration mismatch,
            // even if this observer fires before a streamed segment hydrates.
            if (e.isIntersecting) e.target.setAttribute("data-visible", "true");
          });
        },
        { threshold: 0.08 },
      );

      onScroll = () => observe();
      observe();
      window.addEventListener("scroll", onScroll, { passive: true });
    }, REVEAL_DELAY_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      if (onScroll) window.removeEventListener("scroll", onScroll);
      obs?.disconnect();
    };
  }, [pathname]);

  return null;
}
