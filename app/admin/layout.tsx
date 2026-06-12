import type { Metadata } from "next";
import { Bebas_Neue, Cormorant_Garamond, Outfit } from "next/font/google";
import "../globals.css";
import "./admin.css";

const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"], display: "swap" });
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  display: "swap",
});
const bebas = Bebas_Neue({ variable: "--font-bebas", subsets: ["latin"], weight: "400", display: "swap" });

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`${outfit.variable} ${cormorant.variable} ${bebas.variable}`}>{children}</div>
  );
}
