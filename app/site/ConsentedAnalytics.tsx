"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { CONSENT_EVENT, getConsent } from "@/lib/consent";

/**
 * Cookie-based analytics (GA4) that loads ONLY after the user accepts. Reads
 * NEXT_PUBLIC_* statically so Next inlines it for the browser; it's a no-op when
 * the env var is unset. Cookieless analytics (Plausible/Umami) stay in
 * AnalyticsScripts and need no consent.
 */
export function ConsentedAnalytics() {
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    const sync = () => setGranted(getConsent() === "accepted");
    sync();
    window.addEventListener(CONSENT_EVENT, sync);
    return () => window.removeEventListener(CONSENT_EVENT, sync);
  }, []);

  if (!granted) return null;

  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!gaId) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}',{send_page_view:true});`}
      </Script>
    </>
  );
}
