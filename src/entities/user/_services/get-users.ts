import { SharedUser, UserId } from "@/kernel/domain/user";
import { userRepository } from "../_repositories/user";

export class GetUsersService {
  async exec(): Promise<SharedUser[]> {
    return await userRepository.getUsersList();
  }
}

export const getUsersService = new GetUsersService();
