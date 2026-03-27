"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const SECTION_IDS = ["home", "approach", "why-us", "aircraft", "applications", "partners", "contact"] as const;
const HASH_SYNC_EVENT = "hpaa:hash-sync";

export function ScrollSpy() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;

    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );

    if (sections.length === 0) return;

    let activeId = "";
    let ticking = false;

    const syncByScrollPosition = () => {
      const navOffset = 88; // nav height + buffer
      const markerY = window.scrollY + navOffset;

      let nextActive = sections[0]?.id ?? "";
      for (const section of sections) {
        if (section.offsetTop <= markerY + 1) nextActive = section.id;
        else break;
      }

      if (!nextActive || nextActive === activeId) return;

      activeId = nextActive;
      window.history.replaceState(null, "", `/#${nextActive}`);
      window.dispatchEvent(new Event(HASH_SYNC_EVENT));
    };

    const onScrollOrResize = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        syncByScrollPosition();
        ticking = false;
      });
    };

    syncByScrollPosition();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [pathname]);

  return null;
}
