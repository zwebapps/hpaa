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

  const description = aircraft.description.replace(/\s+/g, " ").trim().slice(0, 200);
  const url = absoluteUrl(path);
  const ogImage = aircraft.images[0] ? absoluteUrl(aircraft.images[0]) : absoluteUrl("/theme/hpaa9.jpeg");
  const pageTitle = `${aircraft.name} · ${appName}`;

  return {
    title: aircraft.name,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: pageTitle,
      description,
      siteName: appName,
      images: [{ url: ogImage, alt: aircraft.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [ogImage],
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
