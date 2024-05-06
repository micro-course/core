import { useToast } from "@/shared/ui/use-toast";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { coursePurchaseApi } from "./_api";
import { useEffect } from "react";
import { getCoursePath, getCoursePurchasePath } from "@/kernel/lib/router";

export function CheckPurchase() {
  const router = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();

  const checkQuery = coursePurchaseApi.coursePurchase.check.useQuery(
    {
      orderId: searchParams.get("_payform_order_id") ?? "",
    },
    {
      refetchInterval: (query) => {
        if (query.state.status === "error") {
          return false;
        }
        return 500;
      },
      retry: 0,
    },
  );

  useEffect(() => {
    if (checkQuery.isError) {
      toast({
        title: "Что-то пошло не так",
        description: "Ошибка формирования ссылки на покупку",
        variant: "destructive",
      });
      router.replace("/");
    }
  }, [checkQuery.isError, router, toast]);

  useEffect(() => {
    if (checkQuery.data?.state.type === "success") {
      router.replace(getCoursePath(checkQuery.data.courseSlug ?? ""));
    }
  }, [router, checkQuery.data?.courseSlug, checkQuery.data?.state.type]);

  return null;
}
