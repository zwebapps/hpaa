import type { Metadata } from "next";
import { env } from "@/app/env";
import { siteData } from "@/data/siteData";
import { buildPageMetadataFromSeoBlockId } from "./seo/buildSeoMetadata";
import { collectAllSeoMetaKeywords, getSeoMetaById } from "./seo/helpers";
import { absoluteUrl } from "./absoluteUrl";
import { getSiteUrl } from "./siteUrl";

const appName = env.NEXT_PUBLIC_APP_NAME;

/**
 * Off-page meta description only (Google/OG/Twitter, JSON-LD). Does not change visible copy in site-content.json.
 * Homepage `<title>` stays brand-facing via `buildRootMetadata` (`titleDefault`); query phrases belong here and in `metaDescription` blocks.
 */
export function getSeoRootDescription(): string {
  return [
    "EASA Part-145 aircraft MRO Germany, aircraft modification, avionics retrofit, and special mission conversion — KUM Services GmbH integrates civil platforms with certified maintenance partners.",
    "HPAA (High Performance Autonomous Aircraft) conversion for ISR, cargo, and special missions. Robot aircraft Germany, autonomous aircraft Germany, unmanned aircraft conversion.",
    "Cessna Citation, King Air 350, Pilatus PC-12, C-130J platforms. Fast fielding, worldwide support.",
  ]
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

export const siteKeywords: string[] = [
  "EASA Part-145",
  "EASA Part 145 maintenance organisation Germany",
  "aircraft MRO Germany",
  "aircraft maintenance repair overhaul Germany",
  "aircraft avionics retrofit",
  "avionics integration aircraft",
  "aircraft modification Germany",
  "aircraft STC modification Germany",
  "special mission aircraft conversion",
  "surveillance aircraft conversion",
  "ISR sensor integration aircraft",
  "EO/IR sensor installation aircraft",
  "mission systems integration Germany",
  "aircraft modification company Baden-Württemberg",
  "EASA Part 145 MRO Lake Constance",
  "HPAA",
  "hpaa",
  "HPAA germany",
  "robotic aircraft germany",
  "robotic aircraft",
  "unmanned aircraft germany",
  "unmanned aircraft conversion germany",
  "drone aircraft conversion germany",
  "drone aircraft germany",
  "autonomous platform aircraft germany",
  "autonomous aircraft platform germany",
  "civil aircraft to autonomous platform Germany",
  "civil aircraft to autonomous platform",
  "civil aircraft conversion Germany",
  "robot aircraft Germany",
  "aircraft robot Germany",
  "robot aircraft",
  "aircraft robot",
  "autonomous aircraft robot",
  "HPAA Germany",
  "high performance autonomous aircraft",
  "high performance autonomous aircraft conversion",
  "autonomous aircraft",
  "autonomous aircraft conversion",
  "autonomous aircraft platform",
  "civil aircraft conversion",
  "civil registered aircraft",
  "aircraft retrofit",
  "aircraft modification",
  "aircraft mission conversion",
  "manned to unmanned conversion",
  "optionally piloted aircraft",
  "OPA",
  "remotely piloted aircraft",
  "RPA",
  "unmanned aerial vehicle",
  "UAV conversion",
  "large UAV",
  "Group 5 UAS",
  "tactical UAV",
  "MALE UAV",
  "medium altitude long endurance",
  "payload delivery aircraft",
  "aerial payload delivery",
  "cargo drop mission",
  "aerial resupply unmanned",
  "mission systems integration",
  "ISR aircraft",
  "intelligence surveillance reconnaissance",
  "surveillance aircraft",
  "airborne surveillance",
  "special mission aircraft",
  "special mission conversion",
  "special operations aircraft",
  "EO/IR sensor integration",
  "electro-optical infrared",
  "SAR integration",
  "synthetic aperture radar aircraft",
  "signals intelligence aircraft",
  "SIGINT platform",
  "maritime patrol aircraft",
  "border surveillance aircraft",
  "cargo aircraft conversion",
  "aerial delivery system",
  "range extension aircraft",
  "counter-UAS aircraft",
  "counter-drone aircraft",
  "C-UAS platform",
  "Cessna",
  "Cessna Citation",
  "Cessna Citation 525",
  "Cessna Citation CJ1",
  "Cessna Caravan",
  "Cessna 208",
  "Cessna 208B Grand Caravan",
  "King Air",
  "King Air 350",
  "King Air 350 maintenance",
  "Beechcraft King Air",
  "Beechcraft",
  "Pilatus",
  "Pilatus PC-12",
  "PC-12 special mission",
  "PC-12 ISR",
  "C-130",
  "C-130J",
  "C-130J Super Hercules",
  "Lockheed Martin C-130",
  "turboprop aircraft conversion",
  "turbofan aircraft conversion",
  "business jet conversion",
  "light jet conversion",
  "twin turboprop conversion",
  "autonomous flight",
  "autonomous flight control",
  "flight control system",
  "autopilot integration",
  "avionics integration",
  "ground control station",
  "GCS",
  "datalink integration",
  "satcom integration",
  "beyond visual line of sight",
  "BVLOS operations",
  "fly-by-wire retrofit",
  "EASA",
  "EASA certified aircraft maintenance",
  "MRO partner",
  "maintenance repair overhaul",
  "EASA approved modification",
  "STC supplemental type certificate",
  "airworthiness",
  "civil registration aircraft",
  "KUM Services GmbH",
  "KUM Services",
  "Baden-Württemberg",
  "Bodensee",
  "Lake Constance",
  "aviation company Germany",
  "aircraft conversion Germany",
  "aerospace Germany",
  "Germany",
  "University of Stuttgart aviation",
  "German autonomous systems",
  "affordable ISR platform",
  "system integrator aircraft",
  "rapid deployment aircraft",
  "autonomous aircraft supplier",
  "HPAA supplier",
  "HPAA manufacturer",
  "aircraft conversion contractor",
  "unmanned systems supplier Europe",
  "end to end aircraft conversion",
  "full system integration aircraft",
  "multi-role autonomous aircraft",
  "autonomous aircraft quote",
  "fast aircraft conversion",
  "on-site aircraft conversion",
  "short conversion time",
  "worldwide aircraft support",
  "worldwide spare parts",
  "proven airframe conversion",
  "rapid fielding aircraft",
  "how to convert civil aircraft to UAV",
  "civil aircraft to autonomous platform",
  "turboprop ISR platform",
  "HPAA platform provider",
  "autonomous aircraft integrator",
  "aircraft conversion company Europe",
  "aircraft modification company Germany",
  "unmanned systems integrator Europe",
  "convert business jet to drone",
  "autonomous aircraft for defence",
  "autonomous aircraft for defense",
];


const defaultOgImage = absoluteUrl("/theme/hpaa9.jpeg");

/** Default + template for the whole site (segment pages override title/description). */
export function buildRootMetadata(): Metadata {
  const base = getSiteUrl();
  const metadataBase = new URL(base.endsWith("/") ? base : `${base}/`);

  /**
   * Keep the UI brand-first, but make the browser title keyword-forward.
   * (Does not change visible page headings.)
   */
  const titleDefault = `Aircraft MRO & HPAA Conversion Germany | EASA Part-145 | ${siteData.brand.name}`;
  const defaultDescription = getSeoRootDescription();
  const overview = getSeoMetaById("hpaa-overview");
  const rootDescription = overview?.metaDescription ?? defaultDescription;
  const rootKeywords = Array.from(new Set([...siteKeywords, ...collectAllSeoMetaKeywords()]));

  return {
    metadataBase,
    title: {
      default: titleDefault,
      template: `%s · ${appName}`,
    },
    description: rootDescription,
    keywords: rootKeywords,
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
      languages: {
        en: absoluteUrl("/"),
        "en-x-default": absoluteUrl("/"),
      },
      types: {
        "text/plain": absoluteUrl("/llms.txt"),
      },
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
      description: rootDescription,
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
      description: rootDescription,
      images: [defaultOgImage],
    },
    category: "technology",
    other: {
      google: "notranslate",
      // Geo meta intentionally omitted (avoid over-specific locality in global B2B positioning)
    },
  };
}

