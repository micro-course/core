import { CourseSlug } from "@/kernel/domain/course";
import { UserId } from "@/kernel/domain/user";
import { injectable } from "inversify";
type Command = {
  courseSlug: CourseSlug;
  userId: UserId;
};

@injectable()
export class StartCorusePurchaseService {
  async exec(command: Command) {
    return {
      redirectUrl: "https://google.com",
    };
  }
}
