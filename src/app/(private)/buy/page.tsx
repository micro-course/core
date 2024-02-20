import { RedirectToPayform } from "@/features/buy-course/redirect-to-payform";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <div className="coutainer py-14 mx-auto px-3">
      <RedirectToPayform />
    </div>
  );
}
