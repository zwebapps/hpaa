/** Hostnames used during local development — excluded from referrer analytics. */
export function isLocalDevelopmentHost(host: string): boolean {
  const h = host.trim().toLowerCase().replace(/^www\./, "");
  return h === "localhost" || h === "127.0.0.1" || h === "[::1]";
}

export function isLocalDevelopmentReferrer(referrer?: string | null): boolean {
  const raw = referrer?.trim();
  if (!raw) return false;

  const bare = raw.toLowerCase().replace(/^www\./, "");
  if (
    bare === "localhost" ||
    bare.startsWith("localhost/") ||
    bare.startsWith("localhost:") ||
    bare === "127.0.0.1" ||
    bare.startsWith("127.0.0.1/") ||
    bare.startsWith("127.0.0.1:")
  ) {
    return true;
  }

  try {
    return isLocalDevelopmentHost(new URL(raw).hostname);
  } catch {
    return /^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])([:/]|$)/i.test(raw);
  }
}

/** Returns null for empty or local-development referrers before DB storage. */
export function normalizeReferrerForStorage(referrer?: string | null): string | null {
  if (!referrer?.trim()) return null;
  if (isLocalDevelopmentReferrer(referrer)) return null;
  return referrer.trim().slice(0, 500);
}

/** Classify document.referrer into a stable traffic source label. */
export function trafficSourceFromReferrer(referrer?: string | null): string {
  const raw = referrer?.trim();
  if (!raw || isLocalDevelopmentReferrer(raw)) return "Direct / none";

  try {
    const host = new URL(raw).hostname.replace(/^www\./, "").toLowerCase();
    if (host.includes("google.")) return "Google";
    if (host.includes("bing.")) return "Bing";
    if (host.includes("duckduckgo.")) return "DuckDuckGo";
    if (host.includes("yahoo.")) return "Yahoo";
    if (host.includes("yandex.")) return "Yandex";
    if (host.includes("baidu.")) return "Baidu";
    if (host.includes("facebook.") || host === "fb.com" || host === "l.facebook.com")
      return "Facebook";
    if (host.includes("instagram.")) return "Instagram";
    if (host.includes("linkedin.")) return "LinkedIn";
    if (host.includes("twitter.") || host === "t.co" || host.includes("x.com")) return "X / Twitter";
    if (host.includes("reddit.")) return "Reddit";
    if (host.includes("youtube.")) return "YouTube";
    return host;
  } catch {
    return "Other";
  }
}

export function formatReferrerLabel(referrer?: string | null): string {
  const raw = referrer?.trim();
  if (!raw || isLocalDevelopmentReferrer(raw)) return "(direct)";
  try {
    const u = new URL(raw);
    return u.hostname + (u.pathname !== "/" ? u.pathname : "");
  } catch {
    return raw.slice(0, 80);
  }
}
