import { CoursesIndex } from "@/entities/course/course";
import { StudentProgress } from "@/entities/student-progress/student-progress";

export function getSortedMyCourses(
  courseIndex: CoursesIndex,
  studentProgress: StudentProgress,
) {
  return courseIndex.list
    .filter((course) => !!studentProgress.courses[course.id]?.enteredAt)
    .sort((a, b) => {
      const aProgress = studentProgress.courses[a.id];
      const bProgress = studentProgress.courses[b.id];
      const aLastInteractionAt =
        aProgress?.lastInteractionAt?.toMillis?.() ?? 0;
      const bLastInteractionAt =
        bProgress?.lastInteractionAt?.toMillis?.() ?? 0;

      let comparison = Math.min(
        1,
        Math.max(-1, aLastInteractionAt - bLastInteractionAt),
      );

      const aEnterWeight = aProgress?.enteredAt ? 10 : 0;
      const bEnterWeight = bProgress?.enteredAt ? 10 : 0;

      comparison += aEnterWeight - bEnterWeight;

      return comparison;
    });
}
