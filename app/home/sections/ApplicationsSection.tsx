import { siteData } from "@/data/siteData";

export function ApplicationsSection() {
  const section = siteData.applications;

  return (
    <div id="applications">
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
      <section className="section">
        <p className="section-lead" style={{ marginBottom: "3rem" }}>
          {section.lead}
        </p>
        <div className="usage-grid">
          {section.cards.map((card, idx) => (
            <div
              key={card.title}
              className={`usage-card reveal${idx % 3 === 1 ? " reveal-delay-1" : idx % 3 === 2 ? " reveal-delay-2" : ""}`}
            >
              <div className="usage-card-icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
