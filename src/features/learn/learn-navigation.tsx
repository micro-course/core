"use client";
import { Button } from "@/shared/ui/button";
import { CurrentLessonParams } from "./_domain/projections";
import { cn } from "@/shared/ui/utils";
import { useSelectLessonSheetStore } from "./_vm/select-lesson-sheet";

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
      <Button
        variant={"outline"}
        onClick={openCourseLessons}
        color="secondary"
        tabIndex={3}
      >
        Уроки курса
      </Button>

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
