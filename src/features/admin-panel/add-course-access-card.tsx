import { getAppSessionStrictServer } from "@/entities/user/session.server";
import { AddCourseAccessForm } from "./_ui/add-course-access-form";
import { addCourseAcessUseCase, Command } from "./_use-cases/add-course-access";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

export async function AddCourseAccessCard({
  className,
}: {
  className?: string;
}) {
  await getAppSessionStrictServer();

  const onSubmit = async (value: Command) => {
    "use server";

    const session = await getAppSessionStrictServer();

    await addCourseAcessUseCase.exec({ session }, value);
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Дать доступ к курсу</CardTitle>
      </CardHeader>
      <CardContent>
        <AddCourseAccessForm onSubmit={onSubmit} />
      </CardContent>
    </Card>
  );
}
