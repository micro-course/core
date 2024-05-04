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

@injectable()
export class CourseDetailsController extends Controller {
  constructor(
    private courseDetailsService: GetCourseDetailsService,
    private getCourseActionService: GetCourseActionService,
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
      getAction: publicProcedure
        .input(z.object({ courseSlug: z.string() }))
        .query(({ input, ctx }) => {
          return this.getCourseActionService.exec({
            courseSlug: input.courseSlug,
            userId: ctx.session?.user.id,
          });
        }),
    },
  });
}
