import { Bebas_Neue, Cormorant_Garamond, DM_Sans, Outfit, Playfair_Display, Space_Mono } from "next/font/google";
import Script from "next/script";
import { buildRootMetadata } from "@/lib/siteMetadata";
import { SiteFooter } from "../site/SiteFooter";
import { SiteJsonLd } from "../site/SiteJsonLd";
import { SiteNav } from "../site/SiteNav";
import { ThemeProvider } from "@/app/theme/ThemeProvider";
import { AnalyticsScripts } from "../site/AnalyticsScripts";
import { SiteClientEffectsLoader } from "./SiteClientEffectsLoader";

const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"], display: "swap" });
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  display: "swap",
});
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});
const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});
const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata = buildRootMetadata();

const gAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
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
      {gAdsId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gAdsId}`}
            strategy="lazyOnload"
          />
          <Script id="google-ads-init" strategy="lazyOnload">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gAdsId}');`}
          </Script>
        </>
      ) : null}
      <AnalyticsScripts />
      <SiteJsonLd />
      <ThemeProvider>
        <SiteClientEffectsLoader />
        <SiteNav />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </ThemeProvider>
    </div>
  );
}
