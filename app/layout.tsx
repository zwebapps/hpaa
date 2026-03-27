import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import { env } from "./env";
import { SiteFooter } from "./site/SiteFooter";
import { SiteNav } from "./site/SiteNav";
import { RevealObserver } from "./site/RevealObserver";
import { ScrollSpy } from "./site/ScrollSpy";
import { ScrollToHash } from "./site/ScrollToHash";

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

export const metadata: Metadata = {
  title: env.NEXT_PUBLIC_APP_NAME,
  description: `${env.NEXT_PUBLIC_APP_NAME} web app`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${cormorant.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <RevealObserver />
        <ScrollToHash />
        <ScrollSpy />
        <SiteNav />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
