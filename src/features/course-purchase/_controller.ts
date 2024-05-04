import { Controller, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";

@injectable()
export class CoursePurchaseController extends Controller {
  constructor() {
    super();
  }

  public router = router({
    coursePurchase: {},
  });
}
