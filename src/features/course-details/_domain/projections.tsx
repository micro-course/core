import { CourseId, CourseSlug } from "@/entities/course/course";
import { LessonId, LessonSlug } from "@/entities/course/lesson";
import { LessonPath } from "@/shared/router";

export type LessonPartial = {
  id: LessonId;
  slug: LessonSlug;
  title: string;
  shortDescription?: string;
};

export type CourseAction =
  | { type: "comming-soon" }
  | { type: "buy"; price: number }
  | {
      type: "enter";
    }
  | { type: "continue"; targetLesson: LessonPath };

export type CourseDetails = {
  id: CourseId;
  slug: CourseSlug;
  title: string;
  description: string;
  image: string;
  lessons: LessonPartial[];
  action: CourseAction;
};
