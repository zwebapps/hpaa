/** Legacy hash hrefs in site-content.json → homepage section ids. */
const HASH_TO_SECTION: Record<string, string> = {
  "/#home": "home",
  "/#why-us": "why-us",
  "/#aircraft": "aircraft",
  "/#applications": "applications",
  "/#partners": "partners",
  "/#contact": "contact",
};

/** Legacy hash hrefs → indexable standalone routes (off homepage). */
const HASH_TO_ROUTE: Record<string, string> = {
  "/#home": "/",
  "/#why-us": "/why-us",
  "/#aircraft": "/aircraft",
  "/#applications": "/applications",
  "/#partners": "/partners",
  "/#contact": "/contact",
};

export function sectionIdFromNavHref(href: string): string | null {
  return HASH_TO_SECTION[href] ?? null;
}

export function navRouteHref(href: string): string {
  return HASH_TO_ROUTE[href] ?? href;
}

export function isHashNavHref(href: string): boolean {
  return href.startsWith("/#");
}
