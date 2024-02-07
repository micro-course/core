import { CourseId, CourseSlug } from "@/entities/course/course";
import { LessonId, LessonSlug } from "@/entities/course/lesson";

export type LessonPartial = {
  id: LessonId;
  slug: LessonSlug;
  title: string;
  shortDescription?: string;
};

export type CourseDetails = {
  id: CourseId;
  slug: CourseSlug;
  title: string;
  description: string;
  image: string;
  lessons: LessonPartial[];
};
