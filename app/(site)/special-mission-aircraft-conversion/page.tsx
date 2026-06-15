import { ServiceLandingPage } from "@/app/(site)/_components/ServiceLandingPage";
import { specialMissionAircraftConversion } from "@/lib/seo/serviceLandingContent";
import { segmentMetadata } from "@/lib/siteMetadata";

export const metadata = segmentMetadata.specialMissionAircraftConversion;

export default function SpecialMissionAircraftConversionPage() {
  return <ServiceLandingPage content={specialMissionAircraftConversion} />;
}
