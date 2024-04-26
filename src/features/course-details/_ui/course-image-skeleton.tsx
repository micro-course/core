import { cn } from "@/shared/ui/utils";
import { Skeleton } from "@/shared/ui/skeleton";

export async function CourseImageSkeleton({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <Skeleton className="w-full absolute inset-0" />
    </div>
  );
}
