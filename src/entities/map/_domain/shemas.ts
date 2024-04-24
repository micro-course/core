import { SchemaOf } from "@/shared/lib/zod";
import { z } from "zod";
import {
  CourseMapNodeData,
  ImageMapNodeData,
  MapNodeDimensions,
  MapNodePosition,
  MapNodeSettings,
} from "./types";

export const mapNodePositionSchema = z.object({
  x: z.number(),
  y: z.number(),
  zIndex: z.number().optional(),
}) satisfies SchemaOf<MapNodePosition>;

export const mapNodeDimensionsSchema = z.object({
  width: z.number(), // px
  height: z.number(), // px
  rotation: z.number(), // deg
  scale: z.number(),
}) satisfies SchemaOf<MapNodeDimensions>;

export const mapNodeSettingsSchema = z.object({
  hidden: z.boolean(),
}) satisfies SchemaOf<MapNodeSettings>;

export const courseMapNodeDataSchema = z.object({
  type: z.literal("course"),
  courseId: z.string(),
}) satisfies SchemaOf<CourseMapNodeData>;

export const imageMapNodeDataSchema = z.object({
  type: z.literal("image"),
  src: z.string(),
}) satisfies SchemaOf<ImageMapNodeData>;
