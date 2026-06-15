import { ApplicationsSection } from "@/app/home/sections/ApplicationsSection";
import { segmentMetadata } from "@/lib/siteMetadata";

export const metadata = segmentMetadata.applications;

export default function ApplicationsPage() {
  return (
    <main>
      <ApplicationsSection />
    </main>
  );
}
