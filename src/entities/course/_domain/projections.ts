import { CourseEntity } from "../course";
import {
  CourseId,
  CourseLessonSlug,
  CourseSlug,
  LessonEntity,
  LessonId,
} from "./entities";

export type CoursesIndexProjection = {
  list: CourseEntity[];
  bySlug: Record<CourseSlug, CourseEntity>;
  byId: Record<CourseId, CourseEntity>;
  lessonById: Record<LessonId, LessonEntity>;
  lessonBySlug: Record<CourseLessonSlug, LessonEntity>;
};

export type CourseListItem = Omit<CourseEntity, "description">;
