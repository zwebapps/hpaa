import { HashRedirect } from "@/app/site/HashRedirect";
import { segmentMetadata } from "@/lib/siteMetadata";

export const metadata = segmentMetadata.partners;

export default function PartnersPage() {
  return <HashRedirect sectionId="partners" />;
}
