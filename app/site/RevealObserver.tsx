"use client";

import { useEffect } from "react";

export function RevealObserver() {
  useEffect(() => {
    let obs: IntersectionObserver | null = null;
    let cancelled = false;

    const observe = () => {
      const observer = obs;
      if (!observer) return;
      document.querySelectorAll(".reveal:not(.visible)").forEach((el) => observer.observe(el));
    };

    // Defer until after hydration — classList changes before hydrate cause mismatches.
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
      observe();
      window.addEventListener("scroll", observe, { passive: true });
    }, 0);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      window.removeEventListener("scroll", observe);
      obs?.disconnect();
    };
  }, []);

  return null;
}

