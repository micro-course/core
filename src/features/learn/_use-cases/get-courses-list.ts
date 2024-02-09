import { WithSession, checkAbility } from "@/entities/user/session.server";
import { courseIndexRepository } from "@/entities/course/course.server";
import { createLearnAbility } from "../_domain/ability";
import { courseToListItem } from "../_domain/mapper";
import { CourseListItem } from "../_domain/projections";

export class GetCoursesListUseCase {
  @checkAbility({
    createAbility: createLearnAbility,
    check: (ability) => ability.canViewCourses(),
  })
  async exec(_: WithSession): Promise<{
    myCourses: CourseListItem[];
    otherCourses: CourseListItem[];
  }> {
    const { courseIndex } = await this.uploadData();

    const myCourses = courseIndex.list.map(courseToListItem);
    const otherCourses = courseIndex.list.map(courseToListItem);

    return {
      myCourses,
      otherCourses,
    };
  }

  private async uploadData() {
    const [courseIndex] = await Promise.all([
      courseIndexRepository.getCoursesIndex(),
    ]);

    return {
      courseIndex,
    };
  }
}

export const getCoursesListUseCase = new GetCoursesListUseCase();
