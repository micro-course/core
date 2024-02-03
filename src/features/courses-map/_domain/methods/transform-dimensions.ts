import { parseIntOrDefault } from "@/shared/lib/number";
import { DimensionsStrings } from "../projections";
import {
  INITIAL_HEIGHT,
  INITIAL_ROTATION,
  INITIAL_SCALE,
  INITIAL_WIDTH,
} from "../../_constants";
import { MapNodeDimensions } from "@/entities/map/map-node";

export const parseDimensions = (
  dimensions: DimensionsStrings,
): MapNodeDimensions => {
  return {
    width: parseIntOrDefault(dimensions.width, INITIAL_WIDTH),
    height: parseIntOrDefault(dimensions.height, INITIAL_HEIGHT),
    scale: parseIntOrDefault(dimensions.scale, INITIAL_SCALE),
    rotation: parseIntOrDefault(dimensions.rotation, INITIAL_ROTATION),
  };
};

export const stringifyDimensions = ({
  width,
  height,
  scale,
  rotation,
}: MapNodeDimensions): DimensionsStrings => {
  return {
    width: width.toString(),
    height: height.toString(),
    scale: scale.toString(),
    rotation: rotation.toString(),
  };
};
