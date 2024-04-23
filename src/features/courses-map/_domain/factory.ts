import { CourseMapNode } from "@/entities/map";
import { Course } from "@/entities/course";
import { CourseNode } from "./types";

export const createCourseNode = (
  data: CourseMapNode,
  course: Course,
): CourseNode => ({
  ...data,
  courseId: course.id,
  slug: course.slug,
  title: course.title,
  shortDescription: course.shortDescription,
  thumbnail: course.thumbnail,
  dependencies: course.dependencies,
});
