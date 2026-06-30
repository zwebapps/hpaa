import { buildLlmsFullTxt } from "@/lib/aiDiscovery";

/** Extended FAQ for AI crawlers and RAG systems. */
export async function GET() {
  return new Response(buildLlmsFullTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
