import { CourseId, UserId } from "@/kernel";
import { userAccessRepository } from "../user-access.server";

type Command = {
  userId: UserId;
  course: {
    id: CourseId;
    product: {
      access: "free" | "paid";
    };
  };
};

export class CheckCourseAccessService {
  constructor() {}

  async exec({ userId, course }: Command) {
    const userAccess = await userAccessRepository.getUserAccesss(userId);
    console.log({ userAccess, userId });
    return (
      !!userAccess.byCourseId[course.id] || course.product.access === "free"
    );
  }
}

export const checkCourseAccessService = new CheckCourseAccessService();
