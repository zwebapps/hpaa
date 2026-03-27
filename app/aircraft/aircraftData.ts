export type AircraftSlug = "citation-525b" | "cessna-208" | "c130j" | "king-air-350";

export type SpecRow = { label: string; value: string };

export type Aircraft = {
  slug: AircraftSlug;
  name: string;
  category: string;
  images: string[];
  specs: SpecRow[];
  description: string;
  details: string[];
};

export const aircrafts: Aircraft[] = [
  {
    slug: "citation-525b",
    name: "Cessna Citation 525B",
    category: "Business Jet · High-Altitude / Long-Range",
    images: [
      "/pdf/customized-drones/customized-drones_p03_x27.jpeg",
      "/pdf/customized-drones/customized-drones_p03_x28.jpeg",
      "/pdf/customized-drones/customized-drones_p03_x29.jpeg",
      "/pdf/customized-drones/customized-drones_p03_x30.jpeg",
    ],
    specs: [
      { label: "Max Speed", value: "417 kts / 772 km/h" },
      { label: "Service Ceiling", value: "45,000 ft / 13,700 m" },
      { label: "Range", value: "1,875 NM / 3,473 km" },
      { label: "Powerplant", value: "Twin Turbofan" },
      { label: "Availability", value: "Worldwide" },
    ],
    description:
      "Exceptional speed and altitude capability make the Citation 525B ideal for high-speed, long-range operations. Its jet performance delivers wide-area coverage and rapid response times — a proven platform with a global support network.",
    details: [
      "Best suited for fast turnarounds and mission profiles requiring high cruise performance.",
      "Conversion keeps the civil register and enables worldwide operational flexibility.",
      "We tailor mission systems to your payload, endurance, and installation constraints.",
    ],
  },
  {
    slug: "cessna-208",
    name: "Cessna 208",
    category: "Single Turboprop · Multi-Role / Utility",
    images: [
      "/pdf/customized-drones/customized-drones_p05_x42.jpeg",
      "/pdf/customized-drones/customized-drones_p05_x43.jpeg",
      "/pdf/customized-drones/customized-drones_p05_x44.jpeg",
      "/pdf/customized-drones/customized-drones_p05_x45.jpeg",
    ],
    specs: [
      { label: "Cruise Speed", value: "~186 kts / 344 km/h" },
      { label: "Service Ceiling", value: "25,000 ft / 7,620 m" },
      { label: "Range", value: "~1,070 NM / 1,980 km" },
      { label: "Powerplant", value: "Single Turboprop" },
      { label: "Availability", value: "Worldwide" },
    ],
    description:
      "A rugged workhorse with strong short-field performance and flexible interior configuration. The 208 is ideal for logistics, ISR payloads, and operations into austere environments.",
    details: [
      "Optimized for multi-role configurations and payload integration.",
      "Suitable for missions that require frequent routing changes and quick deployment.",
      "We define interfaces for sensors, mission computers, and power distribution.",
    ],
  },
  {
    slug: "c130j",
    name: "C-130J Hercules",
    category: "Heavy Transport · Long-Range / High-Payload",
    images: [
      "/pdf/customized-drones/customized-drones_p06_x51.jpeg",
      "/pdf/customized-drones/customized-drones_p06_x52.jpeg",
    ],
    specs: [
      { label: "Cruise Speed", value: "~355 kts / 657 km/h" },
      { label: "Service Ceiling", value: "28,000 ft / 8,534 m" },
      { label: "Range", value: "~2,835 NM / 5,250 km" },
      { label: "Powerplant", value: "4× Turboprop" },
      { label: "Availability", value: "Worldwide" },
    ],
    description:
      "Maximum range and payload capacity in a single platform. The C-130J conversion represents the pinnacle of large-scale customized aviation capability — suited to the most demanding long-range, high-payload requirements.",
    details: [
      "Designed for high-capacity cargo and mission systems integration.",
      "We support end-to-end project planning with clear milestones.",
      "Payload and mission installation are engineered around your operating environment.",
    ],
  },
  {
    slug: "king-air-350",
    name: "Beech King Air 350",
    category: "Twin Turboprop · ISR / Multi-Mission",
    images: [
      "/pdf/customized-drones/customized-drones_p08_x65.jpeg",
      "/pdf/customized-drones/customized-drones_p08_x66.jpeg",
      "/pdf/customized-drones/customized-drones_p08_x67.jpeg",
      "/pdf/customized-drones/customized-drones_p08_x68.jpeg",
      "/pdf/customized-drones/customized-drones_p08_x69.jpeg",
    ],
    specs: [
      { label: "Cruise Speed", value: "~310 kts / 574 km/h" },
      { label: "Service Ceiling", value: "35,000 ft / 10,670 m" },
      { label: "Range", value: "~1,750 NM / 3,240 km" },
      { label: "Powerplant", value: "Twin Turboprop" },
      { label: "Availability", value: "Worldwide" },
    ],
    description:
      "A highly capable and widely supported multi-mission platform with excellent endurance. The King Air 350 is a proven choice for ISR, special missions, and multi-role configurations.",
    details: [
      "A flexible platform for sensors, communications, and operational mission kits.",
      "We engineer mission integration to support predictable performance and maintenance.",
      "A strong option when you need endurance plus operational versatility.",
    ],
  },
];

export function getAircraftBySlug(
  slug: string | string[] | undefined,
): Aircraft | undefined {
  const raw = Array.isArray(slug) ? slug[0] : slug;
  if (!raw) return undefined;

  const normalized = (() => {
    try {
      return decodeURIComponent(raw).trim().toLowerCase();
    } catch {
      return raw.trim().toLowerCase();
    }
  })();

  return aircrafts.find((a) => a.slug.toLowerCase() === normalized);
}

