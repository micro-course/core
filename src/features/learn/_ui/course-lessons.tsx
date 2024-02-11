import { Input } from "@/shared/ui/input";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LessonListItem } from "../_domain/projections";
import { ChevronRight } from "lucide-react";
import { LessonSlug } from "@/entities/course/lesson";
import { CourseSlug } from "@/entities/course/course";
import { ScrollArea } from "@/shared/ui/scroll-area";
import { useLessonsList } from "../_vm/use-lessons-list";
import { Skeleton } from "@/shared/ui/skeleton";
import { LessonProgressCircle } from "@/entities/student-progress/student-progress";
import { cn } from "@/shared/ui/utils";

export function CourseLessons({
  onLinkClick,
  courseSlug,
  currentLessonSlug,
}: {
  courseSlug: CourseSlug;
  currentLessonSlug: LessonSlug;
  onLinkClick: () => void;
}) {
  const [query, setQuery] = useState("");

  const { filterredLessons, isPending, firstNotCompletedIndex } =
    useLessonsList({
      query,
      courseSlug,
    });

  const isCurrentLesson = !!filterredLessons.find(
    (lesson) => lesson.slug === currentLessonSlug,
  );

  return (
    <div className="flex flex-col gap-6 grow">
      <Input
        className="px-3 sm:px-5 rounded-none h-12 border-r-0 border-l-0"
        placeholder="Поиск..."
        tabIndex={0}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ScrollArea className="flex flex-col py-2 basis-0 grow">
        {isPending && (
          <>
            <Skeleton className="h-12 border-b" />
            <Skeleton className="h-12 border-b" />
            <Skeleton className="h-12 border-b" />
          </>
        )}

        {filterredLessons.length > 0 &&
          filterredLessons.map((lesson, i) => {
            return (
              <Link
                key={i}
                href={`/learn/course/${courseSlug}/lesson/${lesson.slug}`}
                onClick={onLinkClick}
              >
                <LessonLink
                  current={lesson.slug === currentLessonSlug}
                  lesson={lesson}
                  scrollTo={
                    isCurrentLesson
                      ? lesson.slug === currentLessonSlug
                      : firstNotCompletedIndex === i
                  }
                />
              </Link>
            );
          })}
        {filterredLessons.length === 0 && !isPending && (
          <div className="p-3 sm:p-5 ">Список уроков пуст</div>
        )}
        <div className="h-10"></div>
      </ScrollArea>
    </div>
  );
}

const LessonLink = ({
  lesson,
  scrollTo,
  current,
}: {
  lesson: LessonListItem;
  scrollTo?: boolean;
  current: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollTo && ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "center",
      });
    }
  }, [scrollTo]);

  return (
    <div
      ref={ref}
      className={cn(
        current && "ring-2 ring-primary",
        "flex flex-1 items-center justify-between py-3 px-3 sm:px-5 font-medium border-b border-t -mb-px gap-2",
      )}
    >
      {lesson.progress && (
        <LessonProgressCircle
          className="shrink-0"
          courseProgress={lesson.progress}
          size={16}
          strokeWidth={3}
          hideText
        />
      )}
      {lesson.title}
      <ChevronRight className="w-5 h-5 ml-auto shrink-0" />
    </div>
  );
};
