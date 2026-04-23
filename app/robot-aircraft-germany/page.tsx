import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { absoluteUrl } from "@/lib/absoluteUrl";
import { getSiteUrl } from "@/lib/siteUrl";

const CANONICAL = "/robot-aircraft-germany";
const OG_IMAGE = "/theme/hpaa5.jpg";

export const metadata: Metadata = {
  title: "Robot Aircraft Germany | Civil Aircraft Conversion — KUM Services GmbH Konstanz",
  description:
    "Robot aircraft Germany: KUM Services GmbH, Konstanz converts proven civil turboprop and turbofan aircraft into autonomous robot aircraft platforms for ISR, cargo, strike and special missions. EASA Part-145 certified.",
  keywords: [
    "robot aircraft Germany",
    "robot aircraft Konstanz",
    "robotic aircraft Germany",
    "robotic aircraft Konstanz",
    "aircraft robot Germany",
    "civil aircraft to robot aircraft",
    "autonomous robot aircraft Germany",
    "robotic UAV Germany",
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
    title: "Robot Aircraft Germany | KUM Services GmbH Konstanz",
    description:
      "KUM Services GmbH, Konstanz — robot aircraft conversion specialist. Civil turboprop and turbofan aircraft converted to autonomous platforms for defence and government.",
    images: [{ url: absoluteUrl(OG_IMAGE), width: 1200, height: 630, alt: "Robot Aircraft Germany — KUM Services GmbH Konstanz" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Robot Aircraft Germany | KUM Services GmbH",
    description: "Civil aircraft to robot aircraft conversion, Konstanz Germany.",
    images: [absoluteUrl(OG_IMAGE)],
  },
};

export default function RobotAircraftGermanyPage() {
  const base = getSiteUrl().replace(/\/$/, "");

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${base}${CANONICAL}`,
        url: `${base}${CANONICAL}`,
        name: "Robot Aircraft Germany — KUM Services GmbH Konstanz",
        description:
          "KUM Services GmbH converts proven civil aircraft into robot aircraft autonomous platforms for ISR, cargo, strike and special missions.",
        inLanguage: "en",
        isPartOf: { "@id": `${base}/#website` },
        about: { "@id": `${base}/#hpaa` },
        publisher: { "@id": `${base}/#organization` },
        keywords: "robot aircraft Germany, robotic aircraft Germany, robot aircraft Konstanz, aircraft robot Germany, civil aircraft to robot aircraft, autonomous robot aircraft Germany",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
          { "@type": "ListItem", position: 2, name: "Robot Aircraft Germany", item: `${base}${CANONICAL}` },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${base}${CANONICAL}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "What is a robot aircraft in Germany?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A robot aircraft is a civil-registered turboprop or turbofan aircraft that has been converted into a fully autonomous or optionally piloted platform. KUM Services GmbH, based in Konstanz, Germany, is Germany's dedicated robot aircraft conversion specialist — converting commercially certified airframes into high-performance autonomous systems for defence ministries, government agencies, and special operations commands worldwide.",
            },
          },
          {
            "@type": "Question",
            name: "Who provides robot aircraft conversion services in Germany?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "KUM Services GmbH, headquartered in Konstanz, Baden-Württemberg, Germany, is the specialist robot aircraft conversion provider in Germany. KUM Services converts proven civil turboprop and turbofan aircraft into robot aircraft autonomous platforms using EASA Part-145 certified maintenance procedures and autonomous flight control systems developed with the University of Stuttgart.",
            },
          },
          {
            "@type": "Question",
            name: "What is the difference between a robot aircraft and a UAV?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A robot aircraft (HPAA) is a proven civil-registered aircraft converted to autonomous operation, whereas a purpose-built UAV is designed from scratch for unmanned use. Robot aircraft offer decisive advantages: faster fielding, lower cost, civil registration for unrestricted ferry flights, global spare-parts networks, and no visual identification as a military system.",
            },
          },
          {
            "@type": "Question",
            name: "Can robot aircraft be operated in Germany without special permits?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Robot aircraft converted by KUM Services GmbH retain civil registration, which allows ferry flights to operating locations under standard civil aviation rules — without special overflight permits or diplomatic clearances. This significantly accelerates deployment timelines for defence and government customers.",
            },
          },
          {
            "@type": "Question",
            name: "What missions can robot aircraft perform?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "KUM Services robot aircraft platforms can perform ISR (intelligence, surveillance and reconnaissance), cargo and aerial resupply, strike and payload delivery, counter-UAS operations, range extension missions, and attritable strike operations. Each platform is configured to the specific mission requirement of the customer.",
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
          style={{ backgroundImage: "url('/theme/hpaa5.jpg')" }}
          aria-hidden="true"
        />
        <div className="page-header-scrim" />
        <div className="page-header-content" style={{ padding: "6rem 2rem 4rem" }}>
          <p className="section-eyebrow">KUM Services GmbH · Konstanz, Germany</p>
          <h1 className="section-heading" style={{ maxWidth: 720 }}>
            Robot Aircraft Germany —{" "}
            <em>Civil Aircraft Conversion Specialist</em>
          </h1>
        </div>
      </div>

      {/* Introduction */}
      <section className="section">
        <p className="section-eyebrow">What Is a Robot Aircraft?</p>
        <h2 className="section-heading">
          Proven Civil Aircraft. <em>Autonomous Capability.</em>
        </h2>
        <p className="section-lead">
          A robot aircraft is a proven civil-registered turboprop or turbofan aircraft converted
          into a fully autonomous or optionally piloted platform. KUM Services GmbH, based in
          Konstanz, Germany, is Germany&apos;s dedicated robot aircraft conversion specialist —
          transforming commercially certified airframes into high-performance autonomous systems
          for defence ministries, government agencies, and special operations commands worldwide.
          The approach delivers operational robot aircraft capability in a fraction of the time and
          cost of any purpose-built unmanned programme.
        </p>
      </section>

      {/* Image + content strip */}
      <div className="callout-strip reveal">
        <div className="callout-img">
          <Image
            fill
            src="/theme/hpaa7.jpg"
            alt="Robot aircraft autonomous platform — KUM Services GmbH Konstanz Germany"
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="callout-img-overlay" />
        </div>
        <div className="callout-text">
          <p className="section-eyebrow">Robot Aircraft Conversion</p>
          <h2 className="callout-heading">
            On-Site. Fast. <em>Operational.</em>
          </h2>
          <p className="callout-body">
            KUM Services GmbH robot aircraft conversion programmes source proven civil airframes —
            Cessna 208, Beechcraft King Air 350, Pilatus PC-12, Cessna Citation 525B, C-130J —
            directly from the open civil aviation market. Conversion is completed on-site at the
            customer&apos;s location by EASA Part-145 certified technicians. The resulting robot
            aircraft retains its civil registration, requires no special overflight permits for
            ferry flights, and is not visually identifiable as an autonomous platform — a decisive
            operational advantage.
          </p>
          <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link className="btn-gold" href="/#contact">Request a Proposal</Link>
            <Link className="btn-ghost" href="/#aircraft">View Platforms</Link>
          </div>
        </div>
      </div>

      {/* Platform images */}
      <section className="section">
        <p className="section-eyebrow">Robot Aircraft Platforms — Germany</p>
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
            { src: "/theme/cessna-208-2.png", alt: "Cessna 208 robot aircraft conversion — KUM Services GmbH Germany", label: "Cessna 208" },
            { src: "/theme/beech-king-air-3500-2.png", alt: "King Air 350 robot aircraft — autonomous platform Germany", label: "King Air 350" },
            { src: "/theme/pilatus-pc-12-2.png", alt: "Pilatus PC-12 robot aircraft platform — KUM Services Konstanz", label: "Pilatus PC-12" },
            { src: "/theme/hpaa6.jpg", alt: "Robot aircraft autonomous platform — civil aircraft conversion Germany", label: "HPAA Platform" },
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

      {/* Advantages */}
      <section className="section">
        <p className="section-eyebrow">Why Robot Aircraft Conversion</p>
        <h2 className="section-heading">Key <em>Operational Advantages</em></h2>
        <div className="why-grid" style={{ marginTop: "2rem" }}>
          {[
            { n: "01", t: "Civil Registration", d: "Robot aircraft retain civil registration and external appearance. No diplomatic clearances or special overflight permits required for ferry flights to the operating location." },
            { n: "02", t: "Rapid Deployment", d: "On-site conversion completed in a very short period without purpose-built facilities. Significantly faster than any purpose-built unmanned aircraft programme." },
            { n: "03", t: "Proven Airframes", d: "Every base aircraft has accumulated thousands of commercial flying hours. Reliability is established and maintenance networks are global." },
            { n: "04", t: "Affordable Programmes", d: "Civil market sourcing eliminates non-recurring engineering costs. Fixed-price proposals cover aircraft acquisition, conversion, and mission system integration." },
            { n: "05", t: "Attritable Strike Operations", d: "Selected robot aircraft platforms can be configured for one-way attack missions. Civil-sourced airframes at known market prices make attritable operations significantly more cost-effective than purpose-built systems." },
          ].map((c) => (
            <div key={c.n} className="why-card reveal">
              <div className="why-card-num">{c.n}</div>
              <h3>{c.t}</h3>
              <p>{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Partners strip */}
      <section className="section" style={{ background: "var(--navy)", paddingTop: "3rem", paddingBottom: "3rem" }}>
        <p className="section-eyebrow" style={{ color: "var(--gold-light)" }}>Certified Partners</p>
        <h2 className="section-heading" style={{ color: "var(--warm-white)", marginBottom: "1.5rem" }}>
          EASA Part-145 & <em>University of Stuttgart</em>
        </h2>
        <p className="section-lead">
          All KUM Services robot aircraft conversion programmes in Germany are conducted with
          Part One-Forty Five GmbH (EASA Part-145 certified, Neuhausen ob Eck Airfield) and the
          Institute of Flight Mechanics and Flight Control (iFR) at the University of Stuttgart —
          ensuring every platform meets the highest standards of airworthiness and autonomous
          flight control.
        </p>
        <div style={{ display: "flex", gap: "1.5rem", marginTop: "2rem", flexWrap: "wrap" }}>
          <div style={{ position: "relative", height: 80, width: 142 }}>
            <Image fill src="/theme/part-one-forty-five.png" alt="Part One-Forty Five GmbH — EASA Part-145 certified maintenance partner" style={{ objectFit: "contain", filter: "brightness(0.9)" }} sizes="142px" />
          </div>
          <div style={{ position: "relative", height: 80, width: 142 }}>
            <Image fill src="/theme/university-of-stuttgart.png" alt="University of Stuttgart — autonomous flight control research partner" style={{ objectFit: "contain", filter: "brightness(0.9)" }} sizes="142px" />
          </div>
        </div>
      </section>

      {/* Related pages */}
      <section className="section">
        <p className="section-eyebrow">Related Services</p>
        <h2 className="section-heading">Explore <em>HPAA Capabilities</em></h2>
        <div className="why-grid" style={{ marginTop: "2rem" }}>
          {[
            { href: "/hpaa-germany", t: "HPAA Germany", d: "High Performance Autonomous Aircraft — the complete HPAA conversion programme." },
            { href: "/unmanned-aircraft-germany", t: "Unmanned Aircraft Germany", d: "Manned-to-unmanned conversion for defence and government operators." },
            { href: "/drone-aircraft-conversion-germany", t: "Drone Aircraft Conversion Germany", d: "Civil aircraft to high-performance drone conversion programmes." },
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
        <h2 className="section-heading">Start Your <em>Robot Aircraft Programme</em></h2>
        <p className="section-lead" style={{ margin: "1rem auto 2rem", maxWidth: 560 }}>
          KUM Services GmbH, Konstanz, Germany — robot aircraft conversion for defence ministries,
          government agencies, and special operations commands worldwide.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link className="btn-gold" href="/#contact">Request a Proposal</Link>
          <Link className="btn-ghost" href="/">Back to Home</Link>
        </div>
      </section>
    </>
  );
}
