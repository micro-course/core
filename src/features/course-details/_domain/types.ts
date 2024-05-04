import {
  CourseId,
  CourseProduct,
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
      targetLesson: {
        courseSlug: CourseSlug;
        lessonSlug: LessonSlug;
      };
    };

export type CourseDetails = {
  id: CourseId;
  slug: CourseSlug;
  title: string;
  description: string;
  image: string;
  lessons: LessonPartial[];
};
