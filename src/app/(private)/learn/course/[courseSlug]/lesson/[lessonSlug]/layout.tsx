import { CourseSlug } from "@/entities/course/course";
import { LessonSlug } from "@/entities/course/lesson";
import { LearnNavigation } from "@/features/learn/learn-navigation";
import { SelectLessonSheet } from "@/features/learn/select-lesson-sheet";

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;

  params: {
    courseSlug: CourseSlug;
    lessonSlug: LessonSlug;
  };
}) {
  return (
    <>
      {params.courseSlug}
      {params.lessonSlug}
      {children}
      <SelectLessonSheet params={params} />
      <div className="fixed bottom-0 z-50 w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <LearnNavigation
          params={params}
          className="max-w-content mx-auto p-4"
        />
      </div>
    </>
  );
}
