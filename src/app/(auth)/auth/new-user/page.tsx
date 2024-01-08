import { getSession } from "@/entities/session/get-session.server";
import { onFirstSignIn } from "@/features/auth/on-first-sign-in.server";
import { ProfileFormContainer } from "@/features/update-profile/profile-form.client";
import { Separator } from "@/shared/ui/separator";
import { redirect } from "next/navigation";

export default async function NewUserPage({
  searchParams,
}: {
  searchParams?: { callbackUrl?: string };
}) {
  const session = await getSession();

  if (!session) {
    redirect("/auth/sign-in");
  }

  const user = await onFirstSignIn(session);

  return (
    <main className="space-y-6 py-14 container  max-w-[600px]">
      <div>
        <h3 className="text-lg font-medium">Последний шаг</h3>
        <p className="text-sm text-muted-foreground">
          Обновите профиль, это как другие пользователи увидят вас на сайте
        </p>
      </div>
      <Separator />
      <ProfileFormContainer
        userId={user?.id ?? ""}
        callbackUrl={searchParams?.callbackUrl}
      />
    </main>
  );
}
