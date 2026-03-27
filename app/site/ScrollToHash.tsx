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

    const scrollToId = () => {
      if (pathname !== "/") return;
      const raw = window.location.hash;
      if (!raw || raw === "#") return;
      const id = decodeURIComponent(raw.slice(1));
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        triggerFocusAnimation(id);
      });
    };

    const onSectionFocus = (event: Event) => {
      const custom = event as CustomEvent<{ id?: string }>;
      const id = custom.detail?.id;
      if (!id) return;
      triggerFocusAnimation(id);
    };

    scrollToId();
    window.addEventListener("hashchange", scrollToId);
    window.addEventListener(SECTION_FOCUS_EVENT, onSectionFocus as EventListener);
    return () => {
      window.removeEventListener("hashchange", scrollToId);
      window.removeEventListener(SECTION_FOCUS_EVENT, onSectionFocus as EventListener);
    };
  }, [pathname]);

  return null;
}
