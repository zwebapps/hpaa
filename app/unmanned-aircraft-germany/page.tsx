import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { absoluteUrl } from "@/lib/absoluteUrl";
import { getSiteUrl } from "@/lib/siteUrl";

const CANONICAL = "/unmanned-aircraft-germany";
const OG_IMAGE = "/theme/hpaa1.jpg";

export const metadata: Metadata = {
  title: "Unmanned Aircraft Germany | Civil Aircraft to Autonomous Platform — KUM Services GmbH",
  description:
    "Unmanned aircraft Germany: KUM Services GmbH, Konstanz converts proven civil turboprop and turbofan aircraft into unmanned autonomous platforms for ISR, cargo, strike and special missions. EASA Part-145 certified. Faster and lower cost than purpose-built UAS programmes.",
  keywords: [
    "unmanned aircraft Germany",
    "unmanned aircraft conversion Germany",
    "unmanned aircraft Konstanz",
    "civil aircraft to unmanned aircraft Germany",
    "UAV conversion Germany",
    "manned to unmanned conversion Germany",
    "unmanned aerial vehicle Germany",
    "UAS Germany",
    "remotely piloted aircraft Germany",
    "optionally piloted aircraft Germany",
    "KUM Services GmbH",
    "HPAA Germany",
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
    title: "Unmanned Aircraft Germany | KUM Services GmbH Konstanz",
    description:
      "KUM Services GmbH, Konstanz — unmanned aircraft conversion specialist. Civil turboprop and turbofan aircraft converted to fully unmanned autonomous platforms for defence and government.",
    images: [{ url: absoluteUrl(OG_IMAGE), width: 1200, height: 630, alt: "Unmanned Aircraft Germany — KUM Services GmbH Konstanz" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Unmanned Aircraft Germany | KUM Services GmbH",
    description: "Civil aircraft to unmanned platform conversion, Konstanz Germany.",
    images: [absoluteUrl(OG_IMAGE)],
  },
};

export default function UnmannedAircraftGermanyPage() {
  const base = getSiteUrl().replace(/\/$/, "");

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${base}${CANONICAL}`,
        url: `${base}${CANONICAL}`,
        name: "Unmanned Aircraft Germany — KUM Services GmbH Konstanz",
        description:
          "KUM Services GmbH converts proven civil aircraft into unmanned autonomous platforms for ISR, cargo, strike and special missions in Germany and worldwide.",
        inLanguage: "en",
        isPartOf: { "@id": `${base}/#website` },
        about: { "@id": `${base}/#hpaa` },
        publisher: { "@id": `${base}/#organization` },
        keywords: "unmanned aircraft Germany, UAV conversion Germany, manned to unmanned conversion, civil aircraft to UAS",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
          { "@type": "ListItem", position: 2, name: "Unmanned Aircraft Germany", item: `${base}${CANONICAL}` },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${base}${CANONICAL}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "What is unmanned aircraft conversion in Germany?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Unmanned aircraft conversion in Germany is the process of converting a civil-registered turboprop or turbofan aircraft into a fully unmanned aerial system (UAS/UAV). KUM Services GmbH, Konstanz, Germany, performs manned-to-unmanned conversions using EASA Part-145 certified procedures, delivering operational unmanned aircraft capability significantly faster and at lower cost than purpose-built UAS programmes.",
            },
          },
          {
            "@type": "Question",
            name: "Which civil aircraft types can be converted to unmanned operation?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "KUM Services GmbH converts a range of civil aircraft to unmanned operation, including: Cessna 208 Caravan, Beechcraft King Air 350, Pilatus PC-12, Cessna Citation 525B, and C-130J Super Hercules. Aircraft are selected based on mission payload, range, endurance, and theatre of operations requirements.",
            },
          },
          {
            "@type": "Question",
            name: "Do unmanned aircraft converted in Germany retain civil registration?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Unmanned aircraft converted by KUM Services GmbH retain their civil registration throughout conversion and operation. This allows unrestricted ferry flights to operating locations without special overflight permits, and the platform is not visually identifiable as an unmanned or military system — providing significant operational and diplomatic advantages.",
            },
          },
          {
            "@type": "Question",
            name: "How long does manned to unmanned aircraft conversion take in Germany?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "KUM Services GmbH completes manned-to-unmanned aircraft conversion on-site in a very short period — far faster than purpose-built UAS programmes. No purpose-built facilities or authority permits are required. Civil registration allows the base aircraft to ferry directly to the customer's location under standard aviation rules.",
            },
          },
        ],
      },
      {
        "@type": "Service",
        name: "Unmanned Aircraft Conversion Germany",
        description:
          "KUM Services GmbH converts civil-registered turboprop and turbofan aircraft into unmanned autonomous platforms (UAS/UAV) for defence, government, and special-mission customers worldwide. EASA Part-145 certified.",
        serviceType: "Unmanned Aircraft Conversion",
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
          style={{ backgroundImage: "url('/theme/hpaa1.jpg')" }}
          aria-hidden="true"
        />
        <div className="page-header-scrim" />
        <div className="page-header-content" style={{ padding: "6rem 2rem 4rem" }}>
          <p className="section-eyebrow">KUM Services GmbH · Konstanz, Germany</p>
          <h1 className="section-heading" style={{ maxWidth: 720 }}>
            Unmanned Aircraft Germany —{" "}
            <em>Civil Aircraft Conversion Specialist</em>
          </h1>
        </div>
      </div>

      {/* Introduction */}
      <section className="section">
        <p className="section-eyebrow">Civil Aircraft to Unmanned Platform</p>
        <h2 className="section-heading">
          Germany&apos;s Unmanned Aircraft <em>Conversion Specialist</em>
        </h2>
        <p className="section-lead">
          KUM Services GmbH, based in Konstanz, Germany, converts proven civil-registered turboprop
          and turbofan aircraft into fully unmanned aerial platforms for military, government, and
          special-mission operations worldwide. Unlike purpose-built UAS programmes requiring years
          of development, the KUM Services manned-to-unmanned conversion approach delivers
          operational unmanned aircraft in a fraction of the time and cost — using EASA Part-145
          certified maintenance procedures and autonomous flight control systems developed with the
          University of Stuttgart.
        </p>
      </section>

      {/* Callout */}
      <div className="callout-strip reveal">
        <div className="callout-img">
          <Image
            fill
            src="/theme/hpaa7.jpg"
            alt="Unmanned aircraft autonomous platform — KUM Services GmbH Konstanz Germany"
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="callout-img-overlay" />
        </div>
        <div className="callout-text">
          <p className="section-eyebrow">Manned to Unmanned Conversion</p>
          <h2 className="callout-heading">
            Proven Airframes. <em>Unmanned Missions.</em>
          </h2>
          <p className="callout-body">
            The KUM Services approach sources civil turboprop and turbofan aircraft — Cessna 208,
            Beechcraft King Air 350, Pilatus PC-12, Cessna Citation 525B, and C-130J — directly
            from the open civil aviation market. Each airframe carries a verified reliability record
            and benefits from a global spare-parts and service network. Conversion to unmanned
            operation is completed on-site at the customer&apos;s location by EASA Part-145
            certified technicians. The resulting unmanned aircraft retains civil registration and is
            not visually identifiable as an autonomous system — a decisive operational and
            diplomatic advantage.
          </p>
          <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link className="btn-gold" href="/#contact">Request a Proposal</Link>
            <Link className="btn-ghost" href="/#aircraft">View Platforms</Link>
          </div>
        </div>
      </div>

      {/* Advantages */}
      <section className="section">
        <p className="section-eyebrow">Why Choose Unmanned Conversion</p>
        <h2 className="section-heading">Key <em>Operational Advantages</em></h2>
        <div className="why-grid" style={{ marginTop: "2rem" }}>
          {[
            { n: "01", t: "Speed to Operation", d: "Manned-to-unmanned conversion is completed on-site in a very short period. No purpose-built facilities required. Civil registration enables ferry flights under standard aviation rules — no special permits needed." },
            { n: "02", t: "Proven Reliability", d: "Base airframes have accumulated thousands of commercial flying hours. Reliability is established before conversion begins. Maintenance networks span every inhabited continent." },
            { n: "03", t: "Operational Discretion", d: "Unmanned aircraft converted by KUM Services retain the external appearance of the civil base aircraft. They are not visually identifiable as unmanned or military systems." },
            { n: "04", t: "Cost Efficiency", d: "Civil market sourcing eliminates non-recurring engineering costs. Fixed-price proposals cover aircraft acquisition, conversion, and mission system integration. Significantly lower lifecycle cost than purpose-built UAS." },
            { n: "05", t: "EASA Certification", d: "All conversion work is conducted under EASA Part-145 certified procedures by Part One-Forty Five GmbH at Neuhausen ob Eck Airfield. Airworthiness is maintained throughout the conversion process." },
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
      <section className="section" style={{ paddingTop: 0 }}>
        <p className="section-eyebrow">Unmanned Aircraft Platforms — Germany</p>
        <h2 className="section-heading">Available <em>Aircraft Types</em></h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.5rem",
            marginTop: "2rem",
          }}
        >
          {[
            { src: "/theme/cessna-208-1.png", alt: "Cessna 208 unmanned aircraft conversion — KUM Services GmbH Germany", label: "Cessna 208" },
            { src: "/theme/beech-king-air-350-5.png", alt: "King Air 350 unmanned aircraft — manned to unmanned conversion Germany", label: "King Air 350" },
            { src: "/theme/pilatus-pc-12-1.png", alt: "Pilatus PC-12 unmanned aircraft platform — KUM Services Konstanz", label: "Pilatus PC-12" },
            { src: "/theme/hpaa6.jpg", alt: "HPAA unmanned aircraft platform — civil conversion Germany", label: "HPAA Platform" },
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

      {/* Mission applications */}
      <section className="section" style={{ background: "var(--navy)", color: "var(--cream)" }}>
        <p className="section-eyebrow" style={{ color: "var(--gold-light)" }}>Mission Applications</p>
        <h2 className="section-heading" style={{ color: "var(--warm-white)" }}>
          Unmanned Aircraft Germany — <em>Operational Roles</em>
        </h2>
        <div className="why-grid" style={{ marginTop: "2rem" }}>
          {[
            { n: "ISR", t: "Intelligence & Surveillance", d: "Persistent EO/IR, SAR, and SIGINT coverage. High-altitude endurance unmanned platforms deliver sustained intelligence collection, border monitoring, and maritime patrol capability." },
            { n: "CGO", t: "Cargo & Aerial Resupply", d: "GPS-guided parachute and direct-landing delivery of critical supplies to forward operating locations. Unmanned aircraft are ideal for resupply into contested or austere environments." },
            { n: "STK", t: "Strike & Payload Delivery", d: "Precision guided munitions delivery, loitering munition carriage, and kinetic effects missions. Configurable for any payload profile." },
            { n: "C-UAS", t: "Counter-UAS", d: "Airborne kinetic and electronic defeat of hostile unmanned aerial systems at altitude and extended range — far beyond the capability of ground-based counter-UAS systems." },
            { n: "RNG", t: "Range Extension", d: "Unmanned aircraft operating as airborne launch platforms, extending effective weapon and sensor range well beyond ground or sea-based capability." },
          ].map((c) => (
            <div key={c.n} className="why-card reveal" style={{ borderColor: "rgba(184,150,90,0.15)" }}>
              <div className="why-card-num">{c.n}</div>
              <h3>{c.t}</h3>
              <p style={{ color: "rgba(248,245,239,0.65)" }}>{c.d}</p>
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
            { href: "/hpaa-germany", t: "HPAA Germany", d: "High Performance Autonomous Aircraft — the full HPAA conversion programme." },
            { href: "/robot-aircraft-germany", t: "Robot Aircraft Germany", d: "Robot aircraft conversion for defence and special mission operators." },
            { href: "/autonomous-aircraft-germany", t: "Autonomous Aircraft Germany", d: "Civil aircraft converted to autonomous platforms for government and military." },
            { href: "/drone-aircraft-conversion-germany", t: "Drone Aircraft Conversion", d: "Civil aircraft to high-performance drone conversion programmes." },
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
        <h2 className="section-heading">Start Your <em>Unmanned Aircraft Programme</em></h2>
        <p className="section-lead" style={{ margin: "1rem auto 2rem", maxWidth: 560 }}>
          KUM Services GmbH, Konstanz, Germany — unmanned aircraft conversion programmes for
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
