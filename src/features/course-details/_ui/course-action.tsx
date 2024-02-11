import { Button } from "@/shared/ui/button";
import { CourseAction } from "../_domain/projections";
import Link from "next/link";
import { useCourseEnter } from "../_vm/use-course-enter";
import { CourseSlug } from "@/entities/course/course";
import { Spinner } from "@/shared/ui/spinner";
import { getLessonPath } from "@/shared/router";

export function CourseAction({
  action,
  courseSlug,
}: {
  courseSlug: CourseSlug;
  action: CourseAction;
}) {
  const enter = useCourseEnter();

  if (action.type === "buy") {
    return (
      <Button size={"lg"} variant={"rainbow"}>
        Купить за 999 руб
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

  if (action.type === "continue") {
    return (
      <Link href={getLessonPath(action.targetLesson)}>
        <Button variant={"default"} size={"lg"} className={"w-full"}>
          Продолжить
        </Button>
      </Link>
    );
  }

  if (action.type === "enter") {
    return (
      <Button
        size={"lg"}
        variant={"rainbow"}
        onClick={() => enter.mutate({ courseSlug })}
      >
        {enter.isPending && <Spinner className={"mr-2 h-5 w-5"} />}
        Начать
      </Button>
    );
  }

  return null;
}
