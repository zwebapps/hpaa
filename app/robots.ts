import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/siteUrl";

const DISALLOW = ["/admin"];

/** Explicit allow rules so AI search crawlers are not blocked by CDN/WAF defaults. */
const AI_USER_AGENTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "anthropic-ai",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
  "cohere-ai",
  "Bytespider",
  "CCBot",
] as const;

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();
  const host = base.replace(/^https?:\/\//, "");

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: DISALLOW },
      ...AI_USER_AGENTS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: DISALLOW,
      })),
    ],
    sitemap: `${base}/sitemap.xml`,
    host,
  };
}
