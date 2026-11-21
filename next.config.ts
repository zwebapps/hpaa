import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Deploys build into a side folder (NEXT_DIST_DIR=.next-build) while the live
  // site keeps serving .next, then swap only after a successful build.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  async redirects() {
    return [
      // ── Previously indexed SEO article pages → nearest live equivalent ──
      { source: "/resources",                              destination: "/",            permanent: true },
      { source: "/faq",                                   destination: "/why-us",      permanent: true },
      { source: "/hpaa",                                  destination: "/hpaa-germany", permanent: true },
      { source: "/about/hpaa",                            destination: "/hpaa-germany", permanent: true },
      { source: "/about/:path*",                          destination: "/",            permanent: true },
      { source: "/articles/hpaa-vs-purpose-built-uav",   destination: "/why-us",      permanent: true },
      { source: "/articles/defence-procurement-hpaa",    destination: "/contact",     permanent: true },
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
