import Link from "next/link";
import { siteData } from "@/data/siteData";

const SEO_PAGES = [
  { href: "/hpaa-germany", label: "HPAA Germany" },
  { href: "/robot-aircraft-germany", label: "Robot Aircraft Germany" },
  { href: "/autonomous-aircraft-germany", label: "Autonomous Aircraft Germany" },
  { href: "/unmanned-aircraft-germany", label: "Unmanned Aircraft Germany" },
  { href: "/drone-aircraft-conversion-germany", label: "Drone Aircraft Conversion Germany" },
  { href: "/high-performance-combat-drones-germany", label: "High-Performance Combat Drones Germany" },
  { href: "/autonomous-platform-aircraft-germany", label: "Autonomous Platform Aircraft Germany" },
];

export function SiteFooter() {
  return (
    <footer>
      <div className="footer-brand">
        {siteData.brand.name}
        <span>{siteData.brand.tagline}</span>
      </div>
      <div className="footer-links">
        {siteData.navigation.links
          .filter((link) => ["Home", "Aircraft", "Partners"].includes(link.label))
          .map((link) => (
            <Link key={link.href} href={link.href} scroll={false}>
              {link.label}
            </Link>
          ))}
        <Link href={siteData.navigation.cta.href} scroll={false}>
          Contact
        </Link>
      </div>
      <nav aria-label="HPAA Germany pages" className="sr-only">
        {SEO_PAGES.map((p) => (
          <Link key={p.href} href={p.href}>
            {p.label}
          </Link>
        ))}
      </nav>
      <div className="footer-copy">{siteData.brand.copyright}</div>
    </footer>
  );
}
