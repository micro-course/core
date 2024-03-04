"use client";
import { CourseSlug } from "@/entities/course/course";
import { LessonSlug } from "@/entities/course/lesson";
import { useQuery } from "@tanstack/react-query";
import { useGetLearnLessonQuery } from "./_vm/queries";
import { Skeleton } from "@/shared/ui/skeleton";
import { ContentBlock } from "./_ui/content-block";

export function Lesson({
  lessonSlug,
  courseSlug,
}: {
  lessonSlug: LessonSlug;
  courseSlug: CourseSlug;
}) {
  const lessonQuery = useQuery({
    ...useGetLearnLessonQuery(courseSlug, lessonSlug),
  });

  if (lessonQuery.isPending) {
    return <Skeleton className="h-12 border-b" />;
  }

  if (lessonQuery.isError) {
    return (
      <div className="w-full flex flex-col gap-6">
        <h1 className="text-3xl font-bold">Произошла ошибка</h1>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-8">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {lessonQuery.data?.lesson.title}
      </h1>

      {lessonQuery.data.lesson.blocks.map((block, i) => {
        return (
          <ContentBlock
            contentBlock={block}
            key={i}
            lessonSlug={lessonSlug}
            courseSlug={courseSlug}
          />
        );
      })}
    </div>
  );
}
