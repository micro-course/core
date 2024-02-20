import { WithSession, checkAbility } from "@/entities/user/session.server";
import { createLearnAbility } from "../_domain/ability";
import { CourseSlug } from "@/entities/course/course";
import { checkCourseAccessService } from "@/entities/access/user-access.server";
import { courseRepository } from "@/entities/course/course.server";
import { AuthorizatoinError, NotFoundError } from "@/shared/lib/errors";
import { studentProgressRepository } from "@/entities/student-progress/student-progress.server";

type Query = {
  courseSlug: CourseSlug;
};

export class CheckAccessUseCase {
  @checkAbility({
    createAbility: createLearnAbility,
    check: (ability) => ability.canViewCourses(),
  })
  async exec({ session }: WithSession, query: Query): Promise<boolean> {
    const course = await courseRepository.courseBySlug(query.courseSlug);

    if (!course) {
      throw new NotFoundError("Course not found");
    }

    const canAccess = checkCourseAccessService.exec({
      course,
      userId: session.user.id,
    });

    if (!canAccess) {
      throw new AuthorizatoinError("You don't have access to this course");
    }

    const progress = await studentProgressRepository.getByStudentId(
      session.user.id,
    );

    const courseProgress = progress.courses[course.id];
    if (!courseProgress) {
      throw new AuthorizatoinError("You don't have access to this course");
    }

    return true;
  }
}

export const checkAccessUseCase = new CheckAccessUseCase();
