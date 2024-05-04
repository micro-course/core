import { injectable } from "inversify";
import { CourseSlug } from "../domain/course";
import { UserId } from "../domain/user";

export type StartCoursePurchaseCommand = {
  courseSlug: CourseSlug;
  userId: UserId;
};

export type StartCoursePurchaseResult = {
  redirectUrl: string;
};

@injectable()
export abstract class StartCoursePurchaseService {
  abstract exec(
    data: StartCoursePurchaseCommand,
  ): Promise<StartCoursePurchaseResult>;
}
