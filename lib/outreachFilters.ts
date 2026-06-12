/** Sentinel for companies with no country set (UI + API). */
export const OUTREACH_NO_COUNTRY = "__none__";

export type OutreachSendFilter = {
  countries?: string[];
  ids?: string[];
};

export function normalizeCountryKey(country: string | undefined | null): string {
  const trimmed = String(country ?? "").trim();
  return trimmed ? trimmed.toLowerCase() : OUTREACH_NO_COUNTRY;
}

export function matchesCountryFilter(
  docCountry: string | undefined,
  filterCountries: string[],
): boolean {
  if (filterCountries.length === 0) return true;
  const docKey = normalizeCountryKey(docCountry);
  return filterCountries.some((f) => {
    const filterKey =
      f === OUTREACH_NO_COUNTRY ? OUTREACH_NO_COUNTRY : normalizeCountryKey(f);
    return filterKey === docKey;
  });
}
