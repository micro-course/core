"use client";
import { CourseSlug } from "@/entities/course/course";
import { CourseDetails } from "@/features/course-details/course-details";
import { CourseImage } from "@/features/course-details/course-image";

export default function CoursePage({
  params: { slug },
}: {
  params: { slug: CourseSlug };
}) {
  return (
    <main className="-mt-14 pb-14">
      <CourseImage courseSlug={slug} className="w-full h-[30vh]" />
      <CourseDetails
        courseSlug={slug}
        className="max-w-[800px] mx-auto pt-10 px-3"
      />
    </main>
  );
}
