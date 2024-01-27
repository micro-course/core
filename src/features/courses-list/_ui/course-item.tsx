"use client";
import { CourseEntity } from "@/entities/course/course";
import { useMdxComponent } from "@/shared/lib/mdx";
import { Card, CardHeader, CardTitle } from "@/shared/ui/card";

export function CourseItem({ course }: { course: CourseEntity }) {
  const Description = useMdxComponent(course.description);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{course.title}</CardTitle>
        <Description size="sm" />
      </CardHeader>
    </Card>
  );
}
