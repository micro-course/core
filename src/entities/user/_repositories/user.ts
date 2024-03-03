import { dbClient } from "@/shared/lib/db";
import { UserEntity, UserId } from "../_domain/types";

export class UserRepository {
  async getUserById(userId: UserId): Promise<UserEntity> {
    return dbClient.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    });
  }

  async createUser(user: UserEntity): Promise<UserEntity> {
    return await dbClient.user.create({
      data: user,
    });
  }

  async getUsersList(): Promise<UserEntity[]> {
    return await dbClient.user.findMany();
  }
}

export const userRepository = new UserRepository();