/** Pre-built metadata for segment routes (unique URLs for crawlers and sharing). */
export const segmentMetadata = {
  aircraft: buildPageMetadataFromSeoBlockId("hpaa-platform-guide", "/aircraft", {
    extraKeywordBlockIds: ["aircraft-avionics-retrofit", "easa-part-145-mro"],
  }),
  applications: buildPageMetadataFromSeoBlockId("isr-surveillance-aircraft", "/applications", {
    extraKeywordBlockIds: ["payload-delivery-aircraft", "counter-uas-aircraft"],
  }),
  whyUs: buildPageMetadataFromSeoBlockId("hpaa-vs-purpose-built", "/why-us"),
  partners: buildPageMetadataFromSeoBlockId("easa-part-145-mro", "/partners"),
  contact: buildPageMetadataFromSeoBlockId("mro-contact-enquiry", "/contact"),
  unmannedAircraftGermany: buildPageMetadataFromSeoBlockId("unmanned-aircraft-germany", "/unmanned-aircraft-germany"),
  droneAircraftConversionGermany: buildPageMetadataFromSeoBlockId("drone-aircraft-conversion-germany", "/drone-aircraft-conversion-germany"),
  highPerformanceCombatDronesGermany: buildPageMetadataFromSeoBlockId("high-performance-combat-drones-germany", "/high-performance-combat-drones-germany"),
  autonomousPlatformAircraftGermany: buildPageMetadataFromSeoBlockId("autonomous-platform-aircraft-germany", "/autonomous-platform-aircraft-germany"),
  easaPart145MroGermany: buildPageMetadataFromSeoBlockId("easa-part-145-mro", "/easa-part-145-mro-germany"),
  aircraftAvionicsRetrofitGermany: buildPageMetadataFromSeoBlockId("aircraft-avionics-retrofit", "/aircraft-avionics-retrofit-germany"),
  specialMissionAircraftConversion: buildPageMetadataFromSeoBlockId("special-mission-conversion", "/special-mission-aircraft-conversion"),
} as const;
