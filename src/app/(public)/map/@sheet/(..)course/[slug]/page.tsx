"use client";
import { CourseSlug } from "@/entities/course/course";
import { CourseDetails } from "@/features/course-details/course-details";
import { CourseImage } from "@/features/course-details/course-image";
import { SheetContent } from "@/shared/ui/sheet";

export default function CourseSheetContentPage({
  params: { slug },
}: {
  params: { slug: CourseSlug };
}) {
  return (
    <SheetContent className="w-full sm:w-[700px] !max-w-full max-h-screen overflow-y-auto overflow-x-hidden">
      <CourseImage
        courseSlug={slug}
        className="h-[15vh] -mx-6 -mt-6 w-[calc(100%+52px)]"
      />
      <CourseDetails courseSlug={slug} className="pt-10" />
    </SheetContent>
  );
}
