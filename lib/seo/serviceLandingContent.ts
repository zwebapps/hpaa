export type ServiceLandingFaq = {
  question: string;
  answer: string;
};

export type ServiceLandingCard = {
  num: string;
  title: string;
  description: string;
};

export type ServiceLandingRelated = {
  href: string;
  title: string;
  description: string;
};

export type ServiceLandingContent = {
  canonical: string;
  pageName: string;
  ogImage: string;
  heroEyebrow: string;
  heroH1: { pre: string; emphasis: string };
  introEyebrow: string;
  introHeading: { pre: string; emphasis: string };
  introLead: string;
  calloutEyebrow: string;
  calloutHeading: { pre: string; emphasis: string };
  calloutBody: string;
  calloutImage: { src: string; alt: string };
  advantagesEyebrow: string;
  advantagesHeading: { pre: string; emphasis: string };
  advantagesLead: string;
  advantages: ServiceLandingCard[];
  faq: ServiceLandingFaq[];
  relatedEyebrow: string;
  relatedHeading: { pre: string; emphasis: string };
  related: ServiceLandingRelated[];
  ctaHeading: { pre: string; emphasis: string };
  ctaLead: string;
  jsonLdDescription: string;
  jsonLdKeywords: string;
};

export const easaPart145MroGermany: ServiceLandingContent = {
  canonical: "/easa-part-145-mro-germany",
  pageName: "EASA Part-145 MRO Germany",
  ogImage: "/theme/kum-gmbh.png",
  heroEyebrow: "KUM Services GmbH · Certified MRO Partner Network",
  heroH1: { pre: "EASA Part-145 MRO", emphasis: "Germany" },
  introEyebrow: "Aircraft Maintenance",
  introHeading: { pre: "Certified MRO for", emphasis: "Civil Platforms" },
  introLead:
    "KUM Services GmbH delivers aircraft modification and special mission programmes through an EASA Part-145 certified maintenance organisation. Maintenance, repair, and overhaul work is performed with Part One-Forty Five GmbH at Neuhausen ob Eck Airfield, Germany — providing the certified foundation for avionics integration, STC modifications, and platform conversion.",
  calloutEyebrow: "Certified Maintenance Partner",
  calloutHeading: { pre: "Part One-Forty Five GmbH", emphasis: "EASA Part-145" },
  calloutBody:
    "All modification and conversion work is conducted with Part One-Forty Five GmbH, an EASA Part-145 certified maintenance and repair organisation. This certified MRO capability supports line and base maintenance, structural and systems modifications, and airworthiness documentation for civil turboprop and turbofan platforms including Cessna Citation, King Air 350, Pilatus PC-12, Cessna 208, and C-130J.",
  calloutImage: {
    src: "/theme/kum-gmbh.png",
    alt: "KUM Services GmbH — EASA Part-145 MRO and aircraft modification programmes, Germany",
  },
  advantagesEyebrow: "MRO Capabilities",
  advantagesHeading: { pre: "Why EASA Part-145", emphasis: "Matters" },
  advantagesLead:
    "Certified MRO processes reduce programme risk for operators, lessors, and government customers requiring documented maintenance and modification standards.",
  advantages: [
    {
      num: "01",
      title: "Certified Maintenance",
      description:
        "EASA Part-145 procedures for scheduled maintenance, defect rectification, and modification support on civil-registered aircraft.",
    },
    {
      num: "02",
      title: "Modification & STC Support",
      description:
        "Structural and systems changes executed under approved maintenance organisation controls, aligned with STC and supplemental modification pathways.",
    },
    {
      num: "03",
      title: "Platform Coverage",
      description:
        "Experience across turboprop and business jet platforms commonly used for special mission and autonomous conversion programmes.",
    },
    {
      num: "04",
      title: "Programme Integration",
      description:
        "KUM Services GmbH manages end-to-end delivery — airframe sourcing, certified MRO work, mission systems integration, and customer handover.",
    },
  ],
  faq: [
    {
      question: "Who provides EASA Part-145 MRO for KUM Services programmes?",
      answer:
        "Modification and maintenance work is performed with Part One-Forty Five GmbH, an EASA Part-145 certified maintenance organisation based at Neuhausen ob Eck Airfield, Germany.",
    },
    {
      question: "Which aircraft types are supported?",
      answer:
        "Programmes cover civil turboprop and turbofan platforms including Cessna Citation 525B, Cessna 208, Beechcraft King Air 350, Pilatus PC-12, and C-130J, depending on mission requirements.",
    },
    {
      question: "Does KUM Services GmbH only offer maintenance?",
      answer:
        "KUM Services is the lead integrator for modification, avionics retrofit, special mission conversion, and HPAA programmes. EASA Part-145 MRO is a core certified capability within those programmes.",
    },
    {
      question: "Where is the MRO partner located?",
      answer:
        "The Part-145 maintenance partner operates from Neuhausen ob Eck Airfield in Baden-Württemberg, Germany, in the Lake Constance (Bodensee) region.",
    },
  ],
  relatedEyebrow: "Related Services",
  relatedHeading: { pre: "Explore", emphasis: "Capabilities" },
  related: [
    {
      href: "/aircraft-avionics-retrofit-germany",
      title: "Avionics Retrofit Germany",
      description: "Mission avionics, flight control, and sensor integration on civil platforms.",
    },
    {
      href: "/special-mission-aircraft-conversion",
      title: "Special Mission Conversion",
      description: "Surveillance and ISR platform configuration on proven civil airframes.",
    },
    {
      href: "/partners",
      title: "Partners",
      description: "EASA Part-145, university, and avionics partners supporting delivery.",
    },
    {
      href: "/hpaa-germany",
      title: "HPAA Germany",
      description: "High Performance Autonomous Aircraft conversion programmes.",
    },
  ],
  ctaHeading: { pre: "Discuss Your", emphasis: "MRO Requirement" },
  ctaLead:
    "Contact KUM Services GmbH for EASA Part-145 MRO, modification, and integration proposals. All enquiries are handled confidentially.",
  jsonLdDescription:
    "EASA Part-145 aircraft MRO Germany — KUM Services GmbH programmes with Part One-Forty Five GmbH for certified maintenance and modification.",
  jsonLdKeywords:
    "EASA Part-145 MRO Germany, aircraft MRO Germany, aircraft maintenance Germany, Part One-Forty Five GmbH, KUM Services GmbH",
};

