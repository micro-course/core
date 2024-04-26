import {
  CourseDetailsSkeleton,
  CourseImageSkeleton,
} from "@/features/course-details/skeletons";
import { courseDetailsClassName, courseImageClassName } from "./_css";

export default function Loading() {
  return (
    <>
      <CourseImageSkeleton className={courseImageClassName} />
      <CourseDetailsSkeleton className={courseDetailsClassName} />
    </>
  );
}
