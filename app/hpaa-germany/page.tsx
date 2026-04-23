import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { absoluteUrl } from "@/lib/absoluteUrl";
import { getSiteUrl } from "@/lib/siteUrl";

const CANONICAL = "/hpaa-germany";
const OG_IMAGE = "/theme/hpaa9.jpeg";

export const metadata: Metadata = {
  title: "HPAA Germany — High Performance Autonomous Aircraft | KUM Services GmbH",
  description:
    "HPAA Germany: KUM Services GmbH, Konstanz converts proven civil turboprop and turbofan aircraft into High Performance Autonomous Aircraft (HPAA) for ISR, cargo, strike and special missions. Faster and lower cost than purpose-built UAV programmes.",
  keywords: [
    "HPAA Germany",
    "High Performance Autonomous Aircraft Germany",
    "HPAA Konstanz",
    "civil aircraft to autonomous platform Germany",
    "autonomous aircraft conversion Germany",
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
    title: "HPAA Germany — High Performance Autonomous Aircraft | KUM Services GmbH",
    description:
      "KUM Services GmbH, Konstanz — Germany's HPAA specialist. Civil aircraft converted to autonomous platforms for ISR, cargo, strike and special missions.",
    images: [{ url: absoluteUrl(OG_IMAGE), width: 1200, height: 630, alt: "HPAA Germany — KUM Services GmbH Konstanz" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "HPAA Germany | KUM Services GmbH",
    description: "High Performance Autonomous Aircraft conversion, Konstanz Germany.",
    images: [absoluteUrl(OG_IMAGE)],
  },
};

export default function HpaaGermanyPage() {
  const base = getSiteUrl().replace(/\/$/, "");

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${base}${CANONICAL}`,
        url: `${base}${CANONICAL}`,
        name: "HPAA Germany — High Performance Autonomous Aircraft",
        description:
          "KUM Services GmbH, Konstanz converts proven civil aircraft into HPAA autonomous platforms for ISR, cargo, strike and special missions.",
        inLanguage: "en",
        isPartOf: { "@id": `${base}/#website` },
        about: { "@id": `${base}/#hpaa` },
        publisher: { "@id": `${base}/#organization` },
        keywords: "HPAA Germany, High Performance Autonomous Aircraft, HPAA Konstanz, civil aircraft to autonomous platform Germany, autonomous aircraft conversion Germany, KUM Services GmbH",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
          { "@type": "ListItem", position: 2, name: "HPAA Germany", item: `${base}${CANONICAL}` },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${base}${CANONICAL}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "What is HPAA Germany?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "HPAA (High Performance Autonomous Aircraft) Germany refers to the civil aircraft to autonomous platform conversion service provided by KUM Services GmbH, based in Konstanz, Germany. KUM Services converts proven civil turboprop and turbofan aircraft — such as the Cessna 208, Beechcraft King Air 350, Pilatus PC-12, and C-130J — into fully autonomous or optionally piloted platforms for ISR, cargo, strike, and special missions.",
            },
          },
          {
            "@type": "Question",
            name: "How long does HPAA conversion take in Germany?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "HPAA conversion by KUM Services GmbH is completed on-site in a very short period — significantly faster than any purpose-built UAV programme. Civil registration of the base aircraft allows ferry flights to the customer's location without special permits, further reducing deployment time.",
            },
          },
          {
            "@type": "Question",
            name: "What is the cost of HPAA conversion compared to a purpose-built UAV?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "HPAA conversion by KUM Services GmbH is significantly lower cost than purpose-built unmanned aircraft programmes. Base airframes are sourced on the open civil aviation market at known prices. There are no non-recurring engineering costs. KUM Services provides fixed-price proposals covering aircraft acquisition, conversion, and mission system integration.",
            },
          },
          {
            "@type": "Question",
            name: "Is HPAA conversion EASA certified?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. All HPAA conversion work by KUM Services GmbH is conducted with Part One-Forty Five GmbH, an EASA Part-145 certified maintenance organisation based at Neuhausen ob Eck Airfield, Germany. The autonomous flight control systems are developed with the Institute of Flight Mechanics and Flight Control (iFR) at the University of Stuttgart.",
            },
          },
          {
            "@type": "Question",
            name: "What aircraft types can be converted to HPAA autonomous platforms?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "KUM Services GmbH converts a range of proven civil airframes to HPAA autonomous platforms, including: Cessna 208 Caravan, Beechcraft King Air 350, Pilatus PC-12, Cessna Citation 525B, and C-130J Super Hercules. Each airframe is selected based on mission requirements, payload capacity, range, and endurance.",
            },
          },
          {
            "@type": "Question",
            name: "Can HPAA platforms retain civil registration?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. HPAA platforms converted by KUM Services GmbH retain their civil registration and external appearance throughout the conversion. This means no special ferry permits are required for flights to the operating location, and the platform is not visually identifiable as an autonomous or military system — a significant operational and diplomatic advantage.",
            },
          },
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
          style={{ backgroundImage: "url('/theme/hpaa9.jpeg')" }}
          aria-hidden="true"
        />
        <div className="page-header-scrim" />
        <div className="page-header-content" style={{ padding: "6rem 2rem 4rem" }}>
          <p className="section-eyebrow">KUM Services GmbH · Konstanz, Germany</p>
          <h1 className="section-heading" style={{ maxWidth: 720 }}>
            HPAA Germany —{" "}
            <em>High Performance Autonomous Aircraft</em>
          </h1>
        </div>
      </div>

      {/* Introduction */}
      <section className="section">
        <p className="section-eyebrow">What Is HPAA?</p>
        <h2 className="section-heading">
          Civil Aircraft Converted to <em>Autonomous Platforms</em>
        </h2>
        <p className="section-lead">
          HPAA — High Performance Autonomous Aircraft — is a proven civil-registered turboprop or
          turbofan aircraft converted into a fully autonomous or optionally piloted platform
          operating at tactical altitudes for military, government, and special-mission operations.
          KUM Services GmbH, headquartered in Konstanz, Germany, is Germany&apos;s dedicated HPAA
          conversion specialist, delivering operational autonomous aircraft platforms faster and at
          lower cost than any purpose-built UAV programme.
        </p>
      </section>

      {/* Image + definition strip */}
      <div className="callout-strip reveal">
        <div className="callout-img">
          <Image
            fill
            src="/theme/beech-king-air-350-5.png"
            alt="Beech King Air 350 — HPAA conversion platform, KUM Services GmbH Germany"
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="callout-img-overlay" />
        </div>
        <div className="callout-text">
          <p className="section-eyebrow">Germany&apos;s HPAA Specialist</p>
          <h2 className="callout-heading">
            KUM Services GmbH
            <br />
            <em>Konstanz, Germany</em>
          </h2>
          <p className="callout-body">
            HPAA conversion programmes by KUM Services GmbH utilise proven civil turboprop and
            turbofan airframes — Cessna 208, Beechcraft King Air 350, Pilatus PC-12, Cessna
            Citation 525B, and C-130J — sourced on the open civil aviation market. Conversion is
            completed on-site in a very short period using EASA Part-145 certified maintenance
            procedures. The resulting HPAA platform retains civil registration, requires no special
            ferry permits, and is not visually identifiable as an autonomous system.
          </p>
          <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link className="btn-gold" href="/#contact">Request a Proposal</Link>
            <Link className="btn-ghost" href="/#aircraft">View Platforms</Link>
          </div>
        </div>
      </div>

      {/* Advantages grid */}
      <section className="section">
        <p className="section-eyebrow">Key Advantages</p>
        <h2 className="section-heading">Why Choose <em>HPAA Conversion?</em></h2>
        <p className="section-lead" style={{ marginBottom: "2.5rem" }}>
          HPAA Germany programmes offer decisive advantages over purpose-built unmanned development
          for defence ministries, government agencies, and special operations commands.
        </p>
        <div className="why-grid">
          {[
            { n: "01", t: "Speed of Fielding", d: "HPAA conversion is completed on-site in a very short period. No purpose-built facilities or authority permits are required. Civil registration allows ferry flights under standard aviation rules." },
            { n: "02", t: "Cost Efficiency", d: "Base airframes are sourced on the open civil market at known prices. There are no non-recurring engineering costs. Programme pricing is fixed and transparent." },
            { n: "03", t: "Operational Discretion", d: "HPAA platforms retain the external appearance of the base civil aircraft. They are not visually identifiable as autonomous or military systems — a significant operational advantage." },
            { n: "04", t: "Global Support", d: "Aircraft types such as the Cessna 208 and King Air 350 are supported by service centres and spare parts distributors on every inhabited continent." },
          ].map((c) => (
            <div key={c.n} className="why-card reveal">
              <div className="why-card-num">{c.n}</div>
              <h3>{c.t}</h3>
              <p>{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Platform images */}
      <section className="section" style={{ paddingTop: 0 }}>
        <p className="section-eyebrow">HPAA Platforms — Germany</p>
        <h2 className="section-heading">Available <em>Aircraft</em></h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.5rem",
            marginTop: "2rem",
          }}
        >
          {[
            { src: "/theme/cessna-208-1.png", alt: "Cessna 208 HPAA conversion platform — KUM Services GmbH Germany", label: "Cessna 208" },
            { src: "/theme/pilatus-pc-12-1.png", alt: "Pilatus PC-12 HPAA conversion platform — KUM Services GmbH Germany", label: "Pilatus PC-12" },
            { src: "/theme/beech-king-air-3500-1.png", alt: "Beechcraft King Air 350 HPAA conversion — autonomous aircraft Germany", label: "King Air 350" },
            { src: "/theme/hpaa11.jpeg", alt: "HPAA autonomous aircraft fleet — robot aircraft conversion, KUM Services GmbH Germany", label: "HPAA Fleet" },
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
          HPAA Germany — <em>Operational Roles</em>
        </h2>
        <p className="section-lead" style={{ marginBottom: "2rem" }}>
          KUM Services HPAA autonomous aircraft Germany platforms are employed across a wide
          spectrum of mission roles for defence and government operators worldwide.
        </p>
        <div className="why-grid">
          {[
            { n: "ISR", t: "Surveillance & Reconnaissance", d: "Persistent EO/IR, SAR, and SIGINT coverage with high-altitude endurance platforms for intelligence collection." },
            { n: "CGO", t: "Cargo & Aerial Resupply", d: "GPS-guided parachute and direct-landing delivery to forward operating locations in contested or austere environments." },
            { n: "STK", t: "Strike & Defensive Operations", d: "Precision guided munitions delivery, loitering munition carriage, and kinetic effects missions." },
            { n: "RNG", t: "Range Extension", d: "HPAA platforms operating as airborne launch points extend effective weapon range well beyond ground or sea-based launch capability." },
            { n: "ATK", t: "Attritable Strike Operations", d: "Selected HPAA platforms can be configured for one-way attack missions. Civil-sourced airframes available at known market prices make attritable operations significantly more cost-effective than purpose-built systems." },
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
            { href: "/robot-aircraft-germany", t: "Robot Aircraft Germany", d: "Robot aircraft conversion for defence and special mission operators." },
            { href: "/unmanned-aircraft-germany", t: "Unmanned Aircraft Germany", d: "Civil aircraft converted to fully unmanned aerial systems (UAS)." },
            { href: "/drone-aircraft-conversion-germany", t: "Drone Aircraft Conversion Germany", d: "Full civil-to-drone conversion process and platform options." },
            { href: "/high-performance-combat-drones-germany", t: "High-Performance Combat Drones Germany", d: "Combat drone platforms for strike, ISR and special missions." },
            { href: "/autonomous-platform-aircraft-germany", t: "Autonomous Platform Aircraft Germany", d: "Multi-role autonomous platform aircraft for defence and government." },
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
        <h2 className="section-heading">Start Your <em>HPAA Programme</em></h2>
        <p className="section-lead" style={{ margin: "1rem auto 2rem", maxWidth: 560 }}>
          KUM Services GmbH, Konstanz, Germany — HPAA conversion programmes for defence
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
