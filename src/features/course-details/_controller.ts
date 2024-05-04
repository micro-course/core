import {
  authorizedProcedure,
  Controller,
  publicProcedure,
  router,
} from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { GetCourseDetailsService } from "./_services/get-course-details";
import { GetCourseActionService } from "./_services/get-course-action";
import { z } from "zod";
import { StartCoursePurchaseService } from "@/kernel/services/start-course-purchase";
import { redirect } from "next/navigation";

@injectable()
export class CourseDetailsController extends Controller {
  constructor(
    private courseDetailsService: GetCourseDetailsService,
    private getCourseActionService: GetCourseActionService,
    private startCoursePurchaseService: StartCoursePurchaseService,
  ) {
    super();
  }

  public router = router({
    courseDetails: {
      get: publicProcedure
        .input(z.object({ courseSlug: z.string() }))
        .query(({ input }) => {
          return this.courseDetailsService.exec({
            courseSlug: input.courseSlug,
          });
        }),
      getAction: authorizedProcedure
        .input(z.object({ courseSlug: z.string() }))
        .query(({ input, ctx }) => {
          return this.getCourseActionService.exec({
            courseSlug: input.courseSlug,
            userId: ctx.session.user.id,
          });
        }),
      buyCourse: authorizedProcedure
        .input(z.object({ courseSlug: z.string() }))
        .mutation(async ({ input, ctx }) => {
          return await this.startCoursePurchaseService.exec({
            courseSlug: input.courseSlug,
            userId: ctx.session.user.id,
          });
        }),
    },
  });
}
