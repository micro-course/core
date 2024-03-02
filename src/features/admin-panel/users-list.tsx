import { getAppSessionStrictServer } from "@/entities/user/session.server";
import { UsersTable } from "./_ui/users-table";
import { getUsersListUseCase } from "./_use-cases/get-users-list";

export async function UsersList() {
  const session = await getAppSessionStrictServer();

  const users = await getUsersListUseCase.exec({ session });

  return <UsersTable users={users.list} />;
}
