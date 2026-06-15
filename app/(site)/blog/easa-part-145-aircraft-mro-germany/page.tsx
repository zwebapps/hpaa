import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl } from "@/lib/absoluteUrl";
import { getSiteUrl } from "@/lib/siteUrl";

const CANONICAL = "/blog/easa-part-145-aircraft-mro-germany";

export const metadata: Metadata = {
  title: "EASA Part-145 and Aircraft MRO in Germany — What Operators Should Know",
  description:
    "An overview of EASA Part-145 maintenance organisations, aircraft MRO in Germany, and how certified maintenance supports modification, avionics retrofit, and special mission conversion programmes.",
  alternates: {
    canonical: absoluteUrl(CANONICAL),
    languages: { en: absoluteUrl(CANONICAL), "en-x-default": absoluteUrl(CANONICAL) },
  },
};

export default function EasaPart145BlogPage() {
  const base = getSiteUrl().replace(/\/$/, "");

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${base}${CANONICAL}#article`,
        headline: "EASA Part-145 and Aircraft MRO in Germany — What Operators Should Know",
        description:
          "An overview of EASA Part-145 maintenance organisations, aircraft MRO in Germany, and how certified maintenance supports modification and special mission programmes.",
        mainEntityOfPage: `${base}${CANONICAL}`,
        author: { "@id": `${base}/#organization` },
        publisher: { "@id": `${base}/#organization` },
        inLanguage: "en",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${base}/blog` },
          {
            "@type": "ListItem",
            position: 3,
            name: "EASA Part-145 MRO Germany",
            item: `${base}${CANONICAL}`,
          },
        ],
      },
    ],
  };

  return (
    <main className="section">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <p className="section-eyebrow">
        <Link href="/blog" style={{ color: "inherit", textDecoration: "none" }}>
          Blog
        </Link>{" "}
        / MRO
      </p>

      <h1 className="section-heading" style={{ maxWidth: 980 }}>
        EASA Part-145 and Aircraft MRO in Germany
        <br />
        <em>What Operators Should Know</em>
      </h1>

      <p className="section-lead" style={{ maxWidth: 980 }}>
        For charter operators, lessors, government agencies, and special mission customers, choosing
        the right maintenance and modification partner is as important as selecting the airframe.
        EASA Part-145 certification provides the regulated framework for maintenance, repair, and
        overhaul on civil aircraft registered and operated in Europe.
      </p>

      <div className="why-grid" style={{ marginTop: "2rem" }}>
        <section className="why-card reveal">
          <h2 style={{ marginTop: 0 }}>What is EASA Part-145?</h2>
          <p>
            EASA Part-145 governs maintenance organisations that perform maintenance on aircraft and
            components. A Part-145 approval means the organisation operates under audited procedures,
            trained personnel requirements, and documented quality systems recognised across EASA member
            states.
          </p>
        </section>
        <section className="why-card reveal">
          <h2 style={{ marginTop: 0 }}>Why MRO matters for modification programmes</h2>
          <p>
            Aircraft modification, avionics retrofit, and special mission conversion require controlled
            installation, inspection, and release to service. Working with a Part-145 organisation
            reduces technical and compliance risk compared with uncertified workshop approaches.
          </p>
        </section>
        <section className="why-card reveal">
          <h2 style={{ marginTop: 0 }}>KUM Services approach</h2>
          <p>
            KUM Services GmbH leads integration programmes with Part One-Forty Five GmbH, an EASA
            Part-145 certified maintenance organisation at Neuhausen ob Eck Airfield, Germany. This
            provides the certified foundation for platform modification, sensor integration, and HPAA
            conversion delivery.
          </p>
        </section>
      </div>

      <section style={{ marginTop: "2.5rem" }}>
        <h2 className="section-heading" style={{ fontSize: "2rem" }}>
          Platform and service pages
        </h2>
        <p className="section-lead" style={{ maxWidth: 980 }}>
          Learn more about certified MRO and integration services:{" "}
          <Link href="/easa-part-145-mro-germany">EASA Part-145 MRO Germany</Link>,{" "}
          <Link href="/aircraft-avionics-retrofit-germany">Avionics Retrofit Germany</Link>, and{" "}
          <Link href="/special-mission-aircraft-conversion">Special Mission Aircraft Conversion</Link>.
          See also <Link href="/partners">Partners</Link> and{" "}
          <Link href="/aircraft">Aircraft Platforms</Link>.
        </p>
      </section>
    </main>
  );
}
