import { ContentBlockId, CourseId, CourseSlug } from "@/entities/course/course";
import { LessonId, LessonSlug } from "@/entities/course/lesson";
import { CourseProgressPercent } from "@/entities/student-progress/student-progress";

export type CourseListItem = {
  id: CourseId;
  slug: CourseSlug;
  title: string;
  progress?: CourseProgressPercent;
};

export type LessonListItem = {
  id: LessonId;
  slug: LessonSlug;
  title: string;
};

export type CurrentLessonParams = {
  courseSlug: CourseSlug;
  lessonSlug: string;
};

export type LearnLesson = {
  id: LessonId;
  slug: LessonSlug;
  courseId: CourseId;
  title: string;
  shortDescription?: string;
  blocks: ContentBlock[];
};

export type ContentBlock = TextBlock;

export interface TextBlock {
  id: ContentBlockId;
  type: "text";
  text: string;
}

export type LessonPath = {
  courseSlug: CourseSlug;
  lessonSlug: LessonSlug;
  contentBlockId?: ContentBlockId;
};
