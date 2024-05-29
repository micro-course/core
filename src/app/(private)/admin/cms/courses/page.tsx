import { CoursesList } from "@/features/cms/courses-list";

export default function Page() {
  return (
    <div className="container mx-auto p-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Courses</h1>
      <CoursesList />
    </div>
  );
}
