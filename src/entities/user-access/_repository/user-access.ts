import { injectable } from "inversify";
import { dbClient } from "@/shared/lib/db";
import { UserAccess, CourseUserAccess } from "../_domain/types";
import { CourseId } from "@/kernel/domain/course";
import { UserId } from "@/kernel/domain/user";
import { UserAccessType } from "@prisma/client";

@injectable()
export class UserAccessRepository {
  async findUserCourseAccess(
    userId: UserId,
    courseId: CourseId,
  ): Promise<CourseUserAccess | undefined> {
    const userAccessDb = await this.queryCourseUserAccess(userId, courseId);
    if (!userAccessDb) {
      return undefined;
    }

    const userAccess = this.dbUserAccesToUserAccess(userAccessDb);

    if (userAccess.type === UserAccessType.course) {
      return userAccess;
    }

    return undefined;
  }

  async save(userAccess: UserAccess): Promise<UserAccess> {
    return this.dbUserAccesToUserAccess(
      await dbClient.userAccess.create({
        data: {
          id: userAccess.id,
          courseId: userAccess.courseId,
          userId: userAccess.userId,
          type: userAccess.type,
          reason: userAccess.reason,
          adminId: userAccess.adminId,
        },
      }),
    );
  }

  private dbUserAccesToUserAccess(
    userAccess: NotNull<
      Awaited<ReturnType<UserAccessRepository["queryCourseUserAccess"]>>
    >,
  ): UserAccess {
    return {
      id: userAccess.id,
      courseId: userAccess.courseId,
      userId: userAccess.userId,
      type: userAccess.type,
      reason: userAccess.reason,
      adminId: userAccess.adminId ?? undefined,
    };
  }

  private queryCourseUserAccess(userId: UserId, courseId: CourseId) {
    return dbClient.userAccess.findFirst({
      where: {
        userId,
        type: UserAccessType.course,
        courseId,
      },
    });
  }
}

type NotNull<T> = T extends null ? never : T;
