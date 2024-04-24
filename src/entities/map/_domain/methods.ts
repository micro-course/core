import { MAP_NODE_TYPES, MapNodeType } from "./types";

export const COURSE_DEFAULT_Z_INDEX = 100;
export const IMAGE_DEFAULT_Z_INDEX = 1;
export const getZIndex = (type: MapNodeType, zIndex?: number) =>
  zIndex ?? type === MAP_NODE_TYPES.COURSE
    ? COURSE_DEFAULT_Z_INDEX
    : IMAGE_DEFAULT_Z_INDEX;
