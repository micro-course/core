import { Button } from "@/shared/ui/button";
import { CourseAction } from "../_domain/projections";
import Link from "next/link";
import { useCourseEnter } from "../_vm/use-course-enter";
import { CourseSlug } from "@/entities/course/course";
import { Spinner } from "@/shared/ui/spinner";
import { getCourseByPath, getLessonPath } from "@/shared/router";
import { usePathname } from "next/navigation";
import { publicConfig } from "@/shared/config/public";

export function CourseAction({
  action,
  courseSlug,
}: {
  courseSlug: CourseSlug;
  action: CourseAction;
}) {
  const pathname = usePathname();
  const enter = useCourseEnter();

  if (action.type === "buy") {
    return (
      <Button size={"lg"} variant={"rainbow"} asChild>
        <Link
          href={getCourseByPath(
            courseSlug,
            `${publicConfig.PUBLIC_URL}${pathname}`,
          )}
        >
          Купить за {new Intl.NumberFormat("ru-RU").format(action.price)}₽
        </Link>
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
      <Button variant={"default"} size={"lg"} className={"w-full"} asChild>
        <Link href={getLessonPath(action.targetLesson)}>Продолжить</Link>
      </Button>
    );
  }

  if (action.type === "enter") {
    return (
      <Button
        size={"lg"}
        variant={"rainbow"}
        onClick={() => enter.handleEnter(courseSlug)}
      >
        {enter.isPending && <Spinner className={"mr-2 h-5 w-5"} />}
        Начать
      </Button>
    );
  }

  return null;
}
