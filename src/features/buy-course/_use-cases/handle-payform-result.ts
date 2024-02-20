import { WithSession } from "@/entities/user/session.server";
import { courseRepository } from "@/entities/course/course.server";
import { CourseId, CourseSlug, UserId } from "@/kernel";
import { lessonRepository } from "@/entities/course/lesson.server";
import {
  BadRequest,
  NotFoundError,
  UnknownServerError,
} from "@/shared/lib/errors";
import { getLessonPath } from "@/shared/router";
import { publicConfig } from "@/shared/config/public";
import { receivePaymentService } from "@/entities/payment/payment.server";
import { prodamusService } from "../_services/prodamus-service";
import { grantCourseAccessService } from "@/entities/access/user-access.server";
import { courseEnterService } from "@/entities/student-progress/student-progress.server";

type Command = {
  payformId: string;
  payformOrderId: string;
  payformSign: string;
  payformStatus: "success" | string;
};

export class HandlePayformResultUseCase {
  async exec(
    { session }: WithSession,
    command: Command,
  ): Promise<{ url: string; courseSlug: CourseSlug }> {
    const paymentId = prodamusService.parseOrderId(command.payformOrderId);

    /* TODO
    const signValid = prodamusService.checkSignature({
      paymentId: paymentId,
      sign: command.payformSign,
    });

    if (!signValid) {
      throw new BadRequest("Invalid signature");
    }
    */

    const { payment } =
      command.payformStatus === "success"
        ? await receivePaymentService.exec({
            userId: session.user.id,
            paymentId: paymentId,
            type: "success",
          })
        : await receivePaymentService.exec({
            userId: session.user.id,
            paymentId: paymentId,
            type: "failure",
            errorCode: "400",
            errorMessage: "Ошибка оплаты",
          });

    if (payment.data.type === "failed") {
      throw new BadRequest(payment.data.errorMessage);
    }

    if (payment.data.type === "success") {
      if (payment.products[0].type === "course") {
        const courseId = payment.products[0].sku;
        const { url, courseSlug } = await this.grantCourseAccess(
          session.user.id,
          courseId,
        );

        return {
          url,
          courseSlug,
        };
      }
    }

    throw new UnknownServerError("payment allready pending");
  }

  async grantCourseAccess(userId: UserId, courseId: CourseId) {
    const course = await courseRepository.courseById(courseId);
    const lessons = await lessonRepository.lessonsByIds(course?.lessons ?? []);

    if (!course || !lessons.length) {
      throw new NotFoundError("Course not found");
    }

    await grantCourseAccessService.exec({
      courseId,
      userId,
      reason: "paid",
    });

    await courseEnterService.exec({
      studentId: userId,
      courseId,
    });

    return {
      url: getLessonPath(
        {
          courseSlug: course.slug,
          lessonSlug: lessons[0].slug,
        },
        publicConfig.PUBLIC_URL,
      ),
      courseSlug: course.slug,
    };
  }
}

export const handlePayformResultUseCase = new HandlePayformResultUseCase();
