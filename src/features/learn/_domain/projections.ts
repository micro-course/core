import { ContentBlockId, CourseId, CourseSlug } from "@/entities/course/course";
import { LessonId, LessonSlug } from "@/entities/course/lesson";

export type CourseListItem = {
  id: CourseId;
  slug: CourseSlug;
  title: string;
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

export type Lesson = {
  id: LessonId;
  slug: LessonSlug;
  courseId: CourseId;
  title: string;
  shortDescription?: string;
  blocks: ContentBlock[];
};

export type ContentBlock = TextBlock | VideoBlock | QuestionBlock;

export interface TextBlock {
  id: ContentBlockId;
  type: "text";
  text: string;
}

export interface VideoBlock {
  id: ContentBlockId;
  type: "video";
  url: string;
}

export interface QuestionBlock {
  id: ContentBlockId;
  type: "question";
  answerOptions: AnswerOption[];
  explanation?: string;
  successMessage?: string;
  text?: string;
}

export interface AnswerOption {
  id: ContentBlockId;
  text: string;
}
