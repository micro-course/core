import { CourseDetails, CourseImage } from "@/features/course-details";
import { CourseSlug } from "@/kernel/domain/course";
import { courseDetailsClassName, courseImageClassName } from "./_css";

export const revalidate = 3600;
export default function CourseSheetContentPage({
  params: { slug },
}: {
  params: { slug: CourseSlug };
}) {
  return (
    <>
      <CourseImage courseSlug={slug} className={courseImageClassName} />
      <CourseDetails courseSlug={slug} className={courseDetailsClassName} />
    </>
  );
}
