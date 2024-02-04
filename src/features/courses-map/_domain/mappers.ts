import { CourseEntity, CourseListItem } from "@/entities/course/course";
import { MAP_NODE_TYPES, MapNodeEntity } from "@/entities/map/map-node";
import { CourseToAddProjection, MapNodeProjection } from "./projections";

export const createMapNodeProjection = (
  mapNodeEntity: MapNodeEntity,
  course: CourseListItem | undefined,
): MapNodeProjection => {
  if (course && mapNodeEntity.data.type === MAP_NODE_TYPES.COURSE) {
    return {
      ...mapNodeEntity,
      data: {
        type: MAP_NODE_TYPES.COURSE,
        id: course.id,
        slug: course.slug,
        title: course.title,
        thumbnail: course.thumbnail,
        shortDescription: course.shortDescription,
      },
    };
  }
  if (mapNodeEntity.data.type === MAP_NODE_TYPES.IMAGE) {
    return {
      ...mapNodeEntity,
      data: { type: MAP_NODE_TYPES.IMAGE, src: mapNodeEntity.data.src },
    };
  }

  throw new Error(`Unknown map node type: ${mapNodeEntity.data.type}`);
};

export const createMapEdgeProjection = (
  mapNodeEntity: MapNodeEntity,
  mapNodeEntity2: MapNodeEntity,
) => {
  return {
    id: `${mapNodeEntity.id}-${mapNodeEntity2.id}`,
    source: mapNodeEntity.id,
    target: mapNodeEntity.id,
  };
};

export const createCourseToAddProjection = (
  course: CourseEntity,
): CourseToAddProjection => {
  return {
    id: course.id,
    slug: course.slug,
    title: course.title,
    thumbnail: course.thumbnail,
    shortDescription: course.shortDescription,
  };
};
