import { z } from "zod";

export type SchemaOf<T, I = any> = z.ZodType<T, any, I>;