export const aircraftAvionicsRetrofitGermany: ServiceLandingContent = {
  canonical: "/aircraft-avionics-retrofit-germany",
  pageName: "Aircraft Avionics Retrofit Germany",
  ogImage: "/theme/hpaa8.jpg",
  heroEyebrow: "KUM Services GmbH · Mission Systems Integration",
  heroH1: { pre: "Aircraft Avionics Retrofit", emphasis: "Germany" },
  introEyebrow: "Systems Integration",
  introHeading: { pre: "Avionics & Mission Systems", emphasis: "Integration" },
  introLead:
    "KUM Services GmbH integrates avionics, flight control, datalinks, and mission payloads on civil turboprop and turbofan aircraft. Programmes are delivered with EASA Part-145 certified maintenance partners and German university and industry avionics specialists — supporting special mission, surveillance, and autonomous platform requirements.",
  calloutEyebrow: "Integration Scope",
  calloutHeading: { pre: "From Flight Deck to", emphasis: "Mission Payload" },
  calloutBody:
    "Mission equipment and avionics interfaces are engineered to your payload, certification path, and installation constraints. Integration scope includes autonomous flight control, ground control station datalinks, EO/IR and ISR sensor mounting, autopilot retrofit, and mission planning systems — developed with partners including the Institute of Flight Mechanics and Flight Control (iFR) at the University of Stuttgart.",
  calloutImage: {
    src: "/theme/hpaa8.jpg",
    alt: "Aircraft avionics retrofit and mission systems integration — KUM Services GmbH Germany",
  },
  advantagesEyebrow: "Integration Areas",
  advantagesHeading: { pre: "Avionics Retrofit", emphasis: "Capabilities" },
  advantagesLead:
    "Retrofit programmes are structured for civil platforms with global parts support and certified installation procedures.",
  advantages: [
    {
      num: "01",
      title: "Flight Control Systems",
      description:
        "Autonomous and optionally piloted flight control integration, developed with established German flight control research partners.",
    },
    {
      num: "02",
      title: "Sensor & ISR Payloads",
      description:
        "EO/IR, SAR, and SIGINT sensor installation with structural interfaces, power, cooling, and mission bus integration.",
    },
    {
      num: "03",
      title: "Datalinks & GCS",
      description:
        "BVLOS datalink, satcom, and ground control station integration for remote and autonomous operations.",
    },
    {
      num: "04",
      title: "Certified Installation",
      description:
        "Installation and validation under EASA Part-145 maintenance organisation controls with full airworthiness documentation.",
    },
  ],
  faq: [
    {
      question: "What avionics retrofit services does KUM Services offer?",
      answer:
        "Services include flight control system integration, autopilot retrofit, mission bus and payload interfaces, EO/IR and ISR sensor installation, datalinks, and ground control station integration on civil aircraft platforms.",
    },
    {
      question: "Are avionics installations EASA certified?",
      answer:
        "Installation work is performed with Part One-Forty Five GmbH, an EASA Part-145 certified maintenance organisation, following approved maintenance and modification procedures.",
    },
    {
      question: "Which platforms are suitable for avionics retrofit?",
      answer:
        "Common platforms include Cessna Citation 525B, King Air 350, Pilatus PC-12, Cessna 208, and C-130J — selected based on payload, endurance, and certification requirements.",
    },
    {
      question: "Who develops the flight control systems?",
      answer:
        "Autonomous flight control development is supported by German university and avionics partners, including the Institute of Flight Mechanics and Flight Control (iFR) at the University of Stuttgart.",
    },
  ],
  relatedEyebrow: "Related Services",
  relatedHeading: { pre: "Explore", emphasis: "Capabilities" },
  related: [
    {
      href: "/easa-part-145-mro-germany",
      title: "EASA Part-145 MRO Germany",
      description: "Certified maintenance and modification foundation for retrofit programmes.",
    },
    {
      href: "/special-mission-aircraft-conversion",
      title: "Special Mission Conversion",
      description: "Full platform conversion for surveillance and government mission roles.",
    },
    {
      href: "/aircraft",
      title: "Aircraft Platforms",
      description: "Supported turboprop and turbofan base platforms.",
    },
    {
      href: "/autonomous-aircraft-germany",
      title: "Autonomous Aircraft Germany",
      description: "Civil aircraft to autonomous platform conversion.",
    },
  ],
  ctaHeading: { pre: "Request an", emphasis: "Integration Proposal" },
  ctaLead:
    "Describe your avionics or mission systems requirement and we will prepare a tailored integration scope with certified MRO support.",
  jsonLdDescription:
    "Aircraft avionics retrofit and mission systems integration Germany — KUM Services GmbH with EASA Part-145 partners.",
  jsonLdKeywords:
    "aircraft avionics retrofit Germany, mission systems integration, EO/IR sensor installation, avionics integration aircraft, KUM Services GmbH",
};

