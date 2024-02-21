import CircularProgress from "@/shared/ui/circular-progress";
import { LessonProgressPercent } from "../student-progress";

export function LessonProgressCircle({
  courseProgress,
  className,
  strokeWidth,
  size,
  hideText,
}: {
  courseProgress: LessonProgressPercent;
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
