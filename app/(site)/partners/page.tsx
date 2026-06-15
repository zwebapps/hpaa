import { PartnersSection } from "@/app/home/sections/PartnersSection";
import { segmentMetadata } from "@/lib/siteMetadata";

export const metadata = segmentMetadata.partners;

export default function PartnersPage() {
  return (
    <main>
      <PartnersSection />
    </main>
  );
}
