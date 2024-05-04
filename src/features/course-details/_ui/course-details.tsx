import { MdxCode } from "@/shared/lib/mdx";
import { cn } from "@/shared/ui/utils";
import { LessonsList } from "./lessons-list";
import Image from "next/image";
import { CourseSlug } from "@/kernel/domain/course";
import { courseDetailsHttpApi } from "../_api";
import { CourseAction } from "./course-action";

const components = {
  NextImage: Image,
};

export async function CourseDetails({
  courseSlug,
  className,
}: {
  courseSlug: CourseSlug;
  className?: string;
}) {
  const { title, description, lessons } =
    await courseDetailsHttpApi.courseDetails.get.query({
      courseSlug,
    });

  return (
    <div className={cn(className, "flex gap-8 flex-col")}>
      <div className="flex flex-col gap-5">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-5">
          {title}
        </h1>

        <CourseAction courseSlug={courseSlug} />
        <MdxCode code={description} components={components} />
        <CourseAction courseSlug={courseSlug} />
      </div>

      <hr />

      <LessonsList lessons={lessons} />
    </div>
  );
}
