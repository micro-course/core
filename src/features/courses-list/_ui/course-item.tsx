import { CourseListItem } from "@/entities/course/course";
import { Card, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";

export function CourseItem({ course }: { course: CourseListItem }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{course.title}</CardTitle>
        <CardDescription>{course.shortDescription}</CardDescription>
      </CardHeader>
    </Card>
  );
}
