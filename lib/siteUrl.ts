/**
 * Canonical origin for sitemap, robots, and absolute URLs.
 * Override with SITE_URL (CI) and/or NEXT_PUBLIC_SITE_URL when needed.
 */
const DEFAULT_PRODUCTION_ORIGIN = "https://www.robot-aircraft.com";

export function getSiteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);

  if (!raw?.trim()) {
    return process.env.NODE_ENV === "production"
      ? DEFAULT_PRODUCTION_ORIGIN
      : "http://localhost:3000";
  }

  const trimmed = raw.trim().replace(/\/$/, "");
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }
  return `https://${trimmed}`;
}
