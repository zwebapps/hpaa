import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/absoluteUrl";
import { getSeoMetaById } from "./helpers";

export type SeoPageMetaOptions = {
  /** Merge keywords from additional blocks (same route, broader coverage). */
  extraKeywordBlockIds?: string[];
};

/**
 * Apply a meta block to a real site path (title, description, keywords, canonical, OG/Twitter).
 */
export function buildPageMetadataFromSeoBlockId(
  blockId: string,
  canonicalPath: string,
  options?: SeoPageMetaOptions,
): Metadata {
  const block = getSeoMetaById(blockId);
  if (!block) {
    return {};
  }

  const extra =
    options?.extraKeywordBlockIds?.flatMap((id) => getSeoMetaById(id)?.targetKeywords ?? []) ?? [];
  const keywords = Array.from(new Set([...block.targetKeywords, ...extra]));
  const url = absoluteUrl(canonicalPath);
  const ogImage = absoluteUrl("/theme/hpaa9.jpeg");

  return {
    title: { absolute: block.metaTitle },
    description: block.metaDescription,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      title: block.metaTitle,
      description: block.metaDescription,
      url,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: block.metaTitle,
      description: block.metaDescription,
      images: [ogImage],
    },
  };
}
