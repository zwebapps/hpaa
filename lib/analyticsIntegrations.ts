export type AnalyticsIntegrations = {
  plausible: { enabled: boolean; domain?: string; embedUrl?: string };
  ga4: { enabled: boolean; measurementId?: string; dashboardUrl?: string };
  umami: { enabled: boolean; embedUrl?: string };
};

function optionalEnv(name: string): string | undefined {
  const v = process.env[name]?.trim();
  return v && v.length > 0 ? v : undefined;
}

/** Public tracking IDs (safe to expose to the browser). */
export function getPublicAnalyticsIds() {
  return {
    plausibleDomain: optionalEnv("NEXT_PUBLIC_PLAUSIBLE_DOMAIN"),
    gaMeasurementId: optionalEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID"),
    umamiWebsiteId: optionalEnv("NEXT_PUBLIC_UMAMI_WEBSITE_ID"),
    umamiScriptSrc:
      optionalEnv("NEXT_PUBLIC_UMAMI_SCRIPT_URL") ?? "https://cloud.umami.is/script.js",
  };
}

/** Admin dashboard embeds and external report links (server-only). */
export function getAnalyticsIntegrations(): AnalyticsIntegrations {
  const publicIds = getPublicAnalyticsIds();
  return {
    plausible: {
      enabled: Boolean(publicIds.plausibleDomain),
      domain: publicIds.plausibleDomain,
      embedUrl: optionalEnv("ADMIN_PLAUSIBLE_EMBED_URL"),
    },
    ga4: {
      enabled: Boolean(publicIds.gaMeasurementId),
      measurementId: publicIds.gaMeasurementId,
      dashboardUrl:
        optionalEnv("ADMIN_GA_DASHBOARD_URL") ??
        (publicIds.gaMeasurementId
          ? "https://analytics.google.com/analytics/web/"
          : undefined),
    },
    umami: {
      enabled: Boolean(publicIds.umamiWebsiteId),
      embedUrl: optionalEnv("ADMIN_UMAMI_EMBED_URL"),
    },
  };
}
