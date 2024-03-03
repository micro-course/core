import { createAdminAbility } from "../_domain/ability";
import { WithSession, checkAbility } from "@/entities/user/session.server";
import { userRepository } from "@/entities/user/_repositories/user";
import { CourseId, UserId } from "@/kernel";
import { courseRepository } from "@/entities/course/course.server";
import { BadRequest } from "@/shared/lib/errors";
import {
  checkCourseAccessService,
  grantCourseAccessService,
} from "@/entities/access/user-access.server";

export type Command = {
  userId: UserId;
  courseId: CourseId;
};

export class AddCourseAcessUseCase {
  @checkAbility({
    createAbility: createAdminAbility,
    check: (ability) => ability.canAddCourseAccess(),
  })
  async exec(
    { session }: WithSession,
    command: Command,
  ): Promise<{ ok: boolean }> {
    const { user, course } = await this.uploadData(command);

    if (!course) {
      throw new BadRequest("Course not found");
    }

    if (!user) {
      throw new BadRequest("User not found");
    }

    const isAccess = await checkCourseAccessService.exec({
      course,
      userId: command.userId,
    });

    if (isAccess) {
      throw new BadRequest("User already have access to this course");
    }

    grantCourseAccessService.exec({
      adminId: session.user.id,
      userId: command.userId,
      reason: "manual",
      courseId: command.courseId,
    });

    return {
      ok: true,
    };
  }

  private async uploadData(command: Command) {
    const [user, course] = await Promise.all([
      userRepository.getUserById(command.userId),
      courseRepository.courseById(command.courseId),
    ]);

    return {
      user,
      course,
    };
  }
}

export const addCourseAcessUseCase = new AddCourseAcessUseCase();
