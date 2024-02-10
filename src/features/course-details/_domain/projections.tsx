import { CourseId, CourseSlug } from "@/entities/course/course";
import { LessonId, LessonSlug } from "@/entities/course/lesson";
import { ContentBlockId } from "@/kernel";

export type LessonPartial = {
  id: LessonId;
  slug: LessonSlug;
  title: string;
  shortDescription?: string;
};

type TargetLesson = {
  courseSlug: CourseId;
  lessonSlug: LessonId;
  contentBlockId?: ContentBlockId;
};

export type CourseAction =
  | { type: "comming-soon" }
  | { type: "buy" }
  | {
      type: "enter";
    }
  | { type: "continue"; targetLesson: TargetLesson };

export type CourseDetails = {
  id: CourseId;
  slug: CourseSlug;
  title: string;
  description: string;
  image: string;
  lessons: LessonPartial[];
  action: CourseAction;
};
