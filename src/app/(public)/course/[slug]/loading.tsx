import {
  CourseDetailsSkeleton,
  CourseImageSkeleton,
} from "@/features/course-details/skeletons";
import {
  courseDetailsClassName,
  courseImageClassName,
  mainClassName,
} from "./_css";

export default function Loading() {
  return (
    <main className={mainClassName}>
      <CourseImageSkeleton className={courseImageClassName} />
      <CourseDetailsSkeleton className={courseDetailsClassName} />
    </main>
  );
}
