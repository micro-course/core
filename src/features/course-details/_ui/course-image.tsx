import Image from "next/image";
import { cn } from "@/shared/ui/utils";
import { CourseSlug } from "@/kernel/domain/course";
import { courseDetailsHttpApi } from "../_api";

export async function CourseImage({
  courseSlug,
  className,
}: {
  courseSlug: CourseSlug;
  className?: string;
}) {
  const { image, title } = await courseDetailsHttpApi.courseDetails.get.query({
    courseSlug,
  });

  return (
    <div className={cn("relative", className)}>
      <Image
        className={cn(" object-cover transition-opacity")}
        fill
        src={image}
        alt={title}
      />
    </div>
  );
}
