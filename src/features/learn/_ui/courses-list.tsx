import { Input } from "@/shared/ui/input";
import { useDeferredValue, useState } from "react";
import Link from "next/link";
import { CourseListItem } from "../_domain/projections";
import { CourseSlug } from "@/entities/course/course";
import { ChevronRight } from "lucide-react";
import { useCoursesList } from "../_vm/use-courses-list";
import { Skeleton } from "@/shared/ui/skeleton";

export function CoursesList({
  currentCourseSlug,
  onCourseClick,
  onLinkClick,
}: {
  currentCourseSlug: CourseSlug;
  onCourseClick: (courseSlug: CourseSlug) => void;
  onLinkClick: () => void;
}) {
  const [query, setQuery] = useState("");

  const {
    filterredNotMyCourses,
    filterredMyCourses,
    currentCourse,
    isPending,
  } = useCoursesList({
    currentCourseSlug,
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
        {currentCourse && (
          <button onClick={() => onCourseClick(currentCourse.slug)}>
            <CourseLink course={currentCourse} />
          </button>
        )}
        {filterredMyCourses.map((course) => {
          return (
            <button key={course.id} onClick={() => onCourseClick(course.slug)}>
              <CourseLink course={course} />
            </button>
          );
        })}
        {filterredMyCourses.length === 0 && !isPending && (
          <div className="p-3 sm:p-5 ">Список курсов пуст</div>
        )}
      </div>
      {filterredMyCourses.length > 0 && (
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

const CourseLink = ({ course }: { course: CourseListItem }) => {
  return (
    <div className="flex flex-1 items-center justify-between py-3 px-3 sm:px-5 font-medium border-b border-t -mb-px text-left">
      {course.title}
      <ChevronRight className="w-5 h-5 ml-auto shrink-0" />
    </div>
  );
};
