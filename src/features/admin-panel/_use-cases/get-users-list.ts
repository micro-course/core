import { createAdminAbility } from "../_domain/ability";
import { WithSession, checkAbility } from "@/entities/user/session.server";
import { userRepository } from "@/entities/user/_repositories/user";
import { UserListItem } from "../_domain/types/user-list";
import { userToUserListItem } from "../_domain/mappers";

export class GetUsersListUseCase {
  @checkAbility({
    createAbility: createAdminAbility,
    check: (ability) => ability.canViewUsersList(),
  })
  async exec({}: Partial<WithSession>): Promise<{ list: UserListItem[] }> {
    const { users } = await this.uploadData();

    return {
      list: users.map(userToUserListItem),
    };
  }

  private async uploadData() {
    const [users] = await Promise.all([userRepository.getUsersList()]);

    return {
      users,
    };
  }
}

export const getUsersListUseCase = new GetUsersListUseCase();
