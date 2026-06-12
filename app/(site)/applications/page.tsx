import { HashRedirect } from "@/app/site/HashRedirect";
import { segmentMetadata } from "@/lib/siteMetadata";

export const metadata = segmentMetadata.applications;

export default function ApplicationsPage() {
  return <HashRedirect sectionId="applications" />;
}
