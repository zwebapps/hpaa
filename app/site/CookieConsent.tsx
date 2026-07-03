"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CONSENT_OPEN_EVENT, getConsent, setConsent, type Consent } from "@/lib/consent";

/**
 * GDPR cookie-consent banner. Renders only until the user makes a choice
 * (or when re-opened via the footer "Cookie preferences" link). No non-essential
 * cookies are set before the user clicks "Accept all".
 */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show if no choice stored yet.
    if (getConsent() === null) setVisible(true);
    const reopen = () => setVisible(true);
    window.addEventListener(CONSENT_OPEN_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, reopen);
  }, []);

  if (!visible) return null;

  const choose = (value: Consent) => {
    setConsent(value);
    setVisible(false);
  };

  return (
    <div className="cookie-consent" role="dialog" aria-modal="false" aria-label="Cookie consent">
      <div className="cookie-consent__inner">
        <p className="cookie-consent__text">
          We use strictly necessary cookies to operate this website. With your consent, we also use
          analytics cookies to measure traffic and improve our services. You can change your
          preferences at any time. Please see our{" "}
          <Link href="/cookie-policy" className="cookie-consent__link">
            Cookie Policy
          </Link>{" "}
          for more information.
        </p>
        <div className="cookie-consent__actions">
          <button
            type="button"
            className="cookie-btn cookie-btn--ghost"
            onClick={() => choose("rejected")}
          >
            Reject non-essential
          </button>
          <button
            type="button"
            className="cookie-btn cookie-btn--primary"
            onClick={() => choose("accepted")}
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
