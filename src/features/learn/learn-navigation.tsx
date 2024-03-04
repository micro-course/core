"use client";
import { Button } from "@/shared/ui/button";
import { CurrentLessonParams } from "./_domain/projections";
import { cn } from "@/shared/ui/utils";
import { useSelectLessonSheetStore } from "./_vm/select-lesson-sheet";
import { useQuery } from "@tanstack/react-query";
import {
  useGetCourseLessonsQuery,
  useGetLearnLessonQuery,
} from "./_vm/queries";
import { CourseProgressCircle } from "@/entities/student-progress/student-progress";
import { Skeleton } from "@/shared/ui/skeleton";
import { getLessonPath } from "@/shared/router";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  MoreVertical,
} from "lucide-react";
import { ReactNode } from "react";

export function useLearnNavigation(params: CurrentLessonParams) {
  const openCourseLessons = useSelectLessonSheetStore(
    (store) => store.openCourseLesons,
  );
  const lessonQuery = useQuery({
    ...useGetLearnLessonQuery(params.courseSlug, params.lessonSlug),
  });
  const openMyCourses = useSelectLessonSheetStore((store) => store.openCourses);

  return {
    canGoBack: !!lessonQuery.data?.prev,
    canGoForward: !!lessonQuery.data?.next,
    backUrl: lessonQuery.data?.prev
      ? getLessonPath(lessonQuery.data?.prev)
      : undefined,
    forwardUrl: lessonQuery.data?.next
      ? getLessonPath(lessonQuery.data?.next)
      : undefined,
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
          className="flex items-center gap-2 p-0 grow w-0"
        >
          {courseQuery.data.course.progress && (
            <>
              <CourseProgressCircle
                size={40}
                strokeWidth={4}
                courseProgress={courseQuery.data.course.progress}
                textClassName="text-md"
                className="hidden sm:block shink-0"
              />
              <CourseProgressCircle
                size={30}
                strokeWidth={3}
                courseProgress={courseQuery.data.course.progress}
                className="sm:hidden shink-0"
                textClassName="text-[10px]"
              />
            </>
          )}
          <div className="grow w-0 truncate text-left underline">
            {courseQuery.data.course.title}
          </div>
        </Button>
      );
    }

    return null;
  };

  const renderMyCourses = () => {
    return (
      <>
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={openMyCourses}
          tabIndex={4}
          className="sm:hidden"
        >
          <MoreVertical className="w-5 h-5" />
        </Button>

        <Button
          variant={"outline"}
          onClick={openMyCourses}
          tabIndex={4}
          className="hidden sm:block"
        >
          Мои курсы
        </Button>
      </>
    );
  };

  const renderBackButton = () => {
    const link = (children: ReactNode) =>
      canGoBack ? (
        <Link href={backUrl ?? "#"}>{children}</Link>
      ) : (
        <button>{children}</button>
      );

    return (
      <>
        <Button
          asChild
          disabled={!canGoBack}
          variant={"outline"}
          className="ml-auto hidden sm:block"
          tabIndex={2}
        >
          {link("Продолжить")}
        </Button>
        <Button
          asChild
          disabled={!canGoBack}
          variant={"outline"}
          size={"icon"}
          className="ml-auto sm:hidden"
          tabIndex={2}
        >
          {link(<ChevronLeft className="w-5 h-5" />)}
        </Button>
      </>
    );
  };

  const renderForwardButton = () => {
    const link = (children: ReactNode) =>
      canGoForward ? (
        <Link href={forwardUrl ?? "#"}>{children}</Link>
      ) : (
        <button>{children}</button>
      );

    return (
      <>
        <Button
          asChild
          disabled={!canGoForward}
          variant={"default"}
          className="ml-auto hidden sm:block"
          tabIndex={2}
        >
          {link("Продолжить")}
        </Button>
        <Button
          asChild
          disabled={!canGoForward}
          variant={"default"}
          size={"icon"}
          className="ml-auto sm:hidden"
          tabIndex={2}
        >
          {link(<ChevronRight className="w-5 h-5" />)}
        </Button>
      </>
    );
  };

  const {
    openCourseLessons,
    openMyCourses,
    canGoForward,
    canGoBack,
    backUrl,
    forwardUrl,
  } = useLearnNavigation(params);
  return (
    <div className={cn("flex gap-3 sm:gap-4 ", className)}>
      {renderMyCourses()}
      {renderCourseLessons()}

      {renderBackButton()}
      {renderForwardButton()}
    </div>
  );
}
