import type { Metadata } from "next";
import { bebas, cormorant, outfit } from "@/app/fonts";
import "../globals.css";
import "./admin.css";


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
