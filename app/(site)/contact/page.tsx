import { HashRedirect } from "@/app/site/HashRedirect";
import { segmentMetadata } from "@/lib/siteMetadata";

export const metadata = segmentMetadata.contact;

export default function ContactPage() {
  return <HashRedirect sectionId="contact" />;
}
