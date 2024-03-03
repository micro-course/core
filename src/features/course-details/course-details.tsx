import { CourseSlug } from "@/entities/course/course";
import { useQuery } from "@tanstack/react-query";
import { useCourseDetailsQuery } from "./_vm/queries";
import { MdxCode } from "@/shared/lib/mdx";
import { cn } from "@/shared/ui/utils";
import { LessonsList } from "./_ui/lessons";
import { CourseAction } from "./_ui/course-action";
import { Skeleton } from "@/shared/ui/skeleton";
import Image from "next/image";

const components = {
  NextImage: Image,
};

export function CourseDetails({
  courseSlug,
  className,
}: {
  courseSlug: CourseSlug;
  className?: string;
}) {
  const courseDetailsQuery = useQuery({
    ...useCourseDetailsQuery(courseSlug),
  });

  if (courseDetailsQuery.isPending) {
    return (
      <div className={cn(className, "flex gap-8 flex-col")}>
        <div className="flex flex-col gap-5">
          <Skeleton className="h-9" />

          <Skeleton className="h-[100px]" />

          <Skeleton className="h-11" />
        </div>
      </div>
    );
  }

  if (courseDetailsQuery.isError) {
    return <div>Course loading error: {courseDetailsQuery.error.message}</div>;
  }

  return (
    <div className={cn(className, "flex gap-8 flex-col")}>
      <div className="flex flex-col gap-5">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {courseDetailsQuery.data.title}
        </h1>

        <MdxCode
          code={courseDetailsQuery.data.description}
          components={components}
        />

        <CourseAction
          action={courseDetailsQuery.data.action}
          courseSlug={courseSlug}
        />
      </div>

      <hr />

      <LessonsList lessons={courseDetailsQuery.data.lessons} />
    </div>
  );
}
