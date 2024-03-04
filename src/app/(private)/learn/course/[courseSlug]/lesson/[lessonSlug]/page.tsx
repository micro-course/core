import { CourseSlug } from "@/entities/course/course";
import { LessonSlug } from "@/entities/course/lesson";
import { Lesson } from "@/features/learn/lesson";

export default function Page({
  params: { courseSlug, lessonSlug },
}: {
  params: {
    courseSlug: CourseSlug;
    lessonSlug: LessonSlug;
  };
}) {
  return (
    <main className="max-w-content w-screen mx-auto py-6 sm:py-14 px-3">
      <Lesson courseSlug={courseSlug} lessonSlug={lessonSlug} />
    </main>
  );
}
