import { AircraftTabs } from "@/app/aircraft/AircraftTabs";
import { siteData } from "@/data/siteData";

export function AircraftSection() {
  const section = siteData.aircraft;

  return (
    <div id="aircraft">
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

      <section className="section" style={{ paddingBottom: 0, paddingTop: "3rem" }}>
        <p className="section-lead" style={{ marginBottom: "2.5rem" }}>{section.lead}</p>
      </section>

      <AircraftTabs />
    </div>
  );
}
