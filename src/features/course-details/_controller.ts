import { Controller, publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { GetCourseDetailsService } from "./_services/get-course-details";
import { z } from "zod";

@injectable()
export class CourseDetailsController extends Controller {
  constructor(private courseDetailsService: GetCourseDetailsService) {
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
    },
  });
}
