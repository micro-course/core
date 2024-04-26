import { Skeleton } from "@/shared/ui/skeleton";
import { cn } from "@/shared/ui/utils";

export function CourseDetailsSkeleton({ className }: { className?: string }) {
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
