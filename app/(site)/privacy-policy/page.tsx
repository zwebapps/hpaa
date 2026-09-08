import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl } from "@/lib/absoluteUrl";
import { getSiteUrl } from "@/lib/siteUrl";

const CANONICAL = "/privacy-policy";
const CONTACT_EMAIL = "info@kum-trading.consulting";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Explore Robot Aircraft's advanced UAV solutions, combining innovation and reliability for all your aerial needs. Learn more about our technology and services.",
  alternates: {
    canonical: absoluteUrl(CANONICAL),
    languages: { en: absoluteUrl(CANONICAL), "en-x-default": absoluteUrl(CANONICAL) },
  },
};

export default function PrivacyPolicyPage() {
  const base = getSiteUrl().replace(/\/$/, "");

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${base}${CANONICAL}`,
        url: `${base}${CANONICAL}`,
        name: "Privacy Policy",
        description:
          "How KUM Services GmbH processes personal data on this website under the EU GDPR.",
        inLanguage: "en",
        isPartOf: { "@id": `${base}/#website` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${base}${CANONICAL}#breadcrumbs`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
          { "@type": "ListItem", position: 2, name: "Privacy Policy", item: `${base}${CANONICAL}` },
        ],
      },
    ],
  };

  return (
    <main className="section">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <p className="section-eyebrow">Legal</p>
      <h1 className="section-heading" style={{ maxWidth: 900 }}>
        Privacy Policy
      </h1>

      <div style={{ maxWidth: 760, lineHeight: 1.7 }}>
        <p>
          This policy explains how we process personal data when you use this website, in line with
          the EU General Data Protection Regulation (GDPR). By continuing to use the site you
          acknowledge the practices described here.
        </p>

        <h2 style={{ marginTop: "2rem" }}>1. Data controller</h2>
        <p>
          KUM Services GmbH, Germany, is the controller responsible for your personal data. For any
          privacy request, contact us at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>

        <h2 style={{ marginTop: "2rem" }}>2. What we collect</h2>
        <p>We process the following categories of data:</p>
        <ul>
          <li>
            <strong>Enquiries.</strong> When you submit the contact form we collect the details you
            provide (such as your name, email address, and message).
          </li>
          <li>
            <strong>Technical &amp; usage data.</strong> Server logs and, where you consent,
            analytics data such as pages visited, approximate location, device and browser type.
          </li>
          <li>
            <strong>Cookies.</strong> As described in our{" "}
            <Link href="/cookie-policy">Cookie Policy</Link>. Non-essential cookies are set only
            with your consent.
          </li>
        </ul>

        <h2 style={{ marginTop: "2rem" }}>3. Why we process it, and legal bases</h2>
        <ul>
          <li>
            <strong>To respond to enquiries</strong> and provide our services — Art. 6(1)(b) (steps
            prior to a contract) and Art. 6(1)(f) (our legitimate interest in handling requests).
          </li>
          <li>
            <strong>To operate and secure the site</strong> — Art. 6(1)(f) (legitimate interest).
          </li>
          <li>
            <strong>Analytics</strong> — Art. 6(1)(a) (your consent), which you may withdraw at any
            time.
          </li>
        </ul>

        <h2 style={{ marginTop: "2rem" }}>4. Third parties</h2>
        <p>
          We use service providers who process data on our behalf, including hosting and — where you
          consent — analytics providers (for example Google Analytics). These providers may process
          data outside the EU/EEA; where they do, transfers are covered by appropriate safeguards
          such as the EU Standard Contractual Clauses. We do not sell your personal data.
        </p>

        <h2 style={{ marginTop: "2rem" }}>5. Retention</h2>
        <p>
          We keep personal data only as long as necessary for the purposes above or as required by
          law. Enquiry data is retained for the duration of our correspondence and a reasonable
          period thereafter; analytics data is retained per the provider’s configured retention.
        </p>

        <h2 style={{ marginTop: "2rem" }}>6. Your rights</h2>
        <p>Under the GDPR you have the right to:</p>
        <ul>
          <li>access, rectify, or erase your personal data;</li>
          <li>restrict or object to processing, and to data portability;</li>
          <li>withdraw consent at any time (without affecting prior processing);</li>
          <li>
            lodge a complaint with a supervisory authority (in Germany, your competent state Data
            Protection Authority).
          </li>
        </ul>
        <p>
          To exercise any of these, email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          You can manage cookie consent any time via the “Cookie preferences” link in the footer.
        </p>

        <h2 style={{ marginTop: "2rem" }}>7. Changes</h2>
        <p>
          We may update this policy from time to time. Material changes will be reflected on this
          page. Please also review our <Link href="/cookie-policy">Cookie Policy</Link>.
        </p>

        <p style={{ marginTop: "2rem", fontSize: "0.85rem", opacity: 0.7 }}>
          This page is provided for transparency and general information and is not legal advice. We
          recommend having it reviewed by qualified counsel for your specific circumstances.
        </p>
      </div>
    </main>
  );
}
