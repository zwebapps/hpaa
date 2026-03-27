"use client";

import { useEffect } from "react";

export function RevealObserver() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.08 },
    );

    const observe = () => {
      document.querySelectorAll(".reveal:not(.visible)").forEach((el) => obs.observe(el));
    };

    observe();
    window.addEventListener("scroll", observe, { passive: true });
    return () => {
      window.removeEventListener("scroll", observe);
      obs.disconnect();
    };
  }, []);

  return null;
}

