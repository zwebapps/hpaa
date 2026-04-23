import type { Metadata } from "next";
import { env } from "@/app/env";
import { absoluteUrl } from "@/lib/absoluteUrl";
import { getSiteUrl } from "@/lib/siteUrl";
import { AircraftDetailsClient } from "../AircraftDetailsClient";
import { getAircraftBySlug, aircrafts } from "../aircraftData";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return aircrafts.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const aircraft = getAircraftBySlug(slug);
  const path = `/aircraft/${slug}`;
  const appName = env.NEXT_PUBLIC_APP_NAME;

  if (!aircraft) {
    return {
      title: "Aircraft not found",
      robots: { index: false, follow: false },
    };
  }

  const rawDescription = aircraft.description.replace(/\s+/g, " ").trim();
  const metaDescription = `${aircraft.name} HPAA conversion — KUM Services GmbH, Konstanz, Germany. ${rawDescription.slice(0, 130).trim()} Autonomous aircraft platform, EASA Part-145 certified.`.slice(0, 200);
  const url = absoluteUrl(path);
  const ogImage = aircraft.images[0] ? absoluteUrl(aircraft.images[0]) : absoluteUrl("/theme/hpaa9.jpeg");
  const pageTitle = `${aircraft.name} HPAA Conversion Germany | Autonomous Aircraft Platform | KUM Services GmbH`;

  return {
    title: `${aircraft.name} HPAA Conversion Germany | KUM Services GmbH`,
    description: metaDescription,
    keywords: [
      `${aircraft.name} HPAA conversion`,
      `${aircraft.name} autonomous aircraft`,
      `${aircraft.name} autonomous platform Germany`,
      `${aircraft.name} conversion Germany`,
      `${aircraft.name} robot aircraft`,
      `${aircraft.name} unmanned conversion`,
      "HPAA Germany",
      "civil aircraft to autonomous platform Germany",
      "aircraft conversion Germany",
      "KUM Services GmbH",
      "autonomous aircraft Germany",
    ],
    alternates: {
      canonical: url,
      languages: {
        en: url,
        "en-x-default": url,
      },
    },
    openGraph: {
      type: "website",
      url,
      title: pageTitle,
      description: metaDescription,
      siteName: appName,
      images: [{ url: ogImage, alt: `${aircraft.name} — HPAA autonomous platform, KUM Services GmbH Germany` }],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: metaDescription,
      images: [ogImage],
    },
    other: {
      "geo.region": "DE-BW",
      "geo.placename": "Konstanz, Baden-Württemberg, Germany",
    },
  };
}

export default async function AircraftDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const aircraft = getAircraftBySlug(slug);
  const base = getSiteUrl().replace(/\/$/, "");

  const jsonLd = aircraft
    ? {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Product",
            "@id": `${base}/aircraft/${slug}#product`,
            name: aircraft.name,
            description: aircraft.description.replace(/\s+/g, " ").trim(),
            category: aircraft.category,
            url: `${base}/aircraft/${slug}`,
            image: aircraft.images[0]
              ? absoluteUrl(aircraft.images[0])
              : absoluteUrl("/theme/hpaa9.jpeg"),
            brand: {
              "@type": "Organization",
              "@id": `${base}/#organization`,
            },
            additionalProperty: aircraft.specs.map((s: { label: string; value: string }) => ({
              "@type": "PropertyValue",
              name: s.label,
              value: s.value,
            })),
            // BreadcrumbList for this aircraft page
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
              { "@type": "ListItem", position: 2, name: "Aircraft", item: `${base}/#aircraft` },
              { "@type": "ListItem", position: 3, name: aircraft.name, item: `${base}/aircraft/${slug}` },
            ],
          },
        ],
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <AircraftDetailsClient slug={slug} />
    </>
  );
}
