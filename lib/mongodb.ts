import { MongoClient, type Db } from "mongodb";

const DEFAULT_DB_NAME = "hpaa";

declare global {
  // eslint-disable-next-line no-var
  var __hpaaMongoClientPromise: Promise<MongoClient> | undefined;
}

function getMongoUri() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("Missing required environment variable: MONGODB_URI");
  }
  return uri;
}

export function getDatabaseName() {
  return process.env.MONGODB_DB_NAME || DEFAULT_DB_NAME;
}

export async function getDb(): Promise<Db> {
  const uri = getMongoUri();
  const clientPromise =
    globalThis.__hpaaMongoClientPromise ??
    new MongoClient(uri, {
      maxPoolSize: 10,
    }).connect();

  globalThis.__hpaaMongoClientPromise = clientPromise;

  const client = await clientPromise;
  return client.db(getDatabaseName());
}
