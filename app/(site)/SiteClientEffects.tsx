"use client";

import { AnalyticsBeacon } from "../site/AnalyticsBeacon";
import { RevealObserver } from "../site/RevealObserver";
import { ScrollSpy } from "../site/ScrollSpy";
import { ScrollToHash } from "../site/ScrollToHash";

/** Non-blocking UI helpers — loaded in a separate client chunk so first compile is smaller. */
export function SiteClientEffects() {
  return (
    <>
      <AnalyticsBeacon />
      <RevealObserver />
      <ScrollToHash />
      <ScrollSpy />
    </>
  );
}
