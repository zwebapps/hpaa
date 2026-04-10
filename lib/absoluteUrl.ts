import { getSiteUrl } from "./siteUrl";

/** Absolute URL for public assets and canonical links. */
export function absoluteUrl(path: string): string {
  const base = getSiteUrl().replace(/\/$/, "");
  if (!path || path === "/") {
    return `${base}/`;
  }
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}
