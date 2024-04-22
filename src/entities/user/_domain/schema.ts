import { SchemaOf } from "@/shared/lib/zod";
import { z } from "zod";
import { Profile } from "./types";

export const profileSchema = z.object({
  email: z.string(),
  name: z.string().nullable().optional(),
  image: z.string().nullable().optional(),
}) satisfies SchemaOf<Profile>;
