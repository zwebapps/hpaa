/**
 * When only one image URL is provided, expand to three slides with distinct CSS variants
 * (crop / position / tone). Exactly two distinct URLs expand to three slides: both images
 * plus a third with an alternate variant on the second image. Three or more URLs map one
 * slide each (variant 0).
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

  if (unique.length === 2 && unique[0] && unique[1]) {
    const [a, b] = unique;
    return [
      { src: a, variant: 0 },
      { src: b, variant: 0 },
      { src: b, variant: 1 },
    ];
  }

  return filtered.map((src) => ({ src, variant: 0 as const }));
}
