import { WhyUsSection } from "@/app/home/sections/WhyUsSection";
import { segmentMetadata } from "@/lib/siteMetadata";

export const metadata = segmentMetadata.whyUs;

export default function WhyUsPage() {
  return (
    <main>
      <WhyUsSection />
    </main>
  );
}
