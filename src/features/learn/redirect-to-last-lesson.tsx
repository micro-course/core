"use client";
import { useRouter } from "next/navigation";
import { getLessonPath } from "@/shared/router";
import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useLastLessonQuery } from "./_vm/queries";
import { FullPageSpinner } from "@/shared/ui/full-page-spinner";
import { useEffect } from "react";

export function RedirectToLastLesson() {
  const router = useRouter();
  const lastLessonQuery = useQuery({
    ...useLastLessonQuery(),
  });

  useEffect(() => {
    if (lastLessonQuery.data) {
      router.replace(getLessonPath(lastLessonQuery.data));
    }
  }, [lastLessonQuery.data, router]);

  if (lastLessonQuery.isPending) {
    return <FullPageSpinner isLoading={true} />;
  }

  if (!lastLessonQuery.data) {
    return (
      <div>
        <h2 className="text-3xl font-semibold  mb-8">
          У вас нет доступных курсов
        </h2>
        Для того что бы начать обучение, перейдите на{" "}
        <Link href="/map">карту</Link> и выберите курсы.
        <Link href="/map" className="mt-8 block">
          <Button>Перейти на карту</Button>
        </Link>
      </div>
    );
  }

  return <FullPageSpinner isLoading={true} />;
}
