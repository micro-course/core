import { CoursesList } from "@/features/courses-list/courses-list";

export const dynamic = "force-dynamic";
export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col  p-8">
      <h1 className="text-3xl mb-2">Courses</h1>
      <CoursesList />
    </main>
  );
}
