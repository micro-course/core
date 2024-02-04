import { CourseId, CourseSlug } from "@/entities/course/course";
import {
  MapNodeDimensions,
  MapNodeSettings,
  MapNodePosition,
  MapNodeId,
  MapNodeImageData,
} from "@/entities/map/map-node";

export type CourseToAdd = {
  id: CourseId;
  slug: CourseSlug;
  title: string;
  thumbnail: string;
  shortDescription?: string;
};

type CourseNodeData = {
  type: "course";
} & CourseToAdd;

export type ImageNode = {
  id: MapNodeId;
  data: MapNodeImageData;
} & MapNodePosition &
  MapNodeDimensions &
  MapNodeSettings;

export type CourseNode = {
  id: MapNodeId;
  data: CourseNodeData;
} & MapNodePosition &
  MapNodeDimensions &
  MapNodeSettings;

export type MapNode = CourseNode | ImageNode;

export type MapEdge = {
  id: string;
  source: MapNodeId;
  target: MapNodeId;
};

export type Map = {
  nodeIds: MapNodeId[];
  nodes: Record<MapNodeId, MapNode>;
  edges: MapEdge[];
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
