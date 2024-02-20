import Image from "next/image";
import { CourseSlug } from "@/entities/course/course";
import { useQuery } from "@tanstack/react-query";
import { useCourseDetailsQuery } from "./_vm/queries";
import { cn } from "@/shared/ui/utils";
import { useState } from "react";
import { Skeleton } from "@/shared/ui/skeleton";

export function CourseImage({
  courseSlug,
  className,
}: {
  courseSlug: CourseSlug;
  className?: string;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const courseDetailsQuery = useQuery({
    ...useCourseDetailsQuery(courseSlug),
    select: (courseDetails) => ({
      src: courseDetails.image,
      title: courseDetails.title,
    }),
  });

  return (
    <div className={cn("relative", className)}>
      <Skeleton className="w-full absolute inset-0" />
      {courseDetailsQuery.data && (
        <Image
          className={cn(
            " object-cover transition-opacity",
            isLoading ? "opacity-0" : "opacity-100",
          )}
          fill
          onLoadingComplete={() => setIsLoading(false)}
          src={courseDetailsQuery.data.src}
          alt={courseDetailsQuery.data.title}
        />
      )}
    </div>
  );
}
