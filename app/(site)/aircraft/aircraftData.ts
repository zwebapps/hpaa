import { siteData } from "@/data/siteData";

export type AircraftSlug = string;

export type SpecRow = { label: string; value: string };

export type AircraftImage = { src: string; alt: string; width: number; height: number };

export type AircraftMediaSection = {
  id: string;
  eyebrow: string;
  title: string;
  paragraphs: string[];
  images: AircraftImage[];
};

export type AircraftFaq = { question: string; answer: string };

export type Aircraft = {
  slug: AircraftSlug;
  name: string;
  category: string;
  images: string[];
  specs: SpecRow[];
  description: string;
  details: string[];
  /** Optional rich-page fields: rendered only when present. */
  subtitle?: string;
  imageAlts?: string[];
  /** 1200×630 JPEG for social cards (falls back to images[0]). */
  ogImage?: string;
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
  summary?: string;
  keyStats?: { value: string; label: string }[];
  featuresHeading?: string;
  features?: { title: string; text: string }[];
  specGroups?: { title: string; rows: SpecRow[] }[];
  mediaSections?: AircraftMediaSection[];
  useCasesHeading?: string;
  useCases?: { title: string; text: string }[];
  faq?: AircraftFaq[];
  /** Pre-fills the contact form "Aircraft Interest" field. */
  enquiryInterest?: string;
};

export const aircrafts: Aircraft[] = siteData.aircraft.aircrafts as Aircraft[];

/** Contact link that pre-fills the enquiry form with this aircraft. */
export function enquiryHref(
  aircraft: Pick<Aircraft, "slug" | "name" | "enquiryInterest">,
  intent?: string,
): string {
  const interest = intent
    ? `${aircraft.enquiryInterest ?? aircraft.name}: ${intent}`
    : (aircraft.enquiryInterest ?? aircraft.name);
  const q = new URLSearchParams({ interest, from: `/aircraft/${aircraft.slug}` });
  return `/contact?${q.toString()}#contact-form`;
}

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
