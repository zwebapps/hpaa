import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { absoluteUrl } from "@/lib/absoluteUrl";
import { getSiteUrl } from "@/lib/siteUrl";

const CANONICAL = "/autonomous-aircraft-germany";
const OG_IMAGE = "/theme/hpaa8.jpg";

export const metadata: Metadata = {
  title: "Autonomous Aircraft Germany | Civil Aircraft Conversion — KUM Services GmbH",
  description:
    "Autonomous aircraft Germany: KUM Services GmbH, Konstanz converts proven civil turboprop and turbofan aircraft into autonomous platforms for ISR, cargo, strike and special missions. Faster and lower cost than purpose-built programmes.",
  keywords: [
    "autonomous aircraft Germany",
    "autonomous aircraft Konstanz",
    "civil aircraft to autonomous platform Germany",
    "autonomous aircraft conversion Germany",
    "HPAA autonomous aircraft Germany",
    "KUM Services GmbH",
  ],
  alternates: {
    canonical: absoluteUrl(CANONICAL),
    languages: {
      en: absoluteUrl(CANONICAL),
      "en-x-default": absoluteUrl(CANONICAL),
    },
  },
  openGraph: {
    type: "website",
    url: absoluteUrl(CANONICAL),
    title: "Autonomous Aircraft Germany | KUM Services GmbH Konstanz",
    description:
      "KUM Services GmbH, Konstanz — autonomous aircraft conversion specialist. Civil aircraft converted to autonomous platforms for defence and government operators.",
    images: [{ url: absoluteUrl(OG_IMAGE), width: 1200, height: 630, alt: "Autonomous Aircraft Germany — KUM Services GmbH Konstanz" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Autonomous Aircraft Germany | KUM Services GmbH",
    description: "Civil aircraft to autonomous platform conversion, Konstanz Germany.",
    images: [absoluteUrl(OG_IMAGE)],
  },
};

export default function AutonomousAircraftGermanyPage() {
  const base = getSiteUrl().replace(/\/$/, "");

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${base}${CANONICAL}`,
        url: `${base}${CANONICAL}`,
        name: "Autonomous Aircraft Germany — KUM Services GmbH Konstanz",
        description:
          "KUM Services GmbH converts proven civil aircraft into autonomous aircraft platforms for ISR, cargo, strike and special missions in Germany and worldwide.",
        inLanguage: "en",
        isPartOf: { "@id": `${base}/#website` },
        about: { "@id": `${base}/#hpaa` },
        publisher: { "@id": `${base}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
          { "@type": "ListItem", position: 2, name: "Autonomous Aircraft Germany", item: `${base}${CANONICAL}` },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="page-header" style={{ minHeight: 420 }}>
        <div
          className="page-header-bg"
          style={{ backgroundImage: "url('/theme/hpaa8.jpg')" }}
          aria-hidden="true"
        />
        <div className="page-header-scrim" />
        <div className="page-header-content" style={{ padding: "6rem 2rem 4rem" }}>
          <p className="section-eyebrow">KUM Services GmbH · Konstanz, Germany</p>
          <h1 className="section-heading" style={{ maxWidth: 720 }}>
            Autonomous Aircraft Germany —{" "}
            <em>Civil Conversion Specialist</em>
          </h1>
        </div>
      </div>

      {/* Introduction */}
      <section className="section">
        <p className="section-eyebrow">Civil Aircraft to Autonomous Platform</p>
        <h2 className="section-heading">
          Germany&apos;s Autonomous Aircraft <em>Conversion Specialist</em>
        </h2>
        <p className="section-lead">
          KUM Services GmbH, headquartered in Konstanz, Germany, delivers autonomous aircraft
          conversion programmes that transform proven civil-registered turboprop and turbofan
          airframes into fully autonomous platforms for military, government, and special-mission
          operations. Unlike purpose-built unmanned programmes that require years of development,
          KUM Services autonomous aircraft Germany programmes deliver operational capability in a
          very short period — using existing civil aviation infrastructure, EASA-certified
          maintenance, and academic flight control expertise from the University of Stuttgart.
        </p>
      </section>

      {/* Callout with image */}
      <div className="callout-strip reveal">
        <div className="callout-text" style={{ order: 1 }}>
          <p className="section-eyebrow">The Conversion Approach</p>
          <h2 className="callout-heading">
            Civil Aircraft. <em>Autonomous Mission.</em>
          </h2>
          <p className="callout-body">
            The conversion of civil aircraft to autonomous platforms is the fastest and most
            cost-effective path to operational autonomous aircraft capability. Civil turboprop and
            turbofan aircraft — Cessna 208, Beechcraft King Air 350, Pilatus PC-12, Cessna
            Citation 525B, and C-130J — are available on the open market with verified reliability
            records and global maintenance networks. KUM Services converts these airframes
            on-site, at the customer&apos;s location, using EASA Part-145 certified procedures.
            The resulting autonomous aircraft retains civil registration and is not identifiable as
            an autonomous or military system.
          </p>
          <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link className="btn-gold" href="/#contact">Request a Proposal</Link>
            <Link className="btn-ghost" href="/#aircraft">View Platforms</Link>
          </div>
        </div>
        <div className="callout-img" style={{ order: 2 }}>
          <Image
            fill
            src="/theme/hpaa11.jpeg"
            alt="Autonomous aircraft conversion programme — KUM Services GmbH Konstanz Germany"
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="callout-img-overlay" />
        </div>
      </div>

      {/* Platform grid */}
      <section className="section">
        <p className="section-eyebrow">Autonomous Aircraft Platforms — Germany</p>
        <h2 className="section-heading">Proven <em>Airframes</em></h2>
        <p className="section-lead" style={{ marginBottom: "2rem" }}>
          Each platform is selected for operational suitability and a proven track record.
          Suitable airframes are converted into autonomous aircraft for your specific mission.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {[
            { src: "/theme/pilatus-pc-12-3.png", alt: "Pilatus PC-12 autonomous aircraft — civil conversion Germany", label: "Pilatus PC-12" },
            { src: "/theme/cessna-208-3.png", alt: "Cessna 208 autonomous aircraft platform — KUM Services Germany", label: "Cessna 208" },
            { src: "/theme/beech-king-air-3500-3.png", alt: "Beechcraft King Air 350 autonomous aircraft — Germany", label: "King Air 350" },
            { src: "/theme/hpaa4.jpg", alt: "Autonomous aircraft platform — civil to HPAA conversion, Konstanz Germany", label: "HPAA Platform" },
          ].map((img) => (
            <div key={img.src} style={{ position: "relative", overflow: "hidden", height: 200 }}>
              <Image
                fill
                src={img.src}
                alt={img.alt}
                style={{ objectFit: "cover", filter: "saturate(0.8)" }}
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "0.6rem 1rem",
                  background: "rgba(11,17,32,0.75)",
                  fontSize: "0.72rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--gold-light)",
                }}
              >
                {img.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Applications */}
      <section className="section" style={{ background: "var(--navy)", color: "var(--cream)" }}>
        <p className="section-eyebrow" style={{ color: "var(--gold-light)" }}>Applications</p>
        <h2 className="section-heading" style={{ color: "var(--warm-white)" }}>
          Autonomous Aircraft <em>Mission Roles</em>
        </h2>
        <div className="why-grid" style={{ marginTop: "2rem" }}>
          {[
            { n: "ISR", t: "Intelligence & Surveillance", d: "Persistent EO/IR, SAR, and SIGINT surveillance for intelligence collection, border monitoring, and maritime patrol." },
            { n: "CGO", t: "Cargo & Resupply", d: "Autonomous aerial delivery of critical supplies to forward operating locations using GPS-guided parachute and direct-landing systems." },
            { n: "C-UAS", t: "Counter-UAS", d: "Airborne detection, tracking, and engagement of hostile unmanned aerial systems (UAS) at altitude and extended range." },
            { n: "EXT", t: "Range Extension", d: "Autonomous aircraft operating as airborne launch platforms, extending effective weapon range well beyond ground-based capability." },
            { n: "ATK", t: "Attritable Strike Operations", d: "Selected autonomous aircraft platforms can be configured for one-way attack missions. Civil-sourced airframes at known market prices make attritable operations significantly more cost-effective than purpose-built systems." },
          ].map((c) => (
            <div key={c.n} className="why-card reveal" style={{ borderColor: "rgba(184,150,90,0.15)" }}>
              <div className="why-card-num">{c.n}</div>
              <h3>{c.t}</h3>
              <p style={{ color: "rgba(248,245,239,0.65)" }}>{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ textAlign: "center" }}>
        <p className="section-eyebrow">Contact</p>
        <h2 className="section-heading">Start Your <em>Autonomous Aircraft Programme</em></h2>
        <p className="section-lead" style={{ margin: "1rem auto 2rem", maxWidth: 560 }}>
          KUM Services GmbH, Konstanz, Germany — autonomous aircraft conversion programmes for
          defence ministries, government agencies, and special operations commands worldwide.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link className="btn-gold" href="/#contact">Request a Proposal</Link>
          <Link className="btn-ghost" href="/">Back to Home</Link>
        </div>
      </section>
    </>
  );
}
