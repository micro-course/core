"use client";
import { Button } from "@/shared/ui/button";
import { CurrentLessonParams } from "./_domain/projections";
import { cn } from "@/shared/ui/utils";
import { useSelectLessonSheetStore } from "./_vm/select-lesson-sheet";
import { useQuery } from "@tanstack/react-query";
import { useGetCourseLessonsQuery } from "./_vm/queries";
import { CourseProgressCircle } from "@/entities/student-progress/student-progress";
import { Skeleton } from "@/shared/ui/skeleton";

export function useLearnNavigation(params: CurrentLessonParams) {
  const openCourseLessons = useSelectLessonSheetStore(
    (store) => store.openCourseLesons,
  );
  const openMyCourses = useSelectLessonSheetStore((store) => store.openCourses);

  return {
    canGoBack: true,
    canGoForward: true,
    onBack: () => {},
    onForward: () => {},
    openMyCourses,
    openCourseLessons: () => openCourseLessons(params.courseSlug),
  };
}

export function LearnNavigation({
  params,
  className,
}: {
  params: CurrentLessonParams;
  className?: string;
}) {
  const courseQuery = useQuery({
    ...useGetCourseLessonsQuery(params.courseSlug),
  });

  const renderCourseLessons = () => {
    if (courseQuery.isPending) {
      return <Skeleton className="h-[1em] w-20 " />;
    }

    if (courseQuery.data) {
      return (
        <Button
          variant={"link"}
          onClick={openCourseLessons}
          color="secondary"
          tabIndex={3}
          className="flex items-center gap-2"
        >
          {courseQuery.data.course.progress && (
            <CourseProgressCircle
              size={40}
              strokeWidth={4}
              courseProgress={courseQuery.data.course.progress}
              textClassName="text-md"
            />
          )}
          {courseQuery.data.course.title}
        </Button>
      );
    }

    return null;
  };

  const {
    openCourseLessons,
    openMyCourses,
    canGoForward,
    canGoBack,
    onBack,
    onForward,
  } = useLearnNavigation(params);
  return (
    <div className={cn("flex gap-4", className)}>
      <Button
        variant={"outline"}
        onClick={openMyCourses}
        color="secondary"
        tabIndex={4}
      >
        Мои курсы
      </Button>
      {renderCourseLessons()}

      <Button
        disabled={!canGoBack}
        variant={"outline"}
        onClick={onBack}
        className="ml-auto"
        tabIndex={2}
      >
        Назад
      </Button>
      <Button disabled={!canGoForward} onClick={onForward} tabIndex={1}>
        Дальше
      </Button>
    </div>
  );
}
