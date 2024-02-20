"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { FullPageSpinner } from "@/shared/ui/full-page-spinner";
import { useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { useServerAction } from "@/shared/lib/server-action/client";
import { getPayformUrlAction } from "./_actions/get-payform-url";
import { useToast } from "@/shared/ui/use-toast";
import { useEffectOnce } from "react-use";

export function RedirectToPayform() {
  const router = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const getPayformUrl = useServerAction(getPayformUrlAction);

  const getPayformUrlMutation = useMutation({
    mutationFn: getPayformUrl,
    async onSuccess(res) {
      window.location.replace(res.url);
    },
    onError(e) {
      if (e instanceof Error) {
        toast({
          variant: "destructive",
          title: "Произошла ошибка",
          description: e.message,
        });
        router.back();
        return;
      }

      toast({
        variant: "destructive",
        description: "Произошла ошибка",
      });
      router.back();
    },
  });

  const firedRef = useRef(false);
  useEffectOnce(() => {
    if (firedRef.current) return;
    firedRef.current = true;
    const courseSlug = searchParams.get("courseSlug");
    const urlReturn = searchParams.get("urlReturn");

    if (courseSlug && urlReturn) {
      getPayformUrlMutation.mutate({
        buyCourse: {
          courseSlug,
          urlReturn,
        },
      });
      return;
    }

    toast({
      variant: "destructive",
      description: "Некорректные параметры",
    });
    router.back();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  return <FullPageSpinner isLoading={true} />;
}
