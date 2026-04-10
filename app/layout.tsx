import { Bebas_Neue, Cormorant_Garamond, DM_Sans, Outfit, Playfair_Display, Space_Mono } from "next/font/google";
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
      <body className="min-h-full flex flex-col" translate="no">
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
