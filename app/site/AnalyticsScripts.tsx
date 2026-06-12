import Script from "next/script";
import { getPublicAnalyticsIds } from "@/lib/analyticsIntegrations";

/**
 * Optional third-party analytics (Plausible, GA4, Umami).
 * Set env vars to enable — all are no-op when unset.
 */
export function AnalyticsScripts() {
  const { plausibleDomain, gaMeasurementId, umamiWebsiteId, umamiScriptSrc } =
    getPublicAnalyticsIds();

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
      {gaMeasurementId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
            strategy="lazyOnload"
          />
          <Script id="ga4-init" strategy="lazyOnload">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaMeasurementId}',{send_page_view:true});`}
          </Script>
        </>
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
