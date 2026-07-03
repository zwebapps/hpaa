import Script from "next/script";
import { getPublicAnalyticsIds } from "@/lib/analyticsIntegrations";

/**
 * Cookieless analytics only (Plausible, Umami) — GDPR-exempt, so they run
 * without consent. Cookie-based trackers (GA4, Google Ads) live in
 * ConsentedAnalytics and load only after the user accepts.
 * All are no-ops when their env var is unset.
 */
export function AnalyticsScripts() {
  const { plausibleDomain, umamiWebsiteId, umamiScriptSrc } = getPublicAnalyticsIds();

  return (
    <>
      {plausibleDomain ? (
        <Script
          defer
          data-domain={plausibleDomain}
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      ) : null}
      {umamiWebsiteId ? (
        <Script
          async
          src={umamiScriptSrc}
          data-website-id={umamiWebsiteId}
          strategy="afterInteractive"
        />
      ) : null}
    </>
  );
}
