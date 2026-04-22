import Image from "next/image";
import { siteData } from "@/data/siteData";

export function PartnersSection() {
  const section = siteData.partners;

  return (
    <div id="partners">
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
            {section.title.pre} <em>{section.title.emphasis}</em>
          </h2>
        </div>
      </div>
      <section className="section" style={{ paddingBottom: "2rem" }}>
        <p className="section-lead" style={{ maxWidth: "100%" }}>
          {section.lead}
        </p>
      </section>
      <div className="partner-strip" style={{ marginBottom: "5rem" }}>
        {section.items.map((item, idx) => (
          <div
            key={item.id}
            className={`partner-card-new partner-row${item.layout === "text-image" ? " reverse" : ""} reveal${idx > 0 ? ` reveal-delay-${Math.min(idx, 3)}` : ""}`}
          >
            {item.layout !== "text-image" && (
              <div className="partner-card-img" style={{ position: "relative" }}>
                <Image fill src={item.imageUrl} alt={item.imageAlt} style={{ objectFit: "cover", objectPosition: "center" }} sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
            )}
            <div className="partner-card-body">
              <div className="partner-label">{item.label}</div>
              <div className="partner-title">{item.title}</div>
              <div className="partner-role">{item.role}</div>
              <p className="partner-text">{item.text}</p>
            </div>
            {item.layout === "text-image" && (
              <div className="partner-card-img" style={{ position: "relative" }}>
                <Image fill src={item.imageUrl} alt={item.imageAlt} style={{ objectFit: "cover", objectPosition: "center" }} sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
