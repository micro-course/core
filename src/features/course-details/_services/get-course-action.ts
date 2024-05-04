import {
  GetCourseLessonsService,
  GetCourseService,
} from "@/entities/course/server";
import { injectable } from "inversify";
import { CourseAction } from "../_domain/types";
import { CourseSlug } from "@/kernel/domain/course";
import { TRPCError } from "@trpc/server";
import { UserId } from "@/kernel/domain/user";
import { CheckCourseAccessService } from "@/entities/user-access/server";
import { getCourseAction } from "../_domain/methods";

type Query = {
  courseSlug: CourseSlug;
  userId?: UserId;
};

@injectable()
export class GetCourseActionService {
  constructor(
    private getCourseService: GetCourseService,
    private getCourseLessonsService: GetCourseLessonsService,
    private getCourseAccess: CheckCourseAccessService,
  ) {}
  async exec(query: Query): Promise<CourseAction> {
    const course = await this.getCourseService.exec({ slug: query.courseSlug });
    const lessons = await this.getCourseLessonsService.exec({
      courseSlug: query.courseSlug,
    });

    if (!course) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: `Course ${query.courseSlug} not found`,
      });
    }

    const courseAccess = query.userId
      ? await this.getCourseAccess.exec({
          course,
          userId: query.userId,
        })
      : false;

    return getCourseAction({
      course,
      lessons,
      hasAccess: courseAccess,
    });
  }
}
