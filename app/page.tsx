import { HomeCarousel } from "./home/HomeCarousel";
import { WhyUsSection } from "./home/sections/WhyUsSection";
import { AircraftSection } from "./home/sections/AircraftSection";
import { ApplicationsSection } from "./home/sections/ApplicationsSection";
import { PartnersSection } from "./home/sections/PartnersSection";
import { ContactSection } from "./home/sections/ContactSection";
import { siteData } from "@/data/siteData";
import { linkKeywords } from "@/lib/linkKeywords";

export default function Home() {
  return (
    <main>
      <HomeCarousel />

      <div className="trust-bar">
        {siteData.trustBar.map((item) => (
          <div key={item.title} className="trust-item">
            <div className="trust-icon">{item.icon}</div>
            <div className="trust-text">
              <strong>{item.title}</strong>
              <span>{item.subtitle}</span>
            </div>
          </div>
        ))}
      </div>

      <section id="approach" className="section">
        <div className="home-split-grid">
          <div>
            <p className="section-eyebrow">{siteData.approach.eyebrow}</p>
            <h2 className="section-heading">
              {siteData.approach.title.pre}
              <br />
              <em>{siteData.approach.title.emphasis}</em>
            </h2>
            <p className="section-lead">{linkKeywords(siteData.approach.description)}</p>
            <div style={{ marginTop: "2.5rem", display: "flex", gap: "1rem" }}>
              <a className="btn-gold" href={siteData.approach.primaryCta.href}>{siteData.approach.primaryCta.label}</a>
              <a
                className="btn-ghost"
                href={siteData.approach.secondaryCta.href}
                style={{ color: "var(--navy)", borderColor: "rgba(11,17,32,0.25)" }}
              >
                {siteData.approach.secondaryCta.label}
              </a>
            </div>
          </div>
          <div style={{ position: "relative", height: 380 }}>
            <img
              src={siteData.approach.featureImage.url}
              alt={siteData.approach.featureImage.alt}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                display: "block",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "-1.5rem",
                left: "-1.5rem",
                background: "var(--navy)",
                padding: "1.5rem 2rem",
              }}
            >
              <div
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: "2rem",
                  fontWeight: 300,
                  color: "var(--gold)",
                  lineHeight: 1,
                }}
              >
                {siteData.approach.featureImage.metricValue}
              </div>
              <div
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "rgba(248,245,239,0.5)",
                  marginTop: 4,
                }}
              >
                {siteData.approach.featureImage.metricLabel}
              </div>
            </div>
          </div>
        </div>
      </section>

      <WhyUsSection />
      <AircraftSection />
      <ApplicationsSection />
      <PartnersSection />
      <ContactSection />
    </main>
  );
}
