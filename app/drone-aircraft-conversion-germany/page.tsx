import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { absoluteUrl } from "@/lib/absoluteUrl";
import { getSiteUrl } from "@/lib/siteUrl";

const CANONICAL = "/drone-aircraft-conversion-germany";
const OG_IMAGE = "/theme/hpaa2.jpg";

export const metadata: Metadata = {
  title: "Drone Aircraft Conversion Germany | Civil to Autonomous Platform — KUM Services GmbH",
  description:
    "Drone aircraft conversion Germany: KUM Services GmbH, Konstanz converts proven civil turboprop and turbofan aircraft into high-performance drone platforms for ISR, cargo, strike and special missions. EASA Part-145 certified. Fast, low-cost, globally supported.",
  keywords: [
    "drone aircraft conversion Germany",
    "drone conversion Germany",
    "civil aircraft to drone Germany",
    "aircraft drone conversion Konstanz",
    "drone aircraft Germany",
    "convert aircraft to drone Germany",
    "drone platform conversion Germany",
    "UAV conversion Germany",
    "civil aircraft drone conversion",
    "KUM Services GmbH",
    "HPAA Germany",
    "autonomous aircraft Germany",
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
    title: "Drone Aircraft Conversion Germany | KUM Services GmbH Konstanz",
    description:
      "KUM Services GmbH, Konstanz — drone aircraft conversion specialist. Civil turboprop and turbofan aircraft converted to high-performance drone platforms for defence and government.",
    images: [{ url: absoluteUrl(OG_IMAGE), width: 1200, height: 630, alt: "Drone Aircraft Conversion Germany — KUM Services GmbH Konstanz" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Drone Aircraft Conversion Germany | KUM Services GmbH",
    description: "Civil aircraft to high-performance drone conversion, Konstanz Germany.",
    images: [absoluteUrl(OG_IMAGE)],
  },
};

export default function DroneAircraftConversionGermanyPage() {
  const base = getSiteUrl().replace(/\/$/, "");

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${base}${CANONICAL}`,
        url: `${base}${CANONICAL}`,
        name: "Drone Aircraft Conversion Germany — KUM Services GmbH Konstanz",
        description:
          "KUM Services GmbH converts proven civil aircraft into high-performance drone platforms for ISR, cargo, strike and special missions in Germany and worldwide.",
        inLanguage: "en",
        isPartOf: { "@id": `${base}/#website` },
        about: { "@id": `${base}/#hpaa` },
        publisher: { "@id": `${base}/#organization` },
        keywords: "drone aircraft conversion Germany, civil aircraft to drone Germany, UAV conversion Germany, aircraft drone conversion",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
          { "@type": "ListItem", position: 2, name: "Drone Aircraft Conversion Germany", item: `${base}${CANONICAL}` },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${base}${CANONICAL}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "What is drone aircraft conversion in Germany?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Drone aircraft conversion in Germany is the process of converting a proven civil-registered turboprop or turbofan aircraft into a high-performance drone platform. KUM Services GmbH, Konstanz, is Germany's specialist drone aircraft conversion provider — delivering high-performance drone capability at a fraction of the time and cost of purpose-built drone programmes.",
            },
          },
          {
            "@type": "Question",
            name: "How do you convert a civil aircraft to a drone in Germany?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "KUM Services GmbH converts civil aircraft to drone platforms by: (1) sourcing a proven civil airframe from the open aviation market; (2) installing autonomous flight control systems, BVLOS datalinks and mission payload systems; (3) providing a ground control station; (4) completing on-site validation flights. All work is performed by EASA Part-145 certified technicians. The resulting drone aircraft retains civil registration.",
            },
          },
          {
            "@type": "Question",
            name: "What drone aircraft conversion services are available in Germany?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "KUM Services GmbH offers drone aircraft conversion for: ISR drone platforms (EO/IR, SAR, SIGINT); cargo drone platforms (GPS-guided parachute and direct-landing delivery); strike drone platforms (precision guided munitions); counter-UAS drone platforms; and attritable drone platforms for one-way attack missions. All conversions are based on proven civil turboprop or turbofan airframes.",
            },
          },
          {
            "@type": "Question",
            name: "Is drone aircraft conversion in Germany cost-effective?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Drone aircraft conversion by KUM Services GmbH is significantly more cost-effective than purpose-built drone programmes. Civil market airframe sourcing eliminates non-recurring engineering costs. Fixed-price proposals cover aircraft acquisition, conversion, and mission system integration. The lifecycle cost is substantially lower than purpose-built drone platforms with global spare-parts availability.",
            },
          },
        ],
      },
      {
        "@type": "Service",
        name: "Drone Aircraft Conversion Germany",
        description:
          "KUM Services GmbH converts civil-registered turboprop and turbofan aircraft into high-performance drone platforms (HPAA) for defence, government, and special-mission customers worldwide. EASA Part-145 certified.",
        serviceType: "Drone Aircraft Conversion",
        provider: { "@id": `${base}/#organization` },
        areaServed: [
          { "@type": "Country", name: "Germany" },
          { "@type": "Text", name: "Worldwide" },
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
          style={{ backgroundImage: "url('/theme/hpaa2.jpg')" }}
          aria-hidden="true"
        />
        <div className="page-header-scrim" />
        <div className="page-header-content" style={{ padding: "6rem 2rem 4rem" }}>
          <p className="section-eyebrow">KUM Services GmbH · Konstanz, Germany</p>
          <h1 className="section-heading" style={{ maxWidth: 720 }}>
            Drone Aircraft Conversion Germany —{" "}
            <em>Civil Aircraft to High-Performance Drone</em>
          </h1>
        </div>
      </div>

      {/* Introduction */}
      <section className="section">
        <p className="section-eyebrow">Civil Aircraft to Drone Platform</p>
        <h2 className="section-heading">
          Germany&apos;s Drone Aircraft <em>Conversion Specialist</em>
        </h2>
        <p className="section-lead">
          KUM Services GmbH, headquartered in Konstanz, Germany, specialises in the conversion of
          proven civil-registered turboprop and turbofan aircraft into high-performance drone
          platforms — delivering operational drone capability at a fraction of the time and cost of
          any purpose-built system. The HPAA (High Performance Autonomous Aircraft) conversion
          programme is Germany&apos;s most advanced civil-to-drone conversion service, trusted by
          defence ministries, government agencies, and special operations commands worldwide.
        </p>
      </section>

      {/* Callout */}
      <div className="callout-strip reveal">
        <div className="callout-text" style={{ order: 1 }}>
          <p className="section-eyebrow">The Conversion Process</p>
          <h2 className="callout-heading">
            Civil Aircraft. <em>Drone Mission.</em>
          </h2>
          <p className="callout-body">
            Drone aircraft conversion by KUM Services GmbH begins with the selection of a proven
            civil airframe — Cessna 208, Beechcraft King Air 350, Pilatus PC-12, Cessna Citation
            525B, or C-130J — sourced directly from the open civil aviation market. The airframe is
            then fitted with advanced autonomous flight control systems, mission-specific payload
            integration, BVLOS datalinks, and a ground control station. Conversion is completed
            on-site at the customer&apos;s location by EASA Part-145 certified technicians. The
            resulting drone aircraft retains its civil registration — no special permits required
            for ferry flights, no diplomatic clearances needed.
          </p>
          <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link className="btn-gold" href="/#contact">Request a Proposal</Link>
            <Link className="btn-ghost" href="/#aircraft">View Platforms</Link>
          </div>
        </div>
        <div className="callout-img" style={{ order: 2 }}>
          <Image
            fill
            src="/theme/hpaa10.jpg"
            alt="Drone aircraft conversion — KUM Services GmbH Konstanz Germany"
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="callout-img-overlay" />
        </div>
      </div>

      {/* Conversion stages */}
      <section className="section">
        <p className="section-eyebrow">Conversion Process</p>
        <h2 className="section-heading">From Civil Aircraft <em>to Drone Platform</em></h2>
        <div className="why-grid" style={{ marginTop: "2rem" }}>
          {[
            { n: "01", t: "Airframe Sourcing", d: "Civil turboprop or turbofan aircraft selected and acquired from the open civil aviation market. Airframe condition verified and baseline maintenance completed by EASA Part-145 engineers." },
            { n: "02", t: "Autonomous Systems Integration", d: "Advanced autonomous flight control systems, AI-assisted mission planning software, and BVLOS-capable datalinks installed and calibrated to the specific airframe." },
            { n: "03", t: "Payload & Mission Systems", d: "Mission-specific payload systems integrated — EO/IR sensors, SAR, SIGINT, cargo delivery equipment, or weapons stations — depending on the operational requirement." },
            { n: "04", t: "Ground Control Station", d: "A customised ground control station (GCS) provided for each drone conversion programme. Satellite and line-of-sight datalink configurations available." },
            { n: "05", t: "Validation & Delivery", d: "Full system validation flights completed. The converted drone aircraft is delivered with operator training, technical documentation, and worldwide support from EASA-certified engineers." },
          ].map((c) => (
            <div key={c.n} className="why-card reveal">
              <div className="why-card-num">{c.n}</div>
              <h3>{c.t}</h3>
              <p>{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Platform grid */}
      <section className="section" style={{ background: "var(--navy)", color: "var(--cream)" }}>
        <p className="section-eyebrow" style={{ color: "var(--gold-light)" }}>Drone Platforms — Germany</p>
        <h2 className="section-heading" style={{ color: "var(--warm-white)" }}>
          Available <em>Conversion Airframes</em>
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.5rem",
            marginTop: "2rem",
          }}
        >
          {[
            { src: "/theme/cessna-208-2.png", alt: "Cessna 208 drone aircraft conversion — KUM Services GmbH Germany", label: "Cessna 208" },
            { src: "/theme/beech-king-air-3500-1.png", alt: "King Air 350 drone conversion — autonomous drone Germany", label: "King Air 350" },
            { src: "/theme/pilatus-pc-12-2.png", alt: "Pilatus PC-12 drone aircraft — civil to drone conversion Konstanz", label: "Pilatus PC-12" },
            { src: "/theme/hpaa4.jpg", alt: "HPAA drone aircraft — civil aircraft conversion Germany", label: "HPAA Platform" },
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

      {/* Related pages */}
      <section className="section">
        <p className="section-eyebrow">Related Services</p>
        <h2 className="section-heading">Explore <em>HPAA Capabilities</em></h2>
        <div className="why-grid" style={{ marginTop: "2rem" }}>
          {[
            { href: "/hpaa-germany", t: "HPAA Germany", d: "High Performance Autonomous Aircraft — the complete HPAA conversion programme." },
            { href: "/unmanned-aircraft-germany", t: "Unmanned Aircraft Germany", d: "Civil aircraft converted to fully unmanned aerial systems (UAS)." },
            { href: "/high-performance-combat-drones-germany", t: "High-Performance Combat Drones Germany", d: "Combat-capable drone platforms for strike, ISR and special missions." },
            { href: "/autonomous-aircraft-germany", t: "Autonomous Aircraft Germany", d: "Autonomous aircraft conversion for defence and government operators." },
          ].map((c) => (
            <div key={c.href} className="why-card reveal">
              <h3><Link href={c.href} style={{ color: "inherit", textDecoration: "none" }}>{c.t}</Link></h3>
              <p>{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ textAlign: "center" }}>
        <p className="section-eyebrow">Contact</p>
        <h2 className="section-heading">Start Your <em>Drone Conversion Programme</em></h2>
        <p className="section-lead" style={{ margin: "1rem auto 2rem", maxWidth: 560 }}>
          KUM Services GmbH, Konstanz, Germany — drone aircraft conversion programmes for defence
          ministries, government agencies, and special operations commands worldwide.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link className="btn-gold" href="/#contact">Request a Proposal</Link>
          <Link className="btn-ghost" href="/">Back to Home</Link>
        </div>
      </section>
    </>
  );
}
