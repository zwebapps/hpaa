import type { Metadata } from "next";
import { env } from "@/app/env";
import { siteData } from "@/data/siteData";
import { absoluteUrl } from "./absoluteUrl";
import { getSiteUrl } from "./siteUrl";

const appName = env.NEXT_PUBLIC_APP_NAME;

/** Primary SERP/snippet description (kept focused; Open Graph uses the same). */
const defaultDescription = (
  siteData.heroCarousel.slides[0]?.description ?? siteData.approach.description
)
  .replace(/\s+/g, " ")
  .trim();

export const siteKeywords: string[] = [
  "HPAA",
  "high performance autonomous aircraft",
  "autonomous aircraft conversion",
  "civil aircraft conversion",
  "KUM Services GmbH",
  "Konstanz",
  "Germany",
  "ISR",
  "special mission aircraft",
  "EASA",
  "turboprop",
  "business jet conversion",
  "Cessna",
  "King Air",
  "Pilatus",
  "C-130",
];

const defaultOgImage = absoluteUrl("/theme/hpaa9.jpeg");

/** Default + template for the whole site (segment pages override title/description). */
export function buildRootMetadata(): Metadata {
  const base = getSiteUrl();
  const metadataBase = new URL(base.endsWith("/") ? base : `${base}/`);

  const titleDefault = `${appName} · ${siteData.brand.name}`;

  return {
    metadataBase,
    title: {
      default: titleDefault,
      template: `%s · ${appName}`,
    },
    description: defaultDescription,
    keywords: siteKeywords,
    applicationName: appName,
    authors: [{ name: siteData.brand.name, url: base }],
    creator: siteData.brand.name,
    publisher: siteData.brand.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: absoluteUrl("/"),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
    verification: {
      google: "h2Ewg-tRNzTwDdnNLGtHKYI9kavgozjWxB7BYM_xQa0",
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: absoluteUrl("/"),
      siteName: appName,
      title: titleDefault,
      description: defaultDescription,
      images: [
        {
          url: defaultOgImage,
          width: 1200,
          height: 630,
          alt: `${siteData.brand.name} — ${siteData.brand.tagline}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: titleDefault,
      description: defaultDescription,
      images: [defaultOgImage],
    },
    category: "technology",
    other: {
      google: "notranslate",
    },
  };
}

export type PageMetaInput = {
  /** Short segment title (becomes `Title · ${appName}` via template). */
  title: string;
  description: string;
  /** Path starting with `/` (e.g. `/contact`). */
  path: string;
};

export function buildPageMetadata({ title, description, path }: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const pageTitle = `${title} · ${appName}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      url,
      title: pageTitle,
      description,
      siteName: appName,
      images: [{ url: absoluteUrl("/theme/hpaa9.jpeg") }],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [absoluteUrl("/theme/hpaa9.jpeg")],
    },
  };
}

/** Pre-built metadata for hash-redirect routes (unique URLs for crawlers and sharing). */
export const segmentMetadata = {
  aircraft: buildPageMetadata({
    title: "Aircraft",
    description: siteData.aircraft.lead,
    path: "/aircraft",
  }),
  applications: buildPageMetadata({
    title: "Applications",
    description: siteData.applications.lead,
    path: "/applications",
  }),
  whyUs: buildPageMetadata({
    title: "Why Us",
    description: siteData.whyUs.lead,
    path: "/why-us",
  }),
  partners: buildPageMetadata({
    title: "Partners",
    description: siteData.partners.lead,
    path: "/partners",
  }),
  contact: buildPageMetadata({
    title: "Contact",
    description: siteData.contact.lead,
    path: "/contact",
  }),
} as const;