export const specialMissionAircraftConversion: ServiceLandingContent = {
  canonical: "/special-mission-aircraft-conversion",
  pageName: "Special Mission Aircraft Conversion",
  ogImage: "/theme/pilatus-pc-12-1.png",
  heroEyebrow: "KUM Services GmbH · Special Mission Programmes",
  heroH1: { pre: "Special Mission Aircraft", emphasis: "Conversion" },
  introEyebrow: "Platform Conversion",
  introHeading: { pre: "Civil Aircraft for", emphasis: "Special Missions" },
  introLead:
    "KUM Services GmbH converts proven civil turboprop and business jet aircraft into special mission platforms for surveillance, ISR, maritime patrol, border security, and government operations. Conversion leverages certified MRO procedures, global airframe support networks, and faster fielding than new-build special mission aircraft programmes.",
  calloutEyebrow: "Conversion Advantage",
  calloutHeading: { pre: "Proven Airframes,", emphasis: "Mission Ready" },
  calloutBody:
    "Starting with civil-registered Cessna Citation, King Air 350, Pilatus PC-12, Cessna 208, or C-130J platforms provides known performance, worldwide spare parts availability, and the option to ferry aircraft to the operating location under standard civil aviation rules. KUM Services manages platform selection, certified modification, sensor integration, and programme delivery.",
  calloutImage: {
    src: "/theme/pilatus-pc-12-1.png",
    alt: "Pilatus PC-12 special mission aircraft conversion — KUM Services GmbH Germany",
  },
  advantagesEyebrow: "Mission Roles",
  advantagesHeading: { pre: "Special Mission", emphasis: "Applications" },
  advantagesLead:
    "Platforms are configured for persistent surveillance, multi-sensor ISR, and government special mission requirements.",
  advantages: [
    {
      num: "01",
      title: "ISR & Surveillance",
      description:
        "Persistent EO/IR, SAR, and SIGINT coverage with integrated mission workstations and datalinks.",
    },
    {
      num: "02",
      title: "Maritime & Border",
      description:
        "Long-endurance turboprop platforms for maritime patrol, exclusive economic zone monitoring, and border surveillance.",
    },
    {
      num: "03",
      title: "Government & Agency",
      description:
        "Configurable interiors, sensor suites, and communications for civil agency and government operator requirements.",
    },
    {
      num: "04",
      title: "Rapid Fielding",
      description:
        "On-site conversion in a short period compared with purpose-built special mission aircraft development programmes.",
    },
  ],
  faq: [
    {
      question: "What is special mission aircraft conversion?",
      answer:
        "Special mission conversion adapts a civil aircraft for dedicated operational roles such as surveillance, ISR, maritime patrol, or government mission systems — including structural modification, avionics integration, and sensor installation.",
    },
    {
      question: "Why convert a civil aircraft instead of buying a new special mission aircraft?",
      answer:
        "Civil airframes offer known acquisition cost, global maintenance networks, and faster programme delivery. Conversion avoids long new-type development cycles while retaining certified modification pathways.",
    },
    {
      question: "Which aircraft are commonly used?",
      answer:
        "KUM Services programmes utilise Cessna Citation 525B, King Air 350, Pilatus PC-12, Cessna 208, and C-130J depending on range, payload, and endurance requirements.",
    },
    {
      question: "Is conversion work certified?",
      answer:
        "Modification is performed with Part One-Forty Five GmbH, an EASA Part-145 certified maintenance organisation at Neuhausen ob Eck Airfield, Germany.",
    },
  ],
  relatedEyebrow: "Related Services",
  relatedHeading: { pre: "Explore", emphasis: "Capabilities" },
  related: [
    {
      href: "/easa-part-145-mro-germany",
      title: "EASA Part-145 MRO Germany",
      description: "Certified maintenance supporting special mission modifications.",
    },
    {
      href: "/aircraft-avionics-retrofit-germany",
      title: "Avionics Retrofit Germany",
      description: "Sensor and mission systems integration for converted platforms.",
    },
    {
      href: "/applications",
      title: "Applications",
      description: "Operational use cases for converted platforms.",
    },
    {
      href: "/hpaa-germany",
      title: "HPAA Germany",
      description: "Autonomous platform conversion for advanced mission profiles.",
    },
  ],
  ctaHeading: { pre: "Start a Special Mission", emphasis: "Programme" },
  ctaLead:
    "Describe your mission requirement and KUM Services GmbH will recommend a platform and conversion scope with commercial terms.",
  jsonLdDescription:
    "Special mission aircraft conversion Germany — civil platforms configured for surveillance, ISR, and government missions by KUM Services GmbH.",
  jsonLdKeywords:
    "special mission aircraft conversion, surveillance aircraft conversion Germany, ISR aircraft conversion, civil aircraft special mission, KUM Services GmbH",
};
