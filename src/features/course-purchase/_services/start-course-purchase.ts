import { injectable } from "inversify";
import { getIsCourseInDraft } from "@/entities/course";
import {
  GetCourseLessonsService,
  GetCourseService,
} from "@/entities/course/server";
import { CreatePaymentService } from "@/entities/payment/server";
import { CheckCourseAccessService } from "@/entities/user-access/server";
import { CourseSlug } from "@/kernel/domain/course";
import { UserId } from "@/kernel/domain/user";
import {
  getCoursePurchaseSucccessPath,
  getCoursePurchaseWebhookPath,
} from "@/kernel/lib/router";
import { publicConfig } from "@/shared/config/public";
import { TRPCError } from "@trpc/server";
import { ProdamusService } from "./prodamus";
type Command = {
  courseSlug: CourseSlug;
  userId: UserId;
  userEmail: string;
  urlReturn: string;
};

@injectable()
export class StartCorusePurchaseService {
  constructor(
    private getCourseService: GetCourseService,
    private getCourseLessonService: GetCourseLessonsService,
    private checkCourseAccessService: CheckCourseAccessService,
    private createPaymentService: CreatePaymentService,
    private prodamusService: ProdamusService,
  ) {}
  async exec(command: Command) {
    const course = await this.getCourseService.exec({
      slug: command.courseSlug,
    });
    const lessons = await this.getCourseLessonService.exec({
      courseSlug: command.courseSlug,
    });

    if (!course) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: `Course ${command.courseSlug} not found`,
      });
    }

    if (getIsCourseInDraft(lessons)) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: `Course ${command.courseSlug} in draft`,
      });
    }

    if (course.product.access === "free") {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: `Course ${command.courseSlug} is free`,
      });
    }

    if (
      await this.checkCourseAccessService.exec({
        userId: command.userId,
        course: course,
      })
    ) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: `Course ${command.courseSlug} is already purchased`,
      });
    }

    const payment = await this.createPaymentService.exec({
      userEmail: command.userEmail,
      userId: command.userId,
      products: [
        {
          type: "course",
          sku: course.id,
          price: course.product.price,
          name: `Доступ к курсу: ${course.title}`,
          quantity: 1,
        },
      ],
    });

    const successPath = getCoursePurchaseSucccessPath(publicConfig.PUBLIC_URL);
    const notificationPath = getCoursePurchaseWebhookPath(
      publicConfig.PUBLIC_URL,
    );

    const { url } = await this.prodamusService.createLink({
      urlReturn: command.urlReturn,
      urlSuccess: successPath,
      urlNotification: notificationPath,
      ...payment,
    });

    return {
      url,
    } as const;
  }
}
