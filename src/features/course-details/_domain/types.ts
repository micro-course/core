import {
  CourseId,
  CourseSlug,
  LessonId,
  LessonSlug,
} from "@/kernel/domain/course";

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
  | { type: "continue" };

export type CourseDetails = {
  id: CourseId;
  slug: CourseSlug;
  title: string;
  description: string;
  image: string;
  lessons: LessonPartial[];
};
