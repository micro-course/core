import { CourseEntity } from "@/entities/course/course";
import { CourseAction, CourseDetails } from "./projections";
import { LessonEntity } from "@/entities/course/lesson";

export const courseEntityToCourseDetails = (
  courseEntity: CourseEntity,
  lessons: LessonEntity[],
  action: CourseAction,
): CourseDetails => {
  return {
    id: courseEntity.id,
    slug: courseEntity.slug,
    title: courseEntity.title,
    description: courseEntity.description,
    image: courseEntity.image,
    action,
    lessons: lessons.map((lesson) => ({
      id: lesson.id,
      slug: lesson.slug,
      title: lesson.title,
      shortDescription: lesson.shortDescription,
    })),
  };
};
