import Image from "next/image";
import { HomeCarousel } from "@/app/home/HomeCarousel";
import { WhyUsSection } from "@/app/home/sections/WhyUsSection";
import { AircraftSection } from "@/app/home/sections/AircraftSection";
import { ApplicationsSection } from "@/app/home/sections/ApplicationsSection";
import { PartnersSection } from "@/app/home/sections/PartnersSection";
import { ContactSection } from "@/app/home/sections/ContactSection";
import { siteData } from "@/data/siteData";
import { linkKeywords } from "@/lib/linkKeywords";
import { CountUp } from "@/app/home/CountUp";

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

      <section id="approach" className="section approach">
        <div className="home-split-grid">
          <div className="approach-text reveal">
            <p className="section-eyebrow">{siteData.approach.eyebrow}</p>
            <h2 className="section-heading">
              {siteData.approach.title.pre}
              <br />
              <em>{siteData.approach.title.emphasis}</em>
            </h2>
            <p className="section-lead">{linkKeywords(siteData.approach.description)}</p>
            <div className="approach-ctas">
              <a className="btn-gold" href={siteData.approach.primaryCta.href}>{siteData.approach.primaryCta.label}</a>
              <a className="btn-ghost ac-btn-ghost-dark" href={siteData.approach.secondaryCta.href}>
                {siteData.approach.secondaryCta.label}
              </a>
            </div>
          </div>
          <div className="approach-visual reveal">
            <div className="approach-photo">
              <Image
                fill
                src={siteData.approach.featureImage.url}
                alt={siteData.approach.featureImage.alt}
                style={{ objectFit: "cover", objectPosition: "center" }}
                sizes="(max-width: 768px) 90vw, 50vw"
              />
              {/* Decorative flight route drawn across the photo, with a moving waypoint. */}
              <svg className="approach-route" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                <path id="approach-route-path" d="M24 268 C 110 250, 150 150, 230 120 S 350 70, 384 34" />
                <circle className="approach-route-start" cx="24" cy="268" r="4" />
                <circle className="approach-route-end" cx="384" cy="34" r="4" />
                <g className="approach-route-plane">
                  <circle r="5" />
                  <circle r="11" className="approach-route-halo" />
                  <animateMotion dur="7s" repeatCount="indefinite" rotate="auto" begin="1.6s">
                    <mpath href="#approach-route-path" />
                  </animateMotion>
                </g>
              </svg>
            </div>
            <div className="approach-metric">
              <div className="approach-metric-value">
                <CountUp value={siteData.approach.featureImage.metricValue} />
              </div>
              <div className="approach-metric-label">{siteData.approach.featureImage.metricLabel}</div>
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
