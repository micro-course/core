import { z } from "zod";

export const mapNodeBaseSchema = z.object({
  x: z.number(),
  y: z.number(),
  width: z.string(),
  height: z.string(),
  rotation: z.string(),
  scale: z.string(),
  hidden: z.boolean(),
  zIndex: z.number().optional(),
});
