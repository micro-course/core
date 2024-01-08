import { ProfileFormContainer } from "@/features/update-profile/profile-form.client";
import { Separator } from "@/shared/ui/separator";

export default function ProfilePage({ params }: { params: { id: string } }) {
  return (
    <main className="space-y-6 py-14 container  max-w-[600px]">
      <div>
        <h3 className="text-lg font-medium">Профиль</h3>
        <p className="text-sm text-muted-foreground">
          Это как другие пользователи видят вас на сайте
        </p>
      </div>
      <Separator />
      <ProfileFormContainer userId={params.id} />
    </main>
  );
}
