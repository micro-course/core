import { CheckBuySuccess } from "@/features/buy-course/check-buy-success";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <div className="coutainer py-14 mx-auto px-3">
      <CheckBuySuccess />
    </div>
  );
}
