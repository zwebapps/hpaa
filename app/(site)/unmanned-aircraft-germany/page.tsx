import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { absoluteUrl } from "@/lib/absoluteUrl";
import { getSiteUrl } from "@/lib/siteUrl";

const CANONICAL = "/unmanned-aircraft-germany";
const OG_IMAGE = "/theme/hpaa1.jpg";

export const metadata: Metadata = {
  title: "Unmanned Aircraft Certification | EASA Part-145 Conversion — KUM Services GmbH",
  description:
    "How unmanned aircraft conversions stay certified and airworthy: EASA Part-145 certified maintenance and modification, retained civil registration, continued airworthiness, BVLOS approvals and airspace integration. Certified in Germany, operated worldwide by KUM Services GmbH.",
  keywords: [
    "unmanned aircraft certification",
    "EASA Part-145 unmanned aircraft",
    "unmanned aircraft airworthiness",
    "civil registration unmanned aircraft",
    "BVLOS approval",
    "unmanned aircraft airspace integration",
    "certified unmanned aircraft conversion Germany",
    "continued airworthiness UAS",
    "ferry flight civil registration",
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
    title: "Unmanned Aircraft Certification & Airworthiness | KUM Services GmbH",
    description:
      "EASA Part-145 certified maintenance and modification, retained civil registration, and continued airworthiness for unmanned aircraft conversions — certified in Germany, operated worldwide.",
    images: [{ url: absoluteUrl(OG_IMAGE), width: 1200, height: 630, alt: "Unmanned Aircraft Certification — KUM Services GmbH" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Unmanned Aircraft Certification | KUM Services GmbH",
    description: "EASA Part-145 certified unmanned aircraft conversion — certified in Germany, operated worldwide.",
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
        name: "Unmanned Aircraft Certification & Airworthiness — KUM Services GmbH",
        description:
          "How KUM Services GmbH keeps unmanned aircraft conversions certified and airworthy: EASA Part-145 certified maintenance and modification, retained civil registration, BVLOS approvals, airspace integration, and continued airworthiness — certified in Germany, operated worldwide.",
        inLanguage: "en",
        isPartOf: { "@id": `${base}/#website` },
        about: { "@id": `${base}/#hpaa` },
        publisher: { "@id": `${base}/#organization` },
        keywords: "unmanned aircraft certification, EASA Part-145 unmanned aircraft, unmanned aircraft airworthiness, civil registration unmanned aircraft, BVLOS approval, airspace integration, KUM Services GmbH",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
          { "@type": "ListItem", position: 2, name: "Unmanned Aircraft Certification & Airworthiness", item: `${base}${CANONICAL}` },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${base}${CANONICAL}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "Are converted unmanned aircraft EASA certified?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "All conversion, maintenance, and modification work by KUM Services GmbH is performed under EASA Part-145 certified procedures by Part One-Forty Five GmbH at Neuhausen ob Eck Airfield in Germany. Every modification is documented against the certified maintenance and modification framework, so the aircraft's airworthiness record remains complete and traceable throughout the conversion.",
            },
          },
          {
            "@type": "Question",
            name: "Can an unmanned conversion keep its civil registration?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Aircraft converted by KUM Services GmbH retain their civil registration throughout conversion and subsequent operation. The base airframe remains a civil-registered aircraft with a documented maintenance history, which simplifies registry matters, insurance, and cross-border movement compared with purpose-built unmanned systems.",
            },
          },
          {
            "@type": "Question",
            name: "How is airworthiness maintained after conversion?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Continued airworthiness is supported by EASA Part-145 certified maintenance procedures and full documentation of every modification performed on the airframe. Because the base aircraft types — Cessna 208, King Air 350, Pilatus PC-12, Citation 525B, and C-130J — are supported by global civil spare-parts and service networks, scheduled maintenance and repairs can be sustained wherever the aircraft operates.",
            },
          },
          {
            "@type": "Question",
            name: "Can converted aircraft be ferried internationally?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Because the converted aircraft retains its civil registration, it can conduct ferry flights to the customer's operating location under standard civil aviation rules, without special overflight permits. This allows delivery across borders using existing civil aviation infrastructure and significantly shortens the path to operational deployment.",
            },
          },
        ],
      },
      {
        "@type": "Service",
        name: "Certified Unmanned Aircraft Conversion — EASA Part-145",
        description:
          "KUM Services GmbH converts civil-registered turboprop and turbofan aircraft into unmanned platforms under EASA Part-145 certified maintenance and modification procedures. Civil registration is retained, airworthiness is documented, and aircraft ferry worldwide under standard civil aviation rules.",
        serviceType: "Certified Unmanned Aircraft Conversion",
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
          <p className="section-eyebrow">KUM Services GmbH · Certified in Germany, Operated Worldwide</p>
          <h1 className="section-heading" style={{ maxWidth: 720 }}>
            Unmanned Aircraft Certification —{" "}
            <em>EASA Part-145, Airworthiness &amp; Airspace</em>
          </h1>
        </div>
      </div>

      {/* Introduction */}
      <section className="section">
        <p className="section-eyebrow">Certification, Regulation &amp; Airspace</p>
        <h2 className="section-heading">
          How Unmanned Conversions Stay <em>Certified &amp; Airworthy</em>
        </h2>
        <p className="section-lead">
          Converting a civil aircraft to unmanned operation is as much a regulatory undertaking as
          an engineering one. KUM Services GmbH performs every conversion under EASA Part-145
          certified maintenance and modification procedures, keeps the aircraft on its civil
          registration throughout, and documents each modification so the airworthiness record
          remains complete and traceable. The result: unmanned aircraft that are certified in
          Germany and can be operated, maintained, and ferried worldwide within the existing civil
          aviation system — for ISR, cargo, and special-mission operators.
        </p>
      </section>

      {/* Callout */}
      <div className="callout-strip reveal">
        <div className="callout-img">
          <Image
            fill
            src="/theme/hpaa7.jpg"
            alt="EASA Part-145 certified unmanned aircraft conversion — KUM Services GmbH Germany"
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 90vw, 50vw"
          />
          <div className="callout-img-overlay" />
        </div>
        <div className="callout-text">
          <p className="section-eyebrow">The Regulatory Foundation</p>
          <h2 className="callout-heading">
            Civil Registration. <em>Certified Modification.</em>
          </h2>
          <p className="callout-body">
            Every KUM Services conversion starts from a civil-registered airframe — Cessna 208,
            Beechcraft King Air 350, Pilatus PC-12, Cessna Citation 525B, or C-130J — with a
            documented maintenance history. Conversion work is carried out under EASA Part-145
            certified procedures by Part One-Forty Five GmbH at Neuhausen ob Eck Airfield, and the
            aircraft retains its civil registration from acquisition through delivery. That
            continuity of registration and documentation is what allows the converted aircraft to
            ferry internationally under standard civil aviation rules and to remain supportable by
            established civil maintenance networks throughout its service life.
          </p>
          <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link className="btn-gold" href="/contact">Request a Proposal</Link>
            <Link className="btn-ghost" href="/aircraft">View Platforms</Link>
          </div>
        </div>
      </div>

      {/* Why certification matters */}
      <section className="section">
        <p className="section-eyebrow">Why the Certified Path Matters</p>
        <h2 className="section-heading">Regulatory <em>Advantages</em></h2>
        <div className="why-grid" style={{ marginTop: "2rem" }}>
          {[
            { n: "01", t: "Certified From Day One", d: "The base aircraft arrives with an existing airworthiness record. Conversion under EASA Part-145 certified procedures builds on that record instead of starting a new certification effort from zero." },
            { n: "02", t: "Registry Continuity", d: "Civil registration is retained throughout conversion and operation. Registry, insurance, and cross-border administration follow established civil aviation practice rather than bespoke unmanned frameworks." },
            { n: "03", t: "Traceable Documentation", d: "Every modification is documented against certified maintenance and modification procedures, giving operators and authorities a complete, auditable configuration and airworthiness history." },
            { n: "04", t: "Worldwide Supportability", d: "Because the airframes are established civil types, spare parts, tooling, and qualified maintenance are available through global civil networks — certified in Germany, sustainable wherever the aircraft operates." },
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
        <p className="section-eyebrow">Certified Base Airframes</p>
        <h2 className="section-heading">Proven Types, <em>Documented Histories</em></h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.5rem",
            marginTop: "2rem",
          }}
        >
          {[
            { src: "/theme/cessna-208-1.png", alt: "Cessna 208 — civil-registered base airframe for certified unmanned conversion", label: "Cessna 208" },
            { src: "/theme/beech-king-air-350-5.png", alt: "King Air 350 — EASA Part-145 certified unmanned aircraft conversion", label: "King Air 350" },
            { src: "/theme/pilatus-pc-12-1.png", alt: "Pilatus PC-12 — civil registration retained through unmanned conversion", label: "Pilatus PC-12" },
            { src: "/theme/hpaa6.jpg", alt: "HPAA platform — certified unmanned aircraft conversion, KUM Services GmbH", label: "HPAA Platform" },
          ].map((img) => (
            <div key={img.src} style={{ position: "relative", overflow: "hidden", height: 200 }}>
              <Image
                fill
                src={img.src}
                alt={img.alt}
                style={{ objectFit: "cover", filter: "saturate(0.8)" }}
                sizes="(max-width: 768px) 45vw, 25vw"
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

      {/* Compliance & process */}
      <section className="section" style={{ background: "var(--navy)", color: "var(--cream)" }}>
        <p className="section-eyebrow" style={{ color: "var(--gold-light)" }}>Compliance &amp; Process</p>
        <h2 className="section-heading" style={{ color: "var(--warm-white)" }}>
          Certification Through <em>Every Phase</em>
        </h2>
        <div className="why-grid" style={{ marginTop: "2rem" }}>
          {[
            { n: "145", t: "Part-145 Maintenance", d: "All maintenance and conversion work is performed under EASA Part-145 certified procedures by Part One-Forty Five GmbH at Neuhausen ob Eck Airfield, keeping the aircraft within the certified maintenance system throughout." },
            { n: "MOD", t: "Modification & Documentation", d: "Autonomous flight control systems, BVLOS datalinks, and mission payloads are integrated as documented modifications. Configuration records give authorities and operators a complete, auditable trail." },
            { n: "REG", t: "Civil Registration", d: "The aircraft remains civil-registered from acquisition through conversion and delivery. Registry continuity simplifies insurance, administration, and international movement of the platform." },
            { n: "BVLOS", t: "BVLOS & Airspace Integration", d: "Conversions are equipped with BVLOS datalinks and ground control stations designed for beyond-visual-line-of-sight operation, supporting operators as they obtain approvals and integrate the aircraft into their national airspace framework." },
            { n: "FER", t: "Ferry on Civil Registration", d: "The civil-registered aircraft ferries to the customer's operating location under standard civil aviation rules — no special overflight permits — enabling delivery worldwide through existing infrastructure." },
            { n: "CAW", t: "Continued Airworthiness", d: "After delivery, airworthiness is sustained through established civil maintenance networks for the base types, supported by the documented modification baseline created during conversion." },
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
            { href: "/autonomous-aircraft-germany", t: "Autonomous Aircraft Germany", d: "Programme overview — civil aircraft converted to autonomous platforms." },
            { href: "/robot-aircraft-germany", t: "Robot Aircraft Germany", d: "The technology stack behind autonomous flight control and mission systems." },
            { href: "/drone-aircraft-conversion-germany", t: "Drone Aircraft Conversion", d: "The step-by-step conversion process from civil airframe to unmanned platform." },
            { href: "/autonomous-platform-aircraft-germany", t: "Autonomous Platform Aircraft", d: "Platform options and payload integration for ISR, cargo, and special missions." },
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
        <h2 className="section-heading">Discuss <em>Certification &amp; Airworthiness</em></h2>
        <p className="section-lead" style={{ margin: "1rem auto 2rem", maxWidth: 560 }}>
          KUM Services GmbH — EASA Part-145 certified unmanned aircraft conversion for defence
          ministries, government agencies, and special-mission operators. Certified in Germany,
          operated worldwide.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link className="btn-gold" href="/contact">Request a Proposal</Link>
          <Link className="btn-ghost" href="/">Back to Home</Link>
        </div>
      </section>
    </>
  );
}
