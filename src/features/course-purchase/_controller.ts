import {
  authorizedProcedure,
  Controller,
  router,
} from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { z } from "zod";
import { StartCorusePurchaseService } from "./_services/start-course-purchase";

@injectable()
export class CoursePurchaseController extends Controller {
  constructor(private startCoursePurchaseService: StartCorusePurchaseService) {
    super();
  }

  public router = router({
    coursePurchase: {
      start: authorizedProcedure
        .input(
          z.object({
            courseSlug: z.string(),
            urlReturn: z.string(),
          }),
        )
        .mutation(({ ctx, input }) => {
          return this.startCoursePurchaseService.exec({
            courseSlug: input.courseSlug,
            userId: ctx.session.user.id,
            userEmail: ctx.session.user.email,
            urlReturn: input.urlReturn,
          });
        }),
    },
  });
}
