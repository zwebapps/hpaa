import { siteData } from "@/data/siteData";
import { absoluteUrl } from "@/lib/absoluteUrl";
import { env } from "@/app/env";
import { getSiteUrl } from "@/lib/siteUrl";

/**
 * Organization + WebSite JSON-LD (Schema.org) for rich results and entity signals.
 */
export function SiteJsonLd() {
  const base = getSiteUrl().replace(/\/$/, "");
  const appName = env.NEXT_PUBLIC_APP_NAME;
  const logoUrl = absoluteUrl("/theme/kum-gmbh.png");

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${base}/#organization`,
        name: siteData.brand.name,
        alternateName: [appName, siteData.brand.shortName],
        url: base,
        logo: { "@type": "ImageObject", url: logoUrl },
        email: "info@kum-trading.consulting",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Konstanz",
          addressCountry: "DE",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${base}/#website`,
        url: `${base}/`,
        name: appName,
        description: siteData.heroCarousel.slides[0]?.description,
        inLanguage: "en",
        publisher: { "@id": `${base}/#organization` },
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
