/**
 * Site copy is loaded from this JSON file at build/runtime.
 * MongoDB + `/api/site-content` mirror the same shape for admin/API; switch imports here when you want DB-backed content.
 */
import siteContent from "./site-content.json";

export type SiteContent = typeof siteContent;

export const siteData: SiteContent = siteContent;
