import { AircraftTabs } from "@/app/aircraft/AircraftTabs";
import { siteData } from "@/data/siteData";

export function AircraftSection() {
  const section = siteData.aircraft;

  return (
    <div id="aircraft">
      <div className="page-header aircraft-focus-target">
        <div
          className="page-header-bg"
          style={{ backgroundImage: `url('${section.headerBg}')` }}
          aria-hidden="true"
        />
        <div className="page-header-scrim" />
        <div className="page-header-content aircraft-focus-animate reveal">
          <p className="section-eyebrow reveal reveal-delay-1">{section.eyebrow}</p>
          <h2 className="section-heading reveal reveal-delay-2">
            {section.title.pre} <em>{section.title.emphasis}</em>
          </h2>
        </div>
      </div>

      <section className="section" style={{ paddingBottom: 0, paddingTop: "3rem" }}>
        <p className="section-lead reveal reveal-delay-1" style={{ marginBottom: "2.5rem" }}>
          {section.lead}
        </p>
      </section>

      <AircraftTabs />
    </div>
  );
}
