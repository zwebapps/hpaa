import { AircraftSection } from "@/app/home/sections/AircraftSection";
import { segmentMetadata } from "@/lib/siteMetadata";

export const metadata = segmentMetadata.aircraft;

export default function AircraftPage() {
  return (
    <main>
      <AircraftSection />
    </main>
  );
}
