"use client";
import { CourseEntity } from "@/entities/course/course";
import { Card, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";

export function CourseItem({ course }: { course: CourseEntity }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{course.name}</CardTitle>
        <CardDescription>{course.description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
