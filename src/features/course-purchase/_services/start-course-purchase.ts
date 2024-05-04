import {
  StartCoursePurchaseCommand,
  StartCoursePurchaseResult,
  StartCoursePurchaseService,
} from "@/kernel/services/start-course-purchase";
import { injectable } from "inversify";

@injectable()
export class StartCorusePurchaseServiceImpl extends StartCoursePurchaseService {
  constructor() {
    super();
  }
  async exec(
    command: StartCoursePurchaseCommand,
  ): Promise<StartCoursePurchaseResult> {
    return {
      redirectUrl: "https://google.com",
    };
  }
}
