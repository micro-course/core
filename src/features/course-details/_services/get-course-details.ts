import {
  GetCourseLessonsService,
  GetCourseService,
} from "@/entities/course/server";
import { injectable } from "inversify";
import { CourseDetails } from "../_domain/types";
import { CourseSlug } from "@/kernel/domain/course";
import { TRPCError } from "@trpc/server";
import { createCourseDetails } from "../_domain/factory";

type Query = {
  courseSlug: CourseSlug;
};

@injectable()
export class GetCourseDetailsService {
  constructor(
    private getCourseService: GetCourseService,
    private getCourseLessonsService: GetCourseLessonsService,
  ) {}
  async exec(query: Query): Promise<CourseDetails> {
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

    return createCourseDetails(course, lessons);
  }
}
