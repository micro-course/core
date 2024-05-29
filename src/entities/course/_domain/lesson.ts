import { CourseId, LessonId, LessonSlug } from "@/kernel/domain/course";
import { Mdx } from "@/kernel/domain/mdx";

export type LessonPartial = {
  id: LessonId;
  slug: LessonSlug;
  courseId: CourseId;
  title: string;
  shortDescription?: Mdx;
};
