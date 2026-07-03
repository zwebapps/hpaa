/**
 * Cookie-consent state (GDPR). Stored client-side only.
 *  - "accepted": user allows analytics/advertising cookies
 *  - "rejected": only strictly-necessary cookies
 *  - null: no choice yet → show the banner
 */
export type Consent = "accepted" | "rejected";

const KEY = "cookie_consent";
const MAX_AGE = 60 * 60 * 24 * 180; // 180 days

/** Fired when the stored choice changes (analytics gate listens for this). */
export const CONSENT_EVENT = "cookie-consent-change";
/** Fired to re-open the banner (e.g. the footer "Cookie preferences" link). */
export const CONSENT_OPEN_EVENT = "cookie-consent-open";

export function getConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(KEY);
    return v === "accepted" || v === "rejected" ? v : null;
  } catch {
    return null;
  }
}

export function setConsent(value: Consent): void {
  try {
    window.localStorage.setItem(KEY, value);
    document.cookie = `${KEY}=${value}; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax`;
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
  } catch {
    /* storage unavailable — nothing to persist */
  }
}

export function openConsentBanner(): void {
  if (typeof window !== "undefined") window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
}
