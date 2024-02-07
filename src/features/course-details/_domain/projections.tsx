import { CourseId, CourseSlug } from "@/entities/course/course";

export type CourseDetails = {
  id: CourseId;
  slug: CourseSlug;
  title: string;
  description: string;
  image: string;
};
