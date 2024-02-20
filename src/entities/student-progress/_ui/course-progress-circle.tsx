import { CourseProgressPercent } from "@/entities/student-progress/student-progress";
import CircularProgress from "@/shared/ui/circular-progress";

export function CourseProgressCircle({
  courseProgress,
  className,
  strokeWidth,
  size,
  hideText,
  textClassName,
}: {
  courseProgress: CourseProgressPercent;
  strokeWidth?: number;
  size?: number;
  hideText?: boolean;
  className?: string;
  textClassName?: string;
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
        textClassName={textClassName}
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
        textClassName={textClassName}
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
        textClassName={textClassName}
        circleProgressClassName="storke-blue-500"
      />
    );
  }
}
