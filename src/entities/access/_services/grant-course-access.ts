import { userAccessRepository } from "../_repository/user-access";
import { CourseId, UserId } from "@/kernel";
import { CourseAccessGrantReason } from "../_domain/projections";
import { userAccessProducer } from "../_domain/producer";

type Command = {
  userId: UserId;
  courseId: CourseId;
  reason: CourseAccessGrantReason;
  adminId?: UserId;
};

export class GrantCourseAccessService {
  constructor() {}

  async exec({ courseId, userId, reason, adminId }: Command) {
    const userAccess = await userAccessRepository.getUserAccesss(userId);

    const createPaymentEvent = userAccessRepository.createEvent(
      "CourseAccessGranted",
      {
        userId,
        courseId,
        reason,
        adminId,
      },
    );

    userAccessProducer.produce(userAccess, createPaymentEvent);

    const courseAccess = userAccess.byCourseId[courseId];

    if (!courseAccess) {
      throw new Error("Grant access error");
    }

    await userAccessRepository.applyEvents(userId, [createPaymentEvent]);

    return { courseAccess };
  }
}

export const grantCourseAccessService = new GrantCourseAccessService();
