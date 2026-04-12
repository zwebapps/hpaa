import { Bebas_Neue, Cormorant_Garamond, DM_Sans, Outfit, Playfair_Display, Space_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { buildRootMetadata } from "@/lib/siteMetadata";
import { SiteFooter } from "./site/SiteFooter";
import { SiteJsonLd } from "./site/SiteJsonLd";
import { SiteNav } from "./site/SiteNav";
import { RevealObserver } from "./site/RevealObserver";
import { ScrollSpy } from "./site/ScrollSpy";
import { ScrollToHash } from "./site/ScrollToHash";
import { ThemeProvider } from "./theme/ThemeProvider";

const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"] });
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700"],
});
const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
});
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});
const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = buildRootMetadata();

const gAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      translate="no"
      className={`notranslate ${outfit.variable} ${cormorant.variable} ${playfair.variable} ${bebas.variable} ${dmSans.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <head>
        {/* Preload the first hero image so LCP fires as early as possible */}
        <link rel="preload" as="image" href="/theme/hpaa9.jpeg" />
      </head>
      <body className="min-h-full flex flex-col" translate="no">
        {gAdsId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gAdsId}`}
              strategy="afterInteractive"
            />
            <Script id="google-ads-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gAdsId}');`}
            </Script>
          </>
        )}
        <SiteJsonLd />
        <ThemeProvider>
          <RevealObserver />
          <ScrollToHash />
          <ScrollSpy />
          <SiteNav />
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
