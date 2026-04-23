import { getSiteUrl } from "@/lib/siteUrl";
import { siteData } from "@/data/siteData";

/**
 * /llms.txt — AI crawler discovery file (llmstxt.org standard).
 * Tells LLMs (ChatGPT, Perplexity, Claude, etc.) what this site is about
 * and where its key content lives. Invisible to human users.
 */
export async function GET() {
  const base = getSiteUrl().replace(/\/$/, "");

  const aircraftList = (siteData.aircraft.aircrafts as { name: string; slug: string; description: string }[])
    .map((a) => `- [${a.name}](${base}/aircraft/${a.slug}): ${a.description.slice(0, 120).trim()}…`)
    .join("\n");

  const applicationList = (siteData.applications.cards as { title: string; description: string }[])
    .map((c) => `- ${c.title}: ${c.description}`)
    .join("\n");

  const content = `# ${siteData.brand.name} — HPAA (High Performance Autonomous Aircraft)

> ${siteData.brand.name}, ${siteData.brand.tagline}: specialist integrator converting civil-registered aircraft into HPAA (High Performance Autonomous Aircraft) and autonomous aircraft robot platforms for government, defence, and special-mission customers worldwide.

HPAA = High Performance Autonomous Aircraft. Civil aircraft (turboprop or turbofan) are converted on-site into fully autonomous or optionally piloted platforms for ISR, cargo delivery, counter-UAS, range extension, and kinetic payload missions. Conversion retains civil registration so no special flight permits are required for ferry flights. EASA Part-145 certified maintenance partner. Based in Konstanz, Germany.

## Key pages

- [Home](${base}/): Overview of HPAA conversion services, platform catalogue, and applications
- [Why HPAA](${base}/why-us): Advantages of civil aircraft conversion over purpose-built UAV programmes — cost, speed, global support
- [Aircraft Platforms](${base}/aircraft): Available HPAA base platforms — Cessna Citation 525B, Cessna 208, C-130J, Beech King Air 350, Pilatus PC-12
- [Applications](${base}/applications): Operational use cases — ISR, cargo, defensive operations, range extension, counter-UAS
- [Partners](${base}/partners): EASA Part-145 maintenance partner (Part One-Forty Five GmbH), university and avionics partners
- [Contact / Request a Proposal](${base}/contact): Enquire about a tailored HPAA programme

## HPAA Germany keyword pages

- [HPAA Germany](${base}/hpaa-germany): High Performance Autonomous Aircraft Germany — HPAA conversion specialist KUM Services GmbH Konstanz
- [Robot Aircraft Germany](${base}/robot-aircraft-germany): Robot aircraft and robotic aircraft Germany — civil aircraft to robot/autonomous platform conversion
- [Autonomous Aircraft Germany](${base}/autonomous-aircraft-germany): Autonomous aircraft Germany — civil aircraft to autonomous platform conversion
- [Unmanned Aircraft Germany](${base}/unmanned-aircraft-germany): Unmanned aircraft Germany — manned to unmanned conversion (UAS/UAV) by KUM Services GmbH
- [Drone Aircraft Conversion Germany](${base}/drone-aircraft-conversion-germany): Drone aircraft conversion Germany — civil aircraft to high-performance drone platform
- [High-Performance Combat Drones Germany](${base}/high-performance-combat-drones-germany): High-performance combat drones Germany — civil aircraft converted to combat drone (UCAV) platforms for strike and ISR
- [Autonomous Platform Aircraft Germany](${base}/autonomous-platform-aircraft-germany): Autonomous platform aircraft Germany — civil aircraft to multi-role autonomous platform conversion

## Aircraft platforms

${aircraftList}

## Operational applications

${applicationList}

## Organisation

- Company: ${siteData.brand.name}
- Location: Konstanz, Baden-Württemberg, Germany
- Role: Lead integrator for HPAA conversion programmes
- Email: info@kum-trading.consulting
- Certification: EASA Part-145 partner (Part One-Forty Five GmbH)
- Academic partner: German universities and avionics integrators

## Key terms

- HPAA: High Performance Autonomous Aircraft
- Civil aircraft conversion: converting commercially registered aircraft into autonomous platforms
- Robot aircraft Germany: autonomous aircraft conversion services in Germany
- BVLOS: Beyond Visual Line of Sight operations
- ISR: Intelligence, Surveillance and Reconnaissance
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
