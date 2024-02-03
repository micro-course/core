import { z } from "zod";

const publicConfigSchema = z.object({
  isDev: z.boolean(),
});

export const publicConfig = publicConfigSchema.parse({
  isDev: process.env.NODE_ENV === "development",
});
