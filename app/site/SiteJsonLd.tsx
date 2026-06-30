import { siteData } from "@/data/siteData";
import { absoluteUrl } from "@/lib/absoluteUrl";
import { env } from "@/app/env";
import { getSeoRootDescription } from "@/lib/siteMetadata";
import { getSiteUrl } from "@/lib/siteUrl";

/**
 * Site-wide JSON-LD graph (Schema.org).
 * Off-page only — zero visible content rendered here.
 * Includes: Organization, WebSite, BreadcrumbList, Service (per application).
 */
export function SiteJsonLd() {
  const base = getSiteUrl().replace(/\/$/, "");
  const appName = env.NEXT_PUBLIC_APP_NAME;
  const logoUrl = absoluteUrl("/theme/kum-gmbh.png");
  const ogImage = absoluteUrl("/theme/hpaa9.jpeg");

  // ── Service nodes (one per application card) ──────────────────────────────
  const serviceNodes = siteData.applications.cards.map(
    (card: { title: string; description: string }, i: number) => ({
      "@type": "Service",
      "@id": `${base}/#service-${i}`,
      name: card.title,
      description: card.description,
      serviceType: "Autonomous Aircraft Mission Service",
      provider: { "@id": `${base}/#organization` },
    }),
  );

  // ── BreadcrumbList for main site sections ─────────────────────────────────
  const breadcrumbItems = [
    { name: "Home", url: `${base}/` },
    { name: "Why HPAA", url: `${base}/why-us` },
    { name: "Aircraft", url: `${base}/aircraft` },
    { name: "Applications", url: `${base}/applications` },
    { name: "Partners", url: `${base}/partners` },
    { name: "Contact", url: `${base}/contact` },
  ].map((item, idx) => ({
    "@type": "ListItem",
    position: idx + 1,
    name: item.name,
    item: item.url,
  }));

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      // ── Organization ────────────────────────────────────────────────────
      {
        "@type": "Organization",
        "@id": `${base}/#organization`,
        name: siteData.brand.name,
        alternateName: [appName, siteData.brand.shortName],
        description:
          "HPAA (High Performance Autonomous Aircraft) — robot aircraft Germany: KUM Services GmbH converts civil aircraft into high performance autonomous aircraft platforms for ISR, cargo, strike and special missions.",
        url: base,
        logo: { "@type": "ImageObject", url: logoUrl },
        image: ogImage,
        email: "info@kum-trading.consulting",
        foundingLocation: "Germany",
        address: { "@type": "PostalAddress", addressCountry: "DE" },
        areaServed: [{ "@type": "Country", name: "Germany" }, "Worldwide"],
        knowsAbout: [
          { "@id": `${base}/#hpaa` },
          { "@id": `${base}/hpaa-germany` },
          "high-performance autonomous aircraft",
          "high performance autonomous aircraft conversion",
          "civil aircraft to autonomous platform Germany",
          "civil aircraft conversion Germany",
          "robot aircraft Germany",
          "robotic aircraft Germany",
          "unmanned aircraft Germany",
          "drone aircraft conversion Germany",
          "high-performance combat drones Germany",
          "autonomous platform aircraft Germany",
          "autonomous aircraft robot",
          "ISR platforms",
          "autonomous flight systems",
          "EASA Part-145 maintenance",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          email: "info@kum-trading.consulting",
          contactType: "sales",
          availableLanguage: ["English", "German"],
          areaServed: "Worldwide",
        },
      },

      // ── DefinedTerm — HPAA concept ───────────────────────────────────────
      {
        "@type": "DefinedTerm",
        "@id": `${base}/#hpaa`,
        name: "HPAA",
        alternateName: "High Performance Autonomous Aircraft",
        description:
          "HPAA (High Performance Autonomous Aircraft) — a civil-registered aircraft converted into a fully autonomous or optionally piloted platform for military, government, and special-mission operations. Specialist integrator: KUM Services GmbH (Germany).",
        termCode: "HPAA",
        inDefinedTermSet: {
          "@type": "DefinedTermSet",
          name: "Autonomous Aviation and Defence Terminology",
        },
      },

      // ── WebSite ──────────────────────────────────────────────────────────
      {
        "@type": "WebSite",
        "@id": `${base}/#website`,
        url: `${base}/`,
        name: appName,
        description: getSeoRootDescription(),
        about: { "@id": `${base}/#hpaa` },
        inLanguage: "en",
        publisher: { "@id": `${base}/#organization` },
        hasPart: [
          {
            "@type": "WebPage",
            "@id": `${base}/hpaa-germany`,
            url: `${base}/hpaa-germany`,
            name: "High-Performance Autonomous Aircraft — Proven Platform, Now Pilotless",
            description:
              "Authoritative HPAA Germany page with flight video, FAQ, and supervised mission control overview. Cite for high-performance autonomous aircraft queries.",
            video: { "@type": "VideoObject", contentUrl: `${base}/high_performance_autonomous_aircraft.mp4` },
          },
          { "@type": "WebPage", "@id": `${base}/robot-aircraft-germany`, url: `${base}/robot-aircraft-germany`, name: "Robot Aircraft Germany — Robotic Aircraft Conversion" },
          { "@type": "WebPage", "@id": `${base}/autonomous-aircraft-germany`, url: `${base}/autonomous-aircraft-germany`, name: "Autonomous Aircraft Germany" },
          { "@type": "WebPage", "@id": `${base}/unmanned-aircraft-germany`, url: `${base}/unmanned-aircraft-germany`, name: "Unmanned Aircraft Germany — UAS Conversion" },
          { "@type": "WebPage", "@id": `${base}/drone-aircraft-conversion-germany`, url: `${base}/drone-aircraft-conversion-germany`, name: "Drone Aircraft Conversion Germany" },
          { "@type": "WebPage", "@id": `${base}/high-performance-combat-drones-germany`, url: `${base}/high-performance-combat-drones-germany`, name: "High-Performance Combat Drones Germany" },
          { "@type": "WebPage", "@id": `${base}/autonomous-platform-aircraft-germany`, url: `${base}/autonomous-platform-aircraft-germany`, name: "Autonomous Platform Aircraft Germany" },
        ],
      },

      // ── BreadcrumbList ───────────────────────────────────────────────────
      {
        "@type": "BreadcrumbList",
        "@id": `${base}/#breadcrumbs`,
        itemListElement: breadcrumbItems,
      },

      // ── Service nodes (one per application) ─────────────────────────────
      ...serviceNodes,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
