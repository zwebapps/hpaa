"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Wait for route segment hydration before mutating reveal classNames. */
const REVEAL_DELAY_MS = 150;

export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    let obs: IntersectionObserver | null = null;
    let cancelled = false;
    let onScroll: (() => void) | null = null;

    const observe = () => {
      if (!obs) return;
      document.querySelectorAll(".reveal:not(.visible)").forEach((el) => obs!.observe(el));
    };

    const timer = window.setTimeout(() => {
      if (cancelled) return;

      obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) e.target.classList.add("visible");
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
