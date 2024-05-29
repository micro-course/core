/** @deprecated */
export type ProductConfig =
  | {
      access: "free";
    }
  | {
      access: "paid";
      price: number;
    };
/** @deprecated */
export type CourseId = string;
/** @deprecated */
export type CourseSlug = string;

/** @deprecated */
export type LessonId = string;
/** @deprecated */
export type LessonSlug = string;
/** @deprecated */
export type ContentBlockId = string;

/* slug in format: course-slug/lesson-slug */
/** @deprecated */
export type CourseLessonSlug = string;
/** @deprecated */
export const courseLessonSlug = (
  courseSlug: CourseSlug,
  lessonSlug: LessonSlug,
) => `${courseSlug}/${lessonSlug}`;

/** @deprecated */
export type CourseEntity = {
  id: CourseId;
  slug: CourseSlug;
  title: string;
  thumbnail: string;
  image: string;
  description: string;
  shortDescription?: string;
  dependencies: CourseId[];
  product: ProductConfig;

  lessons: LessonId[];
};

/** @deprecated */
export interface LessonEntity {
  id: LessonId;
  slug: LessonSlug;
  courseId: CourseId;
  title: string;
  shortDescription?: string;
  blocks: ContentBlockEntity[];
}

/** @deprecated */
export type ContentBlockEntity = TextBlockEntity;

/** @deprecated */
export interface TextBlockEntity {
  id: ContentBlockId;
  type: "text";
  text: string;
}

// =====
