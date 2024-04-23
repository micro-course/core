import { CourseId } from "@/kernel/domain/course";
import { MapNodeId } from "@/kernel/domain/map";

export type MapNodePosition = {
  x: number;
  y: number;
  zIndex?: number;
};

export type MapNodeDimensions = {
  width: number; // px
  height: number; // px
  rotation: number; // deg
  scale: number;
};

export type MapNodeSettings = {
  hidden: boolean;
};

export type BaseMapNode = MapNodePosition &
  MapNodeDimensions &
  MapNodeSettings & {
    id: MapNodeId;
  };

export type CourseMapNodeData = {
  type: "course";
  courseId: CourseId;
};

export type ImageMapNodeData = {
  type: "image";
  src: string;
};

export type CourseMapNode = BaseMapNode & CourseMapNodeData;
export type ImageMapNode = BaseMapNode & ImageMapNodeData;

export type MapNode = CourseMapNode | ImageMapNode;

export type MapNodeType = MapNode["type"];

export const MAP_NODE_TYPES = {
  COURSE: "course" satisfies MapNodeType,
  IMAGE: "image" satisfies MapNodeType,
} as const;
