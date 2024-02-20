import { parseFloatOrDefault, parseIntOrDefault } from "@/shared/lib/number";
import { PositionStrings } from "../projections";
import { MapNodePosition } from "@/entities/map/map-node";

export const parsePosition = (positon: PositionStrings): MapNodePosition => {
  return {
    x: parseFloatOrDefault(positon.x, 0),
    y: parseFloatOrDefault(positon.y, 0),
    zIndex: parseIntOrDefault(positon.zIndex, undefined),
  };
};

export const stringifyPosition = ({
  x,
  y,
  zIndex,
}: MapNodePosition): PositionStrings => {
  return {
    x: x.toString(),
    y: y.toString(),
    zIndex: zIndex?.toString() ?? "",
  };
};
