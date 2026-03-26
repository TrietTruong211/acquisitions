import '#config/env.js';
import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const { DATABASE_URL, NEON_LOCAL_FETCH_ENDPOINT } = process.env;

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL is required');
}

const databaseHost = new URL(DATABASE_URL).hostname;
const isLocalDatabase = ['localhost', '127.0.0.1', 'neon-local'].includes(databaseHost);

if (NEON_LOCAL_FETCH_ENDPOINT || isLocalDatabase) {
  const localFetchEndpoint =
		NEON_LOCAL_FETCH_ENDPOINT || `http://${databaseHost}:5432/sql`;

  neonConfig.fetchEndpoint = localFetchEndpoint;
  neonConfig.useSecureWebSocket = false;
  neonConfig.poolQueryViaFetch = true;
}

const sql = neon(DATABASE_URL);
const db = drizzle(sql);

export { db, sql };
