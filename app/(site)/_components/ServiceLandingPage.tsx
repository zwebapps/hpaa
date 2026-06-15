import Image from "next/image";
import Link from "next/link";
import { getSiteUrl } from "@/lib/siteUrl";
import type { ServiceLandingContent } from "@/lib/seo/serviceLandingContent";

export function ServiceLandingPage({ content }: { content: ServiceLandingContent }) {
  const base = getSiteUrl().replace(/\/$/, "");
  const canonical = content.canonical;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${base}${canonical}`,
        url: `${base}${canonical}`,
        name: content.pageName,
        description: content.jsonLdDescription,
        inLanguage: "en",
        isPartOf: { "@id": `${base}/#website` },
        publisher: { "@id": `${base}/#organization` },
        keywords: content.jsonLdKeywords,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
          { "@type": "ListItem", position: 2, name: content.pageName, item: `${base}${canonical}` },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${base}${canonical}#faq`,
        mainEntity: content.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
      {
        "@type": "Service",
        name: content.pageName,
        description: content.jsonLdDescription,
        provider: { "@id": `${base}/#organization` },
        areaServed: "Worldwide",
        serviceType: content.pageName,
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="page-header" style={{ minHeight: 420 }}>
        <div
          className="page-header-bg"
          style={{ backgroundImage: `url('${content.ogImage}')` }}
          aria-hidden="true"
        />
        <div className="page-header-scrim" />
        <div className="page-header-content" style={{ padding: "6rem 2rem 4rem" }}>
          <p className="section-eyebrow">{content.heroEyebrow}</p>
          <h1 className="section-heading" style={{ maxWidth: 720 }}>
            {content.heroH1.pre} <em>{content.heroH1.emphasis}</em>
          </h1>
        </div>
      </div>

      <section className="section">
        <p className="section-eyebrow">{content.introEyebrow}</p>
        <h2 className="section-heading">
          {content.introHeading.pre} <em>{content.introHeading.emphasis}</em>
        </h2>
        <p className="section-lead">{content.introLead}</p>
      </section>

      <div className="callout-strip reveal">
        <div className="callout-img">
          <Image
            fill
            src={content.calloutImage.src}
            alt={content.calloutImage.alt}
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 90vw, 50vw"
          />
          <div className="callout-img-overlay" />
        </div>
        <div className="callout-text">
          <p className="section-eyebrow">{content.calloutEyebrow}</p>
          <h2 className="callout-heading">
            {content.calloutHeading.pre}
            <br />
            <em>{content.calloutHeading.emphasis}</em>
          </h2>
          <p className="callout-body">{content.calloutBody}</p>
          <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link className="btn-gold" href="/contact">
              Request a Proposal
            </Link>
            <Link className="btn-ghost" href="/partners">
              View Partners
            </Link>
          </div>
        </div>
      </div>

      <section className="section">
        <p className="section-eyebrow">{content.advantagesEyebrow}</p>
        <h2 className="section-heading">
          {content.advantagesHeading.pre} <em>{content.advantagesHeading.emphasis}</em>
        </h2>
        <p className="section-lead" style={{ marginBottom: "2.5rem" }}>
          {content.advantagesLead}
        </p>
        <div className="why-grid">
          {content.advantages.map((card) => (
            <div key={card.num} className="why-card reveal">
              <div className="why-card-num">{card.num}</div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="faq">
        <p className="section-eyebrow">FAQ</p>
        <h2 className="section-heading">
          Frequently Asked <em>Questions</em>
        </h2>
        <div className="why-grid" style={{ marginTop: "2rem" }}>
          {content.faq.map((item) => (
            <div key={item.question} className="why-card reveal">
              <h3 style={{ marginTop: 0 }}>{item.question}</h3>
              <p>{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <p className="section-eyebrow">{content.relatedEyebrow}</p>
        <h2 className="section-heading">
          {content.relatedHeading.pre} <em>{content.relatedHeading.emphasis}</em>
        </h2>
        <div className="why-grid" style={{ marginTop: "2rem" }}>
          {content.related.map((item) => (
            <div key={item.href} className="why-card reveal">
              <h3>
                <Link href={item.href} style={{ color: "inherit", textDecoration: "none" }}>
                  {item.title}
                </Link>
              </h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section" style={{ textAlign: "center" }}>
        <p className="section-eyebrow">Contact</p>
        <h2 className="section-heading">
          {content.ctaHeading.pre} <em>{content.ctaHeading.emphasis}</em>
        </h2>
        <p className="section-lead" style={{ margin: "1rem auto 2rem", maxWidth: 560 }}>
          {content.ctaLead}
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link className="btn-gold" href="/contact">
            Request a Proposal
          </Link>
          <Link className="btn-ghost" href="/">
            Back to Home
          </Link>
        </div>
      </section>
    </>
  );
}
