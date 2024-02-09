import { CourseSlug } from "@/entities/course/course";
import { LessonSlug } from "@/entities/course/lesson";

export default function Page({
  params: { courseSlug, lessonSlug },
}: {
  params: {
    courseSlug: CourseSlug;
    lessonSlug: LessonSlug;
  };
}) {
  return <div>My courses</div>;
}
