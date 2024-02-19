import { z } from "zod";

const publicConfigSchema = z.object({
  isDev: z.boolean(),
  PUBLIC_URL: z.string(),
});

export const publicConfig = publicConfigSchema.parse({
  isDev: process.env.NODE_ENV === "development",
  PUBLIC_URL: process.env.NEXT_PUBLIC_PUBLIC_URL,
});
