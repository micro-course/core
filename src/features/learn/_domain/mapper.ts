import { LessonEntity } from "@/entities/course/lesson";
import { CourseListItem, Lesson, LessonListItem } from "./projections";
import { CourseEntity } from "@/entities/course/course";

export const lessontEntityToLesson = (lesson: LessonEntity): Lesson => ({
  id: lesson.id,
  slug: lesson.slug,
  courseId: lesson.courseId,
  title: lesson.title,
  shortDescription: lesson.shortDescription,
  blocks: lesson.blocks,
});

export const lessonToListItem = (lesson: LessonEntity): LessonListItem => {
  return {
    id: lesson.id,
    slug: lesson.slug,
    title: lesson.title,
  };
};

export const courseToListItem = (course: CourseEntity): CourseListItem => {
  return {
    id: course.id,
    slug: course.slug,
    title: course.title,
  };
};
