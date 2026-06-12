/** Classify document.referrer into a stable traffic source label. */
export function trafficSourceFromReferrer(referrer?: string | null): string {
  const raw = referrer?.trim();
  if (!raw) return "Direct / none";

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
  if (!raw) return "(direct)";
  try {
    const u = new URL(raw);
    return u.hostname + (u.pathname !== "/" ? u.pathname : "");
  } catch {
    return raw.slice(0, 80);
  }
}
