import { WithSession, checkAbility } from "@/entities/user/session.server";
import { courseIndexRepository } from "@/entities/course/course.server";
import { createLearnAbility } from "../_domain/ability";
import { courseToListItem } from "../_domain/mapper";
import { CourseListItem } from "../_domain/projections";
import { studentProgressRepository } from "@/entities/student-progress/student-progress.server";
import { UserId } from "@/kernel";
import { getCourseProgressPercent } from "@/entities/student-progress/student-progress";
import { getSortedMyCourses } from "../_domain/methods";
import { mapNodeRepository } from "@/entities/map/map-node.server";
import { CourseMapNodeData } from "@/entities/map/map-node";
import { NotUndefined } from "@/shared/lib/types";

export class GetCoursesListUseCase {
  @checkAbility({
    createAbility: createLearnAbility,
    check: (ability) => ability.canViewCourses(),
  })
  async exec({ session }: WithSession): Promise<{
    myCourses: CourseListItem[];
    otherCourses: CourseListItem[];
  }> {
    const { courseIndex, studentProgress, mapNodes } = await this.uploadData(
      session.user.id,
    );

    const myCourses = getSortedMyCourses(courseIndex, studentProgress).map(
      (course) =>
        courseToListItem(
          course,
          getCourseProgressPercent(course, studentProgress),
        ),
    );

    const otherCourses = mapNodes
      .filter((mapNode) => !mapNode.hidden && mapNode.data.type === "course")
      .map((mapNode) => {
        const data = mapNode.data as CourseMapNodeData;
        return courseIndex.byId[data.courseId];
      })
      .filter((course): course is NotUndefined<typeof course> => !!course)
      .filter((course) => !studentProgress.courses[course.id]?.enteredAt)
      .map((course) => courseToListItem(course));

    return {
      myCourses,
      otherCourses,
    };
  }

  private async uploadData(userId: UserId) {
    const [courseIndex, studentProgress, mapNodes] = await Promise.all([
      courseIndexRepository.getCoursesIndex(),
      studentProgressRepository.getByStudentId(userId),
      mapNodeRepository.getList(),
    ]);

    return {
      courseIndex,
      studentProgress,
      mapNodes,
    };
  }
}

export const getCoursesListUseCase = new GetCoursesListUseCase();
