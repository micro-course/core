import { CourseId, CourseSlug } from "@/entities/course/course";
import {
  MapNodeDimensions,
  MapNodeSettings,
  MapNodePosition,
  MapNodeId,
  MapNodeImageData,
} from "@/entities/map/map-node";

export type CourseToAddProjection = {
  id: CourseId;
  slug: CourseSlug;
  title: string;
  thumbnail: string;
  shortDescription?: string;
};

type CourseNodeData = {
  type: "course";
} & CourseToAddProjection;

export type ImageNodeProjection = {
  id: MapNodeId;
  data: MapNodeImageData;
} & MapNodePosition &
  MapNodeDimensions &
  MapNodeSettings;

export type CourseNodeProjection = {
  id: MapNodeId;
  data: CourseNodeData;
} & MapNodePosition &
  MapNodeDimensions &
  MapNodeSettings;

export type MapNodeProjection = CourseNodeProjection | ImageNodeProjection;

export type MapEdgeProjection = {
  id: string;
  source: MapNodeId;
  target: MapNodeId;
};

export type MapProjection = {
  nodeIds: MapNodeId[];
  nodes: Record<MapNodeId, MapNodeProjection>;
  edges: MapEdgeProjection[];
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
