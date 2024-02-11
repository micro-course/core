import { CourseSlug } from "@/entities/course/course";
import { useQuery } from "@tanstack/react-query";
import { useCourseDetailsQuery } from "./_vm/queries";
import { MdxCode } from "@/shared/lib/mdx";
import { cn } from "@/shared/ui/utils";
import { LessonsList } from "./_ui/lessons";
import { CourseAction } from "./_ui/course-action";

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
    return <div>Loading...</div>;
  }

  if (courseDetailsQuery.isError) {
    return <div>Course loading error: {courseDetailsQuery.error.message}</div>;
  }

  return (
    <div className={cn(className, "flex gap-8 flex-col")}>
      <div className="flex flex-col gap-5">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors ">
          {courseDetailsQuery.data.title}
        </h2>

        <MdxCode code={courseDetailsQuery.data.description} />

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