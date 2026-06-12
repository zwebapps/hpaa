import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HPAA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" translate="no" className="notranslate h-full" data-scroll-behavior="smooth">
      <body className="min-h-full antialiased" translate="no">
        {children}
      </body>
    </html>
  );
}
