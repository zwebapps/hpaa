import Link from "next/link";

export function SiteFooter() {
  return (
    <footer>
      <div className="footer-brand">
        KUM Services GmbH
        <span>Aviation Specialists · Konstanz, Germany</span>
      </div>
      <div className="footer-links">
        <Link href="/#home" scroll={false}>
          Home
        </Link>
        <Link href="/#aircraft" scroll={false}>
          Aircraft
        </Link>
        <Link href="/#partners" scroll={false}>
          Partners
        </Link>
        <Link href="/#contact" scroll={false}>
          Contact
        </Link>
      </div>
      <div className="footer-copy">© 2025 KUM Services GmbH · All Rights Reserved</div>
    </footer>
  );
}
