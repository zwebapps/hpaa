import type { Metadata } from "next";
import { env } from "@/app/env";
import { absoluteUrl } from "@/lib/absoluteUrl";
import { AircraftDetailsClient } from "../AircraftDetailsClient";
import { getAircraftBySlug } from "../aircraftData";

type PageProps = {
  params: Promise<{ slug: string }>;
};

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

export default function AircraftDetailsPage() {
  return <AircraftDetailsClient />;
}

