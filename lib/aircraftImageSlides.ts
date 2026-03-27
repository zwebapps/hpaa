/**
 * When only one image URL is provided, expand to three slides with distinct CSS variants
 * (crop / position / tone). Multiple distinct URLs are shown as-is (one slide each).
 */
export type AircraftSlide = { src: string; variant: 0 | 1 | 2 };

export function expandAircraftSlides(images: string[]): AircraftSlide[] {
  const filtered = images.filter(Boolean);
  if (filtered.length === 0) return [];

  const unique = [...new Set(filtered)];
  if (unique.length === 1 && unique[0]) {
    const src = unique[0];
    return [
      { src, variant: 0 },
      { src, variant: 1 },
      { src, variant: 2 },
    ];
  }

  return filtered.map((src) => ({ src, variant: 0 as const }));
}
