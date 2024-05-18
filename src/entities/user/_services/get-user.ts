import { SharedUser, UserId } from "@/kernel/domain/user";
import { userRepository } from "../_repositories/user";

type GetUser = {
  userId: UserId;
};

export class GetUserService {
  async exec({ userId }: GetUser): Promise<SharedUser | undefined> {
    return await userRepository.getUserById(userId);
  }
}

export const getUserService = new GetUserService();
