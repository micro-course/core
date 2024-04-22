import { dbClient } from "@/shared/lib/db";
import { SharedUser } from "@/kernel/domain/user";
import { injectable } from "inversify";

@injectable()
export class UserRepository {
  async create(createData: SharedUser): Promise<SharedUser> {
    const user = dbClient.user.create({
      data: createData,
    });

    return user;
  }
}
