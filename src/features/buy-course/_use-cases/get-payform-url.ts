import { WithSession } from "@/entities/user/session.server";
import { courseRepository } from "@/entities/course/course.server";
import { CourseSlug } from "@/kernel";
import { SessionEntity } from "@/entities/user/session";
import { lessonRepository } from "@/entities/course/lesson.server";
import { BadRequest } from "@/shared/lib/errors";
import { getBuySuccessByPath } from "@/shared/router";
import { publicConfig } from "@/shared/config/public";
import { createPaymentService } from "@/entities/payment/payment.server";
import { prodamusService } from "../_services/prodamus-service";
import { checkCourseAccessService } from "@/entities/access/user-access.server";

type Command = {
  buyCourse?: {
    courseSlug: CourseSlug;
    urlReturn: string;
  };
};

export class GetPayformUrlUseCase {
  async exec(
    { session }: WithSession,
    command: Command,
  ): Promise<{ url: string }> {
    if (command.buyCourse) {
      return await this.buyCourse(session, command.buyCourse);
    }
    throw new BadRequest("unknown product type");
  }

  async buyCourse(
    session: SessionEntity,
    buyCourse: {
      courseSlug: CourseSlug;
      urlReturn: string;
    },
  ) {
    const course = await courseRepository.courseBySlug(buyCourse.courseSlug);
    const lesson = (
      await lessonRepository.lessonsByIds(course?.lessons ?? [])
    )[0];

    // Косвенный признак что курс в драфте
    if (!course || !lesson) {
      throw new BadRequest("Course not found");
    }

    if (course.product.access === "free") {
      throw new BadRequest("Course is free");
    }

    if (
      await checkCourseAccessService.exec({
        userId: session.user.id,
        course: course,
      })
    ) {
      throw new BadRequest("You already have access to this course");
    }

    const buySuccessPath = getBuySuccessByPath(publicConfig.PUBLIC_URL);

    const { payment } = await createPaymentService.exec({
      userEmail: session.user.email,
      userId: session.user.id,
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

    const { url } = await prodamusService.createLink({
      urlReturn: buyCourse.urlReturn,
      urlSuccess: buySuccessPath,
      ...payment,
    });

    return {
      url,
    } as const;
  }
}

export const getPayformUrlUseCase = new GetPayformUrlUseCase();
