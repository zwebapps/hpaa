export const SECTION_FOCUS_EVENT = "hpaa:section-focus";

export function scrollToHomeSection(
  sectionId: string,
  options?: { focus?: boolean; behavior?: ScrollBehavior },
) {
  if (typeof document === "undefined") return;

  document.getElementById(sectionId)?.scrollIntoView({
    behavior: options?.behavior ?? "smooth",
  });

  if (options?.focus !== false) {
    window.dispatchEvent(
      new CustomEvent(SECTION_FOCUS_EVENT, { detail: { id: sectionId } }),
    );
  }
}

/** Remove `#section` from the homepage URL after in-page scroll. */
export function stripHomeHashFromUrl() {
  if (typeof window === "undefined") return;
  if (window.location.pathname === "/" && window.location.hash) {
    history.replaceState(null, "", "/");
  }
}
