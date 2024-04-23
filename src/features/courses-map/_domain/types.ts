import { CourseBaseInfo } from "@/entities/course";
import {
  ImageMapNodeData,
  MapNodeDimensions,
  MapNodePosition,
  MapNodeSettings,
  ImageMapNode,
} from "@/entities/map";
import { CourseId, CourseSlug } from "@/kernel/domain/course";
import { MapNodeId } from "@/kernel/domain/map";

export type ImageNode = ImageMapNode;

export type CourseToAdd = {};

type CourseNodeData = {
  type: "course";
  courseId: CourseId;
  slug: CourseSlug;
} & CourseBaseInfo;

export type CourseNode = {
  id: MapNodeId;
} & CourseNodeData &
  MapNodePosition &
  MapNodeDimensions &
  MapNodeSettings;

export type CoursesMapNode = CourseNode | ImageNode;
