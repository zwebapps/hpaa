import type { MetadataRoute } from "next";
import { aircrafts } from "@/app/aircraft/aircraftData";
import { getSiteUrl } from "@/lib/siteUrl";

const STATIC_PATHS: { path: string; changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"]; priority: number }[] =
  [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/aircraft", changeFrequency: "weekly", priority: 0.9 },
    { path: "/applications", changeFrequency: "monthly", priority: 0.85 },
    { path: "/why-us", changeFrequency: "monthly", priority: 0.85 },
    { path: "/partners", changeFrequency: "monthly", priority: 0.8 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.85 },
  ];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map(
    ({ path, changeFrequency, priority }) => ({
      url: `${base}${path === "/" ? "" : path}`,
      lastModified,
      changeFrequency,
      priority,
    }),
  );

  const aircraftEntries: MetadataRoute.Sitemap = aircrafts.map((a) => ({
    url: `${base}/aircraft/${encodeURIComponent(a.slug)}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [...staticEntries, ...aircraftEntries];
}
