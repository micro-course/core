import { coursesRepository } from "./_repisitories/courses";
import { CourseItem } from "./_ui/course-item";
import { bundleMDX } from "mdx-bundler";
import { cookies } from "next/headers";

export async function CoursesList() {
  cookies();
  const coursesList = await coursesRepository.getCoursesList();

  const renderedCourses = await Promise.all(
    coursesList.map(async (course) => {
      return {
        ...course,
        description: await bundleMDX({
          source: course.description,
        }).then((r) => r.code),
      };
    }),
  );

  return (
    <div className="flex flex-col gap-3">
      {renderedCourses.map((course) => (
        <CourseItem key={course.id} course={course} />
      ))}
    </div>
  );
}
