import { createId } from "@/shared/lib/id";
import { MAP_NODE_TYPES, MapNodeBase, MapNodeEntity } from "./entities";
import { COURSE_BASE_Z_INDEX, IMAGE_BASE_Z_INDEX } from "../_const";

const cleanBase = (node: MapNodeBase) => {
  return {
    x: node.x,
    y: node.y,
    zIndex: node.zIndex,
    width: node.width,
    height: node.height,
    rotation: node.rotation,
    scale: node.scale,
    hidden: node.hidden,
  };
};

export const createImageMapNodeEntity = ({
  src,
  ...base
}: MapNodeBase & { src: string }): MapNodeEntity => {
  return {
    id: createId(),
    ...cleanBase(base),
    zIndex: base.zIndex ?? IMAGE_BASE_Z_INDEX,
    hidden: base.hidden ?? true,
    data: {
      type: MAP_NODE_TYPES.IMAGE,
      src,
    },
  };
};

export const createCourseMapNodeEntity = ({
  courseId,
  ...base
}: MapNodeBase & { courseId: string }): MapNodeEntity => {
  return {
    id: createId(),
    ...cleanBase(base),
    zIndex: base.zIndex ?? COURSE_BASE_Z_INDEX,
    hidden: base.hidden ?? true,
    data: {
      type: MAP_NODE_TYPES.COURSE,
      courseId,
    },
  };
};
