import { Input } from "@/shared/ui/input";
import { useState } from "react";
import Link from "next/link";
import { LessonListItem } from "../_domain/projections";
import { ChevronRight } from "lucide-react";
import { LessonSlug } from "@/entities/course/lesson";
import { CourseSlug } from "@/entities/course/course";
import { ScrollArea } from "@/shared/ui/scroll-area";
import { useLessonsList } from "../_vm/use-lessons-list";
import { Skeleton } from "@/shared/ui/skeleton";

export function CourseLessons({
  onLinkClick,
  courseSlug,
}: {
  courseSlug: CourseSlug;
  currentLessonSlug: LessonSlug;
  onLinkClick: () => void;
}) {
  const [query, setQuery] = useState("");

  const { filterredLessons, isPending } = useLessonsList({
    query,
    courseSlug,
  });

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
                <LessonLink lesson={lesson} />
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

const LessonLink = ({ lesson }: { lesson: LessonListItem }) => {
  return (
    <div className="flex flex-1 items-center justify-between py-3 px-3 sm:px-5 font-medium border-b border-t -mb-px">
      {lesson.title}
      <ChevronRight className="w-5 h-5 ml-auto shrink-0" />
    </div>
  );
};
