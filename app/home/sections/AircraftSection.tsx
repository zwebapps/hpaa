import { AircraftTabs } from "@/app/aircraft/AircraftTabs";

export function AircraftSection() {
  return (
    <div id="aircraft">
      <div className="page-header">
        <div
          className="page-header-bg"
          style={{ backgroundImage: "url('/theme/hpaa2.jpg')" }}
          aria-hidden="true"
        />
        <div className="page-header-scrim" />
        <div className="page-header-content">
          <p className="section-eyebrow">Platform Catalogue</p>
          <h2 className="section-heading">
            Available <em>Aircraft</em>
          </h2>
        </div>
      </div>

      <section className="section" style={{ paddingBottom: 0, paddingTop: "3rem" }}>
        <p className="section-lead" style={{ marginBottom: "2.5rem" }}>
          Each platform is selected based on its operational suitability, global availability, and
          proven track record. We match the airframe to your mission — not the other way around.
        </p>
      </section>

      <AircraftTabs />
    </div>
  );
}
