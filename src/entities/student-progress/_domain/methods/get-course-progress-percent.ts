import { CourseId, LessonId } from "@/kernel";
import { StudentProgress } from "../projections";

export type CourseProgressPercent =
  | {
      type: "not-started";
    }
  | {
      type: "completed";
      percent: number;
    }
  | { type: "in-progress"; percent: number }
  | { type: "in-progress-last"; percent: number };

type CourseEntity = {
  id: CourseId;
  lessons: LessonId[];
};

export function getCourseProgressPercent(
  courseEntity: CourseEntity,
  studentProgress: StudentProgress,
): CourseProgressPercent {
  const courseProgress = studentProgress.courses[courseEntity.id];

  if (!courseProgress) {
    return {
      type: "not-started",
    };
  }

  const completedLessons = courseEntity.lessons
    .map((lesson) => !!studentProgress.lessons[lesson]?.completedAt)
    .filter((completed): completed is true => completed).length;

  const percent = completedLessons / courseEntity.lessons.length;

  if (courseProgress.completedAt) {
    return {
      type: "completed",
      percent,
    };
  }

  if (studentProgress.lastViewedBlock?.courseId === courseEntity.id) {
    return {
      type: "in-progress-last",
      percent,
    };
  }

  return {
    type: "in-progress",
    percent,
  };
}
