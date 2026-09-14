import { absoluteUrl } from "@/lib/absoluteUrl";
import { getSiteUrl } from "@/lib/siteUrl";

/** Web-optimised encode of the SkyHarvest × KUM clip (1080p, faststart). */
export const SKYHARVEST_VIDEO_PATH = "/videos/skyharvest-kum-hpaa.mp4";
export const SKYHARVEST_VIDEO_POSTER = "/videos/skyharvest-kum-hpaa-poster.jpg";
const SKYHARVEST_VIDEO_TITLE = "Robot Aircraft — Maritime and Border Monitoring";
const SKYHARVEST_VIDEO_DESCRIPTION =
  "A KUM Services GmbH high-performance autonomous aircraft on a maritime and border monitoring mission: a converted twin-engine civil airframe flying pilotless over open water under supervised mission control, in collaboration with SkyHarvest.";

/**
 * Video card for the "Why Customized HPAA?" banner.
 *
 * Performance: nothing is fetched until the visitor presses play
 * (preload="none"); only the ~95 KB poster loads with the page. Native
 * controls give keyboard access and full-screen for free — no client JS.
 */
export function SkyHarvestVideo() {
  const base = getSiteUrl().replace(/\/$/, "");

  const videoJsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": `${base}/#skyharvest-video`,
    name: SKYHARVEST_VIDEO_TITLE,
    description: SKYHARVEST_VIDEO_DESCRIPTION,
    thumbnailUrl: absoluteUrl(SKYHARVEST_VIDEO_POSTER),
    contentUrl: absoluteUrl(SKYHARVEST_VIDEO_PATH),
    uploadDate: "2026-09-14T17:00:00+02:00",
    duration: "PT1M3S",
    inLanguage: "en",
    publisher: { "@id": `${base}/#organization` },
  };

  return (
    <figure className="header-video">
      <video
        className="header-video-player"
        controls
        preload="none"
        playsInline
        poster={SKYHARVEST_VIDEO_POSTER}
        title={SKYHARVEST_VIDEO_TITLE}
      >
        <source src={SKYHARVEST_VIDEO_PATH} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <figcaption className="header-video-caption">
        <span>Robot aircraft · Maritime &amp; border monitoring</span>
        <span>1:03</span>
      </figcaption>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }}
      />
    </figure>
  );
}
