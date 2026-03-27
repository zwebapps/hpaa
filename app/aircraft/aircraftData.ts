import { siteData } from "@/data/siteData";

export type AircraftSlug = string;

export type SpecRow = { label: string; value: string };

export type Aircraft = {
  slug: AircraftSlug;
  name: string;
  category: string;
  images: string[];
  specs: SpecRow[];
  description: string;
  details: string[];
};

export const aircrafts: Aircraft[] = siteData.aircraft.aircrafts as Aircraft[];

export function getAircraftBySlug(
  slug: string | string[] | undefined,
): Aircraft | undefined {
  const raw = Array.isArray(slug) ? slug[0] : slug;
  if (!raw) return undefined;

  const normalized = (() => {
    try {
      return decodeURIComponent(raw).trim().toLowerCase();
    } catch {
      return raw.trim().toLowerCase();
    }
  })();

  return aircrafts.find((a) => a.slug.toLowerCase() === normalized);
}

