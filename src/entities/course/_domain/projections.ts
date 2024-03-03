import { CourseEntity } from "../course";
import {
  CourseId,
  CourseLessonSlug,
  CourseSlug,
  LessonEntity,
  LessonId,
} from "./entities";

export type CoursesIndex = {
  list: CourseEntity[];
  bySlug: Record<CourseSlug, CourseEntity | undefined>;
  byId: Record<CourseId, CourseEntity | undefined>;
  lessonById: Record<LessonId, LessonEntity | undefined>;
  lessonBySlug: Record<CourseLessonSlug, LessonEntity | undefined>;
};

export type CourseListItem = Omit<CourseEntity, "description">;
