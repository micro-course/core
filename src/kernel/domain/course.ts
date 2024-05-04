export type CourseId = string;
export type CourseSlug = string;
export type LessonId = string;
export type LessonSlug = string;
export type ContentBlockId = string;

export type CourseProduct =
  | {
      access: "free";
    }
  | {
      access: "paid";
      price: number;
    };
