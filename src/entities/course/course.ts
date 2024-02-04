export type {
  CourseId,
  LessonId,
  ContentBlockId,
  CourseSlug,
  CourseLessonSlug,
  CourseEntity,
  LessonEntity,
  ContentBlockEntity,
} from "./_domain/entities";
export { courseLessonSlug } from "./_domain/entities";
export { courseEntityToListItem } from "./_domain/mappers";

export type {
  CourseListItem,
  CoursesIndex,
} from "./_domain/projections";
