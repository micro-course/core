"use client";

import { useMdxComponent } from "@/shared/lib/mdx/client";
import { Card, CardHeader, CardTitle } from "@/shared/ui/card";

export function CourseItem({ course }: { course: CourseListElement }) {
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
