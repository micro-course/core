import { CourseEntity } from "@/entities/course/course";
import { CourseNodeProgress } from "../projections";
import { StudentProgress } from "@/entities/student-progress/student-progress";

export function getCourseNodeProgress(
  courseEntity: CourseEntity,
  studentProgress: StudentProgress,
): CourseNodeProgress {
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
