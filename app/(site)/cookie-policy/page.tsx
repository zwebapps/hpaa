import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl } from "@/lib/absoluteUrl";
import { getSiteUrl } from "@/lib/siteUrl";

const CANONICAL = "/cookie-policy";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "How this site uses cookies: strictly necessary cookies to run the site and, with your consent, analytics and advertising cookies. Manage your choice any time.",
  alternates: {
    canonical: absoluteUrl(CANONICAL),
    languages: { en: absoluteUrl(CANONICAL), "en-x-default": absoluteUrl(CANONICAL) },
  },
};

export default function CookiePolicyPage() {
  const base = getSiteUrl().replace(/\/$/, "");

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${base}${CANONICAL}`,
        url: `${base}${CANONICAL}`,
        name: "Cookie Policy",
        description:
          "How this site uses cookies and how to manage your consent under the GDPR/ePrivacy rules.",
        inLanguage: "en",
        isPartOf: { "@id": `${base}/#website` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${base}${CANONICAL}#breadcrumbs`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
          { "@type": "ListItem", position: 2, name: "Cookie Policy", item: `${base}${CANONICAL}` },
        ],
      },
    ],
  };

  return (
    <main className="section">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <p className="section-eyebrow">Legal</p>
      <h1 className="section-heading" style={{ maxWidth: 900 }}>
        Cookie Policy
      </h1>

      <div style={{ maxWidth: 760, lineHeight: 1.7 }}>
        <p>
          This site uses cookies and similar technologies. Under the EU GDPR and ePrivacy rules we
          only place non-essential cookies after you give consent. You can change or withdraw your
          choice at any time using the <strong>“Cookie preferences”</strong> link in the footer.
        </p>

        <h2 style={{ marginTop: "2rem" }}>Strictly necessary</h2>
        <p>
          Required for the site to function (for example, remembering your cookie choice). These are
          always active and do not require consent.
        </p>

        <h2 style={{ marginTop: "2rem" }}>Analytics</h2>
        <p>
          With your consent we use analytics to understand how the site is used and to improve it.
          Cookieless analytics (e.g. Plausible/Umami) may be used without cookies; cookie-based
          analytics such as Google Analytics load only after you accept and are not set if you
          reject non-essential cookies.
        </p>

        <h2 style={{ marginTop: "2rem" }}>Managing your choice</h2>
        <p>
          Open <strong>“Cookie preferences”</strong> in the footer to accept or reject non-essential
          cookies, or clear this site’s cookies in your browser settings. For questions, please{" "}
          <Link href="/contact">contact us</Link>.
        </p>
      </div>
    </main>
  );
}
