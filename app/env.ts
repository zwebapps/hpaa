function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function optional(name: string): string | undefined {
  const value = process.env[name];
  return value && value.length > 0 ? value : undefined;
}

export const env = {
  NEXT_PUBLIC_APP_NAME: required("NEXT_PUBLIC_APP_NAME"),
  APP_SECRET: required("APP_SECRET"),
  NODE_ENV: optional("NODE_ENV"),
} as const;

