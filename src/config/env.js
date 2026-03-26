import fs from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';

const nodeEnv = process.env.NODE_ENV || 'development';
const envFiles = [
  path.resolve(process.cwd(), '.env'),
  path.resolve(process.cwd(), `.env.${nodeEnv}`),
];

for (const envFile of envFiles) {
  if (fs.existsSync(envFile)) {
    dotenv.config({ path: envFile, override: true });
  }
}

export const APP_ENV = process.env.NODE_ENV || nodeEnv;