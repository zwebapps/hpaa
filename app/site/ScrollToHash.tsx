"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function ScrollToHash() {
  const pathname = usePathname();

  useEffect(() => {
    const scrollToId = () => {
      if (pathname !== "/") return;
      const raw = window.location.hash;
      if (!raw || raw === "#") return;
      const id = decodeURIComponent(raw.slice(1));
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      });
    };

    scrollToId();
    window.addEventListener("hashchange", scrollToId);
    return () => window.removeEventListener("hashchange", scrollToId);
  }, [pathname]);

  return null;
}
