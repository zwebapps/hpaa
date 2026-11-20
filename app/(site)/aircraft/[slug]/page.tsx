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
  const metaDescription =
    aircraft.seoDescription ??
    `${aircraft.name} HPAA conversion — KUM Services GmbH (Germany). ${rawDescription.slice(0, 130).trim()} Autonomous aircraft platform, EASA Part-145 certified.`.slice(0, 200);
  const url = absoluteUrl(path);
  const ogSrc = aircraft.ogImage ?? aircraft.images[0];
  const ogImage = ogSrc ? absoluteUrl(ogSrc) : absoluteUrl("/theme/hpaa9.jpeg");
  const ogAlt =
    aircraft.imageAlts?.[0] ?? `${aircraft.name} — HPAA autonomous platform, KUM Services GmbH Germany`;
  // A custom SEO title is already tuned to ~60 chars, so skip the site-wide " · App name" suffix.
  const title: Metadata["title"] = aircraft.seoTitle
    ? { absolute: aircraft.seoTitle }
    : `${aircraft.name} HPAA Conversion Germany | KUM Services GmbH`;
  const pageTitle =
    aircraft.seoTitle ?? `${aircraft.name} HPAA Conversion Germany | Autonomous Aircraft Platform | KUM Services GmbH`;
  const keywords = aircraft.keywords ?? [
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
  ];

  return {
    title,
    description: metaDescription,
    keywords,
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
      images: [{ url: ogImage, alt: ogAlt, ...(aircraft.ogImage ? { width: 1200, height: 630 } : {}) }],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: metaDescription,
      images: [ogImage],
    },
    other: {},
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
          // Aircraft are shown as conversion platforms, not sold — so this is a
          // Service (HPAA conversion of this airframe), not a Product. Product
          // markup without offers/review/aggregateRating is flagged by Google.
          {
            "@type": "Service",
            "@id": `${base}/aircraft/${slug}#service`,
            name: aircraft.subtitle
              ? `${aircraft.name} ${aircraft.subtitle}: sales and autonomous conversion`
              : `${aircraft.name} HPAA conversion`,
            description: (aircraft.summary ?? aircraft.description).replace(/\s+/g, " ").trim(),
            serviceType: aircraft.subtitle
              ? `${aircraft.subtitle} supply and optionally piloted / autonomous conversion`
              : "Civil aircraft to High Performance Autonomous Aircraft (HPAA) conversion",
            category: aircraft.category,
            url: `${base}/aircraft/${slug}`,
            image: aircraft.imageAlts?.length
              ? aircraft.images.map((src, i) => ({
                  "@type": "ImageObject",
                  contentUrl: absoluteUrl(src),
                  caption: aircraft.imageAlts?.[i] ?? aircraft.name,
                }))
              : aircraft.images[0]
                ? absoluteUrl(aircraft.images[0])
                : absoluteUrl("/theme/hpaa9.jpeg"),
            provider: { "@id": `${base}/#organization` },
            areaServed: [{ "@type": "Country", name: "Germany" }, "Worldwide"],
            about: {
              "@type": "Thing",
              name: aircraft.subtitle ? `${aircraft.name} ${aircraft.subtitle}` : aircraft.name,
              description: (aircraft.specGroups?.flatMap((g) => g.rows) ?? aircraft.specs)
                .map((s: { label: string; value: string }) => `${s.label}: ${s.value}`)
                .join("; "),
            },
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
              { "@type": "ListItem", position: 2, name: "Aircraft", item: `${base}/aircraft` },
              { "@type": "ListItem", position: 3, name: aircraft.name, item: `${base}/aircraft/${slug}` },
            ],
          },
          // FAQPage only when the questions are rendered visibly on the page.
          ...(aircraft.faq?.length
            ? [
                {
                  "@type": "FAQPage",
                  "@id": `${base}/aircraft/${slug}#faq`,
                  mainEntity: aircraft.faq.map((item) => ({
                    "@type": "Question",
                    name: item.question,
                    acceptedAnswer: { "@type": "Answer", text: item.answer },
                  })),
                },
              ]
            : []),
        ],
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      )}
      <AircraftDetailsClient slug={slug} />
    </>
  );
}
