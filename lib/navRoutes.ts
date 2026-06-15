/** Map legacy hash nav targets to indexable routes (site-content.json hrefs unchanged). */
const HASH_TO_ROUTE: Record<string, string> = {
  "/#home": "/",
  "/#why-us": "/why-us",
  "/#aircraft": "/aircraft",
  "/#applications": "/applications",
  "/#partners": "/partners",
  "/#contact": "/contact",
};

export function navRouteHref(href: string): string {
  return HASH_TO_ROUTE[href] ?? href;
}
