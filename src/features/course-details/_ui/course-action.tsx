"use client";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { CourseSlug } from "@/kernel/domain/course";
import { type CourseAction } from "../_domain/types";
import { getLessonPath } from "@/kernel/lib/router";
import { useCourseAction } from "../_vm/use-course-action";
import { Skeleton } from "@/shared/ui/skeleton";
import { Spinner } from "@/shared/ui/spinner";

export function CourseAction({ courseSlug }: { courseSlug: CourseSlug }) {
  const action = useCourseAction(courseSlug);

  if (action.type === "pending") {
    return <Skeleton className="h-11 rounded-md" />;
  }

  if (action.type === "buy") {
    return (
      <Button
        size={"lg"}
        variant={"rainbow"}
        disabled={action.isLoadingByCourse}
        onClick={() => action.buyCourse({ courseSlug })}
      >
        {action.isLoadingByCourse && <Spinner className="w-5 h-5" />}
        Купить за {new Intl.NumberFormat("ru-RU").format(action.price)}₽
      </Button>
    );
  }

  if (action.type === "comming-soon") {
    return (
      <Button disabled variant={"default"} size={"lg"}>
        Курс ещё в разработке
      </Button>
    );
  }

  if (action.type === "enter") {
    return (
      <Button size={"lg"} variant={"default"}>
        <Link href={getLessonPath(action.targetLesson)}>Продолжить</Link>
      </Button>
    );
  }

  return null;
}
