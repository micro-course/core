import { UsersList } from "@/features/admin-panel/users-list";

export default function Page() {
  return (
    <div className="container mx-auto p-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Users list</h1>
      <UsersList />
    </div>
  );
}
