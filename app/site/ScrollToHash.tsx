"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const SECTION_FOCUS_EVENT = "hpaa:section-focus";

export function ScrollToHash() {
  const pathname = usePathname();

  useEffect(() => {
    const triggerFocusAnimation = (id: string) => {
      const section = document.getElementById(id);
      if (!section) return;
      section.classList.remove("section-focus-active");
      // Force reflow so repeated clicks retrigger CSS animation.
      void section.offsetWidth;
      section.classList.add("section-focus-active");
      window.setTimeout(() => section.classList.remove("section-focus-active"), 1300);
    };

    const scrollToId = (withFocus: boolean) => {
      if (pathname !== "/") return;
      const raw = window.location.hash;
      if (!raw || raw === "#") return;
      const id = decodeURIComponent(raw.slice(1));
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        if (withFocus) triggerFocusAnimation(id);
      });
    };

    const onSectionFocus = (event: Event) => {
      const custom = event as CustomEvent<{ id?: string }>;
      const id = custom.detail?.id;
      if (!id) return;
      triggerFocusAnimation(id);
    };

    // Initial load: scroll only — focus classes before hydrate cause mismatches on /#home.
    const timer = window.setTimeout(() => scrollToId(false), 0);
    const onHashChange = () => scrollToId(true);
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
