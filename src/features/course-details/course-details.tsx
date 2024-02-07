import { CourseSlug } from "@/entities/course/course";
import { useQuery } from "@tanstack/react-query";
import { useCourseDetailsQuery } from "./_vm/queries";
import { MdxCode } from "@/shared/lib/mdx";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/ui/utils";
import { LessonsList } from "./_ui/lessons";

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
    <div className={cn(className, "flex gap-5 flex-col")}>
      <h2 className="mt-10 scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        {courseDetailsQuery.data.title}
      </h2>

      <MdxCode code={courseDetailsQuery.data.description} />

      <BuyButton className="mt-8" />

      <hr className="mt-6" />

      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Уроки
      </h3>

      <LessonsList />
    </div>
  );
}

function BuyButton({ className }: { className: string }) {
  return (
    <Button variant={"default"} size={"lg"} className={className}>
      Купить за 999 руб
    </Button>
  );
}
