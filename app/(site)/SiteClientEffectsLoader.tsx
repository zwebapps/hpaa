"use client";

import dynamic from "next/dynamic";

const SiteClientEffects = dynamic(
  () => import("./SiteClientEffects").then((m) => m.SiteClientEffects),
  { ssr: false },
);

export function SiteClientEffectsLoader() {
  return <SiteClientEffects />;
}
