"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/shared/ui/sheet";
import { useSelectLessonSheetStore } from "./_vm/select-lesson-sheet";
import { CourseLessons } from "./_ui/course-lessons";
import { CoursesList } from "./_ui/courses-list";
import { CurrentLessonParams } from "./_domain/projections";
import { Button } from "@/shared/ui/button";
import { ArrowLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useGetCourseLessonsQuery } from "./_vm/queries";
import { Skeleton } from "@/shared/ui/skeleton";

export function SelectLessonSheet({
  params: { courseSlug, lessonSlug },
}: {
  params: CurrentLessonParams;
}) {
  const { isOpen, selectedCourseSlug, openCourseLesons, close, closeLessons } =
    useSelectLessonSheetStore();

  const { data: selectedCourse, isLoading: isPendingSelectedCourse } = useQuery(
    {
      ...useGetCourseLessonsQuery(selectedCourseSlug),
      enabled: !!selectedCourseSlug,
      select: (data) => data?.course,
    },
  );

  const sheetTitle = () => {
    if (!selectedCourseSlug) {
      return "Мои курсы";
    }

    return (
      <>
        <Button
          size={"icon"}
          variant={"ghost"}
          onClick={closeLessons}
          className="-my-5"
        >
          <ArrowLeft />
        </Button>
        Уроки:{" "}
        <>
          {isPendingSelectedCourse ? (
            <Skeleton className="h-[1em] w-20 " />
          ) : (
            selectedCourse?.title
          )}
        </>
      </>
    );
  };

  return (
    <Sheet open={isOpen} onOpenChange={() => close()}>
      <SheetContent side="left" className="p-0 flex flex-col">
        <SheetHeader className="p-3 sm:p-5 ">
          <SheetTitle className="flex gap-2 items-center text-left">
            {sheetTitle()}
          </SheetTitle>
        </SheetHeader>
        {selectedCourseSlug ? (
          <CourseLessons
            currentLessonSlug={lessonSlug}
            courseSlug={selectedCourseSlug}
            onLinkClick={close}
          />
        ) : (
          <CoursesList
            onLinkClick={close}
            currentCourseSlug={courseSlug}
            onCourseClick={openCourseLesons}
          />
        )}
      </SheetContent>
    </Sheet>
  );
}
