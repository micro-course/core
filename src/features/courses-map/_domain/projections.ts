import { CourseId, CourseSlug } from "@/entities/course/course";
import {
  MapNodeBase,
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
} & MapNodeBase;

export type CourseNodeProjection = {
  id: MapNodeId;
  data: CourseNodeData;
} & MapNodeBase;

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
