"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { FullPageSpinner } from "@/shared/ui/full-page-spinner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerAction } from "@/shared/lib/server-action/client";
import { useToast } from "@/shared/ui/use-toast";
import { handlePayformResultAction } from "./_actions/handle-payform-result";
import { useEffectOnce } from "react-use";
import { useRef } from "react";
import { learnBaseKey, courseDetailsKey } from "@/kernel";

export function CheckBuySuccess() {
  const router = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const handleRayformResult = useServerAction(handlePayformResultAction);
  const queryClient = useQueryClient();

  const getPayformUrlMutation = useMutation({
    mutationFn: handleRayformResult,
    async onSuccess(res) {
      queryClient.removeQueries({
        queryKey: [learnBaseKey],
        exact: false,
      });
      queryClient.removeQueries({
        queryKey: courseDetailsKey(res.courseSlug),
        exact: false,
      });
      router.replace(res.url);
    },
    onError(e) {
      if (e instanceof Error) {
        toast({
          variant: "destructive",
          title: "Произошла ошибка",
          description: e.message,
        });
        router.replace("/");
        return;
      } else {
        toast({
          variant: "destructive",
          description: "Произошла ошибка",
        });
        router.replace("/");
        return;
      }
    },
  });

  const firedRef = useRef(false);
  useEffectOnce(() => {
    if (firedRef.current) return;
    firedRef.current = true;
    const payformId = searchParams.get("_payform_id");
    const payformOrderId = searchParams.get("_payform_order_id");
    const payformSign = searchParams.get("_payform_sign");
    const payformStatus = searchParams.get("_payform_status");

    if (payformId && payformOrderId && payformSign && payformStatus) {
      getPayformUrlMutation.mutate({
        payformId,
        payformOrderId,
        payformSign,
        payformStatus,
      });
      return;
    }

    toast({
      variant: "destructive",
      description: "Некорректные параметры",
    });
    router.replace("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  return <FullPageSpinner isLoading={true} />;
}
