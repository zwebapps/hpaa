import { HashRedirect } from "@/app/site/HashRedirect";
import { segmentMetadata } from "@/lib/siteMetadata";

export const metadata = segmentMetadata.whyUs;

export default function WhyUsPage() {
  return <HashRedirect sectionId="why-us" />;
}
