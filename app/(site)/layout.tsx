import { bebas, cormorant, dmSans, outfit, playfair, spaceMono } from "@/app/fonts";
import { buildRootMetadata } from "@/lib/siteMetadata";
import { SiteFooter } from "../site/SiteFooter";
import { SiteJsonLd } from "../site/SiteJsonLd";
import { SiteNav } from "../site/SiteNav";
import { ThemeProvider } from "@/app/theme/ThemeProvider";
import { AnalyticsScripts } from "../site/AnalyticsScripts";
import { ConsentedAnalytics } from "../site/ConsentedAnalytics";
import { CookieConsent } from "../site/CookieConsent";
import { SiteClientEffectsLoader } from "./SiteClientEffectsLoader";

export const metadata = buildRootMetadata();

const fontClass = [
  outfit.variable,
  cormorant.variable,
  playfair.variable,
  bebas.variable,
  dmSans.variable,
  spaceMono.variable,
].join(" ");

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={fontClass}>
      <AnalyticsScripts />
      <ConsentedAnalytics />
      <SiteJsonLd />
      {/* Without JavaScript the scroll-reveal never runs: show everything as-is. */}
      {/* Raw HTML so React never manages this <style>: a React-rendered <style> is a
          "hoistable" resource, and inside <noscript> it has no DOM node on the client,
          which crashed React with "Cannot read properties of null (reading 'removeChild')". */}
      <noscript
        dangerouslySetInnerHTML={{
          __html:
            "<style>.reveal, .reveal *, .reveal .aircraft-img-side, .reveal .partner-card-img, .reveal .ac-media-figure { opacity: 1 !important; transform: none !important; clip-path: none !important; filter: none !important; }</style>",
        }}
      />
      <ThemeProvider>
        <SiteClientEffectsLoader />
        <SiteNav />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </ThemeProvider>
      <CookieConsent />
    </div>
  );
}
