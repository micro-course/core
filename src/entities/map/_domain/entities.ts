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

export type MapNodeBase = {
  x: number;
  y: number;
  width: string; // css width value
  height: string; // css height value
  rotation: string; // css rotate value
  scale: string; // css scale value
  hidden: boolean;
  zIndex?: number;
};

export type MapNodeData = MapNodeCourseData | MapNodeImageData;
export type MapNodeType = MapNodeData["type"];

export type MapNodeEntity = MapNodeBase & {
  id: MapNodeId;
  data: MapNodeData;
};

export const MAP_NODE_TYPES = {
  COURSE: "course" satisfies MapNodeType,
  IMAGE: "image" satisfies MapNodeType,
} as const;
