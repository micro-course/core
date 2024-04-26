import { CourseSlug } from "@/kernel/domain/course";

export default function CoursePage({
  params: { slug },
}: {
  params: { slug: CourseSlug };
}) {
  return <main className="pb-14">Content {slug}</main>;
}
