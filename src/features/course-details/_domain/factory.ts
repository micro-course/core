import { Course, Lesson } from "@/entities/course";
import { CourseDetails } from "./types";

export const createCourseDetails = (
  course: Course,
  lessons: Lesson[],
): CourseDetails => {
  return {
    id: course.id,
    slug: course.slug,
    title: course.title,
    description: course.description,
    image: course.image,
    lessons: lessons.map(({ id, slug, title, shortDescription }) => ({
      id,
      slug,
      title,
      shortDescription,
    })),
  };
};
