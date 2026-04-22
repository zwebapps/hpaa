import Image from "next/image";
import { siteData } from "@/data/siteData";

export function WhyUsSection() {
  const section = siteData.whyUs;

  return (
    <div id="why-us">
      <div className="page-header">
        <div
          className="page-header-bg"
          style={{ backgroundImage: `url('${section.headerBg}')` }}
          aria-hidden="true"
        />
        <div className="page-header-scrim" />
        <div className="page-header-content">
          <p className="section-eyebrow">{section.eyebrow}</p>
          <h2 className="section-heading">
            {section.title.pre}
            <br />
            <em>{section.title.emphasis}</em>
          </h2>
        </div>
      </div>

      <section className="section" style={{ paddingBottom: "3rem" }}>
        <p className="section-lead" style={{ maxWidth: "100%" }}>
          {section.lead}
        </p>
        <div className="why-grid">
          {section.cards.map((card, idx) => (
            <div key={card.number} className={`why-card reveal${idx > 0 ? ` reveal-delay-${Math.min(idx, 3)}` : ""}`}>
              <div className="why-card-num">{card.number}</div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="callout-strip reveal">
        <div className="callout-img">
          <Image
            fill
            src={section.callout.imageUrl}
            alt={section.callout.imageAlt}
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="callout-img-overlay" />
        </div>
        <div className="callout-text">
          <p className="section-eyebrow">{section.callout.eyebrow}</p>
          <h3 className="callout-heading">
            {section.callout.title.pre}
            <br />
            <em>{section.callout.title.emphasis}</em>
          </h3>
          <p className="callout-body">{section.callout.description}</p>
          <div style={{ marginTop: "2rem" }}>
            <a className="btn-gold" href={section.callout.cta.href}>{section.callout.cta.label}</a>
          </div>
        </div>
      </div>
    </div>
  );
}
