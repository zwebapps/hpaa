import { HashRedirect } from "@/app/site/HashRedirect";
import { segmentMetadata } from "@/lib/siteMetadata";

export const metadata = segmentMetadata.aircraft;

export default function AircraftPage() {
  return <HashRedirect sectionId="aircraft" />;
}
