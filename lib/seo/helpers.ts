import { seoMetaBlocks } from "./seoBlocks";
import type { SeoMetaBlock } from "./seoTypes";

export function getSeoMetaById(id: string): SeoMetaBlock | undefined {
  return seoMetaBlocks.find((b) => b.id === id);
}

/** All block keywords in stable order, deduplicated (for root `<meta name="keywords">`). */
export function collectAllSeoMetaKeywords(): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const b of seoMetaBlocks) {
    for (const k of b.targetKeywords) {
      const t = k.trim();
      if (t && !seen.has(t)) {
        seen.add(t);
        out.push(t);
      }
    }
  }
  return out;
}
