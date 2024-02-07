import { CourseEntity } from "@/entities/course/course";
import { CourseDetails } from "./projections";

export const courseEntityToCourseDetails = (
  courseEntity: CourseEntity,
): CourseDetails => {
  return {
    id: courseEntity.id,
    slug: courseEntity.slug,
    title: courseEntity.title,
    description: courseEntity.description,
    image: courseEntity.image,
  };
};
