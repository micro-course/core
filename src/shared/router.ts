import { ContentBlockId, CourseSlug, LessonSlug } from "@/kernel";

export type LessonPath = {
  courseSlug: CourseSlug;
  lessonSlug: LessonSlug;
  contentBlockId?: ContentBlockId;
};

export const getLessonPath = ({
  courseSlug,
  lessonSlug,
  contentBlockId,
}: LessonPath) => {
  let url = `/learn/course/${courseSlug}/lesson/${lessonSlug}`;

  if (contentBlockId) {
    url += `?contentBlockId=${contentBlockId}`;
  }

  return url;
};
