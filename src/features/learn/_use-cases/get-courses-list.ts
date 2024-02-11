import { WithSession, checkAbility } from "@/entities/user/session.server";
import { courseIndexRepository } from "@/entities/course/course.server";
import { createLearnAbility } from "../_domain/ability";
import { courseToListItem } from "../_domain/mapper";
import { CourseListItem } from "../_domain/projections";
import { studentProgressRepository } from "@/entities/student-progress/student-progress.server";
import { UserId } from "@/kernel";
import { getCourseProgressPercent } from "@/entities/student-progress/student-progress";
import { getSortedMyCourses } from "../_domain/methods";

export class GetCoursesListUseCase {
  @checkAbility({
    createAbility: createLearnAbility,
    check: (ability) => ability.canViewCourses(),
  })
  async exec({ session }: WithSession): Promise<{
    myCourses: CourseListItem[];
    otherCourses: CourseListItem[];
  }> {
    const { courseIndex, studentProgress } = await this.uploadData(
      session.user.id,
    );

    const myCourses = getSortedMyCourses(courseIndex, studentProgress).map(
      (course) =>
        courseToListItem(
          course,
          getCourseProgressPercent(course, studentProgress),
        ),
    );

    const otherCourses = courseIndex.list
      .filter((course) => !studentProgress.courses[course.id]?.enteredAt)
      .map((course) => courseToListItem(course));

    return {
      myCourses,
      otherCourses,
    };
  }

  private async uploadData(userId: UserId) {
    const [courseIndex, studentProgress] = await Promise.all([
      courseIndexRepository.getCoursesIndex(),
      studentProgressRepository.getByStudentId(userId),
    ]);

    return {
      courseIndex,
      studentProgress,
    };
  }
}

export const getCoursesListUseCase = new GetCoursesListUseCase();
