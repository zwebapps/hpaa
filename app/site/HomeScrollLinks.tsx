"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { sectionIdFromNavHref } from "@/lib/navRoutes";
import { scrollToHomeSection } from "@/lib/scrollHomeSection";

/** Intercept legacy `/#section` anchors on the homepage so CTAs scroll in-page without a hash. */
export function HomeScrollLinks() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;

    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest('a[href^="/#"]');
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const sectionId = sectionIdFromNavHref(anchor.getAttribute("href") ?? "");
      if (!sectionId) return;

      event.preventDefault();
      scrollToHomeSection(sectionId);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [pathname]);

  return null;
}
