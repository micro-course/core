import { z } from "zod";
import { toZod } from "tozod";
import {
  MapNodeDimensions,
  MapNodePosition,
  MapNodeSettings,
} from "./entities";

export const mapNodeDimensionsSchema: toZod<MapNodeDimensions> = z.object({
  width: z.number(),
  height: z.number(),
  rotation: z.number(),
  scale: z.number(),
});

export const mapNodePositionSchema: toZod<MapNodePosition> = z.object({
  x: z.number(),
  y: z.number(),
  zIndex: z.number().optional(),
});

export const mapNodeSettingsSchema: toZod<MapNodeSettings> = z.object({
  hidden: z.boolean(),
});
