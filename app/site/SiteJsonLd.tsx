import { siteData } from "@/data/siteData";
import { absoluteUrl } from "@/lib/absoluteUrl";
import { env } from "@/app/env";
import { getSeoRootDescription } from "@/lib/siteMetadata";
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
          addressRegion: "Baden-Württemberg",
          addressCountry: "DE",
        },
        areaServed: [
          { "@type": "City", name: "Konstanz" },
          { "@type": "AdministrativeArea", name: "Baden-Württemberg" },
          { "@type": "Country", name: "Germany" },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${base}/#website`,
        url: `${base}/`,
        name: appName,
        description: getSeoRootDescription(),
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
