import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_BASE_URL: z.string(),
  NEXT_PUBLIC_API_KEY: z.string(),
  NEXT_PUBLIC_AUTH_DOMAIN: z.string(),
  NEXT_PUBLIC_PROJECT_ID: z.string(),
  NEXT_PUBLIC_STORAGE_BUCKET: z.string(),
  NEXT_PUBLIC_MESSAGING_SENDER_ID: z.string(),
  NEXT_PUBLIC_APP_ID: z.string(),
  NEXT_PUBLIC_MEASUREMENT_ID: z.string(),
  NEXT_PUBLIC_EMAIL: z.string(),
  RESEND_API_KEY: z.string(),
});

envSchema.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}
