import { AddCourseAccessCard } from "@/features/admin-panel/add-course-access-card";

export default function Page() {
  return (
    <div className="container mx-auto p-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Акты</h1>
      <div className="flex wrap gap-8">
        <AddCourseAccessCard className="w-[350px]" />
      </div>
    </div>
  );
}
