import { siteData } from "@/data/siteData";
import { absoluteUrl } from "@/lib/absoluteUrl";
import { env } from "@/app/env";
import { getSeoRootDescription } from "@/lib/siteMetadata";
import { getSiteUrl } from "@/lib/siteUrl";

/**
 * Site-wide JSON-LD graph (Schema.org).
 * Off-page only — zero visible content rendered here.
 * Includes: Organization, WebSite, BreadcrumbList, Service (per application), FAQPage.
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

  // ── FAQ nodes (from whyUs cards, framed as Q&A) ───────────────────────────
  const faqItems = siteData.whyUs.cards.map(
    (card: { title: string; description: string }) => ({
      "@type": "Question",
      name: `Why choose HPAA: ${card.title}?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: card.description,
      },
    }),
  );

  // ── BreadcrumbList for main site sections ─────────────────────────────────
  const breadcrumbItems = [
    { name: "Home", url: `${base}/` },
    { name: "Why HPAA", url: `${base}/#why-us` },
    { name: "Aircraft", url: `${base}/#aircraft` },
    { name: "Applications", url: `${base}/#applications` },
    { name: "Partners", url: `${base}/#partners` },
    { name: "Contact", url: `${base}/#contact` },
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
          "HPAA (High Performance Autonomous Aircraft) — robot aircraft Germany: KUM Services GmbH, Konstanz converts civil aircraft into high performance autonomous aircraft platforms for ISR, cargo, strike and special missions.",
        url: base,
        logo: { "@type": "ImageObject", url: logoUrl },
        image: ogImage,
        email: "info@kum-trading.consulting",
        foundingLocation: "Konstanz, Germany",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Konstanz",
          addressRegion: "Baden-Württemberg",
          addressCountry: "DE",
        },
        areaServed: [
          { "@type": "City", name: "Konstanz" },
          { "@type": "AdministrativeArea", name: "Baden-Württemberg" },
          { "@type": "Country", name: "Germany" },
        ],
        knowsAbout: [
          { "@id": `${base}/#hpaa` },
          "HPAA",
          "High Performance Autonomous Aircraft",
          "high performance autonomous aircraft conversion",
          "civil aircraft to autonomous platform Germany",
          "civil aircraft conversion Germany",
          "robot aircraft Germany",
          "autonomous aircraft robot",
          "aircraft robot Konstanz",
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
          "HPAA (High Performance Autonomous Aircraft) — a civil-registered aircraft converted into a fully autonomous or optionally piloted platform for military, government, and special-mission operations. Specialist integrator: KUM Services GmbH, Konstanz, Germany.",
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
      },

      // ── BreadcrumbList ───────────────────────────────────────────────────
      {
        "@type": "BreadcrumbList",
        "@id": `${base}/#breadcrumbs`,
        itemListElement: breadcrumbItems,
      },

      // ── Service nodes (one per application) ─────────────────────────────
      ...serviceNodes,

      // ── FAQPage ──────────────────────────────────────────────────────────
      {
        "@type": "FAQPage",
        "@id": `${base}/#faq`,
        name: "Why Choose HPAA — Frequently Asked Questions",
        description:
          "Common questions about high performance autonomous aircraft (HPAA) conversion by KUM Services GmbH, Konstanz.",
        mainEntity: faqItems,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
