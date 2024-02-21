import { CoursesIndex } from "@/entities/course/course";
import { StudentProgress } from "@/entities/student-progress/student-progress";
import { DateTime } from "luxon";

export function getSortedMyCourses(
  courseIndex: CoursesIndex,
  studentProgress: StudentProgress,
  options?: {
    filterCompleted?: boolean;
  },
) {
  return courseIndex.list
    .filter(
      (course) =>
        !!studentProgress.courses[course.id]?.enteredAt &&
        (!options?.filterCompleted ||
          !studentProgress.courses[course.id]?.completedAt),
    )
    .sort((a, b) => {
      const aProgress = studentProgress.courses[a.id];
      const bProgress = studentProgress.courses[b.id];
      const aLastInteractionAt = aProgress
        ? DateTime.fromISO(aProgress.lastInteractionAt).toMillis()
        : 0;
      const bLastInteractionAt = bProgress
        ? DateTime.fromISO(bProgress.lastInteractionAt).toMillis()
        : 0;

      let comparison = Math.min(
        1,
        Math.max(-1, bLastInteractionAt - aLastInteractionAt),
      );

      const aEnterWeight = aProgress?.completedAt ? 10 : 0;
      const bEnterWeight = bProgress?.completedAt ? 10 : 0;

      comparison += aEnterWeight - bEnterWeight;

      return comparison;
    });
}
