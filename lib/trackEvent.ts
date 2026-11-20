/**
 * Client-side conversion events. Each destination only fires when it is loaded:
 * - GA4 (`gtag`) exists only after cookie consent (see ConsentedAnalytics);
 * - Plausible / Umami are cookieless and run without consent.
 * Never pass personal data (name, email, message text) in `params`.
 */
type EventParams = Record<string, string | number | undefined>;

type AnalyticsWindow = Window & {
  gtag?: (command: "event", name: string, params?: EventParams) => void;
  plausible?: (name: string, options?: { props?: EventParams }) => void;
  umami?: { track: (name: string, data?: EventParams) => void };
};

export function trackEvent(name: string, params: EventParams = {}): void {
  if (typeof window === "undefined") return;
  const w = window as AnalyticsWindow;
  try {
    w.gtag?.("event", name, params);
    w.plausible?.(name, { props: params });
    w.umami?.track(name, params);
  } catch {
    // Analytics must never break the page.
  }
}

/**
 * Records a lead in GA4 (`generate_lead`, the recommended key event), the
 * cookieless tools, and the first-party analytics store as a virtual page
 * view, so leads are counted in the admin dashboard even without consent.
 */
export function trackLead(params: { interest?: string; source?: string }): void {
  const payload: EventParams = {
    form: "contact",
    interest: params.interest?.slice(0, 100),
    source_page: params.source,
  };
  trackEvent("generate_lead", payload);

  if (typeof window === "undefined") return;
  void fetch("/api/analytics/hit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path: "/conversion/enquiry-sent", referrer: params.source ?? "" }),
    keepalive: true,
  }).catch(() => {});
}
