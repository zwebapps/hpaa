import { ServiceLandingPage } from "@/app/(site)/_components/ServiceLandingPage";
import { easaPart145MroGermany } from "@/lib/seo/serviceLandingContent";
import { segmentMetadata } from "@/lib/siteMetadata";

export const metadata = segmentMetadata.easaPart145MroGermany;

export default function EasaPart145MroGermanyPage() {
  return <ServiceLandingPage content={easaPart145MroGermany} />;
}
