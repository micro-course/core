"use client";
import { StartPurchase } from "@/features/course-purchase/start-purchase";
import { FullPageSpinner } from "@/shared/ui/full-page-spinner";

export default function Page() {
  return (
    <>
      <StartPurchase />
      <FullPageSpinner isLoading></FullPageSpinner>
    </>
  );
}
