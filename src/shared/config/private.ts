import { z } from "zod";

const privateConfigSchema = z.object({
  GITHUB_ID: z.string().optional(),
  GITHUB_SECRET: z.string().optional(),

  EMAIL_SERVER_USER: z.string(),
  EMAIL_SERVER_PASSWORD: z.string(),
  EMAIL_SERVER_HOST: z.string(),
  EMAIL_SERVER_PORT: z.string(),
  EMAIL_FROM: z.string(),

  ADMIN_EMAILS: z.string().optional(),
});

export const privateConfig = privateConfigSchema.parse(process.env);
