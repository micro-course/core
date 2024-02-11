import { CourseProgressPercent } from "@/entities/student-progress/student-progress";
import CircularProgress from "@/shared/ui/circular-progress";

export function CourseProgressCircle({
  courseProgress,
  className,
  strokeWidth,
  size,
  hideText,
}: {
  courseProgress: CourseProgressPercent;
  strokeWidth?: number;
  size?: number;
  hideText?: boolean;
  className?: string;
}) {
  if (courseProgress.type === "not-started") {
    return null;
  }

  if (courseProgress.type === "completed") {
    return (
      <CircularProgress
        size={size}
        strokeWidth={strokeWidth}
        percentage={courseProgress.percent}
        className={className}
        hideText={hideText}
        circleProgressClassName="stroke-green-500"
      />
    );
  }

  if (courseProgress.type === "in-progress-last") {
    return (
      <CircularProgress
        size={size}
        strokeWidth={strokeWidth}
        percentage={courseProgress.percent}
        className={className}
        hideText={hideText}
        circleProgressClassName="stroke-orange-500"
      />
    );
  }

  if (courseProgress.type === "in-progress") {
    return (
      <CircularProgress
        size={size}
        strokeWidth={strokeWidth}
        percentage={courseProgress.percent}
        className={className}
        hideText={hideText}
        circleProgressClassName="storke-blue-500"
      />
    );
  }
}
