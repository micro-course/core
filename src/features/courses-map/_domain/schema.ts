import {
  imageMapNodeDataSchema,
  mapNodePositionSchema,
  mapNodeDimensionsSchema,
  mapNodeSettingsSchema,
  courseMapNodeDataSchema,
} from "@/entities/map";
import {
  CreateMapNodeCommand,
  UpdateMapNodeCommand,
} from "@/entities/map/server";
import { SchemaOf } from "@/shared/lib/zod";
import { z } from "zod";

export const mapNodeIdSchema = z.object({ id: z.string() });

export const createCourseNodeCommandSchema = mapNodePositionSchema
  .and(mapNodeDimensionsSchema)
  .and(mapNodeSettingsSchema)
  .and(
    courseMapNodeDataSchema.or(imageMapNodeDataSchema),
  ) satisfies SchemaOf<CreateMapNodeCommand>;

export const updateCourseNodeCommandSchema = mapNodeIdSchema
  .and(mapNodePositionSchema.partial())
  .and(mapNodeDimensionsSchema.partial())
  .and(mapNodeSettingsSchema.partial())
  .and(
    courseMapNodeDataSchema.partial().or(imageMapNodeDataSchema.partial()),
  ) satisfies SchemaOf<UpdateMapNodeCommand>;
