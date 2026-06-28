"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { SECTION_FOCUS_EVENT, scrollToHomeSection, stripHomeHashFromUrl } from "@/lib/scrollHomeSection";

/** Legacy `/#section` bookmarks on `/`: scroll in-page, then drop the hash from the URL. */
export function ScrollToHash() {
  const pathname = usePathname();

  useEffect(() => {
    const triggerFocusAnimation = (id: string) => {
      const section = document.getElementById(id);
      if (!section) return;
      section.classList.remove("section-focus-active");
      void section.offsetWidth;
      section.classList.add("section-focus-active");
      window.setTimeout(() => section.classList.remove("section-focus-active"), 1300);
    };

    const scrollFromHash = (withFocus: boolean) => {
      if (pathname !== "/") return;
      const raw = window.location.hash;
      if (!raw || raw === "#") return;
      const id = decodeURIComponent(raw.slice(1));

      requestAnimationFrame(() => {
        scrollToHomeSection(id, { focus: false });
        if (withFocus) triggerFocusAnimation(id);
        stripHomeHashFromUrl();
      });
    };

    const onSectionFocus = (event: Event) => {
      const custom = event as CustomEvent<{ id?: string }>;
      const id = custom.detail?.id;
      if (!id) return;
      triggerFocusAnimation(id);
    };

    const timer = window.setTimeout(() => scrollFromHash(false), 0);
    const onHashChange = () => scrollFromHash(true);
    window.addEventListener("hashchange", onHashChange);
    window.addEventListener(SECTION_FOCUS_EVENT, onSectionFocus as EventListener);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener(SECTION_FOCUS_EVENT, onSectionFocus as EventListener);
    };
  }, [pathname]);

  return null;
}
