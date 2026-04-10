export interface SeoMetaBlock {
  id: string;
  /** Internal label (not rendered on the site). */
  title: string;
  metaTitle: string;
  metaDescription: string;
  targetKeywords: string[];
}
