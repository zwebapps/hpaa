/**
 * Canonical origin for sitemap, robots, canonical tags, and absolute URLs.
 *
 * Priority:
 *   1. NEXT_PUBLIC_SITE_URL  (set this in Vercel → Settings → Environment Variables for all envs)
 *   2. SITE_URL              (CI / server-side override)
 *   3. Hard-coded production origin (safe fallback — never uses VERCEL_URL which is always
 *      the preview deployment URL and would cause Google to crawl a 401-protected preview)
 */
const PRODUCTION_ORIGIN = "https://www.robot-aircraft.com";

export function getSiteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ??
    process.env.SITE_URL?.trim();

  if (!raw) {
    // Always return the real production domain except in local dev.
    return process.env.NODE_ENV === "production"
      ? PRODUCTION_ORIGIN
      : "http://localhost:3000";
  }

  const normalised = raw.replace(/\/$/, "");
  return /^https?:\/\//i.test(normalised)
    ? normalised
    : `https://${normalised}`;
}
