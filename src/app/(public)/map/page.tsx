import { CoursesMap } from "@/features/courses-map/courses-map";

export const revalidate = 3600;
export default function Map() {
  return <CoursesMap />;
}
