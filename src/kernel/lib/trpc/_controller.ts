import { AnyRouter } from "@trpc/server";
import { injectable } from "inversify";

@injectable()
export abstract class Controller {
  abstract router: AnyRouter;
}
