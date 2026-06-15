import { ContactSection } from "@/app/home/sections/ContactSection";
import { segmentMetadata } from "@/lib/siteMetadata";

export const metadata = segmentMetadata.contact;

export default function ContactPage() {
  return (
    <main>
      <ContactSection />
    </main>
  );
}
