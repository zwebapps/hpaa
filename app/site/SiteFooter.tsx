import Link from "next/link";
import { siteData } from "@/data/siteData";

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
      <div className="footer-copy">{siteData.brand.copyright}</div>
    </footer>
  );
}
