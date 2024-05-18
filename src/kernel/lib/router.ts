import { ContentBlockId, CourseSlug, LessonSlug } from "../domain/course";

export type LessonPath = {
  courseSlug: CourseSlug;
  lessonSlug: LessonSlug;
  contentBlockId?: ContentBlockId;
};

export const getCoursePath = (courseSlug: CourseSlug, baseUrl = "") => {
  let url = `${baseUrl}/course/${courseSlug}`;

  return url;
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

export const getCoursePurchasePath = (
  courseSlug: CourseSlug,
  urlReturn: string,
  baseUrl = "",
) => {
  let url = `${baseUrl}/purchase?courseSlug=${courseSlug}&urlReturn=${encodeURIComponent(
    urlReturn,
  )}`;

  return url;
};

export const getCoursePurchaseSucccessPath = (baseUrl = "") => {
  let url = `${baseUrl}/purchase/success`;

  return url;
};

export const getCoursePurchaseWebhookPath = (baseUrl = "") => {
  let url = `${baseUrl}/purchase/webhook`;

  return url;
};
