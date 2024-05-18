import { dbClient } from "@/shared/lib/db";
import { SharedUser, UserId } from "@/kernel/domain/user";

export class UserRepository {
  async createUser(user: SharedUser): Promise<SharedUser> {
    return await dbClient.user.create({
      data: user,
    });
  }

  async getUsersList(): Promise<SharedUser[]> {
    return await dbClient.user.findMany();
  }

  async getUserById(id: UserId): Promise<SharedUser | undefined> {
    return await dbClient.user
      .findUnique({ where: { id } })
      .then((r) => r ?? undefined);
  }
}

export const userRepository = new UserRepository();
