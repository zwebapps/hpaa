import { env } from "../../env";

export async function GET() {
  return Response.json({
    ok: true,
    appName: env.NEXT_PUBLIC_APP_NAME,
    hasSecret: Boolean(env.APP_SECRET),
    nodeEnv: env.NODE_ENV ?? null,
  });
}

