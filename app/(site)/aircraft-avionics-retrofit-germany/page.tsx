import { ServiceLandingPage } from "@/app/(site)/_components/ServiceLandingPage";
import { aircraftAvionicsRetrofitGermany } from "@/lib/seo/serviceLandingContent";
import { segmentMetadata } from "@/lib/siteMetadata";

export const metadata = segmentMetadata.aircraftAvionicsRetrofitGermany;

export default function AircraftAvionicsRetrofitGermanyPage() {
  return <ServiceLandingPage content={aircraftAvionicsRetrofitGermany} />;
}
