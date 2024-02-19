import { ContentBlockId, CourseSlug, LessonSlug } from "@/kernel";

export type LessonPath = {
  courseSlug: CourseSlug;
  lessonSlug: LessonSlug;
  contentBlockId?: ContentBlockId;
};

export const getLessonPath = (
  { courseSlug, lessonSlug, contentBlockId }: LessonPath,
  baseUrl = "",
) => {
  let url = `${baseUrl}/learn/course/${courseSlug}/lesson/${lessonSlug}`;

  if (contentBlockId) {
    url += `#${contentBlockId}`;
  }

  return url;
};

export const getCourseByPath = (
  courseSlug: CourseSlug,
  urlReturn: string,
  baseUrl = "",
) => {
  let url = `${baseUrl}/buy?courseSlug=${courseSlug}&urlReturn=${encodeURIComponent(
    urlReturn,
  )}`;

  return url;
};

export const getBuySuccessByPath = (baseUrl = "") => {
  let url = `${baseUrl}/buy/success`;

  return url;
};
