import { MAP_NODE_TYPES } from "@/entities/map/map-node";
import ImageNode from "./image/image-node";
import CourseNode from "./course/course-node";

export const customNodes = {
  [MAP_NODE_TYPES.IMAGE]: ImageNode,
  [MAP_NODE_TYPES.COURSE]: CourseNode,
};
