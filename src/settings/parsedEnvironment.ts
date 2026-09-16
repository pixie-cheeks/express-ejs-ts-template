import 'dotenv/config';
import * as z from 'zod';

const environmentSchema = z.union([
  z.object({
    DB_ENV: z.literal('dev'),
    PORT: z.string().transform(Number),
    CONNECTION_STRING: z.string().optional(),
    SESSION_SECRET: z.string(),
  }),
  z.object({
    DB_ENV: z.literal('prod'),
    PORT: z.string().transform(Number),
    SESSION_SECRET: z.string(),
    AIVEN_PROJECT_NAME: z.string(),
    AIVEN_SERVICE_NAME: z.string(),
    AIVEN_DB_NAME: z.string(),
    AIVEN_TOKEN: z.string(),
    DB_SSL_CA: z.string(),
  }),
]);

export const parsedEnvironment = environmentSchema.parse(process.env);
