import { CourseDetails, CourseImage } from "@/features/course-details";
import { CourseSlug } from "@/kernel/domain/course";
import {
  courseDetailsClassName,
  courseImageClassName,
  mainClassName,
} from "./_css";

export const revalidate = 3600;
export default function CoursePage({
  params: { slug },
}: {
  params: { slug: CourseSlug };
}) {
  return (
    <main className={mainClassName}>
      <CourseImage courseSlug={slug} className={courseImageClassName} />
      <CourseDetails courseSlug={slug} className={courseDetailsClassName} />
    </main>
  );
}
