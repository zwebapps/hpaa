import { buildLlmsTxtSummary } from "@/lib/aiDiscovery";

/**
 * /llms.txt — AI crawler discovery (llmstxt.org format).
 * Linked from site metadata and referenced in robots policy.
 */
export async function GET() {
  return new Response(buildLlmsTxtSummary(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
