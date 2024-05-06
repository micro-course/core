"use client";
import { CheckPurchase } from "@/features/course-purchase/check-purchase";
import { FullPageSpinner } from "@/shared/ui/full-page-spinner";

export default function Page() {
  return (
    <>
      <CheckPurchase />
      <FullPageSpinner isLoading></FullPageSpinner>
    </>
  );
}
