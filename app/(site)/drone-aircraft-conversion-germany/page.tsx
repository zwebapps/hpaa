import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { absoluteUrl } from "@/lib/absoluteUrl";
import { getSiteUrl } from "@/lib/siteUrl";

const CANONICAL = "/drone-aircraft-conversion-germany";
const OG_IMAGE = "/theme/hpaa2.jpg";

export const metadata: Metadata = {
  title: "Drone Aircraft Conversion: Process, Timeline & Cost — KUM Services GmbH",
  description:
    "What does a drone aircraft conversion programme look like? KUM Services GmbH (Germany) explains the step-by-step conversion process — airframe sourcing, engineering, autonomous systems installation, ground testing, flight test — the timeline advantage over purpose-built UAV programmes, and the cost case. Delivered on-site, worldwide.",
  keywords: [
    "drone aircraft conversion process",
    "drone conversion timeline",
    "drone conversion cost",
    "aircraft to drone conversion steps",
    "on-site drone conversion",
    "civil aircraft to drone conversion",
    "drone conversion programme Germany",
    "UAV conversion cost of ownership",
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
    title: "Drone Aircraft Conversion: Process, Timeline & Cost | KUM Services GmbH",
    description:
      "The step-by-step drone conversion programme from KUM Services GmbH, Germany — from civil airframe sourcing to flight test and handover. Short timelines, known market prices, delivered on-site worldwide.",
    images: [{ url: absoluteUrl(OG_IMAGE), width: 1200, height: 630, alt: "Drone Aircraft Conversion Process, Timeline & Cost — KUM Services GmbH" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Drone Aircraft Conversion: Process, Timeline & Cost | KUM Services GmbH",
    description: "The drone conversion programme step by step — timeline and cost advantages over purpose-built UAVs. On-site, worldwide.",
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
        name: "Drone Aircraft Conversion: Process, Timeline & Cost — KUM Services GmbH",
        description:
          "The step-by-step drone aircraft conversion programme from KUM Services GmbH, Germany: airframe sourcing on the open civil market, engineering and modification, autonomous systems installation, ground testing, and flight test with handover — completed on-site at the customer's location, worldwide, in a fraction of the time of purpose-built UAV programmes.",
        inLanguage: "en",
        isPartOf: { "@id": `${base}/#website` },
        about: { "@id": `${base}/#hpaa` },
        publisher: { "@id": `${base}/#organization` },
        keywords: "drone aircraft conversion process, drone conversion timeline, drone conversion cost, aircraft to drone conversion steps, on-site drone conversion worldwide, KUM Services GmbH Germany",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
          { "@type": "ListItem", position: 2, name: "Drone Aircraft Conversion — Process, Timeline & Cost", item: `${base}${CANONICAL}` },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${base}${CANONICAL}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "What are the steps of a drone aircraft conversion?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A KUM Services GmbH drone conversion programme follows five phases: (1) sourcing a proven civil airframe on the open civil aviation market; (2) engineering and airframe modification by EASA Part-145 certified technicians; (3) installation of autonomous flight control systems, BVLOS datalinks, mission payloads and the ground control station; (4) ground testing of all systems; and (5) flight test, validation and handover with operator training and documentation.",
            },
          },
          {
            "@type": "Question",
            name: "How long does a drone conversion take compared to a purpose-built UAV?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Purpose-built UAV programmes typically take years from contract signature to first operational flight. Because a KUM Services conversion starts from a flying, civil-registered aircraft with a verified reliability record, the programme is completed in a fraction of that time. The base aircraft can also ferry to the customer's location under its civil registration, further shortening the path to operational deployment.",
            },
          },
          {
            "@type": "Question",
            name: "Where does the drone conversion take place?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Conversion is performed on-site at the customer's own location, anywhere in the world. KUM Services GmbH deploys EASA Part-145 certified technicians and equipment to the customer's facility, so the aircraft, mission systems and ground control station remain under the customer's control throughout the programme.",
            },
          },
          {
            "@type": "Question",
            name: "Why is converting a civil aircraft cheaper than buying a purpose-built drone?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Civil airframes such as the Cessna 208, King Air 350, Pilatus PC-12, Citation 525B and C-130J are traded on the open market at known market prices, so acquisition cost is transparent and there are no non-recurring development or engineering charges to amortise. Over the life of the aircraft, global spare-parts availability and established civil maintenance networks keep the total cost of ownership substantially below that of purpose-built drone platforms.",
            },
          },
        ],
      },
      {
        "@type": "Service",
        name: "Drone Aircraft Conversion Programme — Process, Timeline & Cost",
        description:
          "Step-by-step conversion of civil-registered turboprop and turbofan aircraft into high-performance drone platforms (HPAA), completed on-site at the customer's location worldwide by KUM Services GmbH, Germany. EASA Part-145 certified.",
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
          <p className="section-eyebrow">KUM Services GmbH · Germany · On-Site Worldwide</p>
          <h1 className="section-heading" style={{ maxWidth: 720 }}>
            Drone Aircraft Conversion —{" "}
            <em>Process, Timeline &amp; Cost</em>
          </h1>
        </div>
      </div>

      {/* Introduction */}
      <section className="section">
        <p className="section-eyebrow">How a Conversion Programme Works</p>
        <h2 className="section-heading">
          From Civil Airframe to Operational Drone — <em>Step by Step</em>
        </h2>
        <p className="section-lead">
          What does a drone aircraft conversion programme actually look like — how long does it
          take, and why does it cost less than a purpose-built system? KUM Services GmbH
          (Germany) runs a structured, five-phase programme: a proven civil turboprop or turbofan
          airframe is sourced on the open market at a known market price, engineered and modified,
          fitted with autonomous flight systems, ground tested, and flight tested — all on-site at
          the customer&apos;s location, anywhere in the world. This page walks through each phase,
          the timeline advantage over multi-year purpose-built UAV programmes, and the total
          cost-of-ownership case.
        </p>
      </section>

      {/* Callout */}
      <div className="callout-strip reveal">
        <div className="callout-text" style={{ order: 1 }}>
          <p className="section-eyebrow">Timeline &amp; Cost</p>
          <h2 className="callout-heading">
            Months, Not Years. <em>Known Market Prices.</em>
          </h2>
          <p className="callout-body">
            A purpose-built UAV programme carries years of development risk and non-recurring
            engineering cost before the first aircraft flies. A KUM Services conversion inverts
            that equation: the starting point is an aircraft that already flies — a Cessna 208,
            King Air 350, Pilatus PC-12, Citation 525B, or C-130J — acquired on the open civil
            market at a transparent, known market price. Conversion is completed on-site at the
            customer&apos;s facility by EASA Part-145 certified technicians in a fraction of the
            time of a clean-sheet programme, and the aircraft benefits from global civil
            spare-parts availability and established maintenance networks for its entire service
            life.
          </p>
          <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link className="btn-gold" href="/contact">Request a Proposal</Link>
            <Link className="btn-ghost" href="/aircraft">View Platforms</Link>
          </div>
        </div>
        <div className="callout-img" style={{ order: 2 }}>
          <Image
            fill
            src="/theme/hpaa10.jpg"
            alt="Drone aircraft conversion programme in progress — KUM Services GmbH"
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 90vw, 50vw"
          />
          <div className="callout-img-overlay" />
        </div>
      </div>

      {/* Conversion programme phases */}
      <section className="section">
        <p className="section-eyebrow">The Conversion Programme</p>
        <h2 className="section-heading">Five Phases <em>to Handover</em></h2>
        <div className="why-grid" style={{ marginTop: "2rem" }}>
          {[
            { n: "01", t: "Airframe Sourcing", d: "A proven civil turboprop or turbofan airframe is selected and acquired on the open civil aviation market at a known market price. Condition and maintenance history are verified before purchase, and baseline maintenance is completed by EASA Part-145 engineers." },
            { n: "02", t: "Engineering & Modification", d: "The airframe is prepared for autonomous operation: structural provisions, wiring, actuation interfaces, and mission-system fittings are engineered and installed against a documented modification plan, preserving the aircraft's certified maintenance baseline." },
            { n: "03", t: "Autonomous Systems Installation", d: "Autonomous flight control systems, BVLOS-capable datalinks, mission payloads for ISR, cargo, or special missions, and the ground control station are installed and calibrated to the specific airframe." },
            { n: "04", t: "Ground Testing", d: "Every system is exercised on the ground before flight: flight control end-to-end checks, datalink range and failover verification, payload functional testing, and ground control station rehearsals with the customer's operators." },
            { n: "05", t: "Flight Test & Handover", d: "A structured flight test campaign validates autonomous operation across the mission envelope. The programme closes with handover: operator training, full technical documentation, and continuing worldwide support from EASA-certified engineers." },
          ].map((c) => (
            <div key={c.n} className="why-card reveal">
              <div className="why-card-num">{c.n}</div>
              <h3>{c.t}</h3>
              <p>{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline & cost advantages */}
      <section className="section" style={{ background: "var(--navy)", color: "var(--cream)" }}>
        <p className="section-eyebrow" style={{ color: "var(--gold-light)" }}>Why Conversion Wins</p>
        <h2 className="section-heading" style={{ color: "var(--warm-white)" }}>
          The Timeline &amp; Cost <em>Advantage</em>
        </h2>
        <div className="why-grid" style={{ marginTop: "2rem" }}>
          {[
            { n: "T-1", t: "Short Programme Timeline", d: "The programme starts from a flying aircraft, not a design study. Compared with purpose-built UAV programmes that can take years from contract to first flight, a conversion delivers operational capability in a fraction of the time." },
            { n: "T-2", t: "On-Site, Worldwide", d: "Conversion takes place at the customer's own facility, anywhere in the world. No aircraft transfers between contractor sites, no waiting for factory slots — the airframe remains under the customer's control throughout." },
            { n: "C-1", t: "Known Acquisition Cost", d: "Civil airframes trade on an open, liquid market with published price levels. There are no non-recurring engineering charges to amortise across a small fleet, and fixed-price proposals cover acquisition, conversion, and mission-system integration." },
            { n: "C-2", t: "Lower Cost of Ownership", d: "Global civil spare-parts availability, established maintenance networks, and EASA Part-145 procedures keep lifecycle cost substantially below purpose-built drone platforms — for ISR, cargo, and special-mission operations alike." },
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
            { href: "/autonomous-aircraft-germany", t: "Autonomous Aircraft Germany", d: "Overview of the civil-to-autonomous aircraft conversion service and platform family." },
            { href: "/robot-aircraft-germany", t: "Robot Aircraft Germany", d: "The technology stack behind conversions — flight control, datalinks, and autonomy systems." },
            { href: "/unmanned-aircraft-germany", t: "Unmanned Aircraft Germany", d: "Certification and airspace considerations for converted unmanned aircraft." },
            { href: "/autonomous-platform-aircraft-germany", t: "Autonomous Platform Aircraft Germany", d: "Platform options and payload configurations for ISR, cargo, and special missions." },
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
        <h2 className="section-heading">Scope Your <em>Conversion Programme</em></h2>
        <p className="section-lead" style={{ margin: "1rem auto 2rem", maxWidth: 560 }}>
          KUM Services GmbH — fixed-price drone conversion programmes delivered on-site,
          worldwide, for defence ministries, government agencies, and special-mission operators.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link className="btn-gold" href="/contact">Request a Proposal</Link>
          <Link className="btn-ghost" href="/">Back to Home</Link>
        </div>
      </section>
    </>
  );
}
