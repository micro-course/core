import { Input } from "@/shared/ui/input";
import { useState } from "react";
import Link from "next/link";
import { CourseListItem } from "../_domain/projections";
import { CourseSlug } from "@/entities/course/course";
import { ChevronRight } from "lucide-react";
import { useCoursesList } from "../_vm/use-courses-list";
import { Skeleton } from "@/shared/ui/skeleton";
import { CourseProgressCircle } from "@/entities/student-progress/student-progress";
import { cn } from "@/shared/ui/utils";

export function CoursesList({
  onCourseClick,
  onLinkClick,
  currentCourseSlug,
}: {
  currentCourseSlug: CourseSlug;
  onCourseClick: (courseSlug: CourseSlug) => void;
  onLinkClick: () => void;
}) {
  const [query, setQuery] = useState("");

  const { filterredNotMyCourses, filterredMyCourses, isPending } =
    useCoursesList({
      query,
    });

  return (
    <div className="flex flex-col gap-8">
      <Input
        className="px-3 sm:px-5 rounded-none h-12 border-r-0 border-l-0"
        placeholder="Поиск..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="flex flex-col">
        {isPending && (
          <>
            <Skeleton className="h-12 mb-px" />
            <Skeleton className="h-12 mb-px" />
            <Skeleton className="h-12 mb-px" />
          </>
        )}
        {filterredMyCourses.map((course) => {
          return (
            <button key={course.id} onClick={() => onCourseClick(course.slug)}>
              <CourseLink
                course={course}
                isSelected={course.slug === currentCourseSlug}
              />
            </button>
          );
        })}
        {filterredMyCourses.length === 0 && !isPending && (
          <div className="p-3 sm:p-5 ">Список курсов пуст</div>
        )}
      </div>
      {filterredNotMyCourses.length > 0 && (
        <div>
          <h4 className="text-lg px-3 sm:px-5 mb-4">Остальные курсы</h4>
          <div>
            {isPending && (
              <>
                <Skeleton className="p-3 sm:p-5" />
                <Skeleton className="p-3 sm:p-5" />
                <Skeleton className="p-3 sm:p-5" />
              </>
            )}
            {filterredNotMyCourses.map((course) => {
              return (
                <Link
                  key={course.id}
                  href={`/course/${course.slug}`}
                  onClick={onLinkClick}
                >
                  <CourseLink course={course} />
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

const CourseLink = ({
  course,
  isSelected,
}: {
  course: CourseListItem;
  isSelected?: boolean;
}) => {
  return (
    <div
      className={cn(
        "flex flex-1 items-center justify-between py-3 px-3 sm:px-5 font-medium border-b border-t -mb-px text-left gap-2",
        isSelected && "ring-2 ring-inset ring-primary",
      )}
    >
      {course.progress && (
        <CourseProgressCircle
          className="shrink-0"
          courseProgress={course.progress}
          size={16}
          strokeWidth={3}
          hideText
        />
      )}
      {course.title}
      <ChevronRight className="w-5 h-5 ml-auto shrink-0" />
    </div>
  );
};
