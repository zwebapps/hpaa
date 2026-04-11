import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // mongodb reads its own package.json via relative paths at runtime; bundling it
  // into Turbopack chunks breaks that lookup. nodemailer also has native-module
  // dependencies that must stay unbundled.
  serverExternalPackages: ["mongodb", "nodemailer"],

  async redirects() {
    return [
      // ── Previously indexed SEO article pages → nearest live equivalent ──
      { source: "/resources",                              destination: "/",            permanent: true },
      { source: "/faq",                                   destination: "/#why-us",     permanent: true },
      { source: "/about/hpaa",                            destination: "/",            permanent: true },
      { source: "/about/:path*",                          destination: "/",            permanent: true },
      { source: "/articles/hpaa-vs-purpose-built-uav",   destination: "/why-us",      permanent: true },
      { source: "/articles/defence-procurement-hpaa",    destination: "/#contact",    permanent: true },
      { source: "/articles/:path*",                      destination: "/",            permanent: true },
      { source: "/applications/payload-delivery",        destination: "/applications", permanent: true },
      { source: "/applications/isr-surveillance",        destination: "/applications", permanent: true },
      { source: "/applications/counter-uas",             destination: "/applications", permanent: true },
      { source: "/aircraft/platform-guide",              destination: "/aircraft",    permanent: true },
      { source: "/technology/autonomous-flight-control", destination: "/",            permanent: true },
      { source: "/technology/:path*",                    destination: "/",            permanent: true },
    ];
  },
};

export default nextConfig;
