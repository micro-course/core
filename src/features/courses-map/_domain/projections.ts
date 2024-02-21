import { CourseId, CourseSlug } from "@/entities/course/course";
import {
  MapNodeDimensions,
  MapNodeSettings,
  MapNodePosition,
  MapNodeId,
  ImageMapNodeData,
} from "@/entities/map/map-node";
import { CourseProgressPercent } from "@/entities/student-progress/student-progress";

export type MapEdgeId = string;

export type CourseToAdd = {
  id: CourseId;
  slug: CourseSlug;
  title: string;
  thumbnail: string;
  shortDescription?: string;
  dependencies: CourseId[];
};

type CourseNodeData = {
  type: "course";
  progress: CourseProgressPercent;
} & CourseToAdd;

export type ImageNode = {
  id: MapNodeId;
  data: ImageMapNodeData;
} & MapNodePosition &
  MapNodeDimensions &
  MapNodeSettings;

export type CourseNode = {
  id: MapNodeId;
  data: CourseNodeData;
} & MapNodePosition &
  MapNodeDimensions &
  MapNodeSettings;

export type CoursesMapNode = CourseNode | ImageNode;

export type CoursesMapEdge = {
  id: string;
  source: MapNodeId;
  target: MapNodeId;
};

export type CoursesMap = {
  nodes: Record<MapNodeId, CoursesMapNode>;
  nodeIds: MapNodeId[];
  edges: Record<MapEdgeId, CoursesMapEdge>;
  edgeIds: MapEdgeId[];
  courseIdNodeMap: Record<CourseId, MapNodeId>;
};

//===
//
export type DimensionsStrings = {
  width: string;
  height: string;
  scale: string;
  rotation: string;
};

export type PositionStrings = {
  x: string;
  y: string;
  zIndex: string;
};
