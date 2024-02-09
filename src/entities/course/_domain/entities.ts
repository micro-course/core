export type CourseId = string;
export type CourseSlug = string;

export type LessonId = string;
export type LessonSlug = string;
export type ContentBlockId = string;

/* slug in format: course-slug/lesson-slug */
export type CourseLessonSlug = string;
export const courseLessonSlug = (
  courseSlug: CourseSlug,
  lessonSlug: LessonSlug,
) => `${courseSlug}/${lessonSlug}`;

export type CourseEntity = {
  id: CourseId;
  slug: CourseSlug;
  title: string;
  thumbnail: string;
  image: string;
  description: string;
  shortDescription?: string;
  dependencies: CourseId[];

  lessons: LessonId[];
};

export interface LessonEntity {
  id: LessonId;
  slug: LessonSlug;
  courseId: CourseId;
  title: string;
  shortDescription?: string;
  blocks: ContentBlockEntity[];
}

export type ContentBlockEntity = TextBlockEntity;

export interface TextBlockEntity {
  id: ContentBlockId;
  type: "text";
  text: string;
}

// =====
