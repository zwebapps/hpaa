import { HomeCarousel } from "./home/HomeCarousel";
import { WhyUsSection } from "./home/sections/WhyUsSection";
import { AircraftSection } from "./home/sections/AircraftSection";
import { ApplicationsSection } from "./home/sections/ApplicationsSection";
import { PartnersSection } from "./home/sections/PartnersSection";
import { ContactSection } from "./home/sections/ContactSection";

export default function Home() {
  return (
    <main>
      <HomeCarousel />

      <div className="trust-bar">
        <div className="trust-item">
          <div className="trust-icon">✈</div>
          <div className="trust-text">
            <strong>EASA Part-145 Certified</strong>
            <span>Certified maintenance partner</span>
          </div>
        </div>
        <div className="trust-item">
          <div className="trust-icon">⚙</div>
          <div className="trust-text">
            <strong>1–2 Day Conversion</strong>
            <span>On-site, no permits required</span>
          </div>
        </div>
        <div className="trust-item">
          <div className="trust-icon">🌐</div>
          <div className="trust-text">
            <strong>Worldwide Support</strong>
            <span>Global parts & maintenance</span>
          </div>
        </div>
        <div className="trust-item">
          <div className="trust-icon">🎓</div>
          <div className="trust-text">
            <strong>University of Stuttgart</strong>
            <span>Academic flight control partner</span>
          </div>
        </div>
      </div>

      <section id="approach" className="section">
        <div className="home-split-grid">
          <div>
            <p className="section-eyebrow">Our Approach</p>
            <h2 className="section-heading">
              Purpose-Built.
              <br />
              <em>Proven Performance.</em>
            </h2>
            <p className="section-lead">
              We take the world&apos;s most trusted civil aircraft and transform them into
              mission-specific platforms — combining thousands of hours of proven reliability with
              the exact capabilities you need, at a fraction of the cost of purpose-built
              alternatives.
            </p>
            <div style={{ marginTop: "2.5rem", display: "flex", gap: "1rem" }}>
              <a className="btn-gold" href="/#why-us">
                Our Advantage
              </a>
              <a
                className="btn-ghost"
                href="/#aircraft"
                style={{ color: "var(--navy)", borderColor: "rgba(11,17,32,0.25)" }}
              >
                View Aircraft
              </a>
            </div>
          </div>
          <div style={{ position: "relative", height: 380 }}>
            <img
              src="/pdf/customized-drones/customized-drones_p04_x36.jpeg"
              alt="Aircraft fleet"
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
                20+
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
                Aircraft Types Available
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
