import { AdapterUser } from "next-auth/adapters";
import { injectable } from "inversify";

@injectable()
export abstract class CreateUserService {
  abstract exec(data: Omit<AdapterUser, "id">): Promise<AdapterUser>;
}
