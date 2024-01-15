import { dbClient } from "@/shared/lib/db";
import { UserEntity } from "../_domain/types";

export class UserRepository {
  async createUser(user: UserEntity): Promise<UserEntity> {
    return await dbClient.user.create({
      data: user,
    });
  }
}

export const userRepository = new UserRepository();
