export type MapNodeId = string;
type CourseId = string;

export type MapNodeCourseData = {
  type: "course";
  courseId: CourseId;
};

export type MapNodeImageData = {
  type: "image";
  src: string;
};

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

export type MapNodeData = MapNodeCourseData | MapNodeImageData;
export type MapNodeType = MapNodeData["type"];

export type MapNodeEntity = MapNodePosition &
  MapNodeDimensions &
  MapNodeSettings & {
    id: MapNodeId;
    data: MapNodeData;
  };

export const MAP_NODE_TYPES = {
  COURSE: "course" satisfies MapNodeType,
  IMAGE: "image" satisfies MapNodeType,
} as const;
