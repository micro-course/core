export type MapNodeId = string;
type CourseId = string;

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

export type BaseMapNodeEntity = MapNodePosition &
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

export type CourseMapNodeEntity = BaseMapNodeEntity & {
  data: CourseMapNodeData;
};

export type ImageMapNodeEntity = BaseMapNodeEntity & {
  data: ImageMapNodeData;
};

export type MapNodeEntity = CourseMapNodeEntity | ImageMapNodeEntity;

export type MapNodeType = MapNodeEntity["data"]["type"];

export const MAP_NODE_TYPES = {
  COURSE: "course" satisfies MapNodeType,
  IMAGE: "image" satisfies MapNodeType,
} as const;
