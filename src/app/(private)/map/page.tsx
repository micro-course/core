import { CoursesMap } from "@/features/courses-map/courses-map";

export default function Map() {
  return (
    <div className="fixed inset-0 flex flex-col">
      <CoursesMap />
    </div>
  );
}
