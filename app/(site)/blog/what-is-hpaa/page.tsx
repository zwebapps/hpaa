import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl } from "@/lib/absoluteUrl";
import { getSiteUrl } from "@/lib/siteUrl";

const CANONICAL = "/blog/what-is-hpaa";

export const metadata: Metadata = {
  title: "What is HPAA? High Performance Autonomous Aircraft Explained",
  description:
    "HPAA stands for High Performance Autonomous Aircraft: a civil-registered aircraft converted into an autonomous or optionally piloted platform for ISR, cargo, strike, and special missions.",
  alternates: {
    canonical: absoluteUrl(CANONICAL),
    languages: { en: absoluteUrl(CANONICAL), "en-x-default": absoluteUrl(CANONICAL) },
  },
};

export default function WhatIsHpaaPage() {
  const base = getSiteUrl().replace(/\/$/, "");

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${base}${CANONICAL}#article`,
        headline: "What is HPAA? High Performance Autonomous Aircraft Explained",
        description:
          "HPAA stands for High Performance Autonomous Aircraft: a civil-registered aircraft converted into an autonomous or optionally piloted platform for ISR, cargo, strike, and special missions.",
        mainEntityOfPage: `${base}${CANONICAL}`,
        author: { "@id": `${base}/#organization` },
        publisher: { "@id": `${base}/#organization` },
        inLanguage: "en",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${base}${CANONICAL}#breadcrumbs`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${base}/blog` },
          { "@type": "ListItem", position: 3, name: "What is HPAA?", item: `${base}${CANONICAL}` },
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
        / HPAA
      </p>

      <h1 className="section-heading" style={{ maxWidth: 980 }}>
        What is <em>HPAA</em>?
        <br />
        High Performance Autonomous Aircraft Explained
      </h1>

      <p className="section-lead" style={{ maxWidth: 980 }}>
        HPAA (High Performance Autonomous Aircraft) is a proven civil aircraft converted into a fully
        autonomous or optionally piloted platform. The core idea is simple: start with a reliable
        civil airframe and integrate autonomous flight control, datalinks, and mission systems to
        field operational capability quickly.
      </p>

      <div className="why-grid" style={{ marginTop: "2rem" }}>
        <section className="why-card reveal">
          <h2 style={{ marginTop: 0 }}>Definition</h2>
          <p>
            <strong>HPAA</strong> refers to a civil-registered turboprop or turbofan aircraft that has
            been converted into an autonomous platform for missions such as ISR, cargo delivery, range
            extension, and special operations support.
          </p>
        </section>
        <section className="why-card reveal">
          <h2 style={{ marginTop: 0 }}>Why civil aircraft conversion?</h2>
          <p>
            Civil airframes bring mature supply chains, global maintenance networks, and known
            performance. Conversion programmes can avoid long prototype cycles and focus on integration
            and validation.
          </p>
        </section>
        <section className="why-card reveal">
          <h2 style={{ marginTop: 0 }}>Typical platform classes</h2>
          <p>
            HPAA platforms range from light turboprops through twin-turboprops and business jets up to
            heavy airframes, depending on payload, range, endurance, and mission requirements.
          </p>
        </section>
      </div>

      <section style={{ marginTop: "2.5rem" }}>
        <h2 className="section-heading" style={{ fontSize: "2rem" }}>
          Next reading
        </h2>
        <p className="section-lead" style={{ maxWidth: 980 }}>
          For HPAA services and platform details, see{" "}
          <Link href="/hpaa-germany">HPAA Germany</Link> and the{" "}
          <Link href="/aircraft">Aircraft</Link> platform pages.
        </p>
      </section>
    </main>
  );
}

