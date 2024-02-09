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
        onClick={openCourseLessons}
        color="secondary"
        tabIndex={1}
      >
        Все уроки
      </Button>
      <Button
        variant={"outline"}
        onClick={openMyCourses}
        color="secondary"
        tabIndex={2}
      >
        Мои курсы
      </Button>

      <Button
        disabled={!canGoBack}
        variant={"outline"}
        onClick={onBack}
        className="ml-auto"
      >
        Назад
      </Button>
      <Button disabled={!canGoForward} onClick={onForward}>
        Дальше
      </Button>
    </div>
  );
}
