import { CourseNodeProgress } from "@/features/courses-map/_domain/projections";
import CircularProgress from "@/shared/ui/circular-progress";

export function CourseProgress({
  courseProgress,
  className,
}: {
  courseProgress: CourseNodeProgress;
  className?: string;
}) {
  if (courseProgress.type === "not-started") {
    return null;
  }

  if (courseProgress.type === "completed") {
    return (
      <CircularProgress
        percentage={courseProgress.percent}
        className={className}
        circleProgressClassName="stroke-green-500"
      />
    );
  }

  if (courseProgress.type === "in-progress-last") {
    return (
      <CircularProgress
        percentage={courseProgress.percent}
        className={className}
        circleProgressClassName="stroke-orange-500"
      />
    );
  }

  if (courseProgress.type === "in-progress") {
    return (
      <CircularProgress
        percentage={courseProgress.percent}
        className={className}
        circleProgressClassName="storke-blue-500"
      />
    );
  }
}
